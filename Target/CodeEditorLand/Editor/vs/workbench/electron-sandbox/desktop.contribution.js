import{Registry as m}from"../../platform/registry/common/platform.js";import{localize as e,localize2 as r}from"../../nls.js";import{MenuRegistry as u,MenuId as h,registerAction2 as n}from"../../platform/actions/common/actions.js";import{Extensions as v,ConfigurationScope as i}from"../../platform/configuration/common/configurationRegistry.js";import{KeyMod as c,KeyCode as w}from"../../base/common/keyCodes.js";import{isLinux as s,isMacintosh as t,isWindows as C}from"../../base/common/platform.js";import{ConfigureRuntimeArgumentsAction as T,ToggleDevToolsAction as I,ReloadWindowWithExtensionsDisabledAction as k,OpenUserDataFolderAction as A,ShowGPUInfoAction as S}from"./actions/developerActions.js";import{ZoomResetAction as W,ZoomOutAction as O,ZoomInAction as x,CloseWindowAction as f,SwitchWindowAction as P,QuickSwitchWindowAction as N,NewWindowTabHandler as D,ShowPreviousWindowTabHandler as L,ShowNextWindowTabHandler as E,MoveWindowTabToNewWindowHandler as R,MergeWindowTabsHandlerHandler as M,ToggleWindowTabsBarHandler as B}from"./actions/windowActions.js";import{ContextKeyExpr as g}from"../../platform/contextkey/common/contextkey.js";import{KeybindingsRegistry as b,KeybindingWeight as y}from"../../platform/keybinding/common/keybindingsRegistry.js";import{CommandsRegistry as F}from"../../platform/commands/common/commands.js";import"../../platform/instantiation/common/instantiation.js";import{IsMacContext as z}from"../../platform/contextkey/common/contextkeys.js";import{INativeHostService as H}from"../../platform/native/common/native.js";import{Extensions as K}from"../../platform/jsonschemas/common/jsonContributionRegistry.js";import"../../base/common/jsonSchema.js";import{InstallShellScriptAction as V,UninstallShellScriptAction as j}from"./actions/installActions.js";import{EditorsVisibleContext as q,SingleEditorGroupsContext as Z}from"../common/contextkeys.js";import{TELEMETRY_SETTING_ID as U}from"../../platform/telemetry/common/telemetry.js";import{IConfigurationService as J}from"../../platform/configuration/common/configuration.js";import{ShutdownReason as _}from"../services/lifecycle/common/lifecycle.js";import{NativeWindow as Q}from"./window.js";import{ModifierKeyEmitter as Y}from"../../base/browser/dom.js";import{applicationConfigurationNodeBase as G,securityConfigurationNodeBase as X}from"../common/configuration.js";import{MAX_ZOOM_LEVEL as $,MIN_ZOOM_LEVEL as ee}from"../../platform/window/electron-sandbox/window.js";(function(){if(n(x),n(O),n(W),n(P),n(N),n(f),t&&b.registerKeybindingRule({id:f.ID,weight:y.WorkbenchContrib,when:g.and(q.toNegated(),Z),primary:c.CtrlCmd|w.KeyW}),t&&(n(V),n(j)),b.registerCommandAndKeybindingRule({id:"workbench.action.quit",weight:y.WorkbenchContrib,async handler(o){const d=o.get(H),p=o.get(J).getValue("window.confirmBeforeClose");(p==="always"||p==="keyboardOnly"&&Y.getInstance().isModifierPressed)&&!await Q.confirmOnShutdown(o,_.QUIT)||d.quit()},when:void 0,mac:{primary:c.CtrlCmd|w.KeyQ},linux:{primary:c.CtrlCmd|w.KeyQ}}),t)for(const o of[{handler:D,id:"workbench.action.newWindowTab",title:r("newTab","New Window Tab")},{handler:L,id:"workbench.action.showPreviousWindowTab",title:r("showPreviousTab","Show Previous Window Tab")},{handler:E,id:"workbench.action.showNextWindowTab",title:r("showNextWindowTab","Show Next Window Tab")},{handler:R,id:"workbench.action.moveWindowTabToNewWindow",title:r("moveWindowTabToNewWindow","Move Window Tab to New Window")},{handler:M,id:"workbench.action.mergeAllWindowTabs",title:r("mergeAllWindowTabs","Merge All Windows")},{handler:B,id:"workbench.action.toggleWindowTabsBar",title:r("toggleWindowTabsBar","Toggle Window Tabs Bar")}])F.registerCommand(o.id,o.handler),u.appendMenuItem(h.CommandPalette,{command:o,when:g.equals("config.window.nativeTabs",!0)});n(k),n(T),n(I),n(A),n(S)})(),function(){u.appendMenuItem(h.MenubarFileMenu,{group:"z_Exit",command:{id:"workbench.action.quit",title:e({key:"miExit",comment:["&& denotes a mnemonic"]},"E&&xit")},order:1,when:z.toNegated()})}(),function(){const o=m.as(v.Configuration);o.registerConfiguration({...G,properties:{"application.shellEnvironmentResolutionTimeout":{type:"number",default:10,minimum:1,maximum:120,included:!C,scope:i.APPLICATION,markdownDescription:e("application.shellEnvironmentResolutionTimeout","Controls the timeout in seconds before giving up resolving the shell environment when the application is not already launched from a terminal. See our [documentation](https://go.microsoft.com/fwlink/?linkid=2149667) for more information.")}}}),o.registerConfiguration({id:"window",order:8,title:e("windowConfigurationTitle","Window"),type:"object",properties:{"window.confirmSaveUntitledWorkspace":{type:"boolean",default:!0,description:e("confirmSaveUntitledWorkspace","Controls whether a confirmation dialog shows asking to save or discard an opened untitled workspace in the window when switching to another workspace. Disabling the confirmation dialog will always discard the untitled workspace.")},"window.openWithoutArgumentsInNewWindow":{type:"string",enum:["on","off"],enumDescriptions:[e("window.openWithoutArgumentsInNewWindow.on","Open a new empty window."),e("window.openWithoutArgumentsInNewWindow.off","Focus the last active running instance.")],default:t?"off":"on",scope:i.APPLICATION,markdownDescription:e("openWithoutArgumentsInNewWindow","Controls whether a new empty window should open when starting a second instance without arguments or if the last running instance should get focus.\nNote that there can still be cases where this setting is ignored (e.g. when using the `--new-window` or `--reuse-window` command line option).")},"window.restoreWindows":{type:"string",enum:["preserve","all","folders","one","none"],enumDescriptions:[e("window.reopenFolders.preserve","Always reopen all windows. If a folder or workspace is opened (e.g. from the command line) it opens as a new window unless it was opened before. If files are opened they will open in one of the restored windows together with editors that were previously opened."),e("window.reopenFolders.all","Reopen all windows unless a folder, workspace or file is opened (e.g. from the command line). If a file is opened, it will replace any of the editors that were previously opened in a window."),e("window.reopenFolders.folders","Reopen all windows that had folders or workspaces opened unless a folder, workspace or file is opened (e.g. from the command line). If a file is opened, it will replace any of the editors that were previously opened in a window."),e("window.reopenFolders.one","Reopen the last active window unless a folder, workspace or file is opened (e.g. from the command line). If a file is opened, it will replace any of the editors that were previously opened in a window."),e("window.reopenFolders.none","Never reopen a window. Unless a folder or workspace is opened (e.g. from the command line), an empty window will appear.")],default:"all",scope:i.APPLICATION,description:e("restoreWindows","Controls how windows and editors within are being restored when opening.")},"window.restoreFullscreen":{type:"boolean",default:!1,scope:i.APPLICATION,description:e("restoreFullscreen","Controls whether a window should restore to full screen mode if it was exited in full screen mode.")},"window.zoomLevel":{type:"number",default:0,minimum:ee,maximum:$,markdownDescription:e({comment:["{0} will be a setting name rendered as a link"],key:"zoomLevel"},"Adjust the default zoom level for all windows. Each increment above `0` (e.g. `1`) or below (e.g. `-1`) represents zooming `20%` larger or smaller. You can also enter decimals to adjust the zoom level with a finer granularity. See {0} for configuring if the 'Zoom In' and 'Zoom Out' commands apply the zoom level to all windows or only the active window.","`#window.zoomPerWindow#`"),ignoreSync:!0,tags:["accessibility"]},"window.zoomPerWindow":{type:"boolean",default:!0,markdownDescription:e({comment:["{0} will be a setting name rendered as a link"],key:"zoomPerWindow"},"Controls if the 'Zoom In' and 'Zoom Out' commands apply the zoom level to all windows or only the active window. See {0} for configuring a default zoom level for all windows.","`#window.zoomLevel#`"),tags:["accessibility"]},"window.newWindowDimensions":{type:"string",enum:["default","inherit","offset","maximized","fullscreen"],enumDescriptions:[e("window.newWindowDimensions.default","Open new windows in the center of the screen."),e("window.newWindowDimensions.inherit","Open new windows with same dimension as last active one."),e("window.newWindowDimensions.offset","Open new windows with same dimension as last active one with an offset position."),e("window.newWindowDimensions.maximized","Open new windows maximized."),e("window.newWindowDimensions.fullscreen","Open new windows in full screen mode.")],default:"default",scope:i.APPLICATION,description:e("newWindowDimensions","Controls the dimensions of opening a new window when at least one window is already opened. Note that this setting does not have an impact on the first window that is opened. The first window will always restore the size and location as you left it before closing.")},"window.closeWhenEmpty":{type:"boolean",default:!1,description:e("closeWhenEmpty","Controls whether closing the last editor should also close the window. This setting only applies for windows that do not show folders.")},"window.doubleClickIconToClose":{type:"boolean",default:!1,scope:i.APPLICATION,markdownDescription:e("window.doubleClickIconToClose","If enabled, this setting will close the window when the application icon in the title bar is double-clicked. The window will not be able to be dragged by the icon. This setting is effective only if {0} is set to `custom`.","`#window.titleBarStyle#`")},"window.titleBarStyle":{type:"string",enum:["native","custom"],default:s?"native":"custom",scope:i.APPLICATION,description:e("titleBarStyle","Adjust the appearance of the window title bar to be native by the OS or custom. On Linux and Windows, this setting also affects the application and context menu appearances. Changes require a full restart to apply.")},"window.experimentalControlOverlay":{type:"boolean",included:s,markdownDescription:e("window.experimentalControlOverlay","Show the native window controls when {0} is set to `custom` (Linux only).","`#window.titleBarStyle#`"),default:!0,scope:i.APPLICATION},"window.customTitleBarVisibility":{type:"string",enum:["auto","windowed","never"],markdownEnumDescriptions:[e("window.customTitleBarVisibility.auto","Automatically changes custom title bar visibility."),e("window.customTitleBarVisibility.windowed","Hide custom titlebar in full screen. When not in full screen, automatically change custom title bar visibility."),e("window.customTitleBarVisibility.never","Hide custom titlebar when {0} is set to `native`.","`#window.titleBarStyle#`")],default:s?"never":"auto",scope:i.APPLICATION,markdownDescription:e("window.customTitleBarVisibility","Adjust when the custom title bar should be shown. The custom title bar can be hidden when in full screen mode with `windowed`. The custom title bar can only be hidden in non full screen mode with `never` when {0} is set to `native`.","`#window.titleBarStyle#`")},"window.dialogStyle":{type:"string",enum:["native","custom"],default:"native",scope:i.APPLICATION,description:e("dialogStyle","Adjust the appearance of dialog windows.")},"window.nativeTabs":{type:"boolean",default:!1,scope:i.APPLICATION,description:e("window.nativeTabs","Enables macOS Sierra window tabs. Note that changes require a full restart to apply and that native tabs will disable a custom title bar style if configured."),included:t},"window.nativeFullScreen":{type:"boolean",default:!0,description:e("window.nativeFullScreen","Controls if native full-screen should be used on macOS. Disable this option to prevent macOS from creating a new space when going full-screen."),scope:i.APPLICATION,included:t},"window.clickThroughInactive":{type:"boolean",default:!0,scope:i.APPLICATION,description:e("window.clickThroughInactive","If enabled, clicking on an inactive window will both activate the window and trigger the element under the mouse if it is clickable. If disabled, clicking anywhere on an inactive window will activate it only and a second click is required on the element."),included:t}}}),o.registerConfiguration({id:"telemetry",order:110,title:e("telemetryConfigurationTitle","Telemetry"),type:"object",properties:{"telemetry.enableCrashReporter":{type:"boolean",description:e("telemetry.enableCrashReporting",`Enable crash reports to be collected. This helps us improve stability. 
This option requires restart to take effect.`),default:!0,tags:["usesOnlineServices","telemetry"],markdownDeprecationMessage:e("enableCrashReporterDeprecated","If this setting is false, no telemetry will be sent regardless of the new setting's value. Deprecated due to being combined into the {0} setting.",`\`#${U}#\``)}}}),o.registerConfiguration({id:"keyboard",order:15,type:"object",title:e("keyboardConfigurationTitle","Keyboard"),properties:{"keyboard.touchbar.enabled":{type:"boolean",default:!0,description:e("touchbar.enabled","Enables the macOS touchbar buttons on the keyboard if available."),included:t},"keyboard.touchbar.ignored":{type:"array",items:{type:"string"},default:[],markdownDescription:e("touchbar.ignored","A set of identifiers for entries in the touchbar that should not show up (for example `workbench.action.navigateBack`)."),included:t}}}),o.registerConfiguration({...X,properties:{"security.promptForLocalFileProtocolHandling":{type:"boolean",default:!0,markdownDescription:e("security.promptForLocalFileProtocolHandling","If enabled, a dialog will ask for confirmation whenever a local file or workspace is about to open through a protocol handler."),scope:i.APPLICATION},"security.promptForRemoteFileProtocolHandling":{type:"boolean",default:!0,markdownDescription:e("security.promptForRemoteFileProtocolHandling","If enabled, a dialog will ask for confirmation whenever a remote file or workspace is about to open through a protocol handler."),scope:i.APPLICATION}}})}(),function(){const o="vscode://schemas/argv",d=m.as(K.JSONContribution),a={id:o,allowComments:!0,allowTrailingCommas:!0,description:"VSCode static command line definition file",type:"object",additionalProperties:!1,properties:{locale:{type:"string",description:e("argv.locale","The display Language to use. Picking a different language requires the associated language pack to be installed.")},"disable-lcd-text":{type:"boolean",description:e("argv.disableLcdText","Disables LCD font antialiasing.")},"proxy-bypass-list":{type:"string",description:e("argv.proxyBypassList",'Bypass any specified proxy for the given semi-colon-separated list of hosts. Example value "<local>;*.microsoft.com;*foo.com;1.2.3.4:5678", will use the proxy server for all hosts except for local addresses (localhost, 127.0.0.1 etc.), microsoft.com subdomains, hosts that contain the suffix foo.com and anything at 1.2.3.4:5678')},"disable-hardware-acceleration":{type:"boolean",description:e("argv.disableHardwareAcceleration","Disables hardware acceleration. ONLY change this option if you encounter graphic issues.")},"force-color-profile":{type:"string",markdownDescription:e("argv.forceColorProfile","Allows to override the color profile to use. If you experience colors appear badly, try to set this to `srgb` and restart.")},"enable-crash-reporter":{type:"boolean",markdownDescription:e("argv.enableCrashReporter","Allows to disable crash reporting, should restart the app if the value is changed.")},"crash-reporter-id":{type:"string",markdownDescription:e("argv.crashReporterId","Unique id used for correlating crash reports sent from this app instance.")},"enable-proposed-api":{type:"array",description:e("argv.enebleProposedApi","Enable proposed APIs for a list of extension ids (such as `vscode.git`). Proposed APIs are unstable and subject to breaking without warning at any time. This should only be set for extension development and testing purposes."),items:{type:"string"}},"log-level":{type:["string","array"],description:e("argv.logLevel","Log level to use. Default is 'info'. Allowed values are 'error', 'warn', 'info', 'debug', 'trace', 'off'.")},"disable-chromium-sandbox":{type:"boolean",description:e("argv.disableChromiumSandbox","Disables the Chromium sandbox. This is useful when running VS Code as elevated on Linux and running under Applocker on Windows.")},"use-inmemory-secretstorage":{type:"boolean",description:e("argv.useInMemorySecretStorage","Ensures that an in-memory store will be used for secret storage instead of using the OS's credential store. This is often used when running VS Code extension tests or when you're experiencing difficulties with the credential store.")}}};s&&(a.properties["force-renderer-accessibility"]={type:"boolean",description:e("argv.force-renderer-accessibility","Forces the renderer to be accessible. ONLY change this if you are using a screen reader on Linux. On other platforms the renderer will automatically be accessible. This flag is automatically set if you have editor.accessibilitySupport: on.")},a.properties["password-store"]={type:"string",description:e("argv.passwordStore","Configures the backend used to store secrets on Linux. This argument is ignored on Windows & macOS.")}),d.registerSchema(o,a)}();
