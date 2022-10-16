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
            return {
                title: res.title,
                body: res.body.split('\n').reduce((acc, curr) => {
                    if (acc.startsWith('# Changelog') || acc.startsWith('## Changelog')) {
                        return acc + curr;
                    }
                    return acc;
                }, ''),
            };
        });
}

module.exports = {
    getPullRequest,
};