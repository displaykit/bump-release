const { execSync } = require("child_process");

async function createGitTags({ projectName, newVersion, commitTitle }) {
    const tagVersionName = `${projectName}-v${newVersion}`;
    execSync(`git tag -a -m '${commitTitle}' ${tagVersionName}`, { encoding: "utf-8", cwd });
    return {
        tagVersionName,
    };
}


module.exports = {
    createGitTags,
}