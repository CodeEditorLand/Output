export default (Prefix: string) => [
	`${Prefix}/workbench/api/worker/`,

	// extensionService.js:1
	// GET http://localhost:3000/Static/Application/vs/workbench/services/extensions/browser/webWorkerExtensionHost.js net::ERR_ABORTED 404 (Not Found)
	// `${Prefix}/workbench/services/extensions/browser/webWorkerExtensionHost.js`,

	`${Prefix}/workbench/services/extensions/worker/`,
];
