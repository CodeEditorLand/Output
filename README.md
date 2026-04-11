<table>
<tr>
<td align="left" valign="middle">
<h3 align="left">Output</h3>
</td>
<td align="left" valign="middle">
<h3 align="left">⚫</h3>
</td>
<td align="left" valign="middle">
<h3 align="left">+</h3>
</td>
<td align="left" valign="middle">
<h3 align="left">
<a href="https://Editor.Land" target="_blank">
<picture>
<source media="(prefers-color-scheme: dark)" srcset="https://PlayForm.Cloud/Dark/Image/GitHub/Land.svg">
<source media="(prefers-color-scheme: light)" srcset="https://PlayForm.Cloud/Image/GitHub/Land.svg">
<img width="28" alt="Land Logo" src="https://PlayForm.Cloud/Image/GitHub/Land.svg">
</picture>
</a>
</h3>
</td>
<td align="left" valign="middle">
<h3 align="left">
<a href="https://Editor.Land" target="_blank">
Land
</a>
</h3>
</td>
<td align="left" valign="middle">
<h3 align="left">🏞️</h3>
</td>
</tr>
</table>

---

# **Output**&#x2001;⚫

The Build Output & Artifact Management for Land 🏞️

> **Build processes that produce different artifacts depending on the machine,
> CI environment, or implicit tool versions make debugging production issues
> impossible.**

_"Same commit. Same output. Every time."_

