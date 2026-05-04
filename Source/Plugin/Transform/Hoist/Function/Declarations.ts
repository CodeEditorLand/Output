/**
 * Hoist every top-level `function NAME(...) { ... }` declaration (and
 * its companion `__name(NAME, "NAME")` call, if present) to the top
 * of the file, before any non-import statements.
 *
 * VS Code source uses the pattern:
 *
 *   appendEditorTitleContextMenuItem(...);   // call (line 141)
 *   appendEditorTitleContextMenuItem(...);   // call (line 142)
 *   appendEditorTitleContextMenuItem(...);   // call (line 143)
 *   function appendEditorTitleContextMenuItem(...) { ... }   // decl (line 144)
 *   __name(appendEditorTitleContextMenuItem, "appendEditorTitleContextMenuItem");
 *
 * This works in unbundled JS because function declarations are
 * hoisted to the top of their scope. When Rollup concatenates VS
 * Code's modules into a single chunk, it converts each
 * `function NAME(...) { ... }` to `let NAME; NAME = function(...) {...}`
 * (an assignment to a `let` binding) so it can manage cross-module
 * name collisions. The assignment is NOT hoisted - it stays at the
 * original line. Calls before the assignment hit a TDZ, surfacing as:
 *
 *     TypeError: wut is not a function. (In '... wut(...)', 'wut' is undefined)
 *
 * Pre-hoisting the declaration source-level - moving it above the
 * calls - means the assignment runs first regardless of how Rollup
 * mangles the binding form. The transform is semantics-preserving in
 * unbundled context (function declarations work the same hoisted or
 * inline) and just-as-correct in bundled context.
 *
 * Scope: every `.js` file under `vs/`. Top-level only - we don't move
 * functions declared inside other functions, classes, or blocks.
 *
 * V2 also hoists ESBuild's helper var declarations (`var __defProp =
 * ...`, `var __name = ...`, `var __decorate = ...`, `var __param =
 * ...`) to a position above the hoisted function bodies. Without that,
 * the in-place `__name(NAME, "NAME");` companion calls that follow each
 * function declaration would invoke `__name` while it is still
 * `undefined`, surfacing at chunk evaluation as
 * `TypeError: __name is not a function` (mangled: `zt`/`ks`/...).
 *
 * Idempotent via the `__LAND_FN_DECLS_HOISTED_V2__` marker. Files
 * tagged with the legacy `__LAND_FN_DECLS_HOISTED__` (V1) marker are
 * re-processed so the V1 mis-placement of `__name(...)` calls is
 * corrected.
 */

import type { TransformPlugin } from "../Type.js";

// Marker is bumped to V2 so files transformed by the previous (V1) pass
// re-run under the corrected logic. V1 pulled `__name(NAME, "NAME");`
// companion calls into the hoisted region, which placed them above the
// `var __name = ...` initialiser and crashed at chunk evaluation
// (`TypeError: __name is not a function`). V2 also hoists the ESBuild
// helper `var` declarations (`__defProp`, `__name`, `__decorate`,
// `__param`) so they precede every hoisted function body.
const Marker = "/* __LAND_FN_DECLS_HOISTED_V2__ */";
const LegacyMarker = "/* __LAND_FN_DECLS_HOISTED__ */";

const HelperNames = ["__defProp", "__name", "__decorate", "__param"] as const;
type HelperName = (typeof HelperNames)[number];

// Keywords whose right-hand position permits a regex literal (`return /x/`,
// `typeof /x/`, etc.). Used by the `/` disambiguator to distinguish regex
// from division when the previous non-whitespace token is an identifier.
const RegexAllowingKeywords: ReadonlySet<string> = new Set([
	"return",
	"typeof",
	"instanceof",
	"in",
	"of",
	"delete",
	"void",
	"throw",
	"new",
	"do",
	"else",
	"case",
	"yield",
	"await",
]);

interface Block {
	readonly StartLine: number;
	readonly EndLine: number; // inclusive
	readonly Source: string;
	readonly Name: string;
}

/**
 * Walker state that must persist across line boundaries. Carries the
 * active string delimiter and a stack distinguishing real code braces
 * from template-literal `${...}` interpolation braces.
 */
interface WalkerState {
	readonly InBlockComment: boolean;
	readonly StringChar: '"' | "'" | "`" | null;
	readonly BraceStack: ReadonlyArray<"{" | "${">;
}

const InitialState: WalkerState = {
	InBlockComment: false,
	StringChar: null,
	BraceStack: [],
};

/**
 * Scan source lines, identifying top-level `function NAME(...) { ... }`
 * blocks plus any directly-following `__name(NAME, ...)` line. Returns
 * the blocks in declaration order.
 */
