const { execSync } = require("child_process");

async function pushToGitHub({ branch }) {
    execSync(`git push -u origin HEAD:${branch} --follow-tags`, { encoding: "utf-8" });
    return true;
}

module.exports = {
    pushToGitHub,
}