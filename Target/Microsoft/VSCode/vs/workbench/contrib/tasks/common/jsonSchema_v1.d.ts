export { u as default };
declare namespace u {
    let oneOf: {
        allOf: ({
            type: string;
            required: string[];
            properties: {
                version: {
                    type: string;
                    enum: string[];
                    deprecationMessage: any;
                    description: any;
                };
                _runner: {
                    deprecationMessage: any;
                };
                runner: {
                    type: string;
                    enum: string[];
                    default: string;
                    description: any;
                };
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
//# sourceMappingURL=jsonSchema_v1.d.ts.map