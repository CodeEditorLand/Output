import{AccessibleViewType as c,AccessibleViewProviderId as h}from"../../../../platform/accessibility/browser/accessibleView.js";import"../../../../platform/accessibility/browser/accessibleViewRegistry.js";import{IContextKeyService as p}from"../../../../platform/contextkey/common/contextkey.js";import"../../../../platform/instantiation/common/instantiation.js";import{GettingStartedPage as l,inWelcomeContext as u}from"./gettingStarted.js";import{Disposable as g}from"../../../../base/common/lifecycle.js";import{IWalkthroughsService as S}from"./gettingStartedService.js";import{AccessibilityVerbositySettingId as v}from"../../accessibility/browser/accessibilityConfiguration.js";import{IEditorService as I}from"../../../services/editor/common/editorService.js";import{GettingStartedInput as m}from"./gettingStartedInput.js";import{localize as s}from"../../../../nls.js";class z{type=c.View;priority=110;name="walkthroughs";when=u;getProvider=n=>{const e=n.get(I).activeEditorPane;if(!(e instanceof l))return;const t=e.input;if(!(t instanceof m)||!t.selectedCategory)return;const i=n.get(S).getWalkthrough(t.selectedCategory),a=t.selectedStep;if(i)return new _(n.get(p),e,i,a)}}class _ extends g{constructor(r,e,t,o){super();this.contextService=r;this._gettingStartedPage=e;this._focusedItem=t;this._focusedStep=o;this._activeWalkthroughSteps=t.steps.filter(i=>!i.when||this.contextService.contextMatchesRules(i.when))}_currentStepIndex=0;_activeWalkthroughSteps=[];id=h.Walkthrough;verbositySettingKey=v.Walkthrough;options={type:c.View};provideContent(){if(this._focusedStep){const r=this._activeWalkthroughSteps.findIndex(e=>e.id===this._focusedStep);r!==-1&&(this._currentStepIndex=r)}return this._getContent(this._currentStepIndex+1,this._focusedItem,this._activeWalkthroughSteps[this._currentStepIndex])}_getContent(r,e,t){const o=s("gettingStarted.step",`Step {0}: {1}
Description: {2}`,r,t.title,t.description.join(" "));return[s("gettingStarted.title","Title: {0}",e.title),s("gettingStarted.description","Description: {0}",e.description),o].join(`

`)}provideNextContent(){if(++this._currentStepIndex>=this._activeWalkthroughSteps.length){--this._currentStepIndex;return}return this._getContent(this._currentStepIndex+1,this._focusedItem,this._activeWalkthroughSteps[this._currentStepIndex])}providePreviousContent(){if(--this._currentStepIndex<0){++this._currentStepIndex;return}return this._getContent(this._currentStepIndex+1,this._focusedItem,this._activeWalkthroughSteps[this._currentStepIndex])}onClose(){if(this._currentStepIndex>-1){const r=this._activeWalkthroughSteps[this._currentStepIndex];this._gettingStartedPage.makeCategoryVisibleWhenAvailable(this._focusedItem.id,r.id)}}}export{z as GettingStartedAccessibleView};
