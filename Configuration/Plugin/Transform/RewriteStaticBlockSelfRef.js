var __defProp = Object.defineProperty;
var __name = (target, value) =>
	__defProp(target, "name", { value, configurable: true });
const Marker = "/* __LAND_STATIC_BLOCK_SELFREF_REWRITTEN__ */";
function EscapeRegex(Value) {
	return Value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
__name(EscapeRegex, "EscapeRegex");
function SkipNonCode(Source, i) {
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
			const ch = Source[j];
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
__name(SkipNonCode, "SkipNonCode");
function FindMatchingClose(Source, OpenIndex) {
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
__name(FindMatchingClose, "FindMatchingClose");
function FindStaticBlocks(Source) {
	const Blocks = [];
	const ClassStack = [];
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
		const PrevChar = i > 0 ? Source[i - 1] : "";
		if ((i === 0 || !/[\w$]/.test(PrevChar)) && ClassKeyword.test(Slice)) {
			let j = i + 5;
			while (j < Source.length && /\s/.test(Source[j])) j++;
			const NameMatch = Identifier.exec(Source.slice(j));
			if (NameMatch) {
				const Name = NameMatch[0];
				let k = j + Name.length;
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
		const Top = ClassStack[ClassStack.length - 1];
		if (
			Top !== void 0 &&
			Top.OpenedAtDepth === Depth - 1 &&
			(i === 0 || !/[\w$]/.test(PrevChar)) &&
			StaticKeyword.test(Slice)
		) {
			let j = i + 6;
			while (j < Source.length && /\s/.test(Source[j])) j++;
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
			if (Top !== void 0 && Top.OpenedAtDepth === Depth) {
				ClassStack.pop();
			}
			i++;
			continue;
		}
		i++;
	}
	return Blocks;
}
__name(FindStaticBlocks, "FindStaticBlocks");
const Plugin = {
	Kind: "Transform",
	Name: "RewriteStaticBlockSelfRef",
	Match: /* @__PURE__ */ __name(
		({ Path }) => /\/vs\/.*\.js$/.test(Path) && !/\.d\.ts\.map$/.test(Path),
		"Match",
	),
	Transform({ Source }) {
		if (Source.includes(Marker)) return { Kind: "Unchanged" };
		const Blocks = FindStaticBlocks(Source);
		if (Blocks.length === 0) return { Kind: "Unchanged" };
		const Pieces = [];
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
var RewriteStaticBlockSelfRef_default = Plugin;
export { RewriteStaticBlockSelfRef_default as default };
//# sourceMappingURL=RewriteStaticBlockSelfRef.js.map