[![License: CC0-1.0](https://img.shields.io/badge/License-CC0_1.0-lightgrey.svg)](https://github.com/CodeEditorLand/Land/tree/Current/LICENSE)
[![NPM Version](https://img.shields.io/npm/v/@codeeditorland/output.svg)](https://www.npmjs.com/package/@codeeditorland/output)
[![esbuild Version](https://img.shields.io/badge/esbuild-0.25.x-blue.svg)](https://esbuild.github.io/)
[![Rest Compiler](https://img.shields.io/badge/Rest-OXC-orange.svg)](https://oxc.rs/)

Welcome to **Output**, the build output and artifact management package for the
**Land Code Editor**. Output handles the compilation, processing, and
distribution of source code from various dependencies including VSCode,
CodeEditorLand Editor, and the Rest compiler pipeline.

**Output** is engineered to:

1. **Orchestrate Multi-Compiler Builds:** Support both esbuild and Rest
   (OXC-based) compilation pipelines with seamless integration.
2. **Manage Build Artifacts:** Organize and deliver optimized JavaScript
   artifacts for consumption by `Sky`, `Wind`, and `Cocoon`.
3. **Provide Hybrid Workflows:** Enable incremental migration from esbuild to
   Rest through conditional compilation and plugin-based architecture.
4. **Ensure Build Reproducibility:** Maintain consistent output through
   deterministic build configurations and artifact verification.

---

## Key Features&#x2001;🔐

- **Dual-Compiler Support:** Seamlessly switch between esbuild (default) and
  Rest (OXC-powered) compilers via environment variables.
- **Rest Plugin Integration:** Custom esbuild plugin that intercepts TypeScript
  compilation and delegates to the Rest compiler.
- **Source Map Generation:** Full support for development source maps with
  configurable generation strategies.
- **Artifact Merging:** Intelligent merging of Rest compiler output with esbuild
  bundles for hybrid workflows.
- **Verbose Logging:** Comprehensive build diagnostics with configurable
  verbosity levels for troubleshooting.
- **Path Override:** Flexible binary path configuration for Rest compiler
  discovery in diverse environments.

---

## Core Architecture Principles&#x2001;🏗️

| Principle         | Description                                                                                                     | Key Components Involved                                    |
| :---------------- | :-------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------- |
| **Compatibility** | Maintain backward compatibility with esbuild while enabling Rest compiler adoption through plugin architecture. | `Source/ESBuild/RestPlugin.ts`, `Source/prepublishOnly.sh` |
| **Modularity**    | Separation of concerns between build orchestration, compiler plugins, and artifact management.                  | `Source/ESBuild/Output.ts`, `Source/ESBuild/RestPlugin.ts` |
| **Performance**   | Leverage Rest's OXC-based compiler for 10-100x speedup on TypeScript transpilation tasks.                       | Rest compiler integration, parallel processing             |
| **Flexibility**   | Environment-driven configuration enables different build strategies per deployment scenario.                    | `Compiler` environment variable, `REST_*` variables        |
| **Observability** | Comprehensive logging and diagnostics for build process visibility and troubleshooting.                         | `REST_VERBOSE`, `REST_OPTIONS` configuration               |

---

## Rest Compiler Integration&#x2001;⛱️

The Rest compiler integration enables OXC-based TypeScript compilation as an
alternative or complement to esbuild.

### Overview of OXC-Based Compilation

Rest leverages the **OXC (Oxidation Compiler)** ecosystem, a high-performance
JavaScript/TypeScript toolchain written in Rust. The OXC stack provides:

- **`oxc_parser`**: Ultra-fast JavaScript/TypeScript parser with ESTree
  compatibility
- **`oxc_transformer`**: AST transformation engine supporting TypeScript, JSX,
  and modern ECMAScript features
- **`oxc_codegen`**: Efficient code generation from AST
- **`oxc_semantic`**: Semantic analysis and symbol table construction

When `Compiler=Rest` is configured, the build pipeline intercepts TypeScript
file processing and delegates to the Rest compiler before merging results back
into the esbuild output stream.

### Build Pipeline Architecture

#### Standard Pipeline (esbuild only)

```
Source/ → esbuild → Configuration/ → Target/
```

#### Rest Compiler Pipeline (hybrid)

```
Source/ → esbuild → Configuration/ → Target/
Dependency/ → Rest → Target/Rest/ → Configuration/ → Target/
```

### Configuration Options

| Variable           | Default            | Description                                       |
| :----------------- | :----------------- | :------------------------------------------------ |
| `Compiler`         | `esbuild`          | Compiler to use (`esbuild` or `Rest`)             |
| `REST_BINARY_PATH` | auto-detect        | Override Rest binary location                     |
| `REST_OPTIONS`     | empty              | Additional Rest compiler flags                    |
| `REST_VERBOSE`     | `false`            | Enable verbose Rest logging                       |
| `Dependency`       | `Microsoft/VSCode` | Source dependency to process                      |
| `NODE_ENV`         | `production`       | Build environment (`development` or `production`) |

### esbuild vs Rest Comparison

| Feature                | esbuild                 | Rest (OXC)                 |
| :--------------------- | :---------------------- | :------------------------- |
| **Implementation**     | Go-based                | Rust-based (OXC)           |
| **TypeScript Support** | Full                    | Full                       |
| **Speed**              | Very Fast (10-100x tsc) | Ultra-Fast (parallel, OXC) |
| **Source Maps**        | Yes                     | Yes                        |
| **Tree Shaking**       | Yes                     | Yes                        |
| **Plugin System**      | Rich ecosystem          | Emerging                   |
| **Best For**           | General bundling        | TypeScript-heavy projects  |
| **Watch Mode**         | Yes                     | Yes (via notify)           |
| **Minification**       | Yes                     | Yes (oxc_minifier)         |

---

## Deep Dive & Component Breakdown&#x2001;🔬

- **[`Source/ESBuild/Output.ts`](https://github.com/CodeEditorLand/Output/tree/Current/Source/ESBuild/Output.ts)** -
  ESBuild configuration with ESM format, Node.js platform, ES Next target, and
  conditional Rest plugin integration
- **[`Source/ESBuild/RestPlugin.ts`](https://github.com/CodeEditorLand/Output/tree/Current/Source/ESBuild/RestPlugin.ts)** -
  TypeScript file interception, Rest compiler invocation, source map generation,
  and fallback to esbuild on errors
- **[`Source/prepublishOnly.sh`](https://github.com/CodeEditorLand/Output/tree/Current/Source/prepublishOnly.sh)** -
  Build orchestration script

---

## Directory Structure&#x2001;📁

```
Element/Output/
├── Source/
│   ├── ESBuild/
│   │   ├── Output.ts          # ESBuild configuration
│   │   └── RestPlugin.ts      # Rest compiler plugin
│   ├── prepublishOnly.sh      # Build orchestration
│   └── Run.sh                 # Development watch script
├── Configuration/
│   └── ESBuild/
│       ├── Microsoft/VSCode.js
│       └── CodeEditorLand/Editor.js
├── Target/
│   ├── Rest/                  # Rest compiler output (when Compiler=Rest)
│   │   └── Microsoft/
│   │       └── VSCode/
│   └── Microsoft/             # Final merged output
│       └── VSCode/
└── package.json
```

---

## Getting Started&#x2001;🚀

### Installation&#x2001;📥

```sh
pnpm add @codeeditorland/output
```

### Usage&#x2001;🚀

```bash
# Default esbuild build
npm run prepublishOnly

# Rest compiler build
export Compiler=Rest
npm run prepublishOnly

# Development mode with Rest
export NODE_ENV=development
export Compiler=Rest
npm run Run
```

### Troubleshooting

**Rest Binary Not Found:**

```bash
export REST_BINARY_PATH=/usr/local/bin/rest
```

**Compilation Errors - enable verbose logging:**

```bash
export REST_VERBOSE=true
```

**Source Maps Not Generated:**

```bash
export NODE_ENV=development
```

---

## See Also

- [Output Documentation](https://editor.land/Doc/output)
- [Architecture Overview](https://editor.land/Doc/architecture)
- [Rest](https://github.com/CodeEditorLand/Rest)
- [Cocoon](https://github.com/CodeEditorLand/Cocoon)

---

## License&#x2001;⚖️

This project is released into the public domain under the **Creative Commons CC0
Universal** license. You are free to use, modify, distribute, and build upon
this work for any purpose, without any restrictions. For the full legal text,
see the [`LICENSE`](https://github.com/CodeEditorLand/Land/tree/Current/LICENSE)
file.

---

## Changelog&#x2001;📜

Stay updated with our progress! See [`CHANGELOG.md`](../../CHANGELOG.md) for a
history of changes specific to **Output**.

---

## Funding \& Acknowledgements&#x2001;🙏🏻

**Output** is a core element of the **Land** ecosystem. This project is funded
through [NGI0 Commons Fund](https://NLnet.NL/commonsfund), a fund established by
[NLnet](https://NLnet.NL) with financial support from the European Commission's
[Next Generation Internet](https://ngi.eu) program. Learn more at the
[NLnet project page](https://NLnet.NL/project/Land).

The project is operated by PlayForm, based in Sofia, Bulgaria.

PlayForm acts as the open-source steward for Code Editor Land under the NGI0
Commons Fund grant.

<table>
<thead>
<tr>
<th align="left"><strong>Land</strong></th>
<th align="left"><strong>PlayForm</strong></th>
<th align="left"><strong>NLnet</strong></th>
<th align="left"><strong>NGI0 Commons Fund</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td align="left" valign="middle">
<a href="https://Editor.Land">
<img width="60" src="https://raw.githubusercontent.com/CodeEditorLand/Asset/refs/heads/Current/Logo/Land.svg" alt="Land">
</a>
</td>
<td align="left" valign="middle">
<a href="https://PlayForm.Cloud">
<img width="76" src="https://raw.githubusercontent.com/PlayForm/Asset/refs/heads/Current/Logo/PlayForm.svg" alt="PlayForm">
</a>
</td>
<td align="left" valign="middle">
<a href="https://NLnet.NL">
<img width="240" src="https://NLnet.NL/logo/banner.svg" alt="NLnet">
</a>
</td>
<td align="left" valign="middle">
<a href="https://NLnet.NL/commonsfund">
<img width="240" src="https://NLnet.NL/image/logos/NGI0CommonsFund_tag_black_mono.svg" alt="NGI0 Commons Fund">
</a>
</td>
</tr>
</tbody>
</table>

---

**Project Maintainers**: Source Open
([Source/Open@Editor.Land](mailto:Source/Open@Editor.Land)) |
[GitHub Repository](https://github.com/CodeEditorLand/Output) |
[Report an Issue](https://github.com/CodeEditorLand/Output/issues) |
[Security Policy](https://github.com/CodeEditorLand/Output/security/policy)
