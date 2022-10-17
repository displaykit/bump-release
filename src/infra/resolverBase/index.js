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
            async updatePackageVersion(newVersion, { cwd }) {
                const packageFileContent = fs.readFileSync(packageFilePath, { encoding: "utf-8", cwd });
                const updatedContent = packageFileContent
                    .split("\n")
                    .map(mapVersionLineToNewVersion(newVersion))
                    .join("\n");

                fs.writeFileSync(packageFilePath, updatedContent);
            },
            async updateChangelog({ newVersion, commitBody, cwd }) {
                const changelogFilePath = path.resolve(packagePath, "CHANGELOG.md");
                const changelogBody = commitBody
                    ?.replaceAll('\r\r', '\n')
                    .replaceAll('\r', '\n')
                    .split('\n')
                    .slice(1)
                    .join('\n') || "No changelog specified for this version";

                const changelogNewContent = `
## ${newVersion}

${changelogBody}
                `;
                if (fs.existsSync(changelogFilePath, { cwd })) {
                    const changelogFileContent = fs.readFileSync(changelogFilePath, { encoding: "utf-8", cwd });
                    const changelogFileNewContent = changelogNewContent + changelogFileContent;
                    fs.writeFileSync(changelogFilePath, changelogFileNewContent, { flag: 'w', cwd });
                } else {
                    fs.writeFileSync(changelogFilePath, changelogNewContent, { flag: 'w', cwd });
                }
            }
        }
    }
}