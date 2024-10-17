import*as o from"../../../../nls.js";import{Color as e}from"../../../../base/common/color.js";import{registerColor as r,transparent as t}from"../colorUtils.js";const c=r("foreground",{dark:"#CCCCCC",light:"#616161",hcDark:"#FFFFFF",hcLight:"#292929"},o.localize("foreground","Overall foreground color. This color is only used if not overridden by a component.")),d=r("disabledForeground",{dark:"#CCCCCC80",light:"#61616180",hcDark:"#A5A5A5",hcLight:"#7F7F7F"},o.localize("disabledForeground","Overall foreground for disabled elements. This color is only used if not overridden by a component.")),i=r("errorForeground",{dark:"#F48771",light:"#A1260D",hcDark:"#F48771",hcLight:"#B5200D"},o.localize("errorForeground","Overall foreground color for error messages. This color is only used if not overridden by a component.")),g=r("descriptionForeground",{light:"#717171",dark:t(c,.7),hcDark:t(c,.7),hcLight:t(c,.7)},o.localize("descriptionForeground","Foreground color for description text providing additional information, for example for a label.")),s=r("icon.foreground",{dark:"#C5C5C5",light:"#424242",hcDark:"#FFFFFF",hcLight:"#292929"},o.localize("iconForeground","The default color for icons in the workbench.")),n=r("focusBorder",{dark:"#007FD4",light:"#0090F1",hcDark:"#F38518",hcLight:"#006BBD"},o.localize("focusBorder","Overall border color for focused elements. This color is only used if not overridden by a component.")),h=r("contrastBorder",{light:null,dark:null,hcDark:"#6FC3DF",hcLight:"#0F4A85"},o.localize("contrastBorder","An extra border around elements to separate them from others for greater contrast.")),F=r("contrastActiveBorder",{light:null,dark:null,hcDark:n,hcLight:n},o.localize("activeContrastBorder","An extra border around active elements to separate them from others for greater contrast.")),u=r("selection.background",null,o.localize("selectionBackground","The background color of text selections in the workbench (e.g. for input fields or text areas). Note that this does not apply to selections within the editor.")),k=r("textLink.foreground",{light:"#006AB1",dark:"#3794FF",hcDark:"#21A6FF",hcLight:"#0F4A85"},o.localize("textLinkForeground","Foreground color for links in text.")),f=r("textLink.activeForeground",{light:"#006AB1",dark:"#3794FF",hcDark:"#21A6FF",hcLight:"#0F4A85"},o.localize("textLinkActiveForeground","Foreground color for links in text when clicked on and on mouse hover.")),x=r("textSeparator.foreground",{light:"#0000002e",dark:"#ffffff2e",hcDark:e.black,hcLight:"#292929"},o.localize("textSeparatorForeground","Color for text separators.")),p=r("textPreformat.foreground",{light:"#A31515",dark:"#D7BA7D",hcDark:"#000000",hcLight:"#FFFFFF"},o.localize("textPreformatForeground","Foreground color for preformatted text segments.")),B=r("textPreformat.background",{light:"#0000001A",dark:"#FFFFFF1A",hcDark:"#FFFFFF",hcLight:"#09345f"},o.localize("textPreformatBackground","Background color for preformatted text segments.")),m=r("textBlockQuote.background",{light:"#f2f2f2",dark:"#222222",hcDark:null,hcLight:"#F2F2F2"},o.localize("textBlockQuoteBackground","Background color for block quotes in text.")),b=r("textBlockQuote.border",{light:"#007acc80",dark:"#007acc80",hcDark:e.white,hcLight:"#292929"},o.localize("textBlockQuoteBorder","Border color for block quotes in text.")),C=r("textCodeBlock.background",{light:"#dcdcdc66",dark:"#0a0a0a66",hcDark:e.black,hcLight:"#F2F2F2"},o.localize("textCodeBlockBackground","Background color for code blocks in text."));export{F as activeContrastBorder,h as contrastBorder,g as descriptionForeground,d as disabledForeground,i as errorForeground,n as focusBorder,c as foreground,s as iconForeground,u as selectionBackground,m as textBlockQuoteBackground,b as textBlockQuoteBorder,C as textCodeBlockBackground,f as textLinkActiveForeground,k as textLinkForeground,B as textPreformatBackground,p as textPreformatForeground,x as textSeparatorForeground};
