#!/usr/bin/env node
const { exec } = require('child_process');

// Example: bump-release /release/beta javascript-ex ./examples/javascript-ex javascript
const input = process.argv[2];
const name = process.argv[3];
const projectPath = process.argv[4];
const resolver = process.argv[5];

const bumpType = input.split('/')[2];

console.log("[@displaykit/releaser]");

const command = `
yarn start version ${projectPath} \
--type=${bumpType} \
--resolver=${resolver} \
--name=${name} \
--github-pull-request-number=${process.env.GITHUB_PR_NUMBER} \
--github-repo-owner=${process.env.GITHUB_REPO_OWNER} \
--github-repo-name=${process.env.GITHUB_REPO_NAME} \
--github-token=${process.env.GITHUB_TOKEN}
`;

console.log(command);

const run = exec(command, { encoding: 'utf8' });

run.stdout.on('data', (data) => {
    console.log(data);
});
