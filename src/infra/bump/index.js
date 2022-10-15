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

const bumpNameToVersion = {
    patch,
    minor,
    major,
}

module.exports = {
    bump(version, currentVersion) {
        return bumpNameToVersion[version](currentVersion);
    }
}