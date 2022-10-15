const { execSync } = require("child_process");

module.exports = {
    getCommitHash: () => execSync("git rev-parse HEAD", { encoding: "utf-8" }),
}