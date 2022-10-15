const { bump } = require("../../infra/bump")


module.exports = {
    async releaseBetaController({
        packageVersion,
        updatePackageVersion
    }) {
        const newVersion = bump("beta", packageVersion);
        return updatePackageVersion(newVersion)
            .then(() => {

            })
            .then(() => ({
                newVersion,
            }));
        
    },
}