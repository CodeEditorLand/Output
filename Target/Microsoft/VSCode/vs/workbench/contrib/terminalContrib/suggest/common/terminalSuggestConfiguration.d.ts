declare const s: string[];
declare const l: "terminal.integrated.suggest";
declare const o: {
    "terminal.integrated.suggest.enabled": {
        restricted: boolean;
        markdownDescription: any;
        type: string;
        default: boolean;
        tags: string[];
    };
    "terminal.integrated.suggest.providers": {
        restricted: boolean;
        markdownDescription: any;
        type: string;
        properties: {};
        default: {
            "terminal-suggest": boolean;
            "pwsh-shell-integration": boolean;
            lsp: boolean;
        };
        tags: string[];
    };
    "terminal.integrated.suggest.quickSuggestions": {
        restricted: boolean;
        markdownDescription: any;
        type: string;
        properties: {
            commands: {
                description: any;
                type: string;
                enum: string[];
            };
            arguments: {
                description: any;
                type: string;
                enum: string[];
            };
            unknown: {
                description: any;
                type: string;
                enum: string[];
            };
        };
        default: {
            commands: string;
            arguments: string;
            unknown: string;
        };
        tags: string[];
    };
    "terminal.integrated.suggest.suggestOnTriggerCharacters": {
        restricted: boolean;
        markdownDescription: any;
        type: string;
        default: boolean;
        tags: string[];
    };
    "terminal.integrated.suggest.runOnEnter": {
        restricted: boolean;
        markdownDescription: any;
        enum: string[];
        markdownEnumDescriptions: any[];
        default: string;
        tags: string[];
    };
    "terminal.integrated.suggest.selectionMode": {
        markdownDescription: any;
        type: string;
        enum: string[];
        markdownEnumDescriptions: any[];
        default: string;
        tags: string[];
    };
    "terminal.integrated.suggest.windowsExecutableExtensions": {
        restricted: boolean;
        markdownDescription: any;
        type: string;
        default: {};
        tags: string[];
    };
    "terminal.integrated.suggest.showStatusBar": {
        restricted: boolean;
        markdownDescription: any;
        type: string;
        default: boolean;
        tags: string[];
    };
    "terminal.integrated.suggest.cdPath": {
        restricted: boolean;
        markdownDescription: any;
        type: string;
        enum: string[];
        markdownEnumDescriptions: any[];
        default: string;
        tags: string[];
    };
    "terminal.integrated.suggest.inlineSuggestion": {
        restricted: boolean;
        markdownDescription: any;
        type: string;
        enum: string[];
        markdownEnumDescriptions: any[];
        default: string;
        tags: string[];
    };
    "terminal.integrated.suggest.upArrowNavigatesHistory": {
        restricted: boolean;
        markdownDescription: any;
        type: string;
        default: boolean;
        tags: string[];
    };
};
declare var r: any;
export { s as $s4, l as $t4, o as $u4, r as TerminalSuggestSettingId };
//# sourceMappingURL=terminalSuggestConfiguration.d.ts.map