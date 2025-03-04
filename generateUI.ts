import fs from "fs";
import path from "path";

export function generateUI() {
  const figmaData = JSON.parse(fs.readFileSync("figma.json", "utf-8"));

  console.log("🔍 Debug: Full Figma JSON structure:", figmaData); // Log full data

  if (!figmaData || !figmaData.components) {
    console.error("❌ No components found in Figma JSON!");
    return;
  }

  console.log("🔍 Debug: Found Components Object:", figmaData.components); // Log components object

  const components = Object.values(figmaData.components);

  if (components.length === 0) {
    console.error("❌ No valid components detected!");
    return;
  }

  const componentsFolder = path.join(__dirname, "components");
  if (!fs.existsSync(componentsFolder)) {
    fs.mkdirSync(componentsFolder);
  }

  components.forEach((component: any) => {
    const componentName = component.name.replace(/\s+/g, "");
    const componentCode = `
import React from "react";

const ${componentName} = () => {
  return (
    <div>
      <h1>${componentName}</h1>
    </div>
  );
};

export default ${componentName};
    `;

    fs.writeFileSync(
      path.join(componentsFolder, `${componentName}.tsx`),
      componentCode
    );

    console.log(`✅ Created ${componentName}.tsx`);
  });

  console.log("🎉 UI components generated successfully!");
}
