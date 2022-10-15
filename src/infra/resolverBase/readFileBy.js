const path = require("path");
const fs = require("fs");
const readYamlFile = require('read-yaml-file');

const readFileBy = {
    yml: (packageFilePath) => readYamlFile.sync(packageFilePath),
    yaml: (...args) => readFileBy.yml(...args),
    json: (packageFilePath) => JSON.parse(fs.readFileSync(packageFilePath, { encoding: "utf-8" })),
}

module.exports = {
    readFileBy,
}