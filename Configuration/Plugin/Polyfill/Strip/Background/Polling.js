var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
function StripBackgroundPolling() {
  if (typeof window === "undefined") return;
  const Marker = "__LAND_STRIP_BACKGROUND_POLLING__";
  const Land = window;
  if (Land[Marker]) return;
  Land[Marker] = true;
  const DenyFragments = [
    "telemetryService",
    "telemetryUtils",
    "telemetryLogAppender",
    "1dsAppender",
    "oneDataSystemAppender",
    "errorTelemetry",
    "userDataSyncService",
    "userDataAutoSyncService",
    "userDataSyncMachinesService",
    "settingsSync",
    "updateService",
    "abstractUpdateService",
    "extensionGalleryService",
    "extensionsTipsService",
    "extensionRecommendationsService",
    "exeBasedRecommendations",
    "keymapRecommendations",
    "configBasedRecommendations",
    "remoteAgentService",
    "remoteTunnelService",
    "liveShare",
    "issueService",
    "surveyService",
    "experimentService",
    "assignmentService",
    "mcpGalleryService",
    "welcomeBanner",
    "walkthroughs"
  ];
  function CallerMatchesDeny() {
    try {
      const Stack = new Error().stack ?? "";
      for (const Fragment of DenyFragments) {
        if (Stack.indexOf(Fragment) >= 0) {
          return true;
        }
      }
      return false;
    } catch {
      return false;
    }
  }
  __name(CallerMatchesDeny, "CallerMatchesDeny");
  const OriginalSetInterval = window.setInterval.bind(window);
  const OriginalSetTimeout = window.setTimeout.bind(window);
  let Suppressed = 0;
  const SuppressedRingBuffer = [];
  const PatchedSetInterval = /* @__PURE__ */ __name(function() {
    if (CallerMatchesDeny()) {
      Suppressed++;
      if (SuppressedRingBuffer.length < 32) {
        try {
          const Stack = new Error().stack ?? "";
          const FirstNonAnonymous = Stack.split("\n").find(
            (Line) => Line.indexOf("anonymous") < 0 && Line.length > 0
          );
          SuppressedRingBuffer.push(FirstNonAnonymous ?? "(unknown)");
        } catch {
        }
      }
      return 0;
    }
    const Args = Array.prototype.slice.call(arguments);
    return OriginalSetInterval.apply(window, Args);
  }, "PatchedSetInterval");
  window.setInterval = PatchedSetInterval;
  const PatchedSetTimeout = /* @__PURE__ */ __name(function(_Callback, Delay) {
    if (typeof Delay === "number" && Delay >= 3e4 && CallerMatchesDeny()) {
      Suppressed++;
      return 0;
    }
    const Args = Array.prototype.slice.call(arguments);
    return OriginalSetTimeout.apply(window, Args);
  }, "PatchedSetTimeout");
  window.setTimeout = PatchedSetTimeout;
  Land["__LAND_BACKGROUND_POLL_STATS__"] = () => {
    return {
      suppressedCount: Suppressed,
      recentlySuppressed: SuppressedRingBuffer.slice()
    };
  };
}
__name(StripBackgroundPolling, "StripBackgroundPolling");
export {
  StripBackgroundPolling as default
};
//# sourceMappingURL=Polling.js.map
