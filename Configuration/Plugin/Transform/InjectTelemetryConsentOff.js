var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
const Marker = "__LAND_TELEMETRY_CONSENT_OFF__";
const Polyfill = `
/* ${Marker} */
(function(){
	if (typeof window === "undefined") return;
	if (window.${Marker}) return;
	window.${Marker} = true;

	var Prebake = {
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
		"workbench.experimental.share.enabled": false,
	};

	// Stash for the IConfigurationService shim to consult on getValue.
	window.__LAND_PREBAKED_CONFIG__ = Prebake;

	// Pre-seed localStorage under VS Code's settings-storage prefixes
	// so on-boot reads see the disabled state without requiring
	// IConfigurationService to consult __LAND_PREBAKED_CONFIG__.
	function SeedLocalStorage() {
		try {
			for (var Key in Prebake) {
				if (!Object.prototype.hasOwnProperty.call(Prebake, Key)) continue;
				try {
					localStorage.setItem("settings.application." + Key, JSON.stringify(Prebake[Key]));
				} catch (E) {}
				try {
					localStorage.setItem("workbench.settings." + Key, JSON.stringify(Prebake[Key]));
				} catch (E) {}
			}
			localStorage.setItem("workbench.telemetry.optOut", "1");
			localStorage.setItem("vscode.telemetry.optOut", "1");
		} catch (E) {}
	}
	SeedLocalStorage();

	// Stub the env-side telemetry consent. \`vscode.env.isTelemetryEnabled\`
	// is a read-only getter on stock; we expose a window-global mirror
	// so any module that bypasses the API factory and reads from \`env\`
	// directly still sees disabled.
	window.__LAND_TELEMETRY_ENABLED__ = false;

	// Tag every visible boot path so we can confirm in log output:
	console.log("[LandFix:Telemetry] consent prebaked off; " + Object.keys(Prebake).length + " keys seeded");
})();
`;
const Plugin = {
  Kind: "Transform",
  Name: "InjectTelemetryConsentOff",
  Match: /* @__PURE__ */ __name(({ Path }) => Path.endsWith("vs/code/electron-browser/workbench/workbench.js"), "Match"),
  Transform({ Source }) {
    if (Source.includes(Marker)) return { Kind: "Unchanged" };
    return { Kind: "Rewrite", Source: Polyfill + Source };
  }
};
var InjectTelemetryConsentOff_default = Plugin;
export {
  InjectTelemetryConsentOff_default as default
};
//# sourceMappingURL=InjectTelemetryConsentOff.js.map
