/**
 * Rewrite class-name self-references inside `static { }` initialiser
 * blocks to `this.`.
 *
 * VS Code source uses the pattern (illustrated with editor.js, where
 * VS Code's own out-build mangler has already renamed the class to
 * `$ZXb` and the private static field to `b`):
 *
 *   export class $ZXb {
 *     static { this.b = new $Af(); }
 *     static { this.onWillInstantiateEditorPane = $ZXb.b.event; }
 *     //                                          ^^^^^^^^^^^^
 *     //                                          self-reference
 *   }
 *
 * In unbundled / per-file contexts this works because the class
 * declaration creates a hoisted binding available throughout the
 * class body's scope.
 *
 * After Rollup-style concatenation each `class X { ... }` declaration
 * becomes `let X; X = class { ... };` (anonymous RHS) - the assignment
 * to `X` only completes AFTER the class expression evaluates, so
 * static-block bodies execute with `X` still in TDZ. The
 * self-reference resolves to `undefined` and the workbench crashes
 * with errors like `TypeError: undefined is not an object (evaluating
 * 'uT._shellQuotes')`.
 *
 * Inside a static block, `this` IS the class. Replacing
 * `<ClassName>.<member>` with `this.<member>` is semantics-preserving
 * regardless of bundling context.
 *
 * Out-build classes are pre-mangled by VS Code's property mangler, so
 * the class name we need to rewrite is not the source-level name
 * (`EditorPaneDescriptor`, `TerminalTaskSystem`, ...) but whatever
 * the build emitted (`$ZXb`, `$Q9b`, ...). The transform auto-detects
 * the enclosing class name for each static block by walking the file
 * with proper brace / string / comment handling, then rewrites only
 * references to *that* class - so a static block in class A that
 * legitimately references class B is left alone.
 *
 * Applied to every JS file under `vs/` - the auto-detection only fires
 * when a class with the offending pattern is actually present, so
 * unaffected files are walked-and-skipped with no rewrite. A single
 * scan of `out-build/` surfaced 15 affected files (counts in `[]`):
 *
 *     accessibilitySignalService.js [66]   breadcrumbs.js [10]
 *     files.js [6]                          mcpServerActions.js [4]
 *     extensionsActions.js [3]              localHistoryFileSystemProvider.js [3]
 *     terminalTaskSystem.js [3]             async.js [2]
 *     smallImmutableSet.js [1]              folding.js [1]
 *     suggestWidgetRenderer.js [1]          browserSession.js [1]
 *     editor.js [1]                         markersViewActions.js [1]
 *     workingCopyService.js [1]
 *
 * Hand-maintaining a whitelist invited drift - the previous version
 * listed 2 files but `editor.js`'s declared `EditorPaneDescriptor`
 * never matched the mangled `$ZXb` actually emitted by VS Code's
 * out-build mangler, so the rewrite silently ran on no files.
 */

import type { TransformPlugin } from "../Type.js";

const Marker = "/* __LAND_STATIC_BLOCK_SELFREF_REWRITTEN__ */";

interface StaticBlock {
	readonly ClassName: string;
	readonly InnerStart: number; // index of first char inside `{`
	readonly InnerEnd: number; // index of `}` (exclusive of it)
}

