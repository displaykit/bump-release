const { execSync } = require("child_process");
const { getCommitHash } = require("./index.js");

describe('getCommitHash()', () => {
    it('returns the hash of the current commit', () => {
        const output = getCommitHash({ cwd: process.cwd() });
        const expectation = execSync("git rev-parse HEAD", { encoding: "utf-8", cwd: process.cwd() });
        expect(output).toEqual(expectation.trim());
    })
});