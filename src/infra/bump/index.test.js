const { bump } = require("./index");


describe("bump", () => {
    describe("when bumping to a patch", () => {
        it("and the version is 0.0.1, go to 0.0.2", () => {
            const currentVersion = "0.0.1";
            expect(bump("patch", currentVersion)).toEqual("0.0.2");
        });
        it("and the version is 0.0.10, go to 0.0.11", () => {
            const currentVersion = "0.0.10";
            expect(bump("patch", currentVersion)).toEqual("0.0.11");
        });
    });
    describe("when bumping to a minor", () => {
        it("and the version is 0.1.0, go to 0.1.0", () => {
            const currentVersion = "0.1.0";
            expect(bump("minor", currentVersion)).toEqual("0.2.0");
        });
        it("and the version is 0.0.10, go to 0.11.0", () => {
            const currentVersion = "0.10.0";
            expect(bump("minor", currentVersion)).toEqual("0.11.0");
        });
    });
    describe("when bumping to a major", () => {
        it("and the version is 1.0.0, go to 2.0.0", () => {
            const currentVersion = "1.0.0";
            expect(bump("major", currentVersion)).toEqual("2.0.0");
        });
        it("and the version is 10.0.0, go to 11.0.0", () => {
            const currentVersion = "10.0.0";
            expect(bump("major", currentVersion)).toEqual("11.0.0");
        });
    });
    describe("when bumping to a beta", () => {
        it("and the version is 1.0.0, go to 1.0.0-beta.COMMIT_HASH", () => {
            const currentVersion = "1.0.0";
            expect(bump("beta", currentVersion, () => "COMMIT_HASH")).toEqual("1.0.0-beta.COMMIT_HASH");
        });
        it("and the version is 10.0.0, go to 10.0.0-beta.COMMIT_HASH", () => {
            const currentVersion = "10.0.0";
            expect(bump("beta", currentVersion, () => "COMMIT_HASH")).toEqual("10.0.0-beta.COMMIT_HASH");
        });
    });
})