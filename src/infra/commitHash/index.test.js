const { execSync } = require("child_process");
const { getCommitHash } = require("./index.js");

describe('getCommitHash()', () => {
    it('returns the hash of the current commit', () => {
        expect(getCommitHash()).toEqual(execSync("git rev-parse HEAD", { encoding: "utf-8" }));
    })
});