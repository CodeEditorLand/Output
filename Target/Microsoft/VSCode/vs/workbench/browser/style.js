import"./media/style.css";import{$vu as i}from"../../platform/theme/common/themeService.js";import{$Mxb as d,$Qzb as a}from"../common/theme.js";import{$s as l,$v as u}from"../../base/common/platform.js";import{$n8 as b}from"../../base/browser/dom.js";import{$l7 as f,$p7 as $}from"../../base/browser/browser.js";import{$iq as k}from"../../platform/theme/common/colorRegistry.js";import{$96 as s}from"../../base/browser/window.js";i((t,e)=>{const n=d(t);e.addRule(`.monaco-workbench { background-color: ${n}; }`);const r=t.getColor(k);if(r&&e.addRule(`.monaco-workbench ::selection { background-color: ${r}; }`),l){const m=t.getColor(a);if(m){const c="monaco-workbench-meta-theme-color";let o=s.document.getElementById(c);o||(o=b(),o.name="theme-color",o.id=c),o.content=m.toString()}}f&&e.addRule(`
			body.web {
				touch-action: none;
			}
			.monaco-workbench .monaco-editor .view-lines {
				user-select: text;
				-webkit-user-select: text;
			}
		`),u&&$()&&e.addRule(`body { background-color: ${n}; }`)});
