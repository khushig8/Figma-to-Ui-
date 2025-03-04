import axios from "axios";
import "dotenv/config";

// Load API keys from environment variables
const FIGMA_API_KEY = process.env.FIGMA_API_KEY;
const FIGMA_FILE_KEY = process.env.FIGMA_FILE_KEY;

if (!FIGMA_API_KEY || !FIGMA_FILE_KEY) {
    console.error("❌ Error: Missing Figma API Key or File Key. Check your .env file.");
    process.exit(1);
}

const FIGMA_URL = `https://api.figma.com/v1/files/${FIGMA_FILE_KEY}`;

async function fetchFigmaData() {
    try {
        const response = await axios.get(FIGMA_URL, {
            headers: {
                "X-Figma-Token": FIGMA_API_KEY,
            },
        });

        const figmaData = response.data;
        console.log("✅ Extracted Data:", extractRelevantData(figmaData));

    } catch (error) {
        if (error instanceof Error) {
            console.error("❌ Error Fetching Figma Data:", error.message);
        } else {
            console.error("❌ Unknown Error:", error);
        }
    }
}
function extractRelevantData(figmaData: any) {
    //  Extracting all text nodes
    const textNodes: any[] = [];

    function traverse(node: any) {
        if (node.type === "TEXT") {
            textNodes.push({
                id: node.id,
                text: node.characters,
                fontSize: node.style?.fontSize,
                fontWeight: node.style?.fontWeight,
            });
        }
        if (node.children) {
            node.children.forEach(traverse);
        }
    }

    traverse(figmaData.document);
    return textNodes;
}

// Run the function
fetchFigmaData();
