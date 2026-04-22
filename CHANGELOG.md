# Changelog

All notable changes to Output (Bundled VS Code Artifacts) are documented here.
Format: [Keep a Changelog](https://keepachangelog.com/).

## [v2.0] - Q1 2026: Editor Launch Sprint

### April 11: Polyfill Layer (Pivotal)

#### Added

- 6 Electron-to-Tauri polyfill modules in `Source/Polyfill/` (~5,200 lines):
  - `ProcessPolyfill.ts` - Node.js process API for Tauri
  - `FileSystemPolyfill.ts` - fs module → Mountain file:invoke
  - `FileProtocolShim.ts` - protocol handler interception
  - `ChildProcessPolyfill.ts` - child_process → Mountain electron:
  - `IPCRendererShim.ts` - Electron ipcRenderer simulation
  - `NativeModulePolyfill.ts` - require('electron') stub
- `Source/Service/TauriMainProcessService.ts` - Electron→Tauri IPC adapter
- `Source/Service/DevLog.ts` - tag-filtered development logging
- `Source/Service/Trace.ts`
- PostHog telemetry integration

### April 6-7: ESBuild Configuration Framework

#### Added

- `Source/ESBuild.ts` - main ESBuild configuration entry
- `Source/ESBuild/CodeEditorLand/Editor.ts` + `Bundle.ts`
- `Source/ESBuild/Microsoft/VSCode.ts` + `Bundle.ts` + `Declaration.ts`
- `Source/ESBuild/RestPlugin.ts` - optional Rest bundler integration (loads
  when `Compiler=Rest` env var set)
- `Source/ESBuild/Output.ts` - output element build config
- 12 exclusion pattern modules in `Source/ESBuild/Exclude/`: Bootstrap.ts,
  BuiltIn.ts, Electron.ts, NLS.ts, Node.ts, Potential.ts, Server.ts,
  Standalone.ts, Telemetry.ts, Test.ts, Types.ts, WebWorker.ts

### March 13: Source Compilation Migration (Pivotal)

#### Changed

- Switched from prebuilt VS Code `out/` artifacts to compiling from
  `Dependency/Microsoft/Dependency/Editor/src`
- Eliminates test package.json conflicts
- Removed ephemeral Target/ artifacts

### Build Architecture

Two-stage compilation pipeline:
1. TypeScript → ESBuild config: `Source/ESBuild.ts` → `Configuration/ESBuild/*.js`
2. ESBuild/Rest bundling: VS Code source → `Target/Microsoft/VSCode/vs/`
   (4,287 .js files, 169MB)

## [v1.3] - Q4 2025: Dependency Maintenance

### Changed

- TypeScript, browserslist updates
- No source changes

## [v1.2] - Q3 2025: Full Stack Integration

### Changed

- TypeScript 5.9.2 → 5.9.3
- @types/node 24.x updates
- Build artifact management

## [v1.1] - Q2 2025: Architecture Buildout

### Added

- VS Code platform code bundled from source for Cocoon consumption
- 35K+ .js files, 14K source maps per build cycle

### Changed

- @playform/build updated to 0.2.x → 0.3.x series

## [v1.0] - Q1 2025: Integration Phase

### Added

- 4,051 new files in January (VS Code module compilation)
- Source maps, CSS (248 files), SVG (30), MP3 (28) assets

## [v0.2] - Q4 2024: Architecture Solidification

### Added

- Initial Output repository created (October 2024)
- First VS Code artifact batch: 32K+ .js files
- 1,028 insertions establishing compilation pipeline

### Removed

- December 17: massive inline Assets (~500+ files) cleaned up

### Dependencies (First Release)

- @playform/build, typescript, @types/node, mocha, sinon, deepmerge-ts,
  semver, cross-env, browserslist
- Optional: @codeeditorland/rest (OXC bundler)
