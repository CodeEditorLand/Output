const e = ({ From: o, To: r }) => ({
	Kind: "Copy",
	Name: "CopyWorker",
	Entries: [{ From: [o], To: r }],
});

var p = e;

export { e as CopyWorker, p as default };