function EscapeRegex(Value: string): string {
	return Value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Skip a comment / string starting at index `i` if the char at `i`
 * begins one. Returns the index after the construct, or `i` itself
 * if no construct started here.
 */
function SkipNonCode(Source: string, i: number): number {
	const c = Source[i];
	const next = Source[i + 1];
	if (c === "/" && next === "/") {
		let j = i + 2;
		while (j < Source.length && Source[j] !== "\n") j++;
		return j;
	}
	if (c === "/" && next === "*") {
		let j = i + 2;
		while (j < Source.length) {
			if (Source[j] === "*" && Source[j + 1] === "/") return j + 2;
			j++;
		}
		return Source.length;
	}
	if (c === '"' || c === "'" || c === "`") {
		const Quote = c;
		let j = i + 1;
		while (j < Source.length) {
			const ch = Source[j]!;
			if (ch === "\\") {
				j += 2;
				continue;
			}
			if (ch === Quote) return j + 1;
			j++;
		}
		return Source.length;
	}
	return i;
}

/**
 * Find the matching `}` for the `{` at index `OpenIndex`. Respects
 * strings and comments. Returns the index of the matching `}`, or
 * `Source.length` if unmatched.
 */
function FindMatchingClose(Source: string, OpenIndex: number): number {
	let depth = 1;
	let i = OpenIndex + 1;
	while (i < Source.length && depth > 0) {
		const Skipped = SkipNonCode(Source, i);
		if (Skipped > i) {
			i = Skipped;
			continue;
		}
		const c = Source[i];
		if (c === "{") depth++;
		else if (c === "}") {
			depth--;
			if (depth === 0) return i;
		}
		i++;
	}
	return Source.length;
}

/**
 * Walk the file, identifying every `static { ... }` block and the
 * name of the class that directly encloses it. Class names are
 * detected from `class <Id>` (declaration or expression) syntax.
 */
function FindStaticBlocks(Source: string): StaticBlock[] {
	const Blocks: StaticBlock[] = [];
	const ClassStack: Array<{ Name: string; OpenedAtDepth: number }> = [];
	let Depth = 0;
	let i = 0;

	const ClassKeyword = /^class\b/;
	const StaticKeyword = /^static\b/;
	const Identifier = /^[A-Za-z_$][\w$]*/;

	while (i < Source.length) {
		const Skipped = SkipNonCode(Source, i);
		if (Skipped > i) {
			i = Skipped;
			continue;
		}

		const Slice = Source.slice(i);
		const PrevChar = i > 0 ? Source[i - 1]! : "";

		// `class <Id>` recognition - must be at a token boundary.
		if (
			(i === 0 || !/[\w$]/.test(PrevChar)) &&
			ClassKeyword.test(Slice)
		) {
			let j = i + 5;
			while (j < Source.length && /\s/.test(Source[j]!)) j++;
			const NameMatch = Identifier.exec(Source.slice(j));
			if (NameMatch) {
				const Name = NameMatch[0];
				let k = j + Name.length;
				// Skip whitespace, `extends ...`, generic syntax, until `{`.
				while (k < Source.length) {
					const Sk = SkipNonCode(Source, k);
					if (Sk > k) {
						k = Sk;
						continue;
					}
					if (Source[k] === "{") break;
					if (Source[k] === ";" || Source[k] === "}") {
						k = -1;
						break;
					}
					k++;
				}
				if (k > 0 && k < Source.length && Source[k] === "{") {
					ClassStack.push({ Name, OpenedAtDepth: Depth });
					Depth++;
					i = k + 1;
					continue;
				}
			}
		}

		// `static {` recognition - only when we are directly inside a
		// class body (the class's `{` is the most recent depth bump).
		const Top = ClassStack[ClassStack.length - 1];
		if (
			Top !== undefined &&
			Top.OpenedAtDepth === Depth - 1 &&
			(i === 0 || !/[\w$]/.test(PrevChar)) &&
			StaticKeyword.test(Slice)
		) {
			let j = i + 6;
			while (j < Source.length && /\s/.test(Source[j]!)) j++;
			if (Source[j] === "{") {
				const Close = FindMatchingClose(Source, j);
				Blocks.push({
					ClassName: Top.Name,
					InnerStart: j + 1,
					InnerEnd: Close,
				});
				i = Close + 1;
				continue;
			}
		}

		const c = Source[i];
		if (c === "{") {
			Depth++;
			i++;
			continue;
		}
		if (c === "}") {
			Depth--;
			if (Top !== undefined && Top.OpenedAtDepth === Depth) {
				ClassStack.pop();
			}
			i++;
			continue;
		}
		i++;
	}

	return Blocks;
}

const Plugin: TransformPlugin = {
	Kind: "Transform",
	Name: "RewriteStaticBlockSelfRef",
	Match: ({ Path }) => /\/vs\/.*\.js$/.test(Path) && !/\.d\.ts\.map$/.test(Path),
	Transform({ Source }) {
		if (Source.includes(Marker)) return { Kind: "Unchanged" };

		const Blocks = FindStaticBlocks(Source);
		if (Blocks.length === 0) return { Kind: "Unchanged" };

		// Stitch the file back together, rewriting `<ClassName>.` to
		// `this.` only inside each static block's body. Reference matches
		// require a non-word, non-`$` boundary on the left so that
		// mangled names like `$Q9b` don't accidentally chain into longer
		// identifiers (e.g. `XX$Q9b.foo` must not rewrite).
		const Pieces: string[] = [];
		let Cursor = 0;
		let Changed = false;
		for (const Block of Blocks) {
			Pieces.push(Source.slice(Cursor, Block.InnerStart));
			const Body = Source.slice(Block.InnerStart, Block.InnerEnd);
			const Pattern = new RegExp(
				`(^|[^\\w$])${EscapeRegex(Block.ClassName)}\\.`,
				"g",
			);
			const NewBody = Body.replace(Pattern, "$1this.");
			if (NewBody !== Body) Changed = true;
			Pieces.push(NewBody);
			Cursor = Block.InnerEnd;
		}
		Pieces.push(Source.slice(Cursor));

		if (!Changed) return { Kind: "Unchanged" };
		return { Kind: "Rewrite", Source: Marker + "\n" + Pieces.join("") };
	},
};

export default Plugin;
