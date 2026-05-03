var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
const Marker = "__LAND_EAGER_IDLE_VALUE__";
function EagerIdleValue() {
  if (typeof window === "undefined") return;
  const Land = window;
  if (Land[Marker]) return;
  Land[Marker] = true;
  const EagerDeadline = {
    didTimeout: false,
    timeRemaining: /* @__PURE__ */ __name(() => 50, "timeRemaining")
  };
  const EagerRequestIdleCallback = /* @__PURE__ */ __name((Callback) => {
    return window.setTimeout(() => {
      try {
        Callback(EagerDeadline);
      } catch (Error2) {
        console.error("[LandFix:EagerIdle]", Error2);
      }
    }, 0);
  }, "EagerRequestIdleCallback");
  const EagerCancelIdleCallback = /* @__PURE__ */ __name((Identifier) => {
    window.clearTimeout(Identifier);
  }, "EagerCancelIdleCallback");
  window.requestIdleCallback = EagerRequestIdleCallback;
  window.cancelIdleCallback = EagerCancelIdleCallback;
  if (typeof globalThis !== "undefined") {
    globalThis["requestIdleCallback"] = EagerRequestIdleCallback;
    globalThis["cancelIdleCallback"] = EagerCancelIdleCallback;
  }
  if (typeof self !== "undefined" && self !== window) {
    self["requestIdleCallback"] = EagerRequestIdleCallback;
    self["cancelIdleCallback"] = EagerCancelIdleCallback;
  }
  console.log(
    "[LandFix:EagerIdleValue] requestIdleCallback collapsed to setTimeout(0); IdleValue executors run eagerly"
  );
}
__name(EagerIdleValue, "EagerIdleValue");
export {
  Marker,
  EagerIdleValue as default
};
//# sourceMappingURL=EagerIdleValue.js.map
