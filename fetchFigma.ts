import fetch from "node-fetch";

// Replace with your Figma API Key & File ID
const FIGMA_API_KEY = process.env.FIGMA_API_KEY || "your-api-key";
const FIGMA_FILE_KEY = process.env.FIGMA_FILE_KEY || "your-file-id";

export async function fetchFigmaData() {
  try {
    const response = await fetch(
      `https://api.figma.com/v1/files/${FIGMA_FILE_KEY}`,
      {
        headers: {
          "X-Figma-Token": FIGMA_API_KEY,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Figma API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching Figma data:", error);
    throw error;
  }
}
