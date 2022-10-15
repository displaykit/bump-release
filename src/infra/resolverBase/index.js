const path = require("path");
const fs = require("fs");
const readYamlFile = require('read-yaml-file');

const readFile = {
    yml: (packageFilePath) => readYamlFile.sync(packageFilePath),
    yaml: (...args) => readFile.yml(...args),
    json: (packageFilePath) => JSON.parse(fs.readFileSync(packageFilePath, { encoding: "utf-8" })),
}

module.exports = {
    resolverBase(
        packagePath,
        packageFileName,
        mapVersionLineToNewVersion,
    ) {
        const packageFileExt = packageFileName.split(".")[1];
        const packageFilePath = path.resolve(packagePath, packageFileName);
        const packageFile = readFile[packageFileExt](packageFilePath);

        return {
            packageVersion: packageFile.version,
            async updatePackageVersion(newVersion) {
                const packageFileContent = fs.readFileSync(packageFilePath, { encoding: "utf-8" });
                const updatedContent = packageFileContent
                    .split("\n")
                    .map(mapVersionLineToNewVersion(newVersion))
                    .join("\n");

                fs.writeFileSync(packageFilePath, updatedContent);
            }
        }
    }
}