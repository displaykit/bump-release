const { bump } = require("../../infra/bump");
const { createNewVersionCommit } = require("../../infra/createNewVersionCommit");
const { pushToGitHub } = require("../../infra/pushToGitHub");
const { createGitTags } = require("../../infra/createGitTags");
const { checkoutTo } = require("../../infra/checkoutTo")


module.exports = {
    async versionController({
        projectName,
        bumpType,
        packageVersion,
        commitMessage,
        commitBody,
        updatePackageVersion,
        updateChangelog,
        branch,
        projectCwd,
    }) {
        // console.log("⌛ - Checkout to correct branch");
        // await checkoutTo({ branch });
        // console.log("✅ - Package JSON");

        const newVersion = bump(bumpType, packageVersion, projectCwd);

        console.log("⌛ - Package JSON");
        await updatePackageVersion(newVersion, { cwd: projectCwd });
        console.log("✅ - Package JSON");
        
        console.log("⌛ - Changelog (don not run for 'beta')");
        bumpType !== 'beta' && await updateChangelog({
            newVersion,
            commitBody,
            cwd: projectCwd
        });
        console.log("✅ - Changelog");

        console.log("⌛ - Create new version commit");
        const { commitTitle } = await createNewVersionCommit({
            newVersion,
            bumpType,
            projectName,
            commitMessage,
            commitBody,
            cwd: projectCwd
        });
        console.log("✅ - Create new version commit");

        console.log("⌛ - Create Git Tags");
        const { tagVersionName } = await createGitTags({ projectName, newVersion, commitTitle, cwd: projectCwd });
        console.log("✅ - Create Git Tags");

        console.log("⌛ - Pushed to GitHub with all tags");
        await pushToGitHub({ branch, cwd: projectCwd });
        console.log("✅ - Pushed to GitHub with all tags");

        return {
            newVersion,
            tagVersionName
        };
    },
}