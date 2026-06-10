var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
function PartZIndexCSS() {
  if (typeof window === "undefined") return;
  const Marker = "__LAND_PART_ZINDEX__";
  const Land = window;
  if (Land[Marker]) return;
  Land[Marker] = true;
  function InstallStylesheet() {
    const Style = document.createElement("style");
    Style.setAttribute("data-land-part-zindex", "1");
    Style.textContent = [
      // Make every part a stacking context so its descendants
      // don't escape upwards into a sibling part. `isolation:
      // isolate` is cheaper than `transform: translateZ(0)` and
      // doesn't nudge subpixel rendering.
      ".monaco-workbench .part {",
      "	isolation: isolate;",
      "}",
      // Editor sits at the bottom of the workbench's z-stack so
      // floating UI (panel resize handles, sidebar shadows)
      // renders on top.
      ".monaco-workbench .part.editor {",
      "	z-index: 1;",
      "}",
      // Activity bar lives left/right of the workbench and must
      // render above the editor's overlay layers (drop targets,
      // minimap shadow). 10 keeps it well below the titlebar
      // (2500) and quick-pick (2550) ladder.
      ".monaco-workbench .part.activitybar {",
      "	z-index: 10;",
      "}",
      // Sidebar / auxiliary bar / bottom panel share a tier just
      // above the activity bar so resize handles draw correctly
      // against the editor's content.
      ".monaco-workbench .part.sidebar,",
      ".monaco-workbench .part.auxiliarybar,",
      ".monaco-workbench .part.panel {",
      "	z-index: 11;",
      "}",
      // Banner (workspace trust banner, update notifications)
      // sits above panels but below the status bar.
      ".monaco-workbench .part.banner {",
      "	z-index: 12;",
      "}",
      // Status bar must always be visible at the bottom even when
      // a maximized panel is in front. Stock has no explicit
      // z-index so a maximized panel (`.part.panel.maximized`)
      // occasionally clips the right-edge progress badges.
      ".monaco-workbench .part.statusbar {",
      "	z-index: 20;",
      "}",
      // When the panel is maximized the workbench gives it a
      // `display:flex` row that fills the editor area; without an
      // explicit z-index the panel viewlet header can hide under
      // the floating editor toolbar. Pin it.
      ".monaco-workbench .part.panel.maximized {",
      "	z-index: 13;",
      "}",
      // Drop-target overlays the editor uses for drag-and-drop of
      // tabs need to stay above the editor (z 1) but below all
      // panels. 5 fits cleanly between editor and activity bar.
      ".monaco-workbench .editor-drop-target,",
      ".monaco-workbench .editor-group-watermark {",
      "	z-index: 5;",
      "}",
      // Make sure the command-center quick-pick (`.quick-input-widget`)
      // keeps its 2550 layer even when an extension's webview
      // inside the editor sets a higher z-index. Stock CSS doesn't
      // guard against this and an offending extension can hide the
      // picker entirely. We hoist explicitly to defeat shenanigans.
      ".monaco-workbench .quick-input-widget {",
      "	z-index: 2550 !important;",
      "}",
      // Notification toasts likewise - extensions occasionally
      // inject `position:fixed; z-index:9999999` into their
      // webview, which under our scheme bleeds into the host
      // stacking context. Stock CSS sets toasts at 2000; bump
      // just above quick-pick so they remain visible during a
      // command-palette session.
      ".monaco-workbench .notifications-toasts {",
      "	z-index: 2575 !important;",
      "}",
      // Context-view container hosts every dropdown / context menu /
      // hover popover that flows through `vs/base/browser/ui/contextview`:
      //   - Menubar dropdowns (File / Edit / View / …) when clicked
      //   - Right-click context menus on the editor, explorer, panels
      //   - Quick-pick command palette (Cmd+Shift+P)
      //   - Hover messages from `vscode.languages.registerHoverProvider`
      //   - Inline suggestion popovers from extensions
      //
      // Stock VS Code relies on Chromium's implicit document-order
      // stacking; the editor's `z-index: 1` (set above) defeats
      // that ordering, causing dropdowns anchored to the menubar to
      // render UNDER the editor's content. Pin context-view above
      // the titlebar (2500) and quick-pick (2550) so it always wins.
      ".monaco-workbench .context-view,",
      "body > .context-view {",
      "	z-index: 2600 !important;",
      "}",
      // `.context-view.fixed` uses `all: initial` which RESETS z-index
      // to `auto` after the rule above - defeats our pin. Add a more-
      // specific selector that wins over `all: initial`.
      ".monaco-workbench .context-view.fixed,",
      "body > .context-view.fixed {",
      "	position: fixed !important;",
      "	z-index: 2600 !important;",
      "}",
      // `.shadow-root-host` is the wrapper VS Code uses when the
      // contextview is hosted in a shadow DOM (ContextView.ts:131).
      // Pin its z-index too; shadow-root-host is what the parent
      // compositor actually sees.
      "body .shadow-root-host {",
      "	z-index: 2600 !important;",
      "}",
      // Monaco's own popover containers used by certain hover providers
      // occasionally bypass the contextview machinery. Pin them above
      // the editor's `z-index: 1` so find/replace, parameter hints,
      // and suggestion popups remain visible.
      ".monaco-workbench .monaco-hover,",
      ".monaco-workbench .editor-widget {",
      "	z-index: 50 !important;",
      "}"
    ].join("\n");
    (document.head ?? document.documentElement).appendChild(Style);
  }
  __name(InstallStylesheet, "InstallStylesheet");
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", InstallStylesheet, {
      once: true
    });
  } else {
    InstallStylesheet();
  }
}
__name(PartZIndexCSS, "PartZIndexCSS");
export {
  PartZIndexCSS as default
};
//# sourceMappingURL=CSS.js.map
