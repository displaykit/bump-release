const { execSync } = require("child_process");

async function pushToGitHub() {
    execSync("git push --follow-tags");
    console.log("✅ - Pushed to GitHub with all tags")
    return true;
}

module.exports = {
    pushToGitHub,
}