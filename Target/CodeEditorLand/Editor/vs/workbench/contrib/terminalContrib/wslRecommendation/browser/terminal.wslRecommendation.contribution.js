var S=Object.defineProperty;var v=Object.getOwnPropertyDescriptor;var f=(a,i,o,t)=>{for(var e=t>1?void 0:t?v(i,o):i,c=a.length-1,n;c>=0;c--)(n=a[c])&&(e=(t?n(i,o,e):n(e))||e);return t&&e&&S(i,o,e),e},r=(a,i)=>(o,t)=>i(o,t,a);import{Disposable as b}from"../../../../../base/common/lifecycle.js";import{basename as h}from"../../../../../base/common/path.js";import{isWindows as g}from"../../../../../base/common/platform.js";import{localize as d}from"../../../../../nls.js";import{IExtensionManagementService as w}from"../../../../../platform/extensionManagement/common/extensionManagement.js";import{IInstantiationService as y}from"../../../../../platform/instantiation/common/instantiation.js";import{INotificationService as E,NeverShowAgainScope as C,Severity as k}from"../../../../../platform/notification/common/notification.js";import{IProductService as D}from"../../../../../platform/product/common/productService.js";import{registerWorkbenchContribution2 as P,WorkbenchPhase as A}from"../../../../common/contributions.js";import{InstallRecommendedExtensionAction as L}from"../../../extensions/browser/extensionsActions.js";import{ITerminalService as N}from"../../../terminal/browser/terminal.js";let s=class extends b{static ID="terminalWslRecommendation";constructor(i,o,t,e,c){if(super(),!g)return;const n=e.exeBasedExtensionTips;if(!n||!n.wsl)return;let p=c.onDidCreateInstance(async I=>{async function u(m){return(await i.getInstalled()).some(x=>x.identifier.id===m)}if(!I.shellLaunchConfig.executable||h(I.shellLaunchConfig.executable).toLowerCase()!=="wsl.exe")return;p?.dispose(),p=void 0;const l=Object.keys(n.wsl.recommendations).find(m=>n.wsl.recommendations[m].important);!l||await u(l)||t.prompt(k.Info,d("useWslExtension.title","The '{0}' extension is recommended for opening a terminal in WSL.",n.wsl.friendlyName),[{label:d("install","Install"),run:()=>{o.createInstance(L,l).run()}}],{sticky:!0,neverShowAgain:{id:"terminalConfigHelper/launchRecommendationsIgnore",scope:C.APPLICATION},onCancel:()=>{}})})}};s=f([r(0,w),r(1,y),r(2,E),r(3,D),r(4,N)],s),P(s.ID,s,A.Eventually);export{s as TerminalWslRecommendationContribution};
