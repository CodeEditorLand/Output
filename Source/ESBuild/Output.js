// RestPlugin is loaded lazily only when Compiler=Rest is set.
// The dynamic import must be inside the conditional body — not a ternary —
// so ESM module evaluation does not resolve the specifier when Compiler != Rest.
let RestPlugin = null;
if (process.env["Compiler"]?.toLowerCase() === "rest") {
    try {
        const { createRestPluginIfEnabled } = await import("./RestPlugin.js");
        RestPlugin = createRestPluginIfEnabled();
    }
    catch {
        console.warn("[Output] RestPlugin.js not found — falling back to esbuild TS loader");
    }
}
export const Clean = process.env["Clean"] === "true";
export const Meta = process.env["Meta"] === "true";
export const On = process.env["NODE_ENV"] === "development" ||
    process.env["TAURI_ENV_DEBUG"] === "true";
/**
 * @module ESBuild
 *
 */
export default {
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
                                outdir
                                    ? await (await import("node:fs/promises")).rm(outdir, {
                                        recursive: true,
                                    })
                                    : {};
                            }
                            catch (_Error) {
                                console.log(_Error);
                            }
                        });
                        break;
                    default:
                        break;
                }
            },
        },
        // RestPlugin activated only when Compiler=Rest env var is set.
        ...(RestPlugin ? [RestPlugin] : []),
    ].filter(Boolean),
    loader: {
        ".json": "copy",
        ".sh": "copy",
    },
};
export const { sep, posix } = await import("node:path");
