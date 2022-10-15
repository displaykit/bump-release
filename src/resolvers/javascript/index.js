const { resolverBase } = require("../../infra/resolverBase");

module.exports = {
    javaScriptResolver(packagePath) {
        return resolverBase(
            packagePath,
            'package.json',
            function (newVersion) {
                return (line) => {
                    if(line.includes("version")) {
                        const [versionLineKey] = line.split(":");
                        return `${versionLineKey}: "${newVersion}"`;
                    }
                    return line;
                }
            }
        );
    }
}
