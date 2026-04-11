let RestPlugin = null;
if (process.env["Compiler"]?.toLowerCase() === "rest") {
  try {
    const { createRestPluginIfEnabled } = await import("./RestPlugin.js");
    RestPlugin = createRestPluginIfEnabled();
  } catch {
    console.warn("[Output] RestPlugin.js not found \u2014 falling back to esbuild TS loader");
  }
}
const Clean = process.env["Clean"] === "true";
const Meta = process.env["Meta"] === "true";
const On = process.env["NODE_ENV"] === "development" || process.env["TAURI_ENV_DEBUG"] === "true";
var Output_default = {
  color: true,
  format: "esm",
  logLevel: On ? "debug" : "silent",
  metafile: Meta,
  minify: !On,
  outdir: "Configuration",
  platform: "node",
  target: "esnext",
  tsconfig: "tsconfig.json",
  write: true,
  legalComments: On ? "inline" : "none",
  bundle: false,
  assetNames: "Asset/[name]-[hash]",
  sourcemap: On,
  drop: On ? [] : ["debugger"],
  ignoreAnnotations: !On,
  keepNames: On,
  plugins: [
    {
      name: "Target",
      // @ts-ignore
      setup({ onStart, initialOptions: { outdir } }) {
        switch (true) {
          case Clean === true:
            onStart(async () => {
              try {
                outdir ? await (await import("node:fs/promises")).rm(outdir, {
                  recursive: true
                }) : {};
              } catch (_Error) {
                console.log(_Error);
              }
            });
            break;
          default:
            break;
        }
      }
    },
    // RestPlugin activated only when Compiler=Rest env var is set.
    ...RestPlugin ? [RestPlugin] : []
  ].filter(Boolean),
  loader: {
    ".json": "copy",
    ".sh": "copy"
  }
};
const { sep, posix } = await import("node:path");
export {
  Clean,
  Meta,
  On,
  Output_default as default,
  posix,
  sep
};
//# sourceMappingURL=Output.js.map
