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
  .option('--resolver <char>', `The resolver that you want to use to bump your package, avaiable resolvers: ${Object.keys(resolvers)}`)
  .action((packagePath = './', options) => {
    const { packageVersion, updatePackageVersion } = resolvers[options.resolver](packagePath);
    releaseBetaController({
      packageVersion,
      updatePackageVersion
    })
      .then(({ newVersion }) => {
        console.log("Package version updated 🎉");
        console.log(`Now you can install the version:  ${newVersion}`);
      })
      .catch((err) => {
        throw err;
      })
  });


program.parse();