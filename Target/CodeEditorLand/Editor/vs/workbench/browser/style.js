import"./media/style.css";import{$Du as i}from"../../platform/theme/common/themeService.js";import{$CAb as d,$HCb as a}from"../common/theme.js";import{$s as u,$v as b}from"../../base/common/platform.js";import{$w$ as l}from"../../base/browser/dom.js";import{$q0 as $,$u0 as f}from"../../base/browser/browser.js";import{$pq as k}from"../../platform/theme/common/colorRegistry.js";import{$b0 as s}from"../../base/browser/window.js";i((t,e)=>{const n=d(t);e.addRule(`.monaco-workbench { background-color: ${n}; }`);const r=t.getColor(k);if(r&&e.addRule(`.monaco-workbench ::selection { background-color: ${r}; }`),u){const m=t.getColor(a);if(m){const c="monaco-workbench-meta-theme-color";let o=s.document.getElementById(c);o||(o=l(),o.name="theme-color",o.id=c),o.content=m.toString()}}$&&e.addRule(`
			body.web {
				touch-action: none;
			}
			.monaco-workbench .monaco-editor .view-lines {
				user-select: text;
				-webkit-user-select: text;
			}
		`),b&&f()&&e.addRule(`body { background-color: ${n}; }`)});
