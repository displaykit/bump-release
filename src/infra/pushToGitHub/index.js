const { execSync } = require("child_process");

async function pushToGitHub({ newVersion }) {
    return execSync("git push --follow-tags");
}


module.exports = {
    pushToGitHub,
}