const { execSync } = require("child_process");

async function createGitTags({ newVersion, commitTitle }) {
    execSync(`git tag -a -m '${commitTitle}' ${newVersion}`, { encoding: "utf-8" });
    return true;
}


module.exports = {
    createGitTags,
}