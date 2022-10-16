const { bump } = require("../../infra/bump")


module.exports = {
    async releaseBetaController({
        packageVersion,
        updatePackageVersion
    }) {
        const newVersion = bump("beta", packageVersion);
        await updatePackageVersion(newVersion);
        // git tag -a -m "My first action release" v1.1
        return {
            newVersion,
        };
    },
}