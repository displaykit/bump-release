const { execSync } = require("child_process");

module.exports = {
    getCommitHash: ({ cwd } = {}) => execSync("git rev-parse HEAD", { encoding: "utf-8", cwd: cwd }).trim(),
}