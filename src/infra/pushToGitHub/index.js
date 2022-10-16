const { execSync } = require("child_process");

async function pushToGitHub() {
    execSync("git push --follow-tags", { encoding: "utf-8" });
    return true;
}

module.exports = {
    pushToGitHub,
}