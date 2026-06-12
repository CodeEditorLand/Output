// @ts-nocheck
// Side-effect import — registers LandShimInit on globalThis
import "./Init.js";

// Diagnostics — unified tracing pipeline
export {
	recordErrorTrace,
	recordEmitterTrace,
	recordCancelTrace,
	recordDisposableTrace,
	recordAsyncTrace,
	recordTimingTrace,
	recordAuditEntry,
	checkLandSwallowMap,
	forceFlush,
} from "./Diagnostics/LandDiagnostics.js";

// Low-level engine hooks
export { default as ErrorHandlerProxy } from "./Intercept/ErrorHandlerProxy.js";

export { default as EmitterFireProxy } from "./Intercept/EmitterFireProxy.js";

export { default as CancellationProxy } from "./Intercept/CancellationProxy.js";

export { default as DisposableProxy } from "./Intercept/DisposableProxy.js";

export { default as AsyncProxy } from "./Intercept/AsyncProxy.js";

export { default as TimingProxy } from "./Intercept/TimingProxy.js";
