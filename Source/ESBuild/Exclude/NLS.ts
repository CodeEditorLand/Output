export default (Prefix: string) => [
	// --- 8. NLS (If English-only MVP) ---
	// Be cautious here, sometimes core logic might expect nls structure
	// At root level
	// `nls.metadata.json`,
	// Deeper nls metadata
	// `${Prefix}/**/nls.metadata.json`,
	// Might need more specific patterns for the actual translation files if they exist
];
