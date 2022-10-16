const { execSync } = require("child_process");

async function createGitTags({ newVersion }) {
    execSync(`git tag -a -m "message of the created tag" ${newVersion}`, { encoding: "utf-8" });
    return true;
}


module.exports = {
    createGitTags,
}