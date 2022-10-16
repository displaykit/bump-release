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
                const changelogBody = commitBody
                    .replaceAll('\r\r', '\n')
                    .replaceAll('\r', '\n')
                    .split('\n')
                    .slice(1)
                    .join('\n');

                console.log(changelogBody);
                const changelogNewContent = `
## ${newVersion}

${changelogBody}
                `;
                if (fs.existsSync(changelogFilePath)) {
                    const changelogFileContent = fs.readFileSync(changelogFilePath, { encoding: "utf-8" });
                    const changelogFileNewContent = changelogNewContent + changelogFileContent;
                    fs.writeFileSync(changelogFilePath, changelogFileNewContent, { flag: 'w' });
                }
            }
        }
    }
}