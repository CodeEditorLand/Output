export default (Prefix: string) => [
	// Exclude entire test directories (including package.json files)
	`${Prefix}/base/parts/ipc/test`,
	`${Prefix}/base/parts/ipc/test/*`,

	`${Prefix}/base/parts/request/test`,
	`${Prefix}/base/parts/request/test/*`,

	`${Prefix}/base/parts/sandbox/test`,
	`${Prefix}/base/parts/sandbox/test/*`,

	`${Prefix}/base/parts/storage/test`,
	`${Prefix}/base/parts/storage/test/*`,

	`${Prefix}/base/test`,
	`${Prefix}/base/test/*`,
	`${Prefix}/base/test/**`,

	`${Prefix}/editor/contrib/**/test`,
	`${Prefix}/editor/contrib/**/test/*`,

	`${Prefix}/editor/standalone/test`,
	`${Prefix}/editor/standalone/test/*`,

	`${Prefix}/editor/test`,
	`${Prefix}/editor/test/*`,

	`${Prefix}/platform/test`,
	`${Prefix}/platform/test/*`,

	`${Prefix}/platform/**/test`,
	`${Prefix}/platform/**/test/*`,

	`${Prefix}/server/test`,
	`${Prefix}/server/test/*`,

	`${Prefix}/workbench/api/test`,
	`${Prefix}/workbench/api/test/*`,

	`${Prefix}/workbench/contrib/**/test`,
	`${Prefix}/workbench/contrib/**/test/*`,

	`${Prefix}/workbench/services/**/test`,
	`${Prefix}/workbench/services/**/test/*`,

	`${Prefix}/workbench/test`,
	`${Prefix}/workbench/test/*`,

	// Exclude specific known test package directories (e.g., sessions-e2e-tests)
	`${Prefix}/vs/sessions/test`,
	`${Prefix}/vs/sessions/test/*`,

	// Exclude all packages with package.json under test directories
	// This prevents pnpm workspace detection conflicts
	`**/test/**/package.json`,
	`**/test/package.json`,

	// Catch-all: exclude all files recursively under any test directory
	`${Prefix}**/test/**`,
	`${Prefix}test/**`,
	`**/test/**`,

	// Also exclude fixtures and examples directories (often contain test-like code)
	`${Prefix}**/fixtures/**`,
	`${Prefix}**/examples/**`,
	`**/fixtures/**`,
	`**/examples/**`,
];
