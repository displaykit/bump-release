async function getPullRequest({
    repositoryOwner,
    repositoryName,
    pullRequestNumber,
    githubToken,
}) {
    const URL = `https://api.github.com/repos/${repositoryOwner}/${repositoryName}/pulls/${pullRequestNumber}`;
    console.log(URL);
    return await fetch(URL, {
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
                body: res.body,
            };
        });
}

module.exports = {
    getPullRequest,
};