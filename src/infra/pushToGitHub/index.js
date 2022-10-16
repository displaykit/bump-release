const { execSync } = require("child_process");

async function pushToGitHub({ newVersion }) {
    // git tag -a -m "My first action release" v1.1

    return execSync("git tag -a -m");
}


module.exports = {
    pushToGitHub,
}