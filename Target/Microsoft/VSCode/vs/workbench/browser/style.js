import"./media/style.css";import{$Rt as i}from"../../platform/theme/common/themeService.js";import{$aub as d,$ewb as a}from"../common/theme.js";import{$r as u,$u as l}from"../../base/common/platform.js";import{$s6 as b}from"../../base/browser/dom.js";import{$i5 as f,$m5 as $}from"../../base/browser/browser.js";import{$Ip as k}from"../../platform/theme/common/colorRegistry.js";import{$64 as s}from"../../base/browser/window.js";i((t,e)=>{const n=d(t);e.addRule(`.monaco-workbench { background-color: ${n}; }`);const r=t.getColor(k);if(r&&e.addRule(`.monaco-workbench ::selection { background-color: ${r}; }`),u){const m=t.getColor(a);if(m){const c="monaco-workbench-meta-theme-color";let o=s.document.getElementById(c);o||(o=b(),o.name="theme-color",o.id=c),o.content=m.toString()}}f&&e.addRule(`
			body.web {
				touch-action: none;
			}
			.monaco-workbench .monaco-editor .view-lines {
				user-select: text;
				-webkit-user-select: text;
			}
		`),l&&$()&&e.addRule(`body { background-color: ${n}; }`)});
