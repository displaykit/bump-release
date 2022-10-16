const { execSync } = require("child_process");

async function createGitTags({ newVersion, commitMessage }) {
    execSync(`git tag -a -m '${commitMessage}' ${newVersion}`, { encoding: "utf-8" });
    return true;
}


module.exports = {
    createGitTags,
}