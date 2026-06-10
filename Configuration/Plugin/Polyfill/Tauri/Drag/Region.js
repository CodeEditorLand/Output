var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
function TauriDragRegion() {
  if (typeof window === "undefined") return;
  if (typeof document === "undefined") return;
  const Marker = "__LAND_TAURI_DRAG_REGION__";
  const Land = window;
  if (Land[Marker]) return;
  Land[Marker] = true;
  const Attribute = "data-tauri-drag-region";
  const Global = globalThis;
  const Drag = Global.__LAND_DRAG_SELECTORS__ ?? [];
  const NoDrag = Global.__LAND_NO_DRAG_SELECTORS__ ?? [];
  if (Drag.length === 0 && NoDrag.length === 0) {
    return;
  }
  function StampMatching(Selectors, Value, Root) {
    for (const Selector of Selectors) {
      let Matches;
      try {
        Matches = Root.querySelectorAll(Selector);
      } catch {
        continue;
      }
      Matches.forEach((Element) => {
        if (Element.getAttribute(Attribute) !== Value) {
          Element.setAttribute(Attribute, Value);
        }
      });
    }
  }
  __name(StampMatching, "StampMatching");
  function StampAll(Root = document) {
    StampMatching(Drag, "", Root);
    StampMatching(NoDrag, "false", Root);
  }
  __name(StampAll, "StampAll");
  function IsDragTarget(El) {
    while (El) {
      if (El.nodeType === 1 && El.hasAttribute && El.hasAttribute(Attribute)) {
        const Value = El.getAttribute(Attribute);
        return Value !== "false";
      }
      El = El.parentElement;
    }
    return false;
  }
  __name(IsDragTarget, "IsDragTarget");
  function StartDragging() {
    try {
      const Tauri = globalThis.__TAURI__;
      const Win = Tauri?.window?.getCurrentWindow?.();
      if (Win && typeof Win.startDragging === "function") {
        const Result = Win.startDragging();
        if (Result && typeof Result.catch === "function") {
          Result.catch(() => {
          });
        }
        return;
      }
      const Invoke = Tauri?.core?.invoke ?? globalThis.__TAURI_INTERNALS__?.invoke;
      const Label = Tauri?.window?.getCurrentWindow?.()?.label ?? Tauri?.webviewWindow?.getCurrentWebviewWindow?.()?.label ?? "main";
      if (typeof Invoke === "function") {
        const Result = Invoke("plugin:window|start_dragging", {
          label: Label
        });
        if (Result && typeof Result.catch === "function") {
          Result.catch(() => {
          });
        }
      }
    } catch {
    }
  }
  __name(StartDragging, "StartDragging");
  function ToggleMaximize() {
    try {
      const Tauri = globalThis.__TAURI__;
      const Win = Tauri?.window?.getCurrentWindow?.();
      if (Win && typeof Win.toggleMaximize === "function") {
        const Result = Win.toggleMaximize();
        if (Result && typeof Result.catch === "function") {
          Result.catch(() => {
          });
        }
        return;
      }
      const Invoke = Tauri?.core?.invoke ?? globalThis.__TAURI_INTERNALS__?.invoke;
      const Label = Tauri?.window?.getCurrentWindow?.()?.label ?? Tauri?.webviewWindow?.getCurrentWebviewWindow?.()?.label ?? "main";
      if (typeof Invoke === "function") {
        const Result = Invoke(
          "plugin:window|internal_toggle_maximize",
          {
            label: Label
          }
        );
        if (Result && typeof Result.catch === "function") {
          Result.catch(() => {
          });
        }
      }
    } catch {
    }
  }
  __name(ToggleMaximize, "ToggleMaximize");
  function HandleMouseDown(Event) {
    if (Event.button !== 0) return;
    const Target = Event.target;
    if (!IsDragTarget(Target)) return;
    if (Event.detail === 2) {
      ToggleMaximize();
    } else {
      StartDragging();
    }
  }
  __name(HandleMouseDown, "HandleMouseDown");
  function Initialise() {
    StampAll();
    if (document.readyState !== "complete") {
      window.addEventListener("load", () => StampAll(), { once: true });
    }
    document.addEventListener("mousedown", HandleMouseDown, {
      capture: true,
      passive: true
    });
    const Root = document.body ?? document.documentElement;
    if (!Root) return;
    const Observer = new MutationObserver((Mutations) => {
      for (const Mutation of Mutations) {
        Mutation.addedNodes.forEach((Node) => {
          if (Node.nodeType !== 1) return;
          StampAll(Node);
        });
      }
    });
    Observer.observe(Root, { childList: true, subtree: true });
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
__name(TauriDragRegion, "TauriDragRegion");
export {
  TauriDragRegion as default
};
//# sourceMappingURL=Region.js.map
