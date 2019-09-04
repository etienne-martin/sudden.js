interface SemVer {
  major: number;
  minor: number;
  patch: number;
}

const isCompatible = (buildVersion: SemVer, runtimeVersion: SemVer) => {
  if (buildVersion.major != runtimeVersion.major) return false;
  if (buildVersion.minor > runtimeVersion.minor) return false;

  return true;
};

const parse = (versionString: string) => {
  const [major, minor, patch] = versionString
    .split(".")
    .map(chunk => parseInt(chunk, 10));

  if (isNaN(major) || isNaN(minor) || isNaN(patch)) {
    throw "Invalid version string";
  }

  const parsedVersion: SemVer = {
    major,
    minor,
    patch
  };

  return {
    ...parsedVersion,
    toString: () => `${major}.${minor}.${patch}`,
    isCompatibleWith: (runtimeVersion: SemVer): boolean => {
      return isCompatible(parsedVersion, runtimeVersion);
    }
  };
};

export const semVer = {
  parse
};
