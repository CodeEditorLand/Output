const a = (o, n) =>
		`try { process.stdout.write('[GIT-MARK-${o}] ${n}\\n'); } catch (e) {} `,
	c = [
		{
			Letter: "A",

			Anchor: "async function activate(context) {",

			Position: "after",

			Note: "activate() entered",
		},

		{
			Letter: "B",

			Anchor: "context.subscriptions.push(new vscode_1.Disposable(() => vscode_1.Disposable.from(...disposables).dispose()));",

			Position: "after",

			Note: "_activate Disposable ctor returned",
		},

		{
			Letter: "C",

			Anchor: "const logger = vscode_1.window.createOutputChannel('Git', { log: true });",

			Position: "after",

			Note: "_activate createOutputChannel returned",
		},

		{
			Letter: "D",

			Anchor: "const enabled = config.get('enabled');",

			Position: "after",

			Note: "_activate config.get(enabled) read",
		},

		{
			Letter: "E",

			Anchor: "const { model, cloneManager } = await createModel(context, logger, telemetryReporter, disposables);",

			Position: "before",

			Note: "_activate await createModel start",
		},

		{
			Letter: "F",

			Anchor: "return new extension_1.GitExtensionImpl({ model, cloneManager });",

			Position: "before",

			Note: "_activate await createModel done",
		},

		{
			Letter: "G",

			Anchor: "async function createModel(context, logger, telemetryReporter, disposables) {",

			Position: "after",

			Note: "createModel entered",
		},

		{
			Letter: "H",

			Anchor: "const info = await (0, git_1.findGit)(pathHints, gitPath => {",

			Position: "before",

			Note: "createModel findGit start",
		},

		{
			Letter: "I",

			Anchor: "const model = new model_1.Model(git, askpass, context.globalState, context.workspaceState, logger, telemetryReporter);",

			Position: "after",

			Note: "createModel new Model done",
		},
	],
	l = [
		{
			Letter: "J",

			Anchor: "async doInitialScan() {",

			Position: "after",

			Note: "Model doInitialScan start",
		},

		{
			Letter: "K",

			Anchor: "async openRepository(repoPath, openIfClosed = false, openIfParent = false) {",

			Position: "after",

			Note: "Model openRepository entered",
		},

		{
			Letter: "L",

			Anchor: "this.logger.trace(`[Model][openRepository] Repository root for path",

			Position: "before",

			Note: "Model openRepository getRepositoryRoot done",
		},
	],
	d = (o, n) => {
		let e = o;

		for (const t of n) {
			const i = a(t.Letter, t.Note);

			if (e.includes(`[GIT-MARK-${t.Letter}]`)) continue;

			const r = e.indexOf(t.Anchor);

			if (!(r < 0))
				if (t.Position === "after") {
					const s = r + t.Anchor.length;

					e = e.slice(0, s) + " " + i + e.slice(s);
				} else e = e.slice(0, r) + i + e.slice(r);
		}

		return e;
	},
	f = {
		Kind: "Transform",

		Name: "InstrumentVscodeGit",

		Match: ({ Path: o }) =>
			/extensions\/git\/(?:out|dist)\/main\.js$/.test(o) ||
			/extensions\/git\/(?:out|dist)\/model\.js$/.test(o),

		Transform({ Path: o, Source: n }) {
			const e = /main\.js$/.test(o) ? c : l,
				t = d(n, e);

			return t === n
				? { Kind: "Unchanged" }
				: { Kind: "Rewrite", Source: t };
		},
	};

var p = f;

export { p as default };
