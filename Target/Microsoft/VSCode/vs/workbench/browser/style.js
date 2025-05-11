import"./media/style.css";import{$Gt as i}from"../../platform/theme/common/themeService.js";import{$Ksb as d,$Oub as a}from"../common/theme.js";import{$r as u,$u as l}from"../../base/common/platform.js";import{$24 as b}from"../../base/browser/dom.js";import{$R3 as f,$V3 as $}from"../../base/browser/browser.js";import{$xp as k}from"../../platform/theme/common/colorRegistry.js";import{$C3 as s}from"../../base/browser/window.js";i((t,e)=>{const n=d(t);e.addRule(`.monaco-workbench { background-color: ${n}; }`);const r=t.getColor(k);if(r&&e.addRule(`.monaco-workbench ::selection { background-color: ${r}; }`),u){const m=t.getColor(a);if(m){const c="monaco-workbench-meta-theme-color";let o=s.document.getElementById(c);o||(o=b(),o.name="theme-color",o.id=c),o.content=m.toString()}}f&&e.addRule(`
			body.web {
				touch-action: none;
			}
			.monaco-workbench .monaco-editor .view-lines {
				user-select: text;
				-webkit-user-select: text;
			}
		`),l&&$()&&e.addRule(`body { background-color: ${n}; }`)});
