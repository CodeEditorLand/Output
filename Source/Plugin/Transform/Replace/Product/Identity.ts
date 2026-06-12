/**
 * Replace VS Code's build-time product identity with Land's values.
 *
 * VS Code's `extensions.ts`, `electron.ts`, and other build scripts
 * read `Dependency/Microsoft/Dependency/Editor/product.json` at build
 * time and embed "Code - OSS" identity into compiled output files.
 * This transform runs after copy and replaces those embedded strings
 * with Land's values from `Element/Sky/Public/product.json`.
 *
 * Targets:
 *   1. `_VSCODE_PRODUCT_JSON` global assignments — the build-time
 *      inline that VS Code's gulp pipeline inserts into workbench HTML.
 *   2. Hardcoded "Code - OSS" / "code-oss" product strings in compiled JS.
 *   3. `dataFolderName: ".vscode-oss"` → Land's data folder.
 *   4. `darwinBundleIdentifier` / `urlProtocol` / `applicationName`.
 *
 * The replacement values come from the generated ProductIdentity.ts
 * constants, which in turn are sourced from the authoritative
 * Element/Sky/Public/product.json.
 *
 * IMPORTANT: This is a TEXT REPLACEMENT transform, not AST-based.
 * It runs on the minified/compiled JS output AFTER VS Code's own
 * build process. Only exact string matches are replaced — if VS Code
 * obfuscates a string, the match will miss and the upstream value
 * survives (benign: the workbench still boots, just shows "Code - OSS").
 */
import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

import type { TransformPlugin } from "../../Type.js";

// ---------------------------------------------------------------------------
// Product identity resolution (matches ResolveProductConfig.sh defaults)
// ---------------------------------------------------------------------------

interface ProductInfo {
	nameShort: string;

	nameLong: string;

	applicationName: string;

	dataFolderName: string;

	urlProtocol: string;

	serverApplicationName: string;

	serverDataFolderName: string;

	darwinBundleIdentifier: string;
}

let Cached: ProductInfo | null = null;

function GetProduct(): ProductInfo {
	if (Cached) return Cached;

	try {
		const ThisDir = dirname(new URL(import.meta.url).pathname);

		const ProductPath = resolve(
			join(ThisDir, "../../../../../../../Sky/Public/product.json"),
		);

		const Raw = readFileSync(ProductPath, "utf-8");

		Cached = JSON.parse(Raw) as ProductInfo;

		return Cached!;
	} catch {
		Cached = {
			nameShort: "FIDDEE",

			nameLong: "FIDDEE",

			applicationName: "fiddee",

			dataFolderName: ".fiddee",

			urlProtocol: "fiddee",

			serverApplicationName: "fiddee-server",

			serverDataFolderName: ".fiddee-server",

			darwinBundleIdentifier: "fiddee.editor",
		};

		return Cached;
	}
}

interface Replacement {
	From: string;

	To: string;
}

const Product = GetProduct();

const Replacements: Replacement[] = [
	// ---- Product name strings ----
	{ From: "Code - OSS", To: Product["nameShort"] ?? "FIDDEE" },

	{ From: "code-oss", To: Product["applicationName"] ?? "fiddee" },

	{ From: ".vscode-oss", To: Product["dataFolderName"] ?? ".fiddee" },

	{
		From: ".vscode-oss-shared",

		To: `${Product["dataFolderName"] ?? ".fiddee"}-shared`,
	},

	{
		From: "code-server-oss",

		To: Product["serverApplicationName"] ?? "fiddee-server",
	},

	{
		From: ".vscode-server-oss",

		To: Product["serverDataFolderName"] ?? ".fiddee-server",
	},

	{
		From: "code-tunnel-oss",

		To: `${Product["applicationName"] ?? "fiddee"}-tunnel`,
	},

	// ---- Bundle identifiers ----
	{
		From: "com.visualstudio.code.oss",

		To: Product["darwinBundleIdentifier"] ?? "fiddee.editor",
	},

	// ---- URL protocol ----
	{ From: "code-oss://", To: `${Product["urlProtocol"] ?? "fiddee"}://` },

	// ---- Application IDs ----
	{ From: "Microsoft.CodeOSS", To: "FIDDEE.Editor" },

	{ From: "Microsoft Code OSS", To: "FIDDEE" },

	{ From: "CodeOSS", To: "FIDDEE" },

	// ---- Metric / telemetry names ----
	{ From: "vscodeoss", To: "fiddee" },

	{ From: "vscode-oss", To: Product["applicationName"] ?? "fiddee" },
];

// ---------------------------------------------------------------------------
// Transform plugin
// ---------------------------------------------------------------------------
const Plugin: TransformPlugin = {
	Kind: "Transform",

	Name: "ReplaceProductIdentity",

	/** Match any JS/HTML file that could contain product identity strings. */
	Match: ({ Path }) =>
		/\/(vs\/|workbench|desktop\.main|bootstrap|code\/)[^/]*\.(js|html?)$/.test(
			Path,
		),

	Transform({ Source }) {
		let Current = Source;

		let Changed = false;

		for (const { From, To } of Replacements) {
			// Skip if the target file doesn't contain this string
			if (!Current.includes(From)) continue;

			Current = Current.split(From).join(To);

			Changed = true;
		}

		return Changed
			? ({ Kind: "Rewrite", Source: Current } as const)
			: ({ Kind: "Unchanged" } as const);
	},
};

export default Plugin;
