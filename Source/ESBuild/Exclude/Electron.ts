export default (Prefix: string) => [
	`${Prefix}/code/electron-*`, // All electron-main, electron-sandbox, electron-utility
	`${Prefix}/platform/**/electron-*`, // All electron-main, electron-sandbox platform code
	`${Prefix}/workbench/electron-*`, // All electron-sandbox workbench code
	`${Prefix}/workbench/services/**/electron-*`, // All electron-sandbox services code
	`${Prefix}/base/node`, // All base node utilities (handled by Cocoon shims)
	`${Prefix}/base/parts/ipc/node`,
	`${Prefix}/base/parts/storage/node`,
	`${Prefix}/base/parts/sandbox/node`, // Should already be covered by sandbox/*
	`${Prefix}/platform/files/node/watcher`, // Native watchers
	`${Prefix}/platform/shell/node`,
	`${Prefix}/platform/sign/node`,
	`${Prefix}/platform/state/node`,
	`${Prefix}/platform/terminal/node`, // Node PTY host logic
	`${Prefix}/platform/tunnel/node`,
	`${Prefix}/platform/workspaces/node`,
	`${Prefix}/platform/policy/node`,
	`${Prefix}/workbench/api/node`, // Node specific ExtHost parts
	`${Prefix}/workbench/services/search/node`, // Node specific search implementation
];
