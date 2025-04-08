import { posix, sep } from "../ESBuild.js";

/**
 * @module ESBuild
 *
 */
export default (Path: string, From: string[]) =>
	From.some((Pattern: string) =>
		((Path) => Path.split(sep).join(posix.sep))(Path).includes(Pattern),
	);
