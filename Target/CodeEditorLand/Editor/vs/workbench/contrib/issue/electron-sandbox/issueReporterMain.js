import{safeInnerHtml as m}from"../../../../base/browser/dom.js";import"../../../../base/browser/ui/codicons/codiconStyles.js";import{mainWindow as i}from"../../../../base/browser/window.js";import{isLinux as p,isWindows as a}from"../../../../base/common/platform.js";import"./media/issueReporter.css";import{SyncDescriptor as s}from"../../../../platform/instantiation/common/descriptors.js";import{getSingletonServiceDescriptors as f}from"../../../../platform/instantiation/common/extensions.js";import{InstantiationService as u}from"../../../../platform/instantiation/common/instantiationService.js";import{ServiceCollection as d}from"../../../../platform/instantiation/common/serviceCollection.js";import{IMainProcessService as v}from"../../../../platform/ipc/common/mainProcessService.js";import{ElectronIPCMainProcessService as l}from"../../../../platform/ipc/electron-sandbox/mainProcessService.js";import{registerMainProcessRemoteService as n}from"../../../../platform/ipc/electron-sandbox/services.js";import{INativeHostService as I}from"../../../../platform/native/common/native.js";import{NativeHostService as S}from"../../../../platform/native/common/nativeHostService.js";import w from"../browser/issueReporterPage.js";import{IProcessMainService as R,IIssueMainService as b}from"../../../../platform/issue/common/issue.js";import{IssueReporter as g}from"./issueReporterService.js";function A(o){const e=a?"windows":p?"linux":"mac";i.document.body.classList.add(e),m(i.document.body,w());const r=y(o.windowId).createInstance(g,o);r.render(),i.document.body.style.display="block",r.setInitialFocus()}function y(o){const e=new d,t=f();for(const[r,c]of t)e.set(r,c);return e.set(v,new s(l,[o])),e.set(I,new s(S,[o])),new u(e,!0)}n(b,"issue"),n(R,"process");export{A as startup};
