const { execSync } = require("child_process");

async function pushToGitHub({ branch }) {
    const output = execSync(`git push -u origin HEAD:${branch} --follow-tags`, { encoding: "utf-8" });
    console.log(output);
    return true;
}

module.exports = {
    pushToGitHub,
}