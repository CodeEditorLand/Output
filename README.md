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

# **Output** ⚫  The Build Output & Artifact Management for Land 🏞️

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

## Key Features 🔐

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

## Core Architecture Principles 🏗️

| Principle         | Description                                                                                                     | Key Components Involved                                    |
| :---------------- | :-------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------- |
| **Compatibility** | Maintain backward compatibility with esbuild while enabling Rest compiler adoption through plugin architecture. | `Source/ESBuild/RestPlugin.ts`, `Source/prepublishOnly.sh` |
| **Modularity**    | Separation of concerns between build orchestration, compiler plugins, and artifact management.                  | `Source/ESBuild/Output.ts`, `Source/ESBuild/RestPlugin.ts` |
| **Performance**   | Leverage Rest's OXC-based compiler for 10-100x speedup on TypeScript transpilation tasks.                       | Rest compiler integration, parallel processing             |
| **Flexibility**   | Environment-driven configuration enables different build strategies per deployment scenario.                    | `Compiler` environment variable, `REST_*` variables        |
| **Observability** | Comprehensive logging and diagnostics for build process visibility and troubleshooting.                         | `REST_VERBOSE`, `REST_OPTIONS` configuration               |

---

## Rest Compiler Integration ⛱️

The Rest compiler integration enables OXC-based TypeScript compilation as an
alternative or complement to esbuild. This section provides an overview of the
integration architecture, usage patterns, and comparison with esbuild.

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

### Usage Instructions

#### Enabling Rest Compiler

Set the `Compiler` environment variable to `Rest` before invoking the build:

```bash
# Use Rest compiler for TypeScript transpilation
export Compiler=Rest
npm run prepublishOnly
```

#### Development Mode with Rest

```bash
export NODE_ENV=development
export Compiler=Rest
npm run Run
```

#### Production Build with Rest

```bash
export NODE_ENV=production
export Compiler=Rest
npm run prepublishOnly
```

### Build Output Location

Rest compiler output is placed in the following location before being processed:

```
Target/Rest/Microsoft/VSCode/
```

After Rest processing, artifacts are merged into the final output at:

```
Target/Microsoft/VSCode/
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

### Rest Compiler Comparison: esbuild vs Rest

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

### Decision Matrix: When to Use Rest

> [!NOTE] Use Rest compiler when:
>
> - Your project has heavy TypeScript usage
> - You need maximum build performance
> - You want to leverage OXC's semantic analysis
> - You're building for production with minification requirements

> [!TODO] Consider esbuild when:
>
> - You rely on specific esbuild plugins
> - Your project is primarily JavaScript
> - You need mature plugin ecosystem support
> - Build speed is less critical than compatibility

### Troubleshooting Rest Compiler

#### Rest Binary Not Found

Set `REST_BINARY_PATH` to the location of the Rest binary:

```bash
export REST_BINARY_PATH=/usr/local/bin/rest
```

#### Compilation Errors

Enable verbose logging for detailed Rest compiler output:

```bash
export REST_VERBOSE=true
```

#### Source Maps Not Generated

Ensure development mode or explicit source map configuration:

```bash
export NODE_ENV=development
```

---

## Compilation Pipeline

### Standard Pipeline (esbuild)

```
Source/ → esbuild → Configuration/ → Target/
```

### Rest Compiler Pipeline

When using the Rest compiler (`Compiler=Rest`), an additional stage is added:

```
Source/ → esbuild → Configuration/ → Target/
Dependency/ → Rest → Target/Rest/ → Configuration/ → Target/
```

---

## Directory Structure

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

## Scripts

| Script                   | Description                     |
| :----------------------- | :------------------------------ |
| `npm run prepublishOnly` | Run full build process          |
| `npm run Run`            | Run in watch mode (development) |

---

## Architecture

### ESBuild Configuration

[`Source/ESBuild/Output.ts`](https://github.com/CodeEditorLand/Output/tree/Current/Source/ESBuild/Output.ts)
configures esbuild with:

- ESM format output
- Node.js platform
- ES Next target
- Conditional Rest plugin integration

### Rest Plugin

[`Source/ESBuild/RestPlugin.ts`](https://github.com/CodeEditorLand/Output/tree/Current/Source/ESBuild/RestPlugin.ts)
provides:

- TypeScript file interception
- Rest compiler invocation
- Source map generation (when enabled)
- Fallback to esbuild on errors

---

## Getting Started 🚀

### Installation

```sh
pnpm add @codeeditorland/output
```

### Basic Usage

```bash
# Default esbuild build
npm run prepublishOnly

# Rest compiler build
export Compiler=Rest
npm run prepublishOnly
```

---

## Development Tools 🔧

This project leverages the **Depth-Aware Skill System** for efficient
development workflows. The system adapts skill behavior based on usage
frequency, providing quick initial checks and progressively more comprehensive
analysis.

### Quick Start with Skills

- **Level 1 (First Run):** Quick scan - fastest execution, focused scope
- **Level 2 (Second Run):** Detailed analysis - broader coverage
- **Level 3 (Third Run):** Deep dive - comprehensive review
- **Level 4 (Fourth+ Run):** Strategic analysis - system-wide patterns

For detailed guidance on using the depth-aware skill system, see:

- [`Documentation/SkillSystem.md`](../../Documentation/SkillSystem.md) -
  Complete system overview
- [`.roo/skills/DEPTH-MANAGEMENT.md`](../../.roo/skills/DEPTH-MANAGEMENT.md) -
  Technical management guide

### Common Development Tasks

| Task                              | Command                              | Depth Level |
| --------------------------------- | ------------------------------------ | ----------- |
| Quick build verification          | `workflow-check-build-status`        | Level 1     |
| Rest compiler integration         | `workflow-rest-compiler-integration` | Level 2     |
| Output directory structure review | `history-output-directory-structure` | Level 3     |
| Architecture documentation sync   | `knowledge-element-architecture`     | Level 4     |

---

## References

- [Rest Compiler Documentation](../Rest/README.md)
- [OXC Documentation](https://oxc.rs/)
- [esbuild Documentation](https://esbuild.github.io/)

---

## License ⚖️

This project is released into the public domain under the **Creative Commons CC0
Universal** license. You are free to use, modify, distribute, and build upon
this work for any purpose, without any restrictions. For the full legal text,
see the [`LICENSE`](https://github.com/CodeEditorLand/Land/tree/Current/LICENSE)
file.

---

## Changelog 📜

Stay updated with our progress! See [`CHANGELOG.md`](../../CHANGELOG.md) for a
history of changes specific to **Output**.

---

## Funding & Acknowledgements 🙏🏻

**Output** is a core element of the **Land** ecosystem. This project is funded
through [NGI0 Commons Fund](https://NLnet.NL/commonsfund), a fund established by
[NLnet](https://NLnet.NL) with financial support from the European Commission's
[Next Generation Internet](https://ngi.eu) program. Learn more at the
[NLnet project page](https://NLnet.NL/project/Land).

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
