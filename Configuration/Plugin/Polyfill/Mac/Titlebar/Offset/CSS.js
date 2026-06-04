var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
function MacTitlebarOffsetCSS() {
  if (typeof window === "undefined") return;
  const Marker = "__LAND_MAC_TITLEBAR_OFFSET__";
  const Land = window;
  if (Land[Marker]) return;
  Land[Marker] = true;
  function InstallStylesheet() {
    const Style = document.createElement("style");
    Style.setAttribute("data-land-mac-titlebar-offset", "1");
    Style.textContent = [
      // Reserve the traffic-light cluster width on the left of the
      // titlebar container. Targets `.mac` so non-macOS builds keep
      // their stock layout.
      ".monaco-workbench.mac .part.titlebar > .titlebar-container {",
      "	padding-left: 80px;",
      // Traffic lights live on the LEFT on macOS. No right padding
      // is needed; asserted explicitly so a future stock rule
      // cannot introduce drift on the right edge.
      "	padding-right: 0;",
      "}",
      // Stock VS Code declares `flex-direction: row-reverse` on
      // `.monaco-workbench.mac .part.titlebar` (titlebarpart.css
      // line 14) so the OS-painted Windows-style controls would
      // flow at the visual left of the flex row. Under Tauri's
      // overlay titlebar there are no Windows controls; the macOS
      // traffic lights live on the left and our padding-left:80px
      // (above) reserves space for them. Force plain `row` so
      // titlebar-left / titlebar-center / titlebar-right render in
      // document order LTR. `.titlebar-drag-region` is
      // `position: absolute` per stock CSS, so it doesn't
      // participate in flex layout either way.
      ".monaco-workbench.mac .part.titlebar {",
      "	flex-direction: row !important;",
      "}",
      // `.titlebar-drag-region` keeps its stock geometry
      // (`left: 0; width: 100%`). macOS owns the traffic-light
      // hit-test at the OS level so clicks on the buttons never
      // reach the webview; everywhere else in the titlebar drags
      // the window. The `data-tauri-drag-region` attribute the
      // TauriDragRegion polyfill stamps on this element is what
      // Tauri's hit-test actually reads. No CSS override of the
      // drag-region geometry is needed.
      //
      // Command-center quick-pick (`Select pickers` in the user's
      // vocabulary) is centered on the titlebar via
      // `.titlebar-center` and unaffected by the left padding -
      // but its `min-width: 0` allows it to flex into the
      // reserved area on narrow windows. Lock a sensible
      // `margin-inline-start` so it doesn't drift back under the
      // traffic lights on a 1024px-wide split.
      ".monaco-workbench.mac .part.titlebar > .titlebar-container.has-center > .titlebar-center {",
      "	margin-inline-start: 16px;",
      "}",
      // --- Fullscreen reclaim ----------------------------------
      // Toggled by the detector below via `body.land-fullscreen`.
      // macOS native fullscreen hides the traffic-light cluster
      // entirely; reclaim the 80px container reservation so the
      // menubar + command-center expand to the left edge.
      // Overrides the rule above by virtue of being more specific
      // (extra `.land-fullscreen` class on `body`).
      "body.land-fullscreen .monaco-workbench.mac .part.titlebar > .titlebar-container {",
      "	padding-left: 0;",
      "}"
    ].join("\n");
    (document.head ?? document.documentElement).appendChild(Style);
  }
  __name(InstallStylesheet, "InstallStylesheet");
  function InstallFullscreenDetector() {
    const IsFullscreen = /* @__PURE__ */ __name(() => {
      if (document.fullscreenElement) return true;
      try {
        if (window.matchMedia?.("(display-mode: fullscreen)")?.matches) {
          return true;
        }
      } catch {
      }
      const ScreenWidth = window.screen?.width ?? Number.POSITIVE_INFINITY;
      const ScreenHeight = window.screen?.height ?? Number.POSITIVE_INFINITY;
      return window.outerHeight >= ScreenHeight - 1 && window.outerWidth >= ScreenWidth - 1;
    }, "IsFullscreen");
    const Apply = /* @__PURE__ */ __name(() => {
      const Active = IsFullscreen();
      document.body?.classList.toggle("land-fullscreen", Active);
    }, "Apply");
    Apply();
    window.addEventListener("resize", Apply);
    document.addEventListener("fullscreenchange", Apply);
    try {
      const MediaQuery = window.matchMedia?.(
        "(display-mode: fullscreen)"
      );
      if (MediaQuery && typeof MediaQuery.addEventListener === "function") {
        MediaQuery.addEventListener("change", Apply);
      } else if (MediaQuery && typeof MediaQuery.addListener === "function") {
        MediaQuery.addListener(Apply);
      }
    } catch {
    }
  }
  __name(InstallFullscreenDetector, "InstallFullscreenDetector");
  function Initialise() {
    InstallStylesheet();
    InstallFullscreenDetector();
  }
  __name(Initialise, "Initialise");
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", Initialise, {
      once: true
    });
  } else {
    Initialise();
  }
}
__name(MacTitlebarOffsetCSS, "MacTitlebarOffsetCSS");
export {
  MacTitlebarOffsetCSS as default
};
//# sourceMappingURL=CSS.js.map
