const path = require("path");
const fs = require("fs");
const { readFileBy } = require("./readFileBy");


module.exports = {
    resolverBase(
        packagePath,
        packageFileName,
        mapVersionLineToNewVersion,
    ) {
        const packageFileExt = packageFileName.split(".")[1];
        const packageFilePath = path.resolve(packagePath, packageFileName);
        const packageFile = readFileBy[packageFileExt](packageFilePath);

        return {
            packageVersion: packageFile.version,
            async updatePackageVersion(newVersion) {
                const packageFileContent = fs.readFileSync(packageFilePath, { encoding: "utf-8" });
                const updatedContent = packageFileContent
                    .split("\n")
                    .map(mapVersionLineToNewVersion(newVersion))
                    .join("\n");

                fs.writeFileSync(packageFilePath, updatedContent);
            },
            async updateChangelog({ newVersion, commitBody }) {
                const changelogFilePath = path.resolve(packagePath, "CHANGELOG.md");
                // filter first line
                console.log('commitBody', commitBody);
                const changelogBody = commitBody.split("\n").slice(1).join("\n");
                const changelogNewContent = `
## ${newVersion}

${changelogBody}
                `;
                // TODO: Check if file exists
                    // TODO: Read the content of the file
                    // TODO: Add the new content on the top

                const changelogFileContent = changelogNewContent;
                fs.writeFileSync(changelogFilePath, changelogFileContent, { flag: 'w' });
            }
        }
    }
}