var __defProp = Object.defineProperty;
var __name = (target, value) =>
	__defProp(target, "name", { value, configurable: true });
var Potential_default = /* @__PURE__ */ __name(
	(Prefix) => [
		// `${Prefix}/platform/profiling/*`, // Removed: profiling.js is needed by extensions.js
		`${Prefix}/platform/cssDev/*`,
		// If no core markdown rendering needed
		// `${Prefix}/base/common/marked`,
		// `${Prefix}/base/browser/dompurify`,
	],
	"default",
);
export { Potential_default as default };
//# sourceMappingURL=Potential.js.map
