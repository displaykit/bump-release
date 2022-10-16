const pkg = require("./package.json");
const { Command } = require('commander');
const { releaseBetaController } = require("./src/modules/release-beta/release-beta");
const resolvers = require("./src/resolvers");

const program = new Command();

program
  .name(pkg.appName)
  .description('CLI to release your project using GitHub, in a easy way')
  .version(pkg.version);

program.command('beta')
  .description('Release a beta version of your project inside a specific folder')
  .argument('<package location>', 'The path to the package that you want to release a beta version')
  .option('--name <char>', `The name of the project that you are bumping. Default to to end folder of the location`)
  .option('--resolver <char>', `The resolver that you want to use to bump your package, avaiable resolvers: ${Object.keys(resolvers)}`)
  .action((packagePath = './', options) => {
    const packageName = options.name || packagePath.split('/').pop();
    const { packageVersion, updatePackageVersion } = resolvers[options.resolver](packagePath);
    const commitMessage = "just a beta release";
    const commitBody = `## Changelog info...
    lorem ipsum dorme ...`;

    releaseBetaController({
      packageName: packageName,
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