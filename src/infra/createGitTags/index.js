const { execSync } = require("child_process");

async function createGitTags({ projectName, newVersion, commitTitle }) {
    const versionName = `${projectName}-v${newVersion}`;
    execSync(`git tag -a -m '${commitTitle}' ${versionName}`, { encoding: "utf-8" });
    return {
        versionName,
    };
}


module.exports = {
    createGitTags,
}