function FindTopLevelFunctionBlocks(Lines: ReadonlyArray<string>): Block[] {
	const Blocks: Block[] = [];
	let Depth = 0;
	let State: WalkerState = InitialState;

	const FunctionStart = /^function ([A-Za-z_$][\w$]*)\s*\(/;

	let i = 0;
	while (i < Lines.length) {
		const Line = Lines[i]!;
		const Stripped = StripCommentsAndStrings(Line, State);

		// Only recognise a top-level function declaration when we are
		// genuinely outside strings, comments, and template literals.
		if (
			Depth === 0 &&
			!State.InBlockComment &&
			State.StringChar === null &&
			State.BraceStack.length === 0
		) {
			const Match = FunctionStart.exec(Line);
			if (Match) {
				const StartLine = i;
				const Name = Match[1]!;
				// Walk forward until depth returns to 0.
				let LocalDepth = Stripped.Open - Stripped.Close;
				let Inner: WalkerState = {
					InBlockComment: Stripped.InBlockComment,
					StringChar: Stripped.StringChar,
					BraceStack: Stripped.BraceStack,
				};
				let j = i + 1;
				while (j < Lines.length && LocalDepth > 0) {
					const Next = StripCommentsAndStrings(Lines[j]!, Inner);
					Inner = {
						InBlockComment: Next.InBlockComment,
						StringChar: Next.StringChar,
						BraceStack: Next.BraceStack,
					};
					LocalDepth += Next.Open - Next.Close;
					j++;
				}
				const EndLine = j - 1;
				// Do NOT extend the block to cover the trailing
				// `__name(NAME, "NAME");` companion call. ESBuild emits
				// `var __name = ...` near the top of the file (after the
				// license header, before imports), and the `__name(...)`
				// invocation must execute AFTER that initialiser. Hoisted
				// blocks land at line 0, before any `var` declarations -
				// pulling the `__name(...)` call up with the function
				// declaration would invoke `__name` while it is still
				// `undefined`, surfacing as
				// `TypeError: __name is not a function` (mangled: `zt`).
				// The function-name binding itself hoists correctly via
				// Rollup's `let X; X = function(){...}` lowering, so the
				// later in-place `__name(NAME, "NAME")` call still finds
				// the hoisted binding.
				const Source = Lines.slice(StartLine, EndLine + 1).join("\n");
				Blocks.push({ StartLine, EndLine, Source, Name });
				State = Inner;
				i = EndLine + 1;
				continue;
			}
		}

		Depth += Stripped.Open - Stripped.Close;
		State = {
			InBlockComment: Stripped.InBlockComment,
			StringChar: Stripped.StringChar,
			BraceStack: Stripped.BraceStack,
		};
		i++;
	}

	return Blocks;
}

/**
 * Scan source lines, identifying top-level
 * `var __defProp/__name/__decorate/__param = ...;` declarations. These
 * may be single-line (`var __defProp = Object.defineProperty;`) or
 * multi-line (`var __decorate = function(...) { ... };`). Returns the
 * blocks in declaration order.
 */
function FindTopLevelHelperVars(Lines: ReadonlyArray<string>): Block[] {
	const Blocks: Block[] = [];
	let Depth = 0;
	let State: WalkerState = InitialState;

	const HelperStart = new RegExp(`^var (${HelperNames.join("|")})\\s*=`);

	let i = 0;
	while (i < Lines.length) {
		const Line = Lines[i]!;
		const Stripped = StripCommentsAndStrings(Line, State);

		if (
			Depth === 0 &&
			!State.InBlockComment &&
			State.StringChar === null &&
			State.BraceStack.length === 0
		) {
			const Match = HelperStart.exec(Line);
			if (Match) {
				const StartLine = i;
				const Name = Match[1] as HelperName;
				let LocalDepth = Stripped.Open - Stripped.Close;
				let Inner: WalkerState = {
					InBlockComment: Stripped.InBlockComment,
					StringChar: Stripped.StringChar,
					BraceStack: Stripped.BraceStack,
				};
				let j = i + 1;
				// Multi-line declarations (e.g. `var __decorate =
				// function(...) { ... };`) keep LocalDepth > 0 until the
				// closing `};`. Single-line declarations have LocalDepth
				// == 0 immediately and the loop is a no-op.
				while (j < Lines.length && LocalDepth > 0) {
					const Next = StripCommentsAndStrings(Lines[j]!, Inner);
					Inner = {
						InBlockComment: Next.InBlockComment,
						StringChar: Next.StringChar,
						BraceStack: Next.BraceStack,
					};
					LocalDepth += Next.Open - Next.Close;
					j++;
				}
				const EndLine = j - 1;
				const Source = Lines.slice(StartLine, EndLine + 1).join("\n");
				Blocks.push({ StartLine, EndLine, Source, Name });
				State = Inner;
				i = EndLine + 1;
				continue;
			}
		}

		Depth += Stripped.Open - Stripped.Close;
		State = {
			InBlockComment: Stripped.InBlockComment,
			StringChar: Stripped.StringChar,
			BraceStack: Stripped.BraceStack,
		};
		i++;
	}

	return Blocks;
}

/**
 * Walk one line, returning code-mode brace counts (`Open`/`Close`)
 * and the updated walker state.
 *
 * Brace counting only fires for real code braces. A `{` that opens a
 * template-literal `${...}` interpolation is tracked on the brace
 * stack but does NOT count toward `Open`; its matching `}` likewise
 * does NOT count toward `Close` and instead returns the walker to
 * template-literal string mode. This keeps multi-line template
 * literals from corrupting function-block depth tracking.
 */
function StripCommentsAndStrings(
	Line: string,
	State: WalkerState,
): {
	readonly Open: number;
	readonly Close: number;
	readonly InBlockComment: boolean;
	readonly StringChar: '"' | "'" | "`" | null;
	readonly BraceStack: ReadonlyArray<"{" | "${">;
} {
	let Open = 0;
	let Close = 0;
	let InBlockComment = State.InBlockComment;
	let StringChar: '"' | "'" | "`" | null = State.StringChar;
	const BraceStack: Array<"{" | "${"> = [...State.BraceStack];
	let i = 0;

	while (i < Line.length) {
		const c = Line[i]!;
		const next = Line[i + 1];

		if (InBlockComment) {
			if (c === "*" && next === "/") {
				InBlockComment = false;
				i += 2;
				continue;
			}
			i++;
			continue;
		}

		if (StringChar) {
			// Template-literal interpolation entry: `${` exits string
			// mode and pushes a marker so the matching `}` can return.
			if (StringChar === "`" && c === "$" && next === "{") {
				BraceStack.push("${");
				StringChar = null;
				i += 2;
				continue;
			}
			if (c === "\\") {
				i += 2;
				continue;
			}
			if (c === StringChar) {
				StringChar = null;
			}
			i++;
			continue;
		}

		if (c === "/" && next === "/") break; // rest is line comment
		if (c === "/" && next === "*") {
			InBlockComment = true;
			i += 2;
			continue;
		}
		if (c === '"' || c === "'" || c === "`") {
			StringChar = c;
			i++;
			continue;
		}
		// Escape sequence in code mode. The only place `\` appears
		// outside strings is inside a regex literal (e.g. `/foo\/bar/`).
		// Skipping the escape pair prevents the trailing `/` of patterns
		// like `\/\/` from being misread as a `//` line-comment opener,
		// which would otherwise drop the rest of the line - including
		// any closing brace - from brace counting.
		if (c === "\\") {
			i += 2;
			continue;
		}
		// Regex-literal start (`/.../FLAGS`). Disambiguated from division
		// by inspecting the previous non-whitespace token on this line.
		// Identifier / digit / closing bracket → division. Anything else
		// (operator, opening bracket, comma, semicolon, start-of-line,
		// regex-allowing keyword) → regex literal. We then skip the
		// whole literal so its `{`, `}`, and `//` content can't pollute
		// brace counting or trigger comment-mode false positives.
		if (c === "/") {
			let k = i - 1;
			while (k >= 0 && (Line[k] === " " || Line[k] === "\t")) k--;
			const Prev = k >= 0 ? Line[k]! : "";
			let IsRegex = !/[A-Za-z_$0-9)\]]/.test(Prev) || Prev === "";
			if (!IsRegex && /[A-Za-z_$]/.test(Prev)) {
				let WordStart = k;
				while (
					WordStart > 0 &&
					/[A-Za-z_$0-9]/.test(Line[WordStart - 1]!)
				) {
					WordStart--;
				}
				const Word = Line.slice(WordStart, k + 1);
				if (RegexAllowingKeywords.has(Word)) IsRegex = true;
			}
			if (IsRegex) {
				let m = i + 1;
				let InCharClass = false;
				while (m < Line.length) {
					const Ch = Line[m]!;
					if (Ch === "\\") {
						m += 2;
						continue;
					}
					if (Ch === "[" && !InCharClass) {
						InCharClass = true;
						m++;
						continue;
					}
					if (Ch === "]" && InCharClass) {
						InCharClass = false;
						m++;
						continue;
					}
					if (Ch === "/" && !InCharClass) {
						m++;
						while (m < Line.length && /[gimsuyd]/.test(Line[m]!)) {
							m++;
						}
						break;
					}
					m++;
				}
				i = m;
				continue;
			}
		}

		if (c === "{") {
			BraceStack.push("{");
			Open++;
			i++;
			continue;
		}
		if (c === "}") {
			const Top = BraceStack.pop();
			if (Top === "${") {
				// Closing a template-literal interpolation; resume
				// string mode without counting this brace.
				StringChar = "`";
			} else {
				Close++;
			}
			i++;
			continue;
		}
		i++;
	}

	return { Open, Close, InBlockComment, StringChar, BraceStack };
}

