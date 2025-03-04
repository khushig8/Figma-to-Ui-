import "dotenv/config";

const FIGMA_FILE_KEY = process.env.FIGMA_FILE_KEY;
const FIGMA_API_KEY = process.env.FIGMA_API_KEY;

async function fetchFigmaData() {
  if (!FIGMA_FILE_KEY || !FIGMA_API_KEY) {
    console.error("Missing Figma API Key or File Key in .env");
    return;
  }

  const response = await fetch(
    `https://api.figma.com/v1/files/${FIGMA_FILE_KEY}`,
    {
      headers: {
        "X-Figma-Token": FIGMA_API_KEY!,
      },
    }
  );

  const data = await response.json();
  console.log(JSON.stringify(data, null, 2));
}

fetchFigmaData();
