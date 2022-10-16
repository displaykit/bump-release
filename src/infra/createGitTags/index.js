const { execSync } = require("child_process");

async function createGitTags({ newVersion, commitInfo }) {
    execSync(`git tag -a -m '${commitInfo}' ${newVersion}`, { encoding: "utf-8" });
    return true;
}


module.exports = {
    createGitTags,
}