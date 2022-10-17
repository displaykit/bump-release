const { Command } = require('commander');
const pkg = require("./package.json");
const { bumpTypes } = require("./src/infra/createNewVersionCommit");
const { getPullRequest } = require("./src/infra/github/getPullRequest");
const { versionController } = require("./src/modules/version/version");
const resolvers = require("./src/resolvers");

const program = new Command();

program
  .name(pkg.appName)
  .description('CLI to release your project using GitHub, in a easy way')
  .version(pkg.version);

program.command('version')
  .description('Release a beta version of your project inside a specific folder')
  .argument('<package location>', 'The path to the package that you want to release a beta version')
  .option('--type <char>', `The kind of the version that you want to bump. It can be: ${bumpTypes.join(', ')}`, 'beta')
  .option('--name <char>', `The name of the project that you are bumping. Default to to end folder of the location`)
  .option('--resolver <char>', `The resolver that you want to use to bump your package, avaiable resolvers: ${Object.keys(resolvers)}`)
  .option('--message <char>', `The message that you want to use to commit your changes`)
  .option('--body <char>', `The body of the pull request that you want to create with this new version, it will be used in the changelog also. Provide the --github-* parameters to a more automated process`)
  .option('--github-pull-request-number <char>', `Provide the number of the active pull request that you are working on`)
  .option('--github-repo-owner <char>', `Who is the **owner** of the repository that you want to release?`)
  .option('--github-repo-name <char>', `What is the **name** of the repository that you want to release?`)
  .option('--github-token <char>', `Token with the right permissions to be able to: read pr, comment on pr, create commit, create tag...`)
  .action(async (packagePath = './', options) => {
    // [Validations]
    if(!options.resolver) throw new Error(`You need to specify a resolver, avaiable resolvers: ${Object.keys(resolvers)}`);
    if(!options.githubPullRequestNumber) throw new Error(`You need to specify a pull request number`);
    if(!options.githubRepoOwner) throw new Error(`You need to specify a github repository owner`);
    if(!options.githubRepoName) throw new Error(`You need to specify a github repository name`);
    if(!options.githubToken) throw new Error(`You need to specify a github token with the right permissions to be able to: read pr, comment on pr, create commit, create tag...`);
    // =================

    const projectName = options.name || packagePath.split('/').pop();
    const { packageVersion, updatePackageVersion, updateChangelog } = resolvers[options.resolver](packagePath);
    
    const pullRequest = await getPullRequest({
      repositoryOwner: options.githubRepoOwner,
      repositoryName: options.githubRepoName,
      pullRequestNumber: options.githubPullRequestNumber,
      githubToken: process.env.GITHUB_TOKEN || options.githubToken,
    });

    const commitMessage = pullRequest.title || options.message;
    const commitBody = (pullRequest.body || options.body);

    versionController({
      projectName,
      bumpType: options.type,
      packageVersion,
      commitMessage,
      commitBody,
      updatePackageVersion,
      updateChangelog,
    })
      .then(({ newVersion }) => {
        console.log("✨ Package version updated with success! 🎉🎉🎉");
        console.log(`💻 Now you can install the version: ${newVersion}`);
        // TODO: Comment on GitHub the new release avaiable.
      })
      .catch((err) => {
        console.error(err);
        throw err;
      })
  });


program.parse();