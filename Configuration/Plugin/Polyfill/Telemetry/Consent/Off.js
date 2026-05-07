var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
const Marker = "__LAND_TELEMETRY_CONSENT_OFF__";
function TelemetryConsentOff() {
  if (typeof window === "undefined") return;
  const Land = window;
  if (Land[Marker]) return;
  Land[Marker] = true;
  const Prebake = {
    "telemetry.telemetryLevel": "off",
    "telemetry.feedback.enabled": false,
    "workbench.enableExperiments": false,
    "workbench.settings.enableNaturalLanguageSearch": false,
    "workbench.welcomePage.walkthroughs.openOnInstall": false,
    "workbench.startupEditor": "none",
    "workbench.enableSearchEditorPreview": false,
    "workbench.tips.enabled": false,
    "workbench.welcomeBanner.enabled": false,
    "update.mode": "none",
    "update.showReleaseNotes": false,
    "update.enableWindowsBackgroundUpdates": false,
    "extensions.autoUpdate": false,
    "extensions.autoCheckUpdates": false,
    "extensions.ignoreRecommendations": true,
    "extensions.showRecommendationsOnlyOnDemand": true,
    "extensions.closeExtensionDetailsOnViewChange": true,
    "extensions.experimental.deferredStartupFinishedActivation": false,
    "redhat.telemetry.enabled": false,
    "chat.experimental.detectParticipant.enabled": false,
    "chat.experimental.offerSetup": false,
    "security.workspace.trust.banner": "never",
    "security.workspace.trust.startupPrompt": "never",
    "security.workspace.trust.untrustedFiles": "open",
    "security.workspace.trust.enabled": false,
    "workbench.cloudChanges.autoStore": "off",
    "workbench.cloudChanges.continueOn": "off",
    "settingsSync.keybindingsPerPlatform": false,
    "workbench.experimental.share.enabled": false
  };
  Land["__LAND_PREBAKED_CONFIG__"] = Prebake;
  function SeedLocalStorage() {
    try {
      for (const Key of Object.keys(Prebake)) {
        const Value = JSON.stringify(Prebake[Key]);
        try {
          localStorage.setItem(`settings.application.${Key}`, Value);
        } catch {
        }
        try {
          localStorage.setItem(`workbench.settings.${Key}`, Value);
        } catch {
        }
      }
      localStorage.setItem("workbench.telemetry.optOut", "1");
      localStorage.setItem("vscode.telemetry.optOut", "1");
    } catch {
    }
  }
  __name(SeedLocalStorage, "SeedLocalStorage");
  SeedLocalStorage();
  Land["__LAND_TELEMETRY_ENABLED__"] = false;
  console.log(
    `[LandFix:Telemetry] consent prebaked off; ${Object.keys(Prebake).length} keys seeded`
  );
}
__name(TelemetryConsentOff, "TelemetryConsentOff");
export {
  Marker,
  TelemetryConsentOff as default
};
//# sourceMappingURL=Off.js.map
