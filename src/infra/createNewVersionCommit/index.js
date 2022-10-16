const { execSync } = require("child_process");


const conventionalCommitTypeByVersion = {
    major: "feat",
    minor: "feat",
    patch: "fix",
    beta: "feat",
};
function createNewVersionCommit({ 
    newVersion,
    bumpType,
    projectName,
    commitMessage,
    commitBody,
}) {
    const scope = Boolean(projectName)
        ? `(${projectName})`
        : ""
    const type = conventionalCommitTypeByVersion[bumpType];

    execSync(`git add .`, { encoding: "utf-8" });
    execSync(`git commit -m '${type}${scope}: ${commitMessage}

${commitBody}

> Version: ${newVersion}'`, { encoding: "utf-8" });

    return true;
}

module.exports = {
    createNewVersionCommit,
    bumpTypes: Object.keys(conventionalCommitTypeByVersion),
};