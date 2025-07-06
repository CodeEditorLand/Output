declare const H: {
    "terminal.integrated.mouseWheelZoom": {
        markdownDescription: any;
        type: string;
        default: boolean;
    };
    "terminal.integrated.localEchoLatencyThreshold": {
        description: any;
        type: string;
        minimum: number;
        default: number;
        tags: string[];
    };
    "terminal.integrated.localEchoEnabled": {
        markdownDescription: any;
        type: string;
        enum: string[];
        enumDescriptions: any[];
        default: string;
        tags: string[];
    };
    "terminal.integrated.localEchoExcludePrograms": {
        description: any;
        type: string;
        items: {
            type: string;
            uniqueItems: boolean;
        };
        default: string[];
        tags: string[];
    };
    "terminal.integrated.localEchoStyle": {
        description: any;
        default: string;
        anyOf: ({
            enum: string[];
            type?: never;
            format?: never;
        } | {
            type: string;
            format: string;
            enum?: never;
        })[];
        tags: string[];
    };
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
    "terminal.integrated.stickyScroll.enabled": {
        markdownDescription: any;
        type: string;
        default: boolean;
    };
    "terminal.integrated.stickyScroll.maxLineCount": {
        markdownDescription: any;
        type: string;
        default: number;
        minimum: number;
        maximum: number;
    };
    "terminal.integrated.shellIntegration.history": {
        restricted: boolean;
        markdownDescription: any;
        type: string;
        default: number;
    };
    "terminal.integrated.shellIntegration.showCommandGuide": {
        restricted: boolean;
        markdownDescription: any;
        type: string;
        default: boolean;
    };
    "terminal.integrated.initialHint": {
        restricted: boolean;
        markdownDescription: any;
        type: string;
        default: boolean;
    };
    "terminal.integrated.autoReplies": {
        markdownDescription: any;
        type: string;
        additionalProperties: {
            oneOf: ({
                type: string;
                description: any;
            } | {
                type: string;
                description?: never;
            })[];
        };
        default: {};
    };
    "terminal.integrated.accessibleViewPreserveCursorPosition": {
        markdownDescription: any;
        type: string;
        default: boolean;
    };
    "terminal.integrated.accessibleViewFocusOnCommandExecution": {
        markdownDescription: any;
        type: string;
        default: boolean;
    };
};
declare const P: string[];
declare var o: any;
declare var t: any;
export { H as $y4, P as $z4, o as TerminalContribCommandId, t as TerminalContribSettingId };
//# sourceMappingURL=terminalContribExports.d.ts.map