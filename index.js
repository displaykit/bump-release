const { Command } = require('commander');
const pkg = require("./package.json");
const { bumpTypes } = require("./src/infra/createNewVersionCommit");
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
  .action((packagePath = './', options) => {
    const projectName = options.name || packagePath.split('/').pop();
    const { packageVersion, updatePackageVersion } = resolvers[options.resolver](packagePath);
    const commitMessage = "just a beta release";
    const commitBody = `## Changelog info...
    lorem ipsum dorme ...`;

    versionController({
      projectName,
      bumpType: options.type,
      packageVersion,
      commitMessage,
      commitBody,
      updatePackageVersion,
    })
      .then(({ newVersion }) => {
        console.log("🏁 Package version updated 🎉");
        console.log(`Now you can install the version:  ${newVersion}`);
      })
      .catch((err) => {
        throw err;
      })
  });


program.parse();