export default (Prefix: string) => [
	`${Prefix}/workbench/api/worker`, // Exclude if confident Cocoon is the only host

	// extensionService.js:1
	// GET http://localhost:3000/Static/VSCode/vs/workbench/services/extensions/browser/webWorkerExtensionHost.js net::ERR_ABORTED 404 (Not Found)
	// `${Prefix}/workbench/services/extensions/browser/webWorkerExtensionHost.js`, // Specific file

	`${Prefix}/workbench/services/extensions/worker`, // Polyfill helper
];
