const path = require("path");
const fs = require("fs");
const readYamlFile = require('read-yaml-file');

module.exports = {
    dartResolver(packagePath) {
        const packageFilePath = path.resolve(packagePath, './pubspec.yml');
        const packageFile = readYamlFile.sync(packageFilePath);
        console.log(packageFile.version);

        // Resolver Interface
        return {
            packageVersion: packageFile.version,
            async updatePackageVersion(newVersion) {
                const packageFileContent = fs.readFileSync(packageFilePath, { encoding: "utf-8" });
                const updatedContent = packageFileContent
                    .split("\n")
                    .map((line) => {
                        console.log('version: ' + newVersion);
                        if(line.startsWith("version")) return 'version: ' + newVersion;
                        return line;
                    })
                    .join("\n");

                fs.writeFileSync(packageFilePath, updatedContent);
            },
            async updateChangelog(newVersion) {
                // TODO: Add support to modify the changelog
                console.log("Hook to WRITE inside the CHANGELOG.md of the package");
            }
        }
    }
}
