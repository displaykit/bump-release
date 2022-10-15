const path = require("path");
const readYamlFile = require('read-yaml-file');

module.exports = {
    dartResolver(packagePath) {
        const packageFilePath = path.resolve(packagePath, './pubspec.yml');
        const packageFile = readYamlFile.sync(packageFilePath);

        // Resolver Interface
        return {
            packageVersion: packageFile.version,
            async updatePackageVersion(newVersion) {
                console.log("Hook to WRITE inside the pubspec.yml of the package");
            },
            async updateChangelog(newVersion) {
                console.log("Hook to WRITE inside the CHANGELOG.md of the package");
            }
        }
    }
}
