declare function H(): void;
declare function F(): void;
declare namespace ee {
    let oneOf: {
        allOf: ({
            type: string;
            required: string[];
            properties: {
                version: any;
                windows: {
                    $ref: string;
                    description: any;
                };
                osx: {
                    $ref: string;
                    description: any;
                };
                linux: {
                    $ref: string;
                    description: any;
                };
            };
            $ref?: never;
        } | {
            $ref: string;
            type?: never;
            required?: never;
            properties?: never;
        })[];
    }[];
}
export { H as $avc, F as $bvc, ee as default };
//# sourceMappingURL=jsonSchema_v2.d.ts.map