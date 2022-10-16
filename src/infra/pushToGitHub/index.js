const { execSync } = require("child_process");

async function pushToGitHub() {
    return execSync("git push --follow-tags");
}

module.exports = {
    pushToGitHub,
}