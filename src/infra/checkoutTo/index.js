const { execSync } = require("child_process");

async function checkoutTo({ branch }) {
    execSync(`git checkout ${branch}`, { encoding: "utf-8" });
    return true
}


module.exports = {
    checkoutTo,
}