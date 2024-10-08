import*as i from"../../../../nls.js";import{Color as o,RGBA as n}from"../../../../base/common/color.js";import{registerColor as r,transparent as e}from"../colorUtils.js";import{editorInfoForeground as a,editorWarningForeground as c,editorWarningBorder as m,editorInfoBorder as l}from"./editorColors.js";import{scrollbarSliderBackground as t,scrollbarSliderHoverBackground as p,scrollbarSliderActiveBackground as g}from"./miscColors.js";const u=r("minimap.findMatchHighlight",{light:"#d18616",dark:"#d18616",hcDark:"#AB5A00",hcLight:"#0F4A85"},i.localize("minimapFindMatchHighlight","Minimap marker color for find matches."),!0),s=r("minimap.selectionOccurrenceHighlight",{light:"#c9c9c9",dark:"#676767",hcDark:"#ffffff",hcLight:"#0F4A85"},i.localize("minimapSelectionOccurrenceHighlight","Minimap marker color for repeating editor selections."),!0),B=r("minimap.selectionHighlight",{light:"#ADD6FF",dark:"#264F78",hcDark:"#ffffff",hcLight:"#0F4A85"},i.localize("minimapSelectionHighlight","Minimap marker color for the editor selection."),!0),S=r("minimap.infoHighlight",{dark:a,light:a,hcDark:l,hcLight:l},i.localize("minimapInfo","Minimap marker color for infos.")),H=r("minimap.warningHighlight",{dark:c,light:c,hcDark:m,hcLight:m},i.localize("overviewRuleWarning","Minimap marker color for warnings.")),w=r("minimap.errorHighlight",{dark:new o(new n(255,18,18,.7)),light:new o(new n(255,18,18,.7)),hcDark:new o(new n(255,50,50,1)),hcLight:"#B5200D"},i.localize("minimapError","Minimap marker color for errors.")),x=r("minimap.background",null,i.localize("minimapBackground","Minimap background color.")),F=r("minimap.foregroundOpacity",o.fromHex("#000f"),i.localize("minimapForegroundOpacity",'Opacity of foreground elements rendered in the minimap. For example, "#000000c0" will render the elements with 75% opacity.')),M=r("minimapSlider.background",e(t,.5),i.localize("minimapSliderBackground","Minimap slider background color.")),v=r("minimapSlider.hoverBackground",e(p,.5),i.localize("minimapSliderHoverBackground","Minimap slider background color when hovering.")),z=r("minimapSlider.activeBackground",e(g,.5),i.localize("minimapSliderActiveBackground","Minimap slider background color when clicked on."));export{x as minimapBackground,w as minimapError,u as minimapFindMatch,F as minimapForegroundOpacity,S as minimapInfo,B as minimapSelection,s as minimapSelectionOccurrenceHighlight,z as minimapSliderActiveBackground,M as minimapSliderBackground,v as minimapSliderHoverBackground,H as minimapWarning};
