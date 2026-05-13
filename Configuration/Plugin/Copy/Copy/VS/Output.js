var __defProp = Object.defineProperty;
var __name = (target, value) =>
	__defProp(target, "name", { value, configurable: true });
const CopyVSOutput = /* @__PURE__ */ __name(
	({ From, To }) => ({
		Kind: "Copy",
		Name: "CopyVSOutput",
		Entries: [{ From: [From], To, Recursive: true, Force: true }],
		Required: false,
	}),
	"CopyVSOutput",
);
var Output_default = CopyVSOutput;
export { CopyVSOutput, Output_default as default };
//# sourceMappingURL=Output.js.map
