const { bump } = require("../../infra/bump");
const { createNewVersionCommit } = require("../../infra/createNewVersionCommit");
const { pushToGitHub } = require("../../infra/pushToGitHub");
// const { createGitTags } = require("../../infra/createGitTags");


module.exports = {
    async releaseBetaController({
        packageVersion,
        updatePackageVersion
    }) {
        const bumpType = "beta";
        const newVersion = bump(bumpType, packageVersion);

        await updatePackageVersion(newVersion); console.log("✅ - Package JSON Updated");
        // await updateChangelog();
        await createNewVersionCommit({
            newVersion,
            bumpType,
            projectName: "",
            commitMessage: "commit message",
            commitBody: `## Changelog info...
            lorem ipsum dorme ...`,
        });
        // await createGitTags();
        await pushToGitHub(); console.log("✅ - Pushed to GitHub with all tags");
        return {
            newVersion,
        };
    },
}