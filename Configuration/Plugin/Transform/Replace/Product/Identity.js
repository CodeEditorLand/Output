var __defProp = Object.defineProperty;

var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

import { readFileSync } from "node:fs";

import { dirname, join, resolve } from "node:path";

import { fileURLToPath } from "node:url";

const RepoRoot = resolve(
  dirname(fileURLToPath(import.meta.url)),

  "..",

  "..",

  "..",

  "..",

  "..",

  "..",

  "..",

  "Element",

  "Sky",

  "Public"
);

const ProductJsonPath = join(RepoRoot, "product.json");

function LoadProduct() {

  try {
    return JSON.parse(readFileSync(ProductJsonPath, "utf8"));
  } catch {
    return {};
  }
}

__name(LoadProduct, "LoadProduct");

const Product = LoadProduct();

const Replacements = [
  // ---- Product name strings ----
  { From: "Code - OSS", To: Product.nameShort ?? "FIDDEE" },

  { From: "code-oss", To: Product.applicationName ?? "fiddee" },

  { From: ".vscode-oss", To: Product.dataFolderName ?? ".fiddee" },

  {

    From: ".vscode-oss-shared",

    To: `${Product.dataFolderName ?? ".fiddee"}-shared`
  },

  {

    From: "code-server-oss",

    To: Product.serverApplicationName ?? "fiddee-server"
  },

  {

    From: ".vscode-server-oss",

    To: Product.serverDataFolderName ?? ".fiddee-server"
  },

  {

    From: "code-tunnel-oss",

    To: `${Product.applicationName ?? "fiddee"}-tunnel`
  },

  // ---- Bundle identifiers ----
  {

    From: "com.visualstudio.code.oss",

    To: Product.darwinBundleIdentifier ?? "fiddee.editor"
  },

  // ---- URL protocol ----
  { From: "code-oss://", To: `${Product.urlProtocol ?? "fiddee"}://` },

  // ---- Application IDs ----
  { From: "Microsoft.CodeOSS", To: "FIDDEE.Editor" },

  { From: "Microsoft Code OSS", To: "FIDDEE" },

  { From: "CodeOSS", To: "FIDDEE" },

  // ---- Metric / telemetry names ----
  { From: "vscodeoss", To: "fiddee" },

  { From: "vscode-oss", To: Product.applicationName ?? "fiddee" }
];

const Plugin = {

  Kind: "Transform",

  Name: "ReplaceProductIdentity",

  /** Match any JS/HTML file that could contain product identity strings. */
  Match: /* @__PURE__ */ __name(({ Path }) => /\/(vs\/|workbench|desktop\.main|bootstrap|code\/)[^/]*\.(js|html?)$/.test(
    Path
  ), "Match"),

  Transform({ Source }) {
    let Current = Source;

    let Changed = false;

    for (const { From, To } of Replacements) {
      if (!Current.includes(From)) continue;

      if (Current.includes(To) && Current.includes(From)) {
      }

      const Replaced = Current.split(From).join(To);

      if (Replaced !== Current) {
        Changed = true;

        Current = Replaced;
      }
    }

    return Changed ? { Kind: "Rewrite", Source: Current } : { Kind: "Unchanged" };
  }
};

var Identity_default = Plugin;

export {
  Identity_default as default
};

//# sourceMappingURL=Identity.js.map
