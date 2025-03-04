import { fetchFigmaData } from "./fetchFigma";
import { generateUI } from "./generateUI";
import fs from "fs";

async function main() {
  try {
    console.log("Fetching Figma data...");
    const figmaData = await fetchFigmaData();
    
    // Save the data to figma.json
    fs.writeFileSync("figma.json", JSON.stringify(figmaData, null, 2));
    console.log("Figma data saved to figma.json");

    console.log("Generating Next.js UI...");
    generateUI();
    console.log("UI Generation completed!");

  } catch (error) {
    console.error("Error in main process:", error);
  }
}

main();
