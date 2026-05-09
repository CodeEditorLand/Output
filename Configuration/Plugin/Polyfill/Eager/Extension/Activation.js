const s = "__LAND_EAGER_EXTENSION_ACTIVATION__";

function u() {
	if (typeof window > "u") return;

	const o = window;

	if (o[s]) return;

	o[s] = !0;

	function c() {
		try {
			const n = o.__CEL_SERVICES__;

			if (!n || typeof n.invokeFunction != "function") return !1;

			let t = null;

			if (
				(n.invokeFunction((i) => {
					try {
						const e = o.__CEL_BRANDS__;
						e &&
							e.IExtensionService &&
							(t = i.get(e.IExtensionService));
					} catch {}
				}),
				!t || typeof t.activateByEvent != "function")
			)
				return !1;

			let r = 0;

			for (const i of ["onStartupFinished", "*"])
				try {
					const e = t.activateByEvent(i);

					(e &&
						typeof e.then == "function" &&
						e.catch((v) => {
							console.warn(
								`[LandFix:EagerActivation] activateByEvent ${i} rejected: ${String(v)}`,
							);
						}),
						r++);
				} catch (e) {
					console.warn(
						`[LandFix:EagerActivation] activateByEvent ${i} threw: ${String(e)}`,
					);
				}

			return r > 0
				? (console.log(
						`[LandFix:EagerActivation] fired ${r} activation event(s) eagerly`,
					),
					!0)
				: !1;
		} catch (n) {
			return (
				console.warn(
					`[LandFix:EagerActivation] FireActivationEvents failed: ${String(n)}`,
				),
				!1
			);
		}
	}

	function a() {
		setTimeout(() => {
			if (!c()) {
				let n = 0;
				const t = setInterval(() => {
					(n++, (c() || n > 24) && clearInterval(t));
				}, 200);
			}
		}, 50);
	}

	document.readyState === "loading"
		? document.addEventListener("DOMContentLoaded", a, { once: !0 })
		: a();
}

export { s as Marker, u as default };
