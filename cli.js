#!/usr/bin/env node
const { exec } = require('child_process');
const fs = require('fs');
const path = require("path");

console.log('npx installation path', __dirname);

let CONFIG;
const BUMP_RELEASE_CONFIG_PATH = process.env.BUMP_RELEASE_CONFIG_PATH || path.resolve('.bump-release.json');
if(fs.existsSync(BUMP_RELEASE_CONFIG_PATH)) {
    CONFIG = JSON.parse(fs.readFileSync(BUMP_RELEASE_CONFIG_PATH, 'utf8'));
}

console.log(CONFIG);

// Example: bump-release /release/beta javascript-ex ./examples/javascript-ex javascript
const input = process.argv[2];
const name = process.argv[3];
console.log("Project Name: ", name);

const projectPath = process.argv[4] || CONFIG[name].path;
const resolver = process.argv[5]  || CONFIG[name].resolver;

const bumpType = input?.split('/')[2];
const [GITHUB_REPO_OWNER, GITHUB_REPO_NAME] = process.env.GITHUB_REPOSITORY?.split('/') || [];

console.log("[@displaykit/releaser]");

const command = `
yarn --cwd ${__dirname} start version ${projectPath} \
--type=${bumpType} \
--resolver=${resolver} \
--name=${name} \
--github-pull-request-number=${process.env.GITHUB_PR_NUMBER} \
--github-repo-owner=${GITHUB_REPO_OWNER} \
--github-repo-name=${GITHUB_REPO_NAME} \
--github-token=${process.env.GITHUB_TOKEN}
`;

console.log(command);

// const run = exec(command, { encoding: 'utf8' });

// run.stdout.on('data', (data) => {
//     console.log(data);
// });
