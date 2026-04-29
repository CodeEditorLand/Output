# Changelog - Output

Output is our bundled JS artifact tree - the VS Code platform code that
Rest compiles from `Dependency/Microsoft/Dependency/Editor/src` and that
Cocoon and Sky load at runtime. This file records what we built in our
voice, version by version. Format adapted from
[Keep a Changelog](https://keepachangelog.com/).

## [v2.2] - Bundled-Electron Profile: Correctness Pass

We treated Output as a first-class build target this cycle. The bundled
profile re-validates every transform we apply to VS Code source, which
means quote-style, tree-shake aggressiveness, and boot-order all differ
from the unbundled profile - so each transform we land has to survive
both passes.

### Added

- **`ExposeWorkbenchAccessor` transform** that captures the VS Code
  service-accessor at workbench instantiation and stashes it on a
  global so our renderer-side patches can call `invokeFunction(...)`
  without re-entering the workbench bootstrap. Quote-marker pinned to
  double quotes so the bundled profile's minifier doesn't rewrite the
  injection point.
- **Service-IIFE wrapping** so `import { registerSingleton }` lands at
  module-eval time even after esbuild's tree-shake passes. Without the
  wrap, the bundled profile dead-codes the singleton registration and
  the workbench boots with stub services.
- **`__CEL_SERVICES__.invokeFunction(IFooService)` pattern** as the
  approved pathway for renderer-side patches to call into workbench
  services. We documented this in the transform-author notes so future
  transforms don't reach for `registerSingleton`-based hooks (which
  the bundled profile silently drops).

### Changed

- **Mountain → Cocoon → workbench buffer decoding** end-to-end:
  Mountain returns `Vec<u8>` for file reads, our Output transforms
  preserve the bytes through the IPC adapter, and Cocoon's
  `BuildOpenTextDocument` decodes to UTF-8 with the full `TextDocument`
  API attached. This crossed the Output boundary because the polyfill
  layer is what hands the buffer to extension code.

### Fixed

- **JSDoc nested `/* */` no longer trips esbuild** in our transform
  outputs. We rewrite `/** ... */` blocks that contain inline `*/`
  closures before esbuild parses them so the bundled build doesn't
  fail with `Unterminated regular expression`.

## [v2.1] - Full Workbench Lift, Polyfill Hardening

We hardened the polyfill surface so the workbench could lift cleanly
against Mountain instead of Electron's main process.

### Added

- **`Source/Polyfill/` (~5,200 lines)** - 6 Electron-to-Tauri shims
  consumed by every bundled VS Code module that reaches for Node or
  Electron primitives:
  - **`ProcessPolyfill.ts`** - Node `process` API (env, platform,
    versions, cwd) backed by Mountain's environment service.
  - **`FileSystemPolyfill.ts`** - `fs` / `fs/promises` translated to
    Mountain's `file:invoke` channel. We return `Uint8Array` for read
    operations so binary-fetch paths (icon themes, codicons,
    extension VSIX inspection) survive the round-trip.
  - **`FileProtocolShim.ts`** - intercepts `vscode-file://`,
    `vscode-resource://`, and `file://` URLs and rewrites them to
    Tauri's `asset://` protocol with the right host/path encoding so
    the workbench's CSS and webview asset loads land.
  - **`ChildProcessPolyfill.ts`** - `child_process.spawn/exec`
    routed to Mountain's `electron:` invoke surface.
  - **`IPCRendererShim.ts`** - simulates Electron's `ipcRenderer`
    over our Tauri channel proxy.
  - **`NativeModulePolyfill.ts`** - stubs `require('electron')` and
    other native modules so module-load doesn't hard-crash.
- **`Source/Service/TauriMainProcessService.ts`** - the Electron-to-
  Tauri IPC adapter that the polyfills call into. Mirrors the
  routing surface Wind exposes so transforms only learn one shape.
- **`Source/Service/DevLog.ts`** - tag-filtered dev logging so we
  can flip subsystems on/off via `LAND_DEV_LOG=short|long` without
  rebuilding.
- **`Source/Service/Trace.ts`** - tracer surface for the bundled
  workbench's performance instrumentation.
- **PostHog telemetry integration** routed through the renderer
  bridge so error tracking and analytics work inside the bundled
  profile too.

### Changed

- **`Source/ESBuild.ts` framework** rebuilt around dedicated config
  modules:
  - `Source/ESBuild/CodeEditorLand/{Editor,Bundle}.ts` for our own
    surface.
  - `Source/ESBuild/Microsoft/{VSCode,Bundle,Declaration}.ts` for
    the VS Code source compilation.
  - `Source/ESBuild/RestPlugin.ts` - optional Rest (OXC) bundler
    integration that engages when `Compiler=Rest` is set.
  - `Source/ESBuild/Output.ts` - the Output element's own build
    config.
- **12 exclusion-pattern modules** under `Source/ESBuild/Exclude/`
  (`Bootstrap`, `BuiltIn`, `Electron`, `NLS`, `Node`, `Potential`,
  `Server`, `Standalone`, `Telemetry`, `Test`, `Types`, `WebWorker`)
  so we drop Microsoft's Electron-specific paths cleanly without
  hand-maintaining a single mega-glob.

## [v2.0] - Editor Launch (Source Compilation Migration)

The pivotal cycle. We stopped consuming VS Code's prebuilt `out/`
artefacts and started compiling from `Dependency/Microsoft/Dependency/
Editor/src` ourselves.

### Changed

- **Switched to source compilation**. Compiling from source eliminates
  the test/package.json conflicts that plagued the prebuilt path,
  removes ephemeral `Target/` artefacts that drifted between commits,
  and lets us land transforms (the polyfill layer above) without
  vendoring patched `.js` files.
- **Two-stage pipeline now standard**:
  1. TypeScript → ESBuild config: `Source/ESBuild.ts` compiles to
     `Configuration/ESBuild/*.js`.
  2. ESBuild (or Rest, when enabled) bundles VS Code source → output
     tree at `Target/Microsoft/VSCode/vs/`. Per-build artefact count
     hovers around **4,287 .js files / 169 MB**.

## [v1.3] - Dependency Maintenance

TypeScript and browserslist refreshes. No source changes; the bundle
shape stayed stable across the cycle.

## [v1.2] - Full-Stack Integration

TypeScript 5.9.2 → 5.9.3, `@types/node` 24.x bumps, build-artefact
management improvements. We tightened how the bundled tree gets
checked in vs regenerated to keep churn off the diff.

## [v1.1] - Architecture Buildout

We started bundling VS Code platform code from source for Cocoon to
consume. Per-build numbers landed around **35,000+ .js files** and
**14,000 source maps**. We also moved `@playform/build` onto the
0.2.x → 0.3.x track.

## [v1.0] - Integration Phase

We landed **4,051 new files** in January as the VS Code module
compilation surface stabilised: source maps, **248** CSS files, **30**
SVG assets, and **28** MP3 sounds.

## [v0.2] - Architecture Solidification

### Added

- **Initial Output repository** stood up in October 2024.
- **First VS Code artefact batch** committed - 32,000+ `.js` files,
  ~1,028 insertions establishing the compilation pipeline.

### Removed

- **December 17, 2024**: 500+ inline assets from the early prototype
  cleared out as we moved to the proper VS Code source pipeline.

## [v0.0] - Project Inception

First-release dependency set: `@playform/build`, `typescript`,
`@types/node`, `mocha`, `sinon`, `deepmerge-ts`, `semver`, `cross-env`,
`browserslist`. Optional: `@codeeditorland/rest` for the OXC bundler
path.
