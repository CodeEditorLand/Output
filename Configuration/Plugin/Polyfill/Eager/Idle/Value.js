const o = "__LAND_EAGER_IDLE_VALUE__";

function s() {

	if (typeof window > "u") return;

	const l = window;

	if (l[o]) return;

	l[o] = !0;

	const d = { didTimeout: !1, timeRemaining: () => 50 },

		e = (a) =>
			window.setTimeout(() => {
				try {
					a(d);
				} catch (r) {
					console.error("[LandFix:EagerIdle]", r);
				}
			}, 0),

		n = (a) => {

			window.clearTimeout(a);
		};

	((window.requestIdleCallback = e),

		(window.cancelIdleCallback = n),

		typeof globalThis < "u" &&
			((globalThis.requestIdleCallback = e),

			(globalThis.cancelIdleCallback = n)),

		typeof self < "u" &&
			self !== window &&
			((self.requestIdleCallback = e), (self.cancelIdleCallback = n)),

		console.log(
			"[LandFix:EagerIdleValue] requestIdleCallback collapsed to setTimeout(0); IdleValue executors run eagerly",
		));
}

export { o as Marker, s as default };
