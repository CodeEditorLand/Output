import { join as s } from "node:path";

const a = [
		{
			Package: "@xterm/addon-progress",
			Body: "define([],function(){var n=function(){};var P=function(){this.activate=n;this.dispose=n;this.onChange=function(){return{dispose:n}}};return{ProgressAddon:P}})",
		},
	],
	t = "data:text/javascript,",
	i = ({ Destination: o, Stubs: e = a }) => ({
		Kind: "Copy",
		Name: "StubUnpublishedAddons",
		Entries: e.map((n) => {
			const r = n.Package.split("/").pop();
			return {
				From: [t + n.Body],
				To: s(o, n.Package, "lib", `${r}.js`),
			};
		}),
	}),
	p = t;
var u = i;
export {
	a as DefaultStubs,
	p as StubDataPrefix,
	i as StubUnpublishedAddons,
	u as default,
};
