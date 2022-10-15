module.exports = {
    dartResolver(packagePath) {
        return resolverBase(
            packagePath,
            'pubspec.yml',
            function (newVersion) {
                return (line) => {
                    console.log('version: ' + newVersion);
                    if(line.startsWith("version")) return 'version: ' + newVersion;
                    return line;
                }
            }
        );
    }
}
