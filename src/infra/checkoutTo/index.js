const { execSync } = require("child_process");

async function checkoutTo({ branch }) {
    const output = execSync(`git checkout ${branch}`, { encoding: "utf-8" });
    console.log(output);
    return true
}


module.exports = {
    checkoutTo,
}