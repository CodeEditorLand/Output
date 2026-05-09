const r = "__LAND_TELEMETRY_CONSENT_OFF__";

function o() {
	if (typeof window > "u") return;

	const e = window;

	if (e[r]) return;

	e[r] = !0;

	const t = {
		"telemetry.telemetryLevel": "off",

		"telemetry.feedback.enabled": !1,

		"workbench.enableExperiments": !1,

		"workbench.settings.enableNaturalLanguageSearch": !1,

		"workbench.welcomePage.walkthroughs.openOnInstall": !1,

		"workbench.startupEditor": "none",

		"workbench.enableSearchEditorPreview": !1,

		"workbench.tips.enabled": !1,

		"workbench.welcomeBanner.enabled": !1,

		"update.mode": "none",

		"update.showReleaseNotes": !1,

		"update.enableWindowsBackgroundUpdates": !1,

		"extensions.autoUpdate": !1,

		"extensions.autoCheckUpdates": !1,

		"extensions.ignoreRecommendations": !0,

		"extensions.showRecommendationsOnlyOnDemand": !0,

		"extensions.closeExtensionDetailsOnViewChange": !0,

		"extensions.experimental.deferredStartupFinishedActivation": !1,

		"redhat.telemetry.enabled": !1,

		"chat.experimental.detectParticipant.enabled": !1,

		"chat.experimental.offerSetup": !1,

		"security.workspace.trust.banner": "never",

		"security.workspace.trust.startupPrompt": "never",

		"security.workspace.trust.untrustedFiles": "open",

		"security.workspace.trust.enabled": !1,

		"workbench.cloudChanges.autoStore": "off",

		"workbench.cloudChanges.continueOn": "off",

		"settingsSync.keybindingsPerPlatform": !1,

		"workbench.experimental.share.enabled": !1,
	};

	e.__LAND_PREBAKED_CONFIG__ = t;

	function s() {
		try {
			for (const n of Object.keys(t)) {
				const a = JSON.stringify(t[n]);

				try {
					localStorage.setItem(`settings.application.${n}`, a);
				} catch {}

				try {
					localStorage.setItem(`workbench.settings.${n}`, a);
				} catch {}
			}

			(localStorage.setItem("workbench.telemetry.optOut", "1"),
				localStorage.setItem("vscode.telemetry.optOut", "1"));
		} catch {}
	}

	(s(),
		(e.__LAND_TELEMETRY_ENABLED__ = !1),
		console.log(
			`[LandFix:Telemetry] consent prebaked off; ${Object.keys(t).length} keys seeded`,
		));
}

export { r as Marker, o as default };
