const On = process.env["NODE_ENV"] === "development" || process.env["TAURI_ENV_DEBUG"] === "true";
const Dependency = process.env["Dependency"] ?? "CodeEditorLand/Editor";
const Clean = process.env["Clean"] === "true";
var ESBuild_default = {
  color: true,
  format: "esm",
  logLevel: "debug",
  metafile: true,
  minify: !On,
  outdir: `Target/${Dependency}`,
  platform: "node",
  target: "esnext",
  tsconfig: On ? `TypeLess/${Dependency}.json` : `tsconfig/${Dependency}.json`,
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
    }
  ],
  loader: {
    ".css,": "file",
    ".fish": "file",
    ".html": "copy",
    ".json": "file",
    ".md": "file",
    ".mp3": "file",
    ".png": "file",
    ".ps1": "file",
    ".psm1": "file",
    ".scm": "file",
    ".scpt": "file",
    ".sh": "copy",
    ".svg": "file",
    ".ttf": "file",
    ".txt": "file",
    ".zsh": "file"
  }
};
const { sep, posix } = await import("node:path");
export {
  Clean,
  Dependency,
  On,
  ESBuild_default as default,
  posix,
  sep
};
//# sourceMappingURL=ESBuild.js.map
