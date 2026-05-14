var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
function EagerLifecyclePhase() {
  if (typeof window === "undefined") return;
  const Marker = "__LAND_EAGER_LIFECYCLE_PHASE__";
  const Land = window;
  if (Land[Marker]) return;
  Land[Marker] = true;
  function AdvancePhase() {
    try {
      const Services = Land["__CEL_SERVICES__"];
      if (!Services || typeof Services.invokeFunction !== "function") {
        return false;
      }
      let Lifecycle = null;
      Services.invokeFunction((Accessor) => {
        try {
          const Brands = Land["__CEL_BRANDS__"];
          if (Brands && Brands["ILifecycleService"]) {
            Lifecycle = Accessor.get(
              Brands["ILifecycleService"]
            );
          }
        } catch {
        }
      });
      if (!Lifecycle) return false;
      try {
        const ServiceReference = Lifecycle;
        if (typeof ServiceReference.phase !== "undefined" && ServiceReference.phase < 4) {
          ServiceReference.phase = 4;
          console.log(
            "[LandFix:Lifecycle] phase advanced eagerly to Eventually"
          );
          return true;
        }
      } catch (Error2) {
        console.warn(
          `[LandFix:Lifecycle] phase setter rejected: ${String(Error2)}`
        );
      }
      return false;
    } catch (Error2) {
      console.warn(
        `[LandFix:Lifecycle] advance failed: ${String(Error2)}`
      );
      return false;
    }
  }
  __name(AdvancePhase, "AdvancePhase");
  function ScheduleAdvance() {
    setTimeout(() => {
      if (!AdvancePhase()) {
        let Attempts = 0;
        const Interval = setInterval(() => {
          Attempts++;
          if (AdvancePhase() || Attempts > 14) {
            clearInterval(Interval);
          }
        }, 200);
      }
    }, 100);
  }
  __name(ScheduleAdvance, "ScheduleAdvance");
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ScheduleAdvance, {
      once: true
    });
  } else {
    ScheduleAdvance();
  }
}
__name(EagerLifecyclePhase, "EagerLifecyclePhase");
export {
  EagerLifecyclePhase as default
};
//# sourceMappingURL=Phase.js.map
