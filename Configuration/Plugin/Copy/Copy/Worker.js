var __defProp = Object.defineProperty;
var __name = (target, value) =>
	__defProp(target, "name", { value, configurable: true });
const CopyWorker = /* @__PURE__ */ __name(
	({ From, To }) => ({
		Kind: "Copy",
		Name: "CopyWorker",
		Entries: [{ From: [From], To }],
	}),
	"CopyWorker",
);
var Worker_default = CopyWorker;
export { CopyWorker, Worker_default as default };
//# sourceMappingURL=Worker.js.map
