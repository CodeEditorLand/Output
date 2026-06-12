# Output — TypeScript Build & Compiler Element

Output is the build pipeline and compiler integration element for CodeEditorLand, bundling the workbench with SWC/TypeScript and injecting runtime shims.

Refer to the [Architecture.md](./Architecture.md) for detailed layer diagrams and component maps.

---

## Shim Compatibility

| 🟠 Low-Level Shim | 🔵 Coverage Shim |
|-------------------|-----------------|
| Tier: `TierShim=Own\|Preempt` | Tier: `TierShim=Proxy\|Replace` |
| Engine prototype hooks | Service routing + audit |

> This Element supports the Land deep-shim interception system. Gated behind
> `TierShim` env var (default: `None` — zero overhead).

---

**Project Maintainers:** Source Open
([Source/Open@Editor.Land](mailto:Source/Open@Editor.Land)) |
[GitHub Repository](https://github.com/CodeEditorLand/Output) |
[Report an Issue](https://github.com/CodeEditorLand/Output/issues)
