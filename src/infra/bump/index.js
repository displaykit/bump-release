const { getCommitHash: getCommitHashModule } = require("../commitHash");

function inc(n) { return Number(n) + 1}

function patch(currentVersion) { // "[RELEASE-PATCH 0.0.X]"
    const patchIndex = 2;
    return currentVersion.split(".").reduce((_newVersion, versionPart, versionPartIndex) => {
        if(versionPartIndex === patchIndex) return _newVersion + '.' + inc(versionPart);
        return _newVersion + '.' + versionPart;
    });
}

function minor(currentVersion) { // "[RELEASE-MINOR 0.X.0]"
    const minorIndex = 1;
    return currentVersion.split(".").reduce((_newVersion, versionPart, versionPartIndex) => {
        if(versionPartIndex === minorIndex) return _newVersion + '.' + inc(versionPart);
        return _newVersion + '.' + versionPart;
    });
}

function major(currentVersion) { // "[RELEASE-MAJOR X.0.0]"
    return currentVersion.split(".").reduce((_newVersion, versionPart, versionPartIndex) => {
        if(!_newVersion) return _newVersion + inc(versionPart);
        return _newVersion + '.' + versionPart;
    }, "");
}

function beta(currentVersion, getCommitHash = getCommitHashModule) { // [RELEASE-beta 0.0.0-beta.X]
    const hash = getCommitHash();
    if(currentVersion.includes(hash)) return currentVersion;
    if(currentVersion.includes("-beta.")) {
        const [baseVersion] = currentVersion.split("-beta.");
        return `${baseVersion}-beta.${hash}`;
    }

    return `${currentVersion}-beta.${hash}`;
}

const bumpNameToVersion = {
    patch,
    minor,
    major,
    beta,
}

module.exports = {
    bump(version, currentVersion, getCommitHashFn) {
        return bumpNameToVersion[version](currentVersion, getCommitHashFn).trim().replace('\n', '');
    }
}