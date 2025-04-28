export default (Prefix: string) => [
	// --- 8. NLS (If English-only MVP) ---
	// Be cautious here, sometimes core logic might expect nls structure
	// `nls.metadata.json`, // At root level
	// `${Prefix}/**/nls.metadata.json`, // Deeper nls metadata
	// Might need more specific patterns for the actual translation files if they exist
];
