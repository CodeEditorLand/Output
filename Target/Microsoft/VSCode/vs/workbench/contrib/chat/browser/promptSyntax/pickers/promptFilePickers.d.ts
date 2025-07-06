export { S as $4fc };
declare let S: {
    new (e: any, t: any, o: any, i: any, r: any, s: any, n: any, a: any): {
        a: any;
        b: any;
        c: any;
        d: any;
        g: any;
        h: any;
        i: any;
        j: any;
        selectPromptFile(e: any): Promise<any>;
        k(e: any): Promise<any>;
        l(e: any): Readonly<{
            type: "item";
            label: `$(plus) ${any}`;
            value: {
                _formatted: string | null;
                _fsPath: any;
                readonly fsPath: any;
                toString(e?: boolean): string;
                toJSON(): {
                    $mid: number;
                };
                scheme: any;
                authority: any;
                path: any;
                query: any;
                fragment: any;
                with(e: any): /*elided*/ any;
            };
            pickable: false;
            alwaysShow: true;
            buttons: Readonly<{
                tooltip: any;
                iconClass: any;
            }>[];
            commandId: "workbench.command.new.prompt";
        }>[] | (Readonly<{
            type: "item";
            label: `$(plus) ${any}`;
            value: {
                _formatted: string | null;
                _fsPath: any;
                readonly fsPath: any;
                toString(e?: boolean): string;
                toJSON(): {
                    $mid: number;
                };
                scheme: any;
                authority: any;
                path: any;
                query: any;
                fragment: any;
                with(e: any): /*elided*/ any;
            };
            pickable: false;
            alwaysShow: true;
            buttons: Readonly<{
                tooltip: any;
                iconClass: any;
            }>[];
            commandId: "workbench.command.new.instructions";
        }> | Readonly<{
            type: "item";
            label: `$(refresh) ${any}`;
            value: {
                _formatted: string | null;
                _fsPath: any;
                readonly fsPath: any;
                toString(e?: boolean): string;
                toJSON(): {
                    $mid: number;
                };
                scheme: any;
                authority: any;
                path: any;
                query: any;
                fragment: any;
                with(e: any): /*elided*/ any;
            };
            pickable: false;
            alwaysShow: true;
            buttons: Readonly<{
                tooltip: any;
                iconClass: any;
            }>[];
            commandId: "workbench.action.chat.generateInstructions";
        }>)[] | Readonly<{
            type: "item";
            label: `$(plus) ${any}`;
            value: {
                _formatted: string | null;
                _fsPath: any;
                readonly fsPath: any;
                toString(e?: boolean): string;
                toJSON(): {
                    $mid: number;
                };
                scheme: any;
                authority: any;
                path: any;
                query: any;
                fragment: any;
                with(e: any): /*elided*/ any;
            };
            pickable: false;
            alwaysShow: true;
            buttons: Readonly<{
                tooltip: any;
                iconClass: any;
            }>[];
            commandId: "workbench.command.new.mode";
        }>[];
        m(e: any, t: any): {
            id: any;
            type: string;
            label: any;
            description: any;
            tooltip: any;
            value: any;
            buttons: any;
        };
        n(e: any, t: any): Promise<void>;
        o(e: any, t: any, o: any): Promise<void>;
    };
};
//# sourceMappingURL=promptFilePickers.d.ts.map