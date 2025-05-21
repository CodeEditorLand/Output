import"./media/style.css";import{$It as i}from"../../platform/theme/common/themeService.js";import{$_sb as d,$dvb as a}from"../common/theme.js";import{$r as b,$u as l}from"../../base/common/platform.js";import{$m5 as u}from"../../base/browser/dom.js";import{$b4 as f,$f4 as $}from"../../base/browser/browser.js";import{$zp as k}from"../../platform/theme/common/colorRegistry.js";import{$Y3 as s}from"../../base/browser/window.js";i((t,e)=>{const n=d(t);e.addRule(`.monaco-workbench { background-color: ${n}; }`);const r=t.getColor(k);if(r&&e.addRule(`.monaco-workbench ::selection { background-color: ${r}; }`),b){const m=t.getColor(a);if(m){const c="monaco-workbench-meta-theme-color";let o=s.document.getElementById(c);o||(o=u(),o.name="theme-color",o.id=c),o.content=m.toString()}}f&&e.addRule(`
			body.web {
				touch-action: none;
			}
			.monaco-workbench .monaco-editor .view-lines {
				user-select: text;
				-webkit-user-select: text;
			}
		`),l&&$()&&e.addRule(`body { background-color: ${n}; }`)});
