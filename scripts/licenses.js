const checker = require("license-checker");
const fs = require("fs");

console.log("Attempting to generate licenses...");
let startTime;
let endTime;

const OUT_FILE = "./assets/runtime/3rd-party-licenses.md";

if (fs.existsSync(OUT_FILE)) {
  console.warn("Skipping licenses generation as the existing file is sufficient for development needs.");
  console.warn("If you see this message in the CI you have probably commit the '3rd-party-license.md' file.");
  process.exit(0);
}

checker.init({ start: "."}, (err, packages) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log("Generating licenses...");
  startTime = Date.now();

  let markdown = "# Licenses\nThese are the licenses for libraries Homework Companion uses.\n\nThe following software may be included in this product.\n\n---\n\n";

  for (const [_key, value] of Object.entries(packages)) {
    try {
      if (value.repository === undefined) {
        value.repository = "undefined";
      } 
      const splitRepoUrl = value.repository.split("/");
      markdown += `[@${splitRepoUrl[splitRepoUrl.length - 2]}/${splitRepoUrl[splitRepoUrl.length - 1]}](${value.repository})\n\n\`\`\`\n`;
      if (fs.existsSync(value.licenseFile)) {
        markdown += fs.readFileSync(value.licenseFile).toString();
        markdown += `\n\`\`\`\n\n`;
      } else {
        markdown += `License file does not exist.\n\n`;
    }
    } catch (e) {
      console.error(e, "value: ", value);
      process.exit(1);
    }
  }

  fs.writeFileSync(OUT_FILE, markdown);
  endTime = Date.now();
  console.log(`Licenses generated (${endTime - startTime}ms)`);
});