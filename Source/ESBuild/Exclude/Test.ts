export default (Prefix: string) => [
	`${Prefix}/base/parts/ipc/test`,
	`${Prefix}/base/parts/request/test`,
	`${Prefix}/base/parts/sandbox/test`,
	`${Prefix}/base/parts/storage/test`,
	`${Prefix}/base/test`,
	`${Prefix}/editor/contrib/**/test`,
	`${Prefix}/editor/standalone/test`,
	`${Prefix}/editor/test`,
	`${Prefix}/platform/test`,
	`${Prefix}/platform/**/test`,
	`${Prefix}/server/test`,
	`${Prefix}/workbench/api/test`,
	`${Prefix}/workbench/contrib/**/test`,
	`${Prefix}/workbench/services/**/test`,
	`${Prefix}/workbench/test`,

	// --- 1. Test Files (High Confidence Exclude) ---
	// // (Your existing list covers this well)
	// `${Prefix}/workbench/services/**/test`, // All tests under workbench services
	// `${Prefix}/workbench/test`,
];
