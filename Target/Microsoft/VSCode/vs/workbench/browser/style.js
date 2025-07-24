import"./media/style.css";import{$1t as i}from"../../platform/theme/common/themeService.js";import{$kvb as d,$oxb as a}from"../common/theme.js";import{$s as l,$v as b}from"../../base/common/platform.js";import{$d7 as u}from"../../base/browser/dom.js";import{$d6 as f,$h6 as k}from"../../base/browser/browser.js";import{$Qp as $}from"../../platform/theme/common/colorRegistry.js";import{$15 as s}from"../../base/browser/window.js";i((t,e)=>{const n=d(t);e.addRule(`.monaco-workbench { background-color: ${n}; }`);const r=t.getColor($);if(r&&e.addRule(`.monaco-workbench ::selection { background-color: ${r}; }`),l){const m=t.getColor(a);if(m){const c="monaco-workbench-meta-theme-color";let o=s.document.getElementById(c);o||(o=u(),o.name="theme-color",o.id=c),o.content=m.toString()}}f&&e.addRule(`
			body.web {
				touch-action: none;
			}
			.monaco-workbench .monaco-editor .view-lines {
				user-select: text;
				-webkit-user-select: text;
			}
		`),b&&k()&&e.addRule(`body { background-color: ${n}; }`)});
