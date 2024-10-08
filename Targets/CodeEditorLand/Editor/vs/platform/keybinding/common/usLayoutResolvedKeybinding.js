import{KeyCode as e,KeyCodeUtils as a,IMMUTABLE_CODE_TO_KEY_CODE as K,ScanCode as r}from"../../../base/common/keyCodes.js";import{KeyCodeChord as o}from"../../../base/common/keybindings.js";import{OperatingSystem as c}from"../../../base/common/platform.js";import{BaseResolvedKeybinding as y}from"./baseResolvedKeybinding.js";import{toEmptyArrayIfContainsNull as l}from"./resolvedKeybindingItem.js";class n extends y{constructor(t,s){super(s,t)}_keyCodeToUILabel(t){if(this._os===c.Macintosh)switch(t){case e.LeftArrow:return"\u2190";case e.UpArrow:return"\u2191";case e.RightArrow:return"\u2192";case e.DownArrow:return"\u2193"}return a.toString(t)}_getLabel(t){return t.isDuplicateModifierCase()?"":this._keyCodeToUILabel(t.keyCode)}_getAriaLabel(t){return t.isDuplicateModifierCase()?"":a.toString(t.keyCode)}_getElectronAccelerator(t){return a.toElectronAccelerator(t.keyCode)}_getUserSettingsLabel(t){if(t.isDuplicateModifierCase())return"";const s=a.toUserSettingsUS(t.keyCode);return s&&s.toLowerCase()}_isWYSIWYG(){return!0}_getChordDispatch(t){return n.getDispatchStr(t)}static getDispatchStr(t){if(t.isModifierKey())return null;let s="";return t.ctrlKey&&(s+="ctrl+"),t.shiftKey&&(s+="shift+"),t.altKey&&(s+="alt+"),t.metaKey&&(s+="meta+"),s+=a.toString(t.keyCode),s}_getSingleModifierChordDispatch(t){return t.keyCode===e.Ctrl&&!t.shiftKey&&!t.altKey&&!t.metaKey?"ctrl":t.keyCode===e.Shift&&!t.ctrlKey&&!t.altKey&&!t.metaKey?"shift":t.keyCode===e.Alt&&!t.ctrlKey&&!t.shiftKey&&!t.metaKey?"alt":t.keyCode===e.Meta&&!t.ctrlKey&&!t.shiftKey&&!t.altKey?"meta":null}static _scanCodeToKeyCode(t){const s=K[t];if(s!==e.DependsOnKbLayout)return s;switch(t){case r.KeyA:return e.KeyA;case r.KeyB:return e.KeyB;case r.KeyC:return e.KeyC;case r.KeyD:return e.KeyD;case r.KeyE:return e.KeyE;case r.KeyF:return e.KeyF;case r.KeyG:return e.KeyG;case r.KeyH:return e.KeyH;case r.KeyI:return e.KeyI;case r.KeyJ:return e.KeyJ;case r.KeyK:return e.KeyK;case r.KeyL:return e.KeyL;case r.KeyM:return e.KeyM;case r.KeyN:return e.KeyN;case r.KeyO:return e.KeyO;case r.KeyP:return e.KeyP;case r.KeyQ:return e.KeyQ;case r.KeyR:return e.KeyR;case r.KeyS:return e.KeyS;case r.KeyT:return e.KeyT;case r.KeyU:return e.KeyU;case r.KeyV:return e.KeyV;case r.KeyW:return e.KeyW;case r.KeyX:return e.KeyX;case r.KeyY:return e.KeyY;case r.KeyZ:return e.KeyZ;case r.Digit1:return e.Digit1;case r.Digit2:return e.Digit2;case r.Digit3:return e.Digit3;case r.Digit4:return e.Digit4;case r.Digit5:return e.Digit5;case r.Digit6:return e.Digit6;case r.Digit7:return e.Digit7;case r.Digit8:return e.Digit8;case r.Digit9:return e.Digit9;case r.Digit0:return e.Digit0;case r.Minus:return e.Minus;case r.Equal:return e.Equal;case r.BracketLeft:return e.BracketLeft;case r.BracketRight:return e.BracketRight;case r.Backslash:return e.Backslash;case r.IntlHash:return e.Unknown;case r.Semicolon:return e.Semicolon;case r.Quote:return e.Quote;case r.Backquote:return e.Backquote;case r.Comma:return e.Comma;case r.Period:return e.Period;case r.Slash:return e.Slash;case r.IntlBackslash:return e.IntlBackslash}return e.Unknown}static _toKeyCodeChord(t){if(!t)return null;if(t instanceof o)return t;const s=this._scanCodeToKeyCode(t.scanCode);return s===e.Unknown?null:new o(t.ctrlKey,t.shiftKey,t.altKey,t.metaKey,s)}static resolveKeybinding(t,s){const i=l(t.chords.map(u=>this._toKeyCodeChord(u)));return i.length>0?[new n(i,s)]:[]}}export{n as USLayoutResolvedKeybinding};
