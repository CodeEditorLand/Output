const c = "__LAND_STRIP_BACKGROUND_POLLING__";
function S() {
	if (typeof window > "u") return;
	const r = window;
	if (r[c]) return;
	r[c] = !0;
	const u = [
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
		"walkthroughs",
	];
	function a() {
		try {
			const n = new Error().stack ?? "";
			for (const e of u) if (n.indexOf(e) >= 0) return !0;
			return !1;
		} catch {
			return !1;
		}
	}
	const d = window.setInterval.bind(window),
		l = window.setTimeout.bind(window);
	let t = 0;
	const s = [],
		p = function () {
			if (a()) {
				if ((t++, s.length < 32))
					try {
						const o = (new Error().stack ?? "")
							.split(
								`
`,
							)
							.find(
								(i) =>
									i.indexOf("anonymous") < 0 && i.length > 0,
							);
						s.push(o ?? "(unknown)");
					} catch {}
				return 0;
			}
			const n = Array.prototype.slice.call(arguments);
			return d.apply(window, n);
		};
	window.setInterval = p;
	const m = function (n, e) {
		if (typeof e == "number" && e >= 3e4 && a()) return (t++, 0);
		const o = Array.prototype.slice.call(arguments);
		return l.apply(window, o);
	};
	((window.setTimeout = m),
		(r.__LAND_BACKGROUND_POLL_STATS__ = () => ({
			suppressedCount: t,
			recentlySuppressed: s.slice(),
		})));
}
export { c as Marker, S as default };
