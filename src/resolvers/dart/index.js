const { resolverBase } = require("../../infra/resolverBase");

module.exports = {
    dartResolver(packagePath) {
        return resolverBase(
            packagePath,
            'pubspec.yml',
            function (newVersion) {
                return (line) => {
                    if(line.startsWith("version")) return 'version: ' + newVersion;
                    return line;
                }
            }
        );
    }
}
