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
    const commitTitle = `${type}${scope}: ${commitMessage}`;
    const commitInfo = `${commitTitle}

${commitBody}

> Version: ${newVersion}`;

    execSync(`git add .`, { encoding: "utf-8" });
    execSync(`git commit -m '${commitInfo}'`, { encoding: "utf-8" });

    return {
        commitTitle,
        commitInfo,
    };
}

module.exports = {
    createNewVersionCommit,
    bumpTypes: Object.keys(conventionalCommitTypeByVersion),
};