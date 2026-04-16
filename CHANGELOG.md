# Changelog

All notable changes to the Output element are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [0.5.0] — 2026 Q2

### Added

- ESBuild configuration for Output component
- ESBuild configuration with Tauri IPC stubs for VS Code compatibility
- Comprehensive Electron-to-Tauri polyfill layer
- PostHog build telemetry integration with complete polyfill layer
- Electron environment variable for build targeting
- Comprehensive technical documentation in README

### Changed

- Lazy-load RestPlugin only when Compiler=Rest env var is set
- Reformatted ESBuild configuration files with consistent style
- Made shell scripts POSIX-compliant

## [0.4.0] — 2026 Q1

### Added

- ESM build output generation

### Changed

- Migrated from prebuilt VS Code output to source compilation with Rest
- Configurable logging and streamlined declaration generation
- Updated TODO comments to FUTURE naming convention
- Removed ephemeral Target/ build artifacts from tracking
- Upgraded TypeScript from 5.9.3 to 6.0.2
- Updated @playform/build to v0.2.6, then v0.3.0
- Updated homepage URL
- Updated dependencies

## [0.3.0] — 2025 Q4

### Changed

- Updated dependencies (TypeScript 5.9.2 to 5.9.3, browserslist, sinon, mocha,
  @types/node, @webgpu/types, @types/sinon)
- Upgraded CI actions (actions/upload-artifact 5.0, actions/checkout 6.x,
  actions/setup-node 6.x)

## [0.2.0] — 2025 Q3

### Added

- VS Code platform bundling with incremental builds and optimized declarations
- TypeScript configuration for VS Code platform bundling
- Browser environment check for Electron exclusion
- Telemetry exclusions and browser targets configuration

### Changed

- Refactored ESBuild configuration and enhanced exclusion patterns
- Minified ESBuild configuration files and removed source maps
- Removed Electron-specific VS Code platform artifacts
- Replaced internal exclusion modules with @playform/build package
- Refined exclusion patterns for test and platform-specific code
- Streamlined ESBuild configuration and output
- Conditionally set build output paths for VS Code dependencies in development
- Relicensed project under CC0-1.0, then adopted Land Public License v1.0

### Fixed

- Corrected build output path condition for VS Code bundling
- Corrected trailing spaces in ESBuild exclusion paths

## [0.1.0] — 2025 Q2

### Added

- ESBuild configuration type definitions
- Initial VS Code artifact bundling pipeline

### Changed

- Updated dependencies

## [0.0.1] — 2025 Q1

### Added

- Initial bundled JS artifact generation from VS Code source
- ESBuild-based build pipeline consumed by Cocoon at runtime
- CI/CD workflows with GitHub Actions
- Dependabot configuration for automated dependency updates
