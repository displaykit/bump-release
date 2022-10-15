

module.exports = {
    releaseBetaController({
        packageCurrentVersion
    }) {
        console.log(packageCurrentVersion);
        return { name: "releaseBetaController" };
    },
}