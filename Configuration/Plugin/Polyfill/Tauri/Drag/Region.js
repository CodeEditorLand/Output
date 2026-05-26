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
  function InvokeWindowCommand(Command) {
    try {
      const Tauri = globalThis.__TAURI__;
      const Invoke = Tauri?.core?.invoke ?? globalThis.__TAURI_INTERNALS__?.invoke;
      if (typeof Invoke === "function") {
        Invoke(Command).catch?.(() => {
        });
        return;
      }
      const Win = Tauri?.window?.getCurrentWindow?.();
      if (Command === "plugin:window|start_dragging") {
        Win?.startDragging?.().catch?.(() => {
        });
      } else if (Command === "plugin:window|internal_toggle_maximize") {
        const Already = Win?.isMaximized?.();
        if (typeof Already?.then === "function") {
          Already.then((Yes) => {
            (Yes ? Win.unmaximize?.() : Win.maximize?.())?.catch?.(
              () => {
              }
            );
          }).catch?.(() => {
          });
        } else {
          Win?.toggleMaximize?.()?.catch?.(() => {
          });
        }
      }
    } catch {
    }
  }
  __name(InvokeWindowCommand, "InvokeWindowCommand");
  function HandleMouseDown(Event) {
    if (Event.button !== 0) return;
    const Target = Event.target;
    if (!IsDragTarget(Target)) return;
    if (Event.detail === 2) {
      InvokeWindowCommand("plugin:window|internal_toggle_maximize");
    } else {
      InvokeWindowCommand("plugin:window|start_dragging");
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
