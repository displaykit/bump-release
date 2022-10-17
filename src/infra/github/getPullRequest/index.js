async function getPullRequest({
    repositoryOwner,
    repositoryName,
    pullRequestNumber,
    githubToken,
}) {
    const URL = `https://api.github.com/repos/${repositoryOwner}/${repositoryName}/pulls/${pullRequestNumber}`;
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
                body: res.body?.split('\n').reduce((acc, curr) => {
                    if (acc.includes('Changelog') || curr.includes('Changelog')) {
                        return acc + curr;
                    }
                    return acc;
                }, ''),
            };
        })
        .catch((err) => {
            console.log(err);
            return err;
        });
}

module.exports = {
    getPullRequest,
};