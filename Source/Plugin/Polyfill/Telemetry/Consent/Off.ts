/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="es2022" />

/**
 * # TelemetryConsentOff polyfill
 *
 * Pre-bakes `telemetry.telemetryLevel: "off"` and ~30 related keys
 * into `localStorage` + a window-global so VS Code's TelemetryService
 * starts in already-disabled state and never opens a network
 * connection.
 */

type PrebakeKey =
	| "telemetry.telemetryLevel"
	| "telemetry.feedback.enabled"
	| "workbench.enableExperiments"
	| "workbench.settings.enableNaturalLanguageSearch"
	| "workbench.welcomePage.walkthroughs.openOnInstall"
	| "workbench.startupEditor"
	| "workbench.enableSearchEditorPreview"
	| "workbench.tips.enabled"
	| "workbench.welcomeBanner.enabled"
	| "update.mode"
	| "update.showReleaseNotes"
	| "update.enableWindowsBackgroundUpdates"
	| "extensions.autoUpdate"
	| "extensions.autoCheckUpdates"
	| "extensions.ignoreRecommendations"
	| "extensions.showRecommendationsOnlyOnDemand"
	| "extensions.closeExtensionDetailsOnViewChange"
	| "extensions.experimental.deferredStartupFinishedActivation"
	| "redhat.telemetry.enabled"
	| "chat.experimental.detectParticipant.enabled"
	| "chat.experimental.offerSetup"
	| "security.workspace.trust.banner"
	| "security.workspace.trust.startupPrompt"
	| "security.workspace.trust.untrustedFiles"
	| "security.workspace.trust.enabled"
	| "workbench.cloudChanges.autoStore"
	| "workbench.cloudChanges.continueOn"
	| "settingsSync.keybindingsPerPlatform"
	| "workbench.experimental.share.enabled";

export default function TelemetryConsentOff(): void {
	if (typeof window === "undefined") return;

	const Marker = "__LAND_TELEMETRY_CONSENT_OFF__";

	const Land = window as unknown as Record<string, unknown>;

	if (Land[Marker]) return;

	Land[Marker] = true;

	const Prebake: Record<PrebakeKey, string | boolean> = {
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

	Land["__LAND_PREBAKED_CONFIG__"] = Prebake;

	function SeedLocalStorage(): void {
		try {
			for (const Key of Object.keys(Prebake) as Array<PrebakeKey>) {
				const Value = JSON.stringify(Prebake[Key]);

				try {
					localStorage.setItem(`settings.application.${Key}`, Value);
				} catch {
					/* ignore quota / private mode */
				}

				try {
					localStorage.setItem(`workbench.settings.${Key}`, Value);
				} catch {
					/* ignore quota / private mode */
				}
			}

			localStorage.setItem("workbench.telemetry.optOut", "1");

			localStorage.setItem("vscode.telemetry.optOut", "1");
		} catch {
			/* ignore */
		}
	}

	SeedLocalStorage();

	Land["__LAND_TELEMETRY_ENABLED__"] = false;

	console.log(
		`[LandFix:Telemetry] consent prebaked off; ${Object.keys(Prebake).length} keys seeded`,
	);
}
