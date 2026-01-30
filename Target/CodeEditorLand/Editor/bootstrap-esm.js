import*as s from"node:fs";import{register as l}from"node:module";import{$Q as n,$R as f}from"./bootstrap-meta.js";import"./bootstrap-node.js";import*as i from"./vs/base/common/performance.js";(process.env.ELECTRON_RUN_AS_NODE||process.versions.electron)&&l(`data:text/javascript;base64,${Buffer.from(`
	export async function resolve(specifier, context, nextResolve) {
		if (specifier === 'fs') {
			return {
				format: 'builtin',
				shortCircuit: true,
				url: 'node:original-fs'
			};
		}

		// Defer to the next hook in the chain, which would be the
		// Node.js default resolve if this is the last user-specified loader.
		return nextResolve(specifier, context);
	}`).toString("base64")}`,import.meta.url);globalThis._VSCODE_PRODUCT_JSON={...n};globalThis._VSCODE_PACKAGE_JSON={...f};globalThis._VSCODE_FILE_ROOT=import.meta.dirname;let o;function c(){return o||(o=u()),o}async function u(){i.$V("code/willLoadNls");let e,r;if(process.env.VSCODE_NLS_CONFIG)try{e=JSON.parse(process.env.VSCODE_NLS_CONFIG),e?.languagePack?.messagesFile?r=e.languagePack.messagesFile:e?.defaultMessagesFile&&(r=e.defaultMessagesFile),globalThis._VSCODE_NLS_LANGUAGE=e?.resolvedLanguage}catch{}if(!(process.env.VSCODE_DEV||!r)){try{globalThis._VSCODE_NLS_MESSAGES=JSON.parse((await s.promises.readFile(r)).toString())}catch{if(e?.languagePack?.corruptMarkerFile)try{await s.promises.writeFile(e.languagePack.corruptMarkerFile,"corrupted")}catch{}if(e?.defaultMessagesFile&&e.defaultMessagesFile!==r)try{globalThis._VSCODE_NLS_MESSAGES=JSON.parse((await s.promises.readFile(e.defaultMessagesFile)).toString())}catch{}}return i.$V("code/didLoadNls"),e}}async function p(){await c()}export{p as $X};
