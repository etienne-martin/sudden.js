interface SemVer {
  major: string;
  minor: string;
  patch: string;
}

const isCompatible = (buildVersion: SemVer, runtimeVersion: SemVer) => {
  if (buildVersion.major != runtimeVersion.major) return false;
  if (buildVersion.minor > runtimeVersion.minor) return false;

  return true;
};

const parse = (versionString: string) => {
  const chunks = versionString.split(".");
  const major = chunks[0].trim();
  const minor = chunks[1].trim();
  const patch = chunks[2].trim();

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
