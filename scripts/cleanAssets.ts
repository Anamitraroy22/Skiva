// scripts/cleanAssets.ts
import fs from "fs";
import path from "path";

const assetsDir = path.join(__dirname, "../public/assets"); // Points to public/assets relative to the script location

// !!! IMPORTANT !!!
// List ALL assets your application uses here.
// Be very careful not to omit any, or they will be deleted.
const usedAssets = new Set([
  "herobg.webp",
  "favicon.ico",
  "favicon-32x32.png",
  "favicon-16x16.png",
  "apple-touch-icon.png",
  "site.webmanifest",
  // Add all your destination images from public/assets/destinations/
  // Example:
  // "destinations/destination1.webp",
  // "destinations/destination2.webp",
  // "destinations/destination3.webp",
  // "destinations/destination4.webp",
  // "destinations/destination5.webp",
  // "destinations/destination6.webp",
  // "destinations/destination7.webp",
  // And any other images or files you have directly under public/assets/
  // "your-other-image.png",
  // "my-font.woff2",
]);

console.log("Starting asset cleanup...");

try {
  if (!fs.existsSync(assetsDir)) {
    console.warn(`Directory not found: ${assetsDir}. Skipping cleanup.`);
  } else {
    fs.readdirSync(assetsDir).forEach((file) => {
      // Construct full path for the file (e.g., 'public/assets/image.webp')
      const filePathInAssets = path.relative(assetsDir, path.join(assetsDir, file)).replace(/\\/g, '/'); // Normalize path for Set lookup

      if (!usedAssets.has(filePathInAssets) && !fs.statSync(path.join(assetsDir, file)).isDirectory()) {
        // Only delete files, not subdirectories themselves
        fs.unlinkSync(path.join(assetsDir, file));
        console.log(`🗑 Removed unused: ${filePathInAssets}`);
      } else if (fs.statSync(path.join(assetsDir, file)).isDirectory()) {
        // If it's a directory, you might want to recursively check it
        // For simplicity, this script currently only checks the top level.
        // A more robust script would traverse subdirectories.
        console.log(`Keeping directory (manual check needed for contents): ${filePathInAssets}`);
      }
    });
    console.log("Asset cleanup completed.");
  }
} catch (error) {
  console.error("An error occurred during asset cleanup:", error);
}