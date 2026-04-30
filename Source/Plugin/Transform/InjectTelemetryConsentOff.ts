/**
 * Pre-bake `telemetry.telemetryLevel: "off"` and friends into the
 * workbench bootstrap so VS Code's TelemetryService starts in
 * already-disabled state and never opens a network connection.
 *
 * # Why
 *
 * `Output/Source/ESBuild/Exclude/Network.ts` removes the wire-level
 * appenders (1dsAppender, oneDataSystemAppender) so even if the
 * service tried to send, the modules wouldn't be in the bundle.
 * `Telemetry.ts` removes the higher-level service. But VS Code has
 * MANY consumers that read `telemetry.telemetryLevel` at module-eval
 * time and gate behaviour on it. Pre-baking `"off"` makes those
 * consumers structurally inert: the if/else branches taken at boot
 * are the no-op branches, and dead-code-elimination removes the
 * "send" branches even if the appender modules survive tree-shake.
 *
 * # Keys pre-baked (mirror VS Code's defaults that we want OFF)
 *
 *   telemetry.telemetryLevel       "off"     master switch
 *   telemetry.feedback.enabled     false     no NPS prompts
 *   workbench.enableExperiments    false     no A/B feature flips
 *   workbench.settings.enableNaturalLanguageSearch    false
 *   workbench.welcomePage.walkthroughs.openOnInstall  false
 *   workbench.startupEditor        "none"
 *   update.mode                    "none"
 *   update.showReleaseNotes        false
 *   extensions.autoUpdate          false
 *   extensions.autoCheckUpdates    false
 *   extensions.experimental.affinity        {}
 *   extensions.experimental.deferredStartupFinishedActivation false
 *   redhat.telemetry.enabled       false (community convention)
 *   workbench.enableSearchEditorPreview     false
 *   chat.experimental.detectParticipant.enabled false
 *   chat.experimental.offerSetup   false
 *   security.workspace.trust.banner "never"
 *   security.workspace.trust.startupPrompt  "never"
 *   security.workspace.trust.untrustedFiles "open"
 *
 * # How
 *
 * Stash the values on `globalThis.__LAND_PREBAKED_CONFIG__` before
 * any workbench module runs. The `IConfigurationService` shim in
 * Mountain consults this object on every `getValue(key)` first;
 * if a prebaked value exists, return it. Otherwise fall through to
 * settings.json + workspace overrides as usual.
 *
 * For TS-side consumers that bypass IConfigurationService (cached
 * module-scope reads), we also patch `localStorage` with the same
 * keys under their settings-storage prefix so the on-disk state
 * looks already-set.
 *
 * Idempotent. Marker `__LAND_TELEMETRY_CONSENT_OFF__`.
 */

import type { TransformPlugin } from "../Type.js";

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

const Plugin: TransformPlugin = {
	Kind: "Transform",
	Name: "InjectTelemetryConsentOff",
	Match: ({ Path }) => Path.endsWith("vs/code/electron-browser/workbench/workbench.js"),
	Transform({ Source }) {
		if (Source.includes(Marker)) return { Kind: "Unchanged" };
		return { Kind: "Rewrite", Source: Polyfill + Source };
	},
};

export default Plugin;
