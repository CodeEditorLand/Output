export default (Prefix: string) => [
	`${Prefix}/editor/editor.main.js`, // Standalone entry
	`${Prefix}/editor/standalone`,

	`${Prefix}/editor/contrib/snippet/browser/snippet.md`,
];
