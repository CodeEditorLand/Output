const o = ({ OutputService: e, WindService: r, Destination: i }) => ({
	Kind: "Copy",
	Name: "CopyTauriMainProcessService",
	Enabled: () => process.env.Electron === "true",
	Entries: [{ From: [e, r], To: i }],
});
var n = o;
export { o as CopyTauriMainProcessService, n as default };
