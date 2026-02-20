import{$2p as e,$bq as a,$2q as x,$Yq as g,$dq as ko,$uq as po,$vq as Co,$Ys as wo,$hq as $o,$0s as So,$Tr as Fo}from"../../../../platform/theme/common/colorRegistry.js";import{$xu as mo}from"../../../../platform/theme/common/themeService.js";import{ThemeIcon as r}from"../../../../base/common/themables.js";import{$Up as fo}from"../../../../base/common/color.js";import{localize as c}from"../../../../nls.js";import*as n from"./debugIcons.js";import{$ou as vo}from"../../../../platform/theme/common/theme.js";const Bo=e("debugToolBar.background",{dark:"#333333",light:"#F3F3F3",hcDark:"#000000",hcLight:"#FFFFFF"},c(8530,null)),Vo=e("debugToolBar.border",null,c(8531,null)),xo=e("debugIcon.startForeground",{dark:"#89D185",light:"#388A34",hcDark:"#89D185",hcLight:"#388A34"},c(8532,null));function To(){const L=e("debugTokenExpression.name",{dark:"#c586c0",light:"#9b46b0",hcDark:a,hcLight:a},"Foreground color for the token names shown in the debug views (ie. the Variables or Watch view)."),I=e("debugTokenExpression.type",{dark:"#4A90E2",light:"#4A90E2",hcDark:a,hcLight:a},"Foreground color for the token types shown in the debug views (ie. the Variables or Watch view)."),E=e("debugTokenExpression.value",{dark:"#cccccc99",light:"#6c6c6ccc",hcDark:a,hcLight:a},"Foreground color for the token values shown in the debug views (ie. the Variables or Watch view)."),H=e("debugTokenExpression.string",{dark:"#ce9178",light:"#a31515",hcDark:"#f48771",hcLight:"#a31515"},"Foreground color for strings in the debug views (ie. the Variables or Watch view)."),D=e("debugTokenExpression.boolean",{dark:"#4e94ce",light:"#0000ff",hcDark:"#75bdfe",hcLight:"#0000ff"},"Foreground color for booleans in the debug views (ie. the Variables or Watch view)."),A=e("debugTokenExpression.number",{dark:"#b5cea8",light:"#098658",hcDark:"#89d185",hcLight:"#098658"},"Foreground color for numbers in the debug views (ie. the Variables or Watch view)."),B=e("debugTokenExpression.error",{dark:"#f48771",light:"#e51400",hcDark:"#f48771",hcLight:"#e51400"},"Foreground color for expression errors in the debug views (ie. the Variables or Watch view) and for error logs shown in the debug console."),V=e("debugView.exceptionLabelForeground",{dark:a,light:"#FFF",hcDark:a,hcLight:a},"Foreground color for a label shown in the CALL STACK view when the debugger breaks on an exception."),T=e("debugView.exceptionLabelBackground",{dark:"#6C2022",light:"#A31515",hcDark:"#6C2022",hcLight:"#A31515"},"Background color for a label shown in the CALL STACK view when the debugger breaks on an exception."),R=e("debugView.stateLabelForeground",a,"Foreground color for a label in the CALL STACK view showing the current session's or thread's state."),y=e("debugView.stateLabelBackground","#88888844","Background color for a label in the CALL STACK view showing the current session's or thread's state."),W=e("debugView.valueChangedHighlight","#569CD6","Color used to highlight value changes in the debug views (ie. in the Variables view)."),O=e("debugConsole.infoForeground",{dark:x,light:x,hcDark:a,hcLight:a},"Foreground color for info messages in debug REPL console."),q=e("debugConsole.warningForeground",{dark:g,light:g,hcDark:"#008000",hcLight:g},"Foreground color for warning messages in debug REPL console."),P=e("debugConsole.errorForeground",ko,"Foreground color for error messages in debug REPL console."),K=e("debugConsole.sourceForeground",a,"Foreground color for source filenames in debug REPL console."),u=e("debugConsoleInputIcon.foreground",a,"Foreground color for debug console input marker icon."),N=e("debugIcon.pauseForeground",{dark:"#75BEFF",light:"#007ACC",hcDark:"#75BEFF",hcLight:"#007ACC"},c(8533,null)),z=e("debugIcon.stopForeground",{dark:"#F48771",light:"#A1260D",hcDark:"#F48771",hcLight:"#A1260D"},c(8534,null)),j=e("debugIcon.disconnectForeground",{dark:"#F48771",light:"#A1260D",hcDark:"#F48771",hcLight:"#A1260D"},c(8535,null)),Y=e("debugIcon.restartForeground",{dark:"#89D185",light:"#388A34",hcDark:"#89D185",hcLight:"#388A34"},c(8536,null)),J=e("debugIcon.stepOverForeground",{dark:"#75BEFF",light:"#007ACC",hcDark:"#75BEFF",hcLight:"#007ACC"},c(8537,null)),U=e("debugIcon.stepIntoForeground",{dark:"#75BEFF",light:"#007ACC",hcDark:"#75BEFF",hcLight:"#007ACC"},c(8538,null)),G=e("debugIcon.stepOutForeground",{dark:"#75BEFF",light:"#007ACC",hcDark:"#75BEFF",hcLight:"#007ACC"},c(8539,null)),M=e("debugIcon.continueForeground",{dark:"#75BEFF",light:"#007ACC",hcDark:"#75BEFF",hcLight:"#007ACC"},c(8540,null)),Q=e("debugIcon.stepBackForeground",{dark:"#75BEFF",light:"#007ACC",hcDark:"#75BEFF",hcLight:"#007ACC"},c(8541,null));mo((o,t)=>{const s=o.getColor(po),i=o.getColor(Co),X=o.getColor(wo),d=o.getColor(V),b=o.getColor(T),Z=o.getColor(R),_=o.getColor(y),l=o.getColor(W),oo=o.getColor(Fo);t.addRule(`
			/* Text colour of the call stack row's filename */
			.debug-pane .debug-call-stack .monaco-list-row:not(.selected) .stack-frame > .file .file-name {
				color: ${X}
			}

			/* Line & column number "badge" for selected call stack row */
			.debug-pane .monaco-list-row.selected .line-number {
				background-color: ${s};
				color: ${i};
			}

			/* Line & column number "badge" for unselected call stack row (basically all other rows) */
			.debug-pane .line-number {
				background-color: ${s.transparent(.6)};
				color: ${i.transparent(.6)};
			}

			/* State "badge" displaying the active session's current state.
			* Only visible when there are more active debug sessions/threads running.
			*/
			.debug-pane .debug-call-stack .thread > .state.label,
			.debug-pane .debug-call-stack .session > .state.label {
				background-color: ${_};
				color: ${Z};
			}

			/* State "badge" displaying the active session's current state.
			* Only visible when there are more active debug sessions/threads running
			* and thread paused due to a thrown exception.
			*/
			.debug-pane .debug-call-stack .thread > .state.label.exception,
			.debug-pane .debug-call-stack .session > .state.label.exception {
				background-color: ${b};
				color: ${d};
			}

			/* Info "badge" shown when the debugger pauses due to a thrown exception. */
			.debug-pane .call-stack-state-message > .label.exception {
				background-color: ${b};
				color: ${d};
			}

			/* Animation of changed values in Debug viewlet */
			@keyframes debugViewletValueChanged {
				0%   { background-color: ${l.transparent(0)} }
				5%   { background-color: ${l.transparent(.9)} }
				100% { background-color: ${l.transparent(.3)} }
			}

			.debug-pane .monaco-list-row .expression .value.changed {
				background-color: ${l.transparent(.3)};
				animation-name: debugViewletValueChanged;
				animation-duration: 1s;
				animation-fill-mode: forwards;
			}

			.monaco-list-row .expression .lazy-button:hover {
				background-color: ${oo}
			}
		`);const h=o.getColor($o);h&&t.addRule(`
			.debug-pane .line-number {
				border: 1px solid ${h};
			}
			`),vo(o.type)&&t.addRule(`
			.debug-pane .line-number {
				background-color: ${s};
				color: ${i};
			}`);const eo=o.getColor(L),ro=o.getColor(I),no=o.getColor(E),to=o.getColor(H),ao=o.getColor(D),co=o.getColor(B),lo=o.getColor(A);t.addRule(`
			.monaco-workbench .monaco-list-row .expression .name {
				color: ${eo};
			}

			.monaco-workbench .monaco-list-row .expression .type {
				color: ${ro};
			}

			.monaco-workbench .monaco-list-row .expression .value,
			.monaco-workbench .debug-hover-widget .value {
				color: ${no};
			}

			.monaco-workbench .monaco-list-row .expression .value.string,
			.monaco-workbench .debug-hover-widget .value.string {
				color: ${to};
			}

			.monaco-workbench .monaco-list-row .expression .value.boolean,
			.monaco-workbench .debug-hover-widget .value.boolean {
				color: ${ao};
			}

			.monaco-workbench .monaco-list-row .expression .error,
			.monaco-workbench .debug-hover-widget .error,
			.monaco-workbench .debug-pane .debug-variables .scope .error {
				color: ${co};
			}

			.monaco-workbench .monaco-list-row .expression .value.number,
			.monaco-workbench .debug-hover-widget .value.number {
				color: ${lo};
			}
		`);const so=o.getColor(So)||fo.fromHex("#80808060"),io=o.getColor(O),go=o.getColor(q),uo=o.getColor(P),bo=o.getColor(K),ho=o.getColor(u);t.addRule(`
			.repl .repl-input-wrapper {
				border-top: 1px solid ${so};
			}

			.monaco-workbench .repl .repl-tree .output .expression .value.info {
				color: ${io};
			}

			.monaco-workbench .repl .repl-tree .output .expression .value.warn {
				color: ${go};
			}

			.monaco-workbench .repl .repl-tree .output .expression .value.error {
				color: ${uo};
			}

			.monaco-workbench .repl .repl-tree .output .expression .source {
				color: ${bo};
			}

			.monaco-workbench .repl .repl-tree .monaco-tl-contents .arrow {
				color: ${ho};
			}
		`),o.defines(u)||t.addRule(`
				.monaco-workbench.vs .repl .repl-tree .monaco-tl-contents .arrow {
					opacity: 0.25;
				}

				.monaco-workbench.vs-dark .repl .repl-tree .monaco-tl-contents .arrow {
					opacity: 0.4;
				}

				.monaco-workbench.hc-black .repl .repl-tree .monaco-tl-contents .arrow,
				.monaco-workbench.hc-light .repl .repl-tree .monaco-tl-contents .arrow {
					opacity: 1;
				}
			`);const k=o.getColor(xo);k&&t.addRule(`.monaco-workbench ${r.asCSSSelector(n.$rHb)} { color: ${k}; }`);const p=o.getColor(N);p&&t.addRule(`.monaco-workbench .part > .title > .title-actions .action-label${r.asCSSSelector(n.$nHb)}, .monaco-workbench ${r.asCSSSelector(n.$nHb)} { color: ${p}; }`);const C=o.getColor(z);C&&t.addRule(`.monaco-workbench .part > .title > .title-actions .action-label${r.asCSSSelector(n.$gHb)},.monaco-workbench ${r.asCSSSelector(n.$gHb)} { color: ${C}; }`);const w=o.getColor(j);w&&t.addRule(`.monaco-workbench .part > .title > .title-actions .action-label${r.asCSSSelector(n.$hHb)},.monaco-workbench .debug-view-content ${r.asCSSSelector(n.$hHb)}, .monaco-workbench .debug-toolbar ${r.asCSSSelector(n.$hHb)}, .monaco-workbench .command-center-center ${r.asCSSSelector(n.$hHb)} { color: ${w}; }`);const $=o.getColor(Y);$&&t.addRule(`.monaco-workbench ${r.asCSSSelector(n.$iHb)}, .monaco-workbench ${r.asCSSSelector(n.$fHb)}, .monaco-workbench .part > .title > .title-actions .action-label${r.asCSSSelector(n.$iHb)}, .monaco-workbench .part > .title > .title-actions .action-label${r.asCSSSelector(n.$fHb)} { color: ${$}; }`);const S=o.getColor(J);S&&t.addRule(`.monaco-workbench .part > .title > .title-actions .action-label${r.asCSSSelector(n.$jHb)}, .monaco-workbench ${r.asCSSSelector(n.$jHb)} { color: ${S}; }`);const F=o.getColor(U);F&&t.addRule(`.monaco-workbench .part > .title > .title-actions .action-label${r.asCSSSelector(n.$kHb)}, .monaco-workbench .part > .title > .title-actions .action-label${r.asCSSSelector(n.$kHb)}, .monaco-workbench ${r.asCSSSelector(n.$kHb)} { color: ${F}; }`);const m=o.getColor(G);m&&t.addRule(`.monaco-workbench .part > .title > .title-actions .action-label${r.asCSSSelector(n.$lHb)}, .monaco-workbench .part > .title > .title-actions .action-label${r.asCSSSelector(n.$lHb)}, .monaco-workbench ${r.asCSSSelector(n.$lHb)} { color: ${m}; }`);const f=o.getColor(M);f&&t.addRule(`.monaco-workbench .part > .title > .title-actions .action-label${r.asCSSSelector(n.$oHb)}, .monaco-workbench ${r.asCSSSelector(n.$oHb)}, .monaco-workbench .part > .title > .title-actions .action-label${r.asCSSSelector(n.$pHb)}, .monaco-workbench ${r.asCSSSelector(n.$pHb)} { color: ${f}; }`);const v=o.getColor(Q);v&&t.addRule(`.monaco-workbench .part > .title > .title-actions .action-label${r.asCSSSelector(n.$mHb)}, .monaco-workbench ${r.asCSSSelector(n.$mHb)} { color: ${v}; }`)})}export{Bo as $IHb,Vo as $JHb,xo as $KHb,To as $LHb};
