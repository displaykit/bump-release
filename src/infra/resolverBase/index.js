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
                const changelogBody = commitBody;
                const changelogNewContent = `
## ${newVersion}

${changelogBody}
                `;
                // const changelogFileContent = fs.readFileSync(changelogFilePath, { encoding: "utf-8" });
                // const updatedContent = changelogFileContent
                //     .split("\n")
                //     .map((line) => {
                //         if (line.startsWith("## ")) {
                //             return `## ${newVersion}\n`;
                //         }
                //         return line;
                //     })
                //     .join("\n");

                const changelogFileContent = changelogNewContent;
                fs.writeFileSync(changelogFilePath, changelogFileContent, { flag: 'w' });
            }
        }
    }
}