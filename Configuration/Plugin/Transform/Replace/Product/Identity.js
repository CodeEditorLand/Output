var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
let Cached = null;
function GetProduct() {
  if (Cached) return Cached;
  try {
    const ThisDir = dirname(new URL(import.meta.url).pathname);
    const ProductPath = resolve(
      join(ThisDir, "../../../../../../../Sky/Public/product.json")
    );
    const Raw = readFileSync(ProductPath, "utf-8");
    Cached = JSON.parse(Raw);
    return Cached;
  } catch {
    Cached = {
      nameShort: "FIDDEE",
      nameLong: "FIDDEE",
      applicationName: "fiddee",
      dataFolderName: ".fiddee",
      urlProtocol: "fiddee",
      serverApplicationName: "fiddee-server",
      serverDataFolderName: ".fiddee-server",
      darwinBundleIdentifier: "fiddee.editor"
    };
    return Cached;
  }
}
__name(GetProduct, "GetProduct");
const Product = GetProduct();
const Replacements = [
  // ---- Product name strings ----
  { From: "Code - OSS", To: Product["nameShort"] ?? "FIDDEE" },
  { From: "code-oss", To: Product["applicationName"] ?? "fiddee" },
  { From: ".vscode-oss", To: Product["dataFolderName"] ?? ".fiddee" },
  {
    From: ".vscode-oss-shared",
    To: `${Product["dataFolderName"] ?? ".fiddee"}-shared`
  },
  {
    From: "code-server-oss",
    To: Product["serverApplicationName"] ?? "fiddee-server"
  },
  {
    From: ".vscode-server-oss",
    To: Product["serverDataFolderName"] ?? ".fiddee-server"
  },
  {
    From: "code-tunnel-oss",
    To: `${Product["applicationName"] ?? "fiddee"}-tunnel`
  },
  // ---- Bundle identifiers ----
  {
    From: "com.visualstudio.code.oss",
    To: Product["darwinBundleIdentifier"] ?? "fiddee.editor"
  },
  // ---- URL protocol ----
  { From: "code-oss://", To: `${Product["urlProtocol"] ?? "fiddee"}://` },
  // ---- Application IDs ----
  { From: "Microsoft.CodeOSS", To: "FIDDEE.Editor" },
  { From: "Microsoft Code OSS", To: "FIDDEE" },
  { From: "CodeOSS", To: "FIDDEE" },
  // ---- Metric / telemetry names ----
  { From: "vscodeoss", To: "fiddee" },
  { From: "vscode-oss", To: Product["applicationName"] ?? "fiddee" }
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
      Current = Current.split(From).join(To);
      Changed = true;
    }
    return Changed ? { Kind: "Rewrite", Source: Current } : { Kind: "Unchanged" };
  }
};
var Identity_default = Plugin;
export {
  Identity_default as default
};
//# sourceMappingURL=Identity.js.map
