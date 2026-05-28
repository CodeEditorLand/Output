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
import { fileURLToPath } from "node:url";

import type { TransformPlugin } from "../../../Type.js";

// ---------------------------------------------------------------------------
// Resolve the Land repo root and load the authoritative product.json
// ---------------------------------------------------------------------------
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

	"Public",
);

const ProductJsonPath = join(RepoRoot, "product.json");

/** Read product.json once at module init (safe: file is stable during build). */
function LoadProduct(): Record<string, string | undefined> {
	try {
		return JSON.parse(readFileSync(ProductJsonPath, "utf8"));
	} catch {
		return {};
	}
}

const Product = LoadProduct();

// ---------------------------------------------------------------------------
// Replacement table — maps VS Code identity strings → Land values
// ---------------------------------------------------------------------------
interface Replacement {
	/** The VS Code substring to find (case-sensitive). */
	From: string;

	/** The Land replacement string. */
	To: string;
}

const Replacements: Replacement[] = [
	// ---- Product name strings ----
	{ From: "Code - OSS", To: Product.nameShort ?? "FIDDEE" },

	{ From: "code-oss", To: Product.applicationName ?? "fiddee" },

	{ From: ".vscode-oss", To: Product.dataFolderName ?? ".fiddee" },

	{
		From: ".vscode-oss-shared",

		To: `${Product.dataFolderName ?? ".fiddee"}-shared`,
	},

	{
		From: "code-server-oss",

		To: Product.serverApplicationName ?? "fiddee-server",
	},

	{
		From: ".vscode-server-oss",

		To: Product.serverDataFolderName ?? ".fiddee-server",
	},

	{
		From: "code-tunnel-oss",

		To: `${Product.applicationName ?? "fiddee"}-tunnel`,
	},

	// ---- Bundle identifiers ----
	{
		From: "com.visualstudio.code.oss",

		To: Product.darwinBundleIdentifier ?? "fiddee.editor",
	},

	// ---- URL protocol ----
	{ From: "code-oss://", To: `${Product.urlProtocol ?? "fiddee"}://` },

	// ---- Application IDs ----
	{ From: "Microsoft.CodeOSS", To: "FIDDEE.Editor" },

	{ From: "Microsoft Code OSS", To: "FIDDEE" },

	{ From: "CodeOSS", To: "FIDDEE" },

	// ---- Metric / telemetry names ----
	{ From: "vscodeoss", To: "fiddee" },

	{ From: "vscode-oss", To: Product.applicationName ?? "fiddee" },
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

			// Skip if already replaced (idempotency check)
			if (Current.includes(To) && Current.includes(From)) {
				// Partial replacement needed (some occurrences may already be Land)
				// We still replace because the file could be a hybrid.
			}

			const Replaced = Current.split(From).join(To);

			if (Replaced !== Current) {
				Changed = true;

				Current = Replaced;
			}
		}

		return Changed
			? { Kind: "Rewrite", Source: Current }
			: { Kind: "Unchanged" };
	},
};

export default Plugin;
