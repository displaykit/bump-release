const { bump } = require("../../infra/bump");
const { createNewVersionCommit } = require("../../infra/createNewVersionCommit");
const { pushToGitHub } = require("../../infra/pushToGitHub");
const { createGitTags } = require("../../infra/createGitTags");


module.exports = {
    async versionController({
        projectName,
        bumpType,
        packageVersion,
        commitMessage,
        commitBody,
        updatePackageVersion
    }) {
        const newVersion = bump(bumpType, packageVersion);

        await updatePackageVersion(newVersion); console.log("✅ - Package JSON Updated");
        // await updateChangelog();
        const { commitInfo } = await createNewVersionCommit({
            newVersion,
            bumpType,
            projectName,
            commitMessage,
            commitBody,
        });
        await createGitTags({ newVersion, commitInfo }); console.log("✅ - Create Git Tags");
        await pushToGitHub(); console.log("✅ - Pushed to GitHub with all tags");
        return {
            newVersion,
        };
    },
}