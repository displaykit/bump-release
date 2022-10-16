async function getPullRequest({
    repositoryOwner,
    repositoryName,
    pullRequestNumber,
    githubToken,
}) {
    return await fetch(`https://api.github.com/repos/${repositoryOwner}/${repositoryName}/pulls/${pullRequestNumber}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${githubToken}`,
        },
    })
        .then((response) => response.json())
        .then((res) => {
            console.log(res);
            return {
                title: res.title,
            };
        });
}

module.exports = {
    getPullRequest,
};