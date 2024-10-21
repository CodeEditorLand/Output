import "./bootstrap-cli.js";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { configurePortable } from "./bootstrap-node.js";
import { bootstrapESM } from "./bootstrap-esm.js";
import { resolveNLSConfiguration } from "./vs/base/node/nls.js";
import { product } from "./bootstrap-meta.js";
const __dirname = dirname(fileURLToPath(import.meta.url));
const nlsConfiguration = await resolveNLSConfiguration({ userLocale: "en", osLocale: "en", commit: product.commit, userDataPath: "", nlsMetadataPath: __dirname });
process.env["VSCODE_NLS_CONFIG"] = JSON.stringify(nlsConfiguration);
configurePortable(product);
process.env["VSCODE_CLI"] = "1";
await bootstrapESM();
await import("./vs/code/node/cli.js");
//# sourceMappingURL=cli.js.map
