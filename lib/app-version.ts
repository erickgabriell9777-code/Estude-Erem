import appPackage from "../package.json";

// package.json is the sole source for the public version and internal build.
// The client bundle reads these values at build time, so a new deployment
// picks up changes without editing any component.
export const appVersion = appPackage.version;
export const appBuild = appPackage.appBuild;
