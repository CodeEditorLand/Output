export { r as $YW };
declare namespace r {
    namespace definitions {
        namespace inputs {
            let type: string;
            let description: any;
            namespace items {
                let oneOf: ({
                    type: string;
                    required: string[];
                    additionalProperties: boolean;
                    properties: {
                        id: {
                            type: string;
                            description: any;
                        };
                        type: {
                            type: string;
                            description: any;
                            enum: string[];
                            enumDescriptions: any[];
                        };
                        description: {
                            type: string;
                            description: any;
                        };
                        default: {
                            type: string;
                            description: any;
                        };
                        password: {
                            type: string;
                            description: any;
                        };
                        options?: never;
                        command?: never;
                        args?: never;
                    };
                } | {
                    type: string;
                    required: string[];
                    additionalProperties: boolean;
                    properties: {
                        id: {
                            type: string;
                            description: any;
                        };
                        type: {
                            type: string;
                            description: any;
                            enum: string[];
                            enumDescriptions: any[];
                        };
                        description: {
                            type: string;
                            description: any;
                        };
                        default: {
                            type: string;
                            description: any;
                        };
                        options: {
                            type: string;
                            description: any;
                            items: {
                                oneOf: ({
                                    type: string;
                                    required?: never;
                                    additionalProperties?: never;
                                    properties?: never;
                                } | {
                                    type: string;
                                    required: string[];
                                    additionalProperties: boolean;
                                    properties: {
                                        label: {
                                            type: string;
                                            description: any;
                                        };
                                        value: {
                                            type: string;
                                            description: any;
                                        };
                                    };
                                })[];
                            };
                        };
                        password?: never;
                        command?: never;
                        args?: never;
                    };
                } | {
                    type: string;
                    required: string[];
                    additionalProperties: boolean;
                    properties: {
                        id: {
                            type: string;
                            description: any;
                        };
                        type: {
                            type: string;
                            description: any;
                            enum: string[];
                            enumDescriptions: any[];
                        };
                        command: {
                            type: string;
                            description: any;
                        };
                        args: {
                            oneOf: {
                                type: string;
                                description: any;
                            }[];
                        };
                        description?: never;
                        default?: never;
                        password?: never;
                        options?: never;
                    };
                })[];
            }
        }
    }
}
//# sourceMappingURL=configurationResolverSchema.d.ts.map