export default (Prefix: string) => [
	// `${Prefix}/platform/profiling/*`, // Removed: profiling.js is needed by extensions.js

	`${Prefix}/platform/cssDev/*`,

	// If no core markdown rendering needed
	// `${Prefix}/base/common/marked`,

	// `${Prefix}/base/browser/dompurify`,
];
