const p = ({ From: e, To: n }) => ({
	Kind: "Copy",
	Name: "SupplementFromDependency",
	Entries: [{ From: [e], To: n, Recursive: !0, Force: !1 }],
});
var r = p;
export { p as SupplementFromDependency, r as default };
