var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
const Marker = "/* __LAND_NESTED_WORKER_BOOTSTRAP_INLINED__ */";
const Anchor = `const _bootstrapFnSource = (/* @__PURE__ */ __name((function _bootstrapFn(workerUrl) {`;
const ReplacementSource = `const _bootstrapFnSource = ${JSON.stringify(
  [
    "function _bootstrapFn(workerUrl) {",
    "  const listener = function(event) {",
    "    globalThis.removeEventListener('message', listener);",
    "    const port = event.data;",
    "    Object.defineProperties(globalThis, {",
    "      'postMessage': {",
    "        value: function(data, transferOrOptions) {",
    "          port.postMessage(data, transferOrOptions);",
    "        }",
    "      },",
    "      'onmessage': {",
    "        get: function() { return port.onmessage; },",
    "        set: function(value) { port.onmessage = value; }",
    "      }",
    "    });",
    "    port.addEventListener('message', function(msg) {",
    "      globalThis.dispatchEvent(new MessageEvent('message', {",
    "        data: msg.data,",
    "        ports: msg.ports ? [...msg.ports] : void 0",
    "      }));",
    "    });",
    "    port.start();",
    "    globalThis.Worker = class {",
    "      constructor() {",
    "        throw new TypeError('Nested workers from within nested worker are NOT supported.');",
    "      }",
    "    };",
    "    importScripts(workerUrl);",
    "  };",
    "  globalThis.addEventListener('message', listener);",
    "}"
  ].join("\n")
)};`;
const Plugin = {
  Kind: "Transform",
  Name: "RewriteNestedWorkerBootstrap",
  Match: /* @__PURE__ */ __name(({ Path }) => /\/vs\/workbench\/services\/extensions\/worker\/polyfillNestedWorker\.js$/.test(
    Path
  ), "Match"),
  Transform({ Source }) {
    if (Source.includes(Marker)) return { Kind: "Unchanged" };
    const Index = Source.indexOf(Anchor);
    if (Index < 0) return { Kind: "Unchanged" };
    const TailMarker = `}), "_bootstrapFn")).toString();`;
    const TailIdx = Source.indexOf(TailMarker, Index);
    if (TailIdx < 0) return { Kind: "Unchanged" };
    const BlockEnd = TailIdx + TailMarker.length;
    const Next = Source.slice(0, Index) + ReplacementSource + Source.slice(BlockEnd);
    return {
      Kind: "Rewrite",
      Source: Marker + "\n" + Next
    };
  }
};
var RewriteNestedWorkerBootstrap_default = Plugin;
export {
  RewriteNestedWorkerBootstrap_default as default
};
//# sourceMappingURL=RewriteNestedWorkerBootstrap.js.map
