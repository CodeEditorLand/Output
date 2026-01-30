export function getDriveLetter(path: any, isWindowsOS?: boolean): any;
export function getRoot(path: any, sep2?: string): any;
export function hasDriveLetter(path: any, isWindowsOS?: boolean): boolean;
export function indexOfPath(path: any, candidate: any, ignoreCase: any): any;
export function isEqual(pathA: any, pathB: any, ignoreCase: any): boolean;
export function isEqualOrParent(base: any, parentCandidate: any, ignoreCase: any, separator?: string): boolean;
export function isPathSeparator(code: any): boolean;
export function isRootOrDriveLetter(path: any): boolean;
export function isUNC(path: any): boolean;
export function isValidBasename(name: any, isWindowsOS?: boolean): boolean;
export function isWindowsDriveLetter(char0: any): boolean;
export function parseLineAndColumnAware(rawPath: any): {
    path: any;
    line: number | undefined;
    column: number | undefined;
};
export function randomPath(parent: any, prefix: any, randomLength?: number): any;
export function removeTrailingPathSeparator(candidate: any): any;
export function sanitizeFilePath(candidate: any, cwd: any): any;
export function toPosixPath(osPath: any): any;
export function toSlashes(osPath: any): any;
//# sourceMappingURL=extpath.d.ts.map