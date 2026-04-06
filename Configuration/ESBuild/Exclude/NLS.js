var __defProp = Object.defineProperty;
var __name = (target, value) =>
	__defProp(target, "name", { value, configurable: true });
var NLS_default = /* @__PURE__ */ __name(
	(_Prefix) => [
		// --- 8. NLS (If English-only MVP) ---
		// Be cautious here, sometimes core logic might expect nls structure
		// At root level
		// `nls.metadata.json`,
		// Deeper nls metadata
		// `${Prefix}/**/nls.metadata.json`,
		// Might need more specific patterns for the actual translation files if they exist
	],
	"default",
);
export { NLS_default as default };
//# sourceMappingURL=NLS.js.map
