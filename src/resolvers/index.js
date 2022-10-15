const { dartResolver } = require("./dart");
const { javaScriptResolver } = require("./javascript");

module.exports = {
    dart: dartResolver,
    javascript: javaScriptResolver,
};