var __defProp = Object.defineProperty;
var __name = (target, value) =>
	__defProp(target, "name", { value, configurable: true });
const Marker = "__LAND_EAGER_EXTENSION_ACTIVATION__";
function EagerExtensionActivation() {
	if (typeof window === "undefined") return;
	const Land = window;
	if (Land[Marker]) return;
	Land[Marker] = true;
	function FireActivationEvents() {
		try {
			const Services = Land["__CEL_SERVICES__"];
			if (!Services || typeof Services.invokeFunction !== "function") {
				return false;
			}
			let ExtSvc = null;
			Services.invokeFunction((Accessor) => {
				try {
					const Brands = Land["__CEL_BRANDS__"];
					if (Brands && Brands["IExtensionService"]) {
						ExtSvc = Accessor.get(Brands["IExtensionService"]);
					}
				} catch {}
			});
			if (!ExtSvc || typeof ExtSvc.activateByEvent !== "function") {
				return false;
			}
			let FireCount = 0;
			for (const EventName of ["onStartupFinished", "*"]) {
				try {
					const Result = ExtSvc.activateByEvent(EventName);
					if (Result && typeof Result.then === "function") {
						Result.catch((Error2) => {
							console.warn(
								`[LandFix:EagerActivation] activateByEvent ${EventName} rejected: ${String(Error2)}`,
							);
						});
					}
					FireCount++;
				} catch (Error2) {
					console.warn(
						`[LandFix:EagerActivation] activateByEvent ${EventName} threw: ${String(Error2)}`,
					);
				}
			}
			if (FireCount > 0) {
				console.log(
					`[LandFix:EagerActivation] fired ${FireCount} activation event(s) eagerly`,
				);
				return true;
			}
			return false;
		} catch (Error2) {
			console.warn(
				`[LandFix:EagerActivation] FireActivationEvents failed: ${String(Error2)}`,
			);
			return false;
		}
	}
	__name(FireActivationEvents, "FireActivationEvents");
	function ScheduleFire() {
		setTimeout(() => {
			if (!FireActivationEvents()) {
				let Attempts = 0;
				const Interval = setInterval(() => {
					Attempts++;
					if (FireActivationEvents() || Attempts > 24) {
						clearInterval(Interval);
					}
				}, 200);
			}
		}, 50);
	}
	__name(ScheduleFire, "ScheduleFire");
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", ScheduleFire, {
			once: true,
		});
	} else {
		ScheduleFire();
	}
}
__name(EagerExtensionActivation, "EagerExtensionActivation");
export { Marker, EagerExtensionActivation as default };
//# sourceMappingURL=EagerExtensionActivation.js.map
