<table>
	<tr>
		<td colspan="1">
			<h3 align="center">
				<picture>
					<source media="(prefers-color-scheme: dark)" srcset="https://editor.land/Dark/Image/GitHub/Land.svg">
					<source media="(prefers-color-scheme: light)" srcset="https://editor.land/Image/GitHub/Land.svg">
					<img width="28" alt="Land Logo" src="https://editor.land/Image/GitHub/Land.svg">
				</picture>
			</h3>
		</td>
		<td colspan="3" valign="top"><h3 align="center">Output</h3></td>
	</tr>
</table>

---

# Output Architecture

`Output` is the build artifact management package for `Land`. It handles compilation of `VS Code` platform source code through:

- Dual-compiler support (`ESBuild` primary, `Rest` OXC optional)
- Produces the `@codeeditorland/output` npm package consumed by `Cocoon`, `Sky`, and `Wind`

---

## Table of Contents 📖

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Compiler Modes](#compiler-modes)
4. [Build Pipeline](#build-pipeline)
5. [Plugin System](#plugin-system)
6. [Polyfill Injection](#polyfill-injection)
7. [Output Layout](#output-layout)
8. [Shim Compatibility](#shim-compatibility)
9. [Related Documentation](#related-documentation)

---

```mermaid
graph TB
    subgraph Output["Output Build Artifact Management"]
        ESB["ESBuild Pipeline<br/>Output.ts"]
        REST_P["Rest Plugin<br/>OXC compiler"]
        PLUGINS["Plugin System<br/>Apply / Copy / Transform<br/>Polyfill"]
        POLY["Polyfill Injection<br/>Child / File / IPC<br/>Native / Process / Shared"]
        SVC["Services<br/>CEL / Dev / Tauri"]

        ESB --> PLUGINS
        ESB -.->|"optional"| REST_P
        PLUGINS --> POLY
        ESB --> SVC
    end

    VSC["VS Code Source<br/>Dependency/Editor/out/"] -->|"entry points"| ESB
    ESB -->|"compiled bundles"| PACKAGE["@codeeditorland/output<br/>npm package"]
    PACKAGE --> COCOON["Cocoon<br/>Extension Host"]
    PACKAGE --> SKY["Sky<br/>UI Layer"]
    PACKAGE --> WIND["Wind<br/>Service Layer"]
```

## Overview 📋

`Output` is the build orchestration layer for `Land`'s `TypeScript` assets:

- Wraps `ESBuild` with `Land`-specific transforms, plugin hooks, and polyfill injection
- Supports an optional `Rest` (OXC-based) compiler pipeline for faster `TypeScript` compilation

| Attribute | Value |
| -------- | -------- |
| Language | `TypeScript` + `JavaScript` |
| Compiler | `ESBuild` (default), `Rest` OXC (optional) |
| Output | `@codeeditorland/output` npm package |
| Dependencies | `@codeeditorland/rest` (optional), `@playform/build`, `esbuild` |
| Consumers | `Cocoon`, `Sky`, `Wind` |

---

## Architecture 🏗️

```text
+--------------------------------------------------------------+
|                       Output                                  |
|                                                               |
|  +------------------+  +------------------------+             |
|  | ESBuild/Output.ts|  | ESBuild/Rest/Plugin.ts |             |
|  | Default esbuild  |  | Rest plugin            |             |
|  | pipeline         |  | (OXC compiler)         |             |
|  +------------------+  +------------------------+             |
|                                                               |
|  +------------------+  +------------------+                    |
|  | Plugin/          |  | Polyfill/        |                    |
|  | - Apply.ts       |  | - Child/         |                    |
|  | - Copy.ts        |  | - File/          |                    |
|  | - Transform/     |  | - IPC/           |                    |
|  | - Index.ts       |  | - Native/        |                    |
|  | - Type.ts        |  | - Process/       |                    |
|  |                  |  | - Shared/        |                    |
|  +------------------+  +------------------+                    |
|                                                               |
|  +------------------+  +------------------+                    |
|  | Service/         |  | Asset/           |                    |
|  | - CEL/           |  | - Style/         |                    |
|  | - Dev/           |  |                  |                    |
|  | - Tauri/         |  |                  |                    |
|  +------------------+  +------------------+                    |
+--------------------------------------------------------------+
```

### Module Map 🗺️

| Path | Purpose |
| -------- | -------- |
| `Source/ESBuild/Output.ts` | Primary ESBuild compilation pipeline |
| `Source/ESBuild/Rest/` | Rest OXC compiler plugin integration |
| `Source/ESBuild/Microsoft/` | VS Code source-specific compilation config |
| `Source/ESBuild/CodeEditorLand/` | Land-specific compilation config |
| `Source/ESBuild/Exclude/` | Exclude patterns for compilation |
| `Source/Plugin/Apply.ts` | ESBuild plugin for applying transforms |
| `Source/Plugin/Copy/` | Asset copying plugin |
| `Source/Plugin/Transform/` | Code transform plugins |
| `Source/Plugin/Polyfill/` | Polyfill injection plugins |
| `Source/Plugin/Index.ts` | Plugin registry |
| `Source/Polyfill/Child/` | Child process polyfills |
| `Source/Polyfill/File/` | File system polyfills |
| `Source/Polyfill/IPC/` | IPC polyfills |
| `Source/Polyfill/Native/` | Native module polyfills |
| `Source/Polyfill/Process/` | Process polyfills |
| `Source/Polyfill/Shared/` | Shared polyfill utilities |
| `Source/Service/CEL/` | Code Editor Land specific services |
| `Source/Service/Dev/` | Development-time services |
| `Source/Service/Tauri/` | Tauri-specific services |
| `Source/Asset/Style/` | CSS asset management |
| `Source/Apply/Pipeline.ts` | Apply pipeline orchestration |

---

## Compiler Modes ⚡

`Output` supports two compiler backends:

### Default: ESBuild 📦

```text
TypeScript input (.ts, .tsx)
    |
    v
ESBuild parser
    |
    v
ESBuild transforms:
    - Module resolution remapping (electron -> Tauri stubs)
    - Define substitution (process.platform, __dirname)
    - Dead code elimination
    |
    v
ESBuild codegen
    |
    v
JavaScript output
```

### Optional: Rest OXC 📦

Activated via `Compiler=Rest` environment variable:

```text
TypeScript input (.ts, .tsx)
    |
    v
Rest (Rust OXC) parser
    |
    v
OXC transformer
    - 2-3x faster than esbuild
    - Better decorator/class field support
    |
    v
OXC codegen
    |
    v
JavaScript output
```

```mermaid
sequenceDiagram
    participant Input as TypeScript input
    participant ESBuild as ESBuild
    participant RestPlugin as RestPlugin
    participant RestBin as Rest binary

    Input->>ESBuild: .ts, .tsx files
    alt Compiler = esbuild (default)
        ESBuild->>ESBuild: transforms + codegen
        ESBuild->>Input: JavaScript output
    else Compiler = Rest
        ESBuild->>RestPlugin: onLoad .ts
        RestPlugin->>RestBin: compile --input --output
        RestBin->>RestPlugin: JavaScript text
        RestPlugin->>ESBuild: transformed source
        ESBuild->>Input: JavaScript output
    end
```

### Integration 🧩

The Rest plugin is loaded lazily only when `Compiler=Rest` is set:

```typescript
// Source/ESBuild/Output.ts
let RestPlugin = null;
if (process.env.Compiler?.toLowerCase() === "rest") {
	try {
		const { createRestPluginIfEnabled } = await import("./Rest/Plugin.js");
		RestPlugin = createRestPluginIfEnabled();
	} catch {
		// Fall back to the esbuild TypeScript loader.
	}
}
const plugins = RestPlugin ? [RestPlugin] : [];
// Standard ESBuild build with optional Rest plugin
```

---

## Build Pipeline 🗺️

The `Output` build pipeline processes `VS Code` platform code:

```text
1. Input discovery
   - Reads from Dependency/Editor/out/ (Stage 1 compiled VS Code)
   - Identifies entry points (workbench, extHost files)

2. Module resolution
   - Remaps electron imports to Tauri stubs
   - Remaps Node.js built-in modules to polyfills
   - Resolves Land-specific module paths

3. Transform application
   - Polyfill injection (see below)
   - Source map chaining
   - Platform code markers (CEL:platform)

4. Bundle compilation
   - ESBuild compiles to single or multiple output files
   - Source maps produced for debugging

5. Output packaging
   - Produces @codeeditorland/output package
   - Versioned and cached in Output/Target/
```

```mermaid
graph LR
    A["1. Input discovery<br/>Dependency/Editor/out/"] --> B["2. Module resolution<br/>electron to Tauri stubs<br/>Node.js to polyfills"]
    B --> C["3. Transform application<br/>polyfills, source maps, CEL markers"]
    C --> D["4. Bundle compilation<br/>ESBuild to output files"]
    D --> E["5. Output packaging<br/>@codeeditorland/output<br/>Target/"]
```

---

## Plugin System 🧩

`Output` defines a plugin interface for extending the build pipeline:

```typescript
export interface OutputPlugin {
	name: string;
	setup(build: ESBuild.PluginBuild): void;
}
```

### Built-in Plugins 🧩

| Plugin | Purpose |
| -------- | -------- |
| `Apply.ts` | Applies Land-specific code transforms |
| `Copy.ts` | Copies static assets to output directory |
| `Transform.ts` | TypeScript-to-JavaScript transformation config |
| `Polyfill/Index.ts` | Polyfill injection orchestration |
| `RestPlugin.ts` | Rest OXC compiler integration (optional) |

```mermaid
graph LR
    IDX["Plugin/Index.ts<br/>registry"] --> APPLY["Apply.ts<br/>transforms"]
    IDX --> COPY["Copy.ts<br/>static assets"]
    IDX --> TRANSFORM["Transform.ts<br/>TS to JS config"]
    IDX --> POLY["Polyfill/Index.ts<br/>injection"]
    IDX --> REST["RestPlugin.ts<br/>OXC optional"]
```

---

## Polyfill Injection 🧩

`Output` injects polyfills during compilation for APIs that don't exist in the `Tauri` `WebView`:

| Polyfill | Target | Replaces |
| -------- | -------- | -------- |
| `Child/` | `child_process` module | No-op stubs |
| `File/` | `fs` module | Tauri invoke wrappers |
| `IPC/` | `ipcRenderer` | Tauri event system |
| `Native/` | Native Node modules | No-op stubs |
| `Process/` | `process` global | Wind Preload shim integration |
| `Shared/` | Shared polyfill utilities | Shared initialization |

- Polyfills are injected via `ESBuild`'s `inject` configuration
- Prepends the polyfill modules to output bundles

```mermaid
graph LR
    SRC["VS Code platform code<br/>Node.js + Electron APIs"] --> INJ["ESBuild inject config"]
    INJ --> CHILD["Child/: child_process"]
    INJ --> FILE["File/: fs"]
    INJ --> IPC["IPC/: ipcRenderer"]
    INJ --> NATIVE["Native/: native modules"]
    INJ --> PROC["Process/: process global"]
    INJ --> SHARED["Shared/: utilities"]
    CHILD --> WEBVIEW["Tauri WebView"]
    FILE --> WEBVIEW
    IPC --> WEBVIEW
    NATIVE --> WEBVIEW
    PROC --> WEBVIEW
    SHARED --> WEBVIEW
```

---

## Output Layout 🗺️

After compilation, `Output` produces the following structure:

```text
Output/Target/
+-- @codeeditorland/output/
    +-- index.js                    # Main entry point
    +-- workbench/                  # VS Code workbench bundle
    |   +-- workbench.js
    |   +-- workbench.css
    +-- extHost/                    # Extension host bootstrap
    |   +-- extHost.js
    +-- vs/                         # VS Code platform code
    |   +-- base/
    |   +-- platform/
    |   +-- workbench/
    +-- polyfills/                  # Injected polyfill modules
    +-- sourcemaps/                 # Source maps
    +-- package.json                # npm package manifest
```

---

## Shim Compatibility 🛡️

| Low-Level Shim | Coverage Shim |
| -------- | -------- |
| Tier: `TierShim=Own\|Preempt` | Tier: `TierShim=Proxy\|Replace` |
| Engine prototype hooks | Service routing + audit |

> This Element supports the `Land` deep-shim interception system. Gated behind
> `TierShim` env var (default: `None` - zero overhead).
>
> **`Output` shim architecture:** `Source/Plugin/Transform/Inject/Shim/Hook.ts` -
> injects the shim into `web.main.js` at build time. Also
> `Source/Service/CEL/Land/Shim/` with 7 files - the low-level shim engine hook runtime.

---

## Related Documentation 📖

- [Cocoon](https://github.com/CodeEditorLand/Cocoon/tree/Current/Documentation/GitHub/Architecture.md) - Extension host (`Output` consumer)
- [Sky](https://github.com/CodeEditorLand/Sky/tree/Current/Documentation/GitHub/Architecture.md) - UI layer (`Output` consumer)
- [Wind](https://github.com/CodeEditorLand/Wind/tree/Current/Documentation/GitHub/Architecture.md) - Service layer (`Output` consumer)
- [Rest](https://github.com/CodeEditorLand/Rest/tree/Current/Documentation/GitHub/Architecture.md) - OXC compiler (optional `Output` backend)
- [BuildPipeline](https://github.com/CodeEditorLand/Land/tree/Current/Documentation/GitHub/BuildPipeline.md) - Build pipeline
- [Polyfills](https://github.com/CodeEditorLand/Land/tree/Current/Documentation/GitHub/Polyfills.md) - Full polyfill documentation

---

**Project Maintainers:** Source Open
([Source/Open@Editor.Land](mailto:Source/Open@Editor.Land)) |
[GitHub Repository](https://github.com/CodeEditorLand/Output) |
[Report an Issue](https://github.com/CodeEditorLand/Output/issues)