const Plugin: TransformPlugin = {
	Kind: "Transform",
	Name: "HoistFunctionDeclarations",
	Match: ({ Path }) =>
		// Limit to VS Code source. Skip already-hoisted files.
		/\/vs\/.*\.js$/.test(Path) && !/\.d\.ts\.map$/.test(Path),
	Transform({ Source }) {
		if (Source.includes(Marker)) return { Kind: "Unchanged" };

		const Lines = Source.split("\n");
		const Blocks = FindTopLevelFunctionBlocks(Lines);
		const HelperBlocks = FindTopLevelHelperVars(Lines);
		const HasLegacyMarker = Source.includes(LegacyMarker);

		if (Blocks.length === 0 && HelperBlocks.length === 0) {
			return { Kind: "Unchanged" };
		}

		// Skip when all function blocks already sit at the top with no
		// preceding calls AND there are no helper vars to relocate AND
		// the file has not been touched by V1 (V1-touched files always
		// need a re-pass to fix `__name` ordering, even if the cheap
		// preamble check would otherwise short-circuit).
		const FirstBlockStart = Blocks[0]?.StartLine ?? Lines.length;
		const PreambleLines = Lines.slice(0, FirstBlockStart);
		const PreambleHasCallsToHoistedFns = Blocks.some((Block) =>
			PreambleLines.some((PrevLine) =>
				new RegExp(`\\b${Block.Name}\\s*\\(`).test(PrevLine),
			),
		);
		const HelpersNeedHoisting = HelperBlocks.some(
			(Block) => Block.StartLine > 0,
		);
		if (
			!PreambleHasCallsToHoistedFns &&
			!HelpersNeedHoisting &&
			!HasLegacyMarker
		) {
			return { Kind: "Unchanged" };
		}

		// Collect block line ranges (functions + helper vars); rewrite
		// by removing them from their original spots and prepending the
		// concatenated source after the comment/import preamble.
		const SkipRanges = new Set<number>();
		for (const Block of Blocks) {
			for (let n = Block.StartLine; n <= Block.EndLine; n++) {
				SkipRanges.add(n);
			}
		}
		for (const Block of HelperBlocks) {
			for (let n = Block.StartLine; n <= Block.EndLine; n++) {
				SkipRanges.add(n);
			}
		}

		// Find where the leading comment/import preamble ends (first
		// non-import, non-comment, non-blank line).
		let HoistInsertAt = 0;
		for (let n = 0; n < Lines.length; n++) {
			const Trimmed = Lines[n]!.trim();
			if (
				Trimmed === "" ||
				Trimmed.startsWith("//") ||
				Trimmed.startsWith("/*") ||
				Trimmed.startsWith("*") ||
				Trimmed.startsWith("import ") ||
				Trimmed.startsWith("import{") ||
				Trimmed.startsWith("import*") ||
				Trimmed.startsWith("import(")
			) {
				HoistInsertAt = n + 1;
			} else {
				break;
			}
		}

		// Order matters: helper vars (especially `var __name = ...`)
		// MUST land before any function body that triggers `__name()`
		// calls in the surrounding scope.
		const HelpersSource = HelperBlocks.map((B) => B.Source).join("\n");
		const FunctionsSource = Blocks.map((B) => B.Source).join("\n");
		const HoistedSource = [HelpersSource, FunctionsSource]
			.filter((Part) => Part.length > 0)
			.join("\n");

		const Output: string[] = [];
		// Lines before the hoist point (typically the license comment).
		for (let n = 0; n < HoistInsertAt; n++) {
			if (!SkipRanges.has(n)) Output.push(Lines[n]!);
		}
		// Hoisted helpers + functions.
		Output.push(Marker);
		if (HoistedSource.length > 0) Output.push(HoistedSource);
		// Remaining lines, skipping the original block ranges.
		for (let n = HoistInsertAt; n < Lines.length; n++) {
			if (!SkipRanges.has(n)) Output.push(Lines[n]!);
		}

		return { Kind: "Rewrite", Source: Output.join("\n") };
	},
};

export default Plugin;
