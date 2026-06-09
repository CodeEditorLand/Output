var __defProp = Object.defineProperty;

var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

const Marker = "/* __LAND_CONFIG_OVERLAY__ */";

const PathRegex = /\/vs\/(?:platform\/configuration\/common|workbench\/services\/configuration\/browser)\/configurationService\.js$/;

const Pattern = /(getValue\(arg1, arg2\) \{\n)(\s+)(const section = typeof arg1 === 'string')/;

const Replacement = `$1$2${Marker}
$2const __CEL_O = globalThis.__CEL_OVERRIDE_CONFIG__;
$2if (__CEL_O && typeof arg1 === 'string'
$2	&& Object.prototype.hasOwnProperty.call(__CEL_O, arg1)) {
$2	return __CEL_O[arg1];
$2}
$2$3`;

const Plugin = {
  Kind: "Transform",

  Name: "InjectConfigurationOverlay",

  Match: /* @__PURE__ */ __name(({ Path }) => PathRegex.test(Path), "Match"),

  Transform({ Source }) {
    if (Source.includes(Marker)) return { Kind: "Unchanged" };

    if (!Pattern.test(Source)) return { Kind: "Unchanged" };

    const Next = Source.replace(Pattern, Replacement);

    if (Next === Source) return { Kind: "Unchanged" };

    return { Kind: "Rewrite", Source: Next };
  }
};

var Overlay_default = Plugin;

export {
  Overlay_default as default
};

//# sourceMappingURL=Overlay.js.map
