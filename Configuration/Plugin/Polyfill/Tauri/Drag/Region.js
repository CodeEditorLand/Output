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
  function Walk(Rules, Out) {
    for (let Index = 0; Index < Rules.length; Index += 1) {
      const Rule = Rules.item(Index);
      if (!Rule) continue;
      if (Rule instanceof CSSStyleRule) {
        const Value = Rule.style.getPropertyValue("-webkit-app-region");
        if (Value === "drag") {
          Out.Drag.push(Rule.selectorText);
        } else if (Value === "no-drag") {
          Out.NoDrag.push(Rule.selectorText);
        }
      } else if (Rule instanceof CSSMediaRule || Rule instanceof CSSSupportsRule) {
        Walk(Rule.cssRules, Out);
      }
    }
  }
  __name(Walk, "Walk");
  function Collect() {
    const Out = { Drag: [], NoDrag: [] };
    for (let Index = 0; Index < document.styleSheets.length; Index += 1) {
      const Sheet = document.styleSheets.item(Index);
      if (!Sheet) continue;
      let Rules;
      try {
        Rules = Sheet.cssRules;
      } catch {
        continue;
      }
      Walk(Rules, Out);
    }
    return Out;
  }
  __name(Collect, "Collect");
  function StampMatching(Selectors, Value) {
    for (const Selector of Selectors) {
      let Matches;
      try {
        Matches = document.querySelectorAll(Selector);
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
  let Cached = { Drag: [], NoDrag: [] };
  function Refresh() {
    Cached = Collect();
    StampMatching(Cached.Drag, "");
    StampMatching(Cached.NoDrag, "false");
  }
  __name(Refresh, "Refresh");
  function ApplyToSubtree(Root) {
    for (const Selector of Cached.Drag) {
      try {
        Root.querySelectorAll(Selector).forEach((Element) => {
          if (Element.getAttribute(Attribute) !== "") {
            Element.setAttribute(Attribute, "");
          }
        });
      } catch {
        continue;
      }
    }
    for (const Selector of Cached.NoDrag) {
      try {
        Root.querySelectorAll(Selector).forEach((Element) => {
          if (Element.getAttribute(Attribute) !== "false") {
            Element.setAttribute(Attribute, "false");
          }
        });
      } catch {
        continue;
      }
    }
  }
  __name(ApplyToSubtree, "ApplyToSubtree");
  function Initialise() {
    Refresh();
    if (document.readyState !== "complete") {
      window.addEventListener("load", Refresh, { once: true });
    }
    const Root = document.body ?? document.documentElement;
    if (!Root) return;
    const Observer = new MutationObserver((Mutations) => {
      for (const Mutation of Mutations) {
        Mutation.addedNodes.forEach((Node) => {
          if (Node.nodeType !== 1) return;
          ApplyToSubtree(Node);
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
