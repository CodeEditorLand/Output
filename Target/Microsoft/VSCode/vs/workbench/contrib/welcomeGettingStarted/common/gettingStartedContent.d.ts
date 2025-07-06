declare const A: any;
declare const s: y;
declare function B(i: any): Promise<any>;
declare const S: "NewWelcomeExperience";
declare const N: ({
    id: string;
    title: any;
    description: any;
    icon: {
        id: any;
    };
    content: {
        type: string;
        command: string;
    };
    when?: never;
} | {
    id: string;
    title: any;
    description: any;
    icon: {
        id: any;
    };
    when: string;
    content: {
        type: string;
        command: string;
    };
})[];
declare const R: ({
    id: string;
    title: any;
    description: any;
    isFeatured: boolean;
    icon: any;
    when: string;
    walkthroughPageTitle: any;
    next: string;
    content: {
        type: string;
        steps: ({
            id: any;
            title: any;
            description: string;
            when: string;
            media: {
                type: string;
                altText: string;
                path: string;
            };
        } | {
            id: string;
            title: any;
            description: any;
            completionEvents: string[];
            media: {
                type: string;
                path: string;
                altText?: never;
            };
            when?: never;
        } | {
            id: string;
            title: any;
            description: any;
            when: string;
            media: {
                type: string;
                altText: string;
                path: string;
            };
            completionEvents?: never;
        } | {
            id: string;
            title: any;
            description: any;
            when: string;
            completionEvents: string[];
            media: {
                type: string;
                altText: string;
                path: string;
            };
        } | {
            id: string;
            title: any;
            description: any;
            media: {
                type: string;
                altText: string;
                path: string;
            };
            completionEvents?: never;
            when?: never;
        })[];
    };
} | {
    id: string;
    title: any;
    description: any;
    isFeatured: boolean;
    icon: any;
    when: any;
    next: string;
    walkthroughPageTitle: any;
    content: {
        type: string;
        steps: {
            id: string;
            title: any;
            description: any;
            media: {
                type: string;
                path: string;
            };
        }[];
    };
} | {
    id: string;
    isFeatured: boolean;
    title: any;
    icon: any;
    description: any;
    walkthroughPageTitle: any;
    content: {
        type: string;
        steps: ({
            id: string;
            title: any;
            description: any;
            when: string;
            media: {
                type: string;
                altText: string;
                path: string;
            };
            completionEvents?: never;
        } | {
            id: string;
            title: any;
            description: any;
            when: string;
            media: {
                type: string;
                altText: string;
                path: string;
            };
            completionEvents: string[];
        } | {
            id: string;
            title: any;
            description: any;
            media: {
                type: string;
                altText: string;
                path: string;
            };
            when?: never;
            completionEvents?: never;
        })[];
    };
    when?: never;
    next?: never;
} | {
    id: string;
    title: any;
    description: string;
    icon: any;
    isFeatured: boolean;
    when: string;
    walkthroughPageTitle: any;
    content: {
        type: string;
        steps: {
            completionEvents: string[];
            id: string;
            title: any;
            description: any;
            when: string;
            media: {
                type: string;
                path: string;
            };
        }[];
    };
    next?: never;
} | {
    id: string;
    title: any;
    description: any;
    isFeatured: boolean;
    icon: any;
    when: string;
    walkthroughPageTitle: any;
    content: {
        type: string;
        steps: ({
            id: string;
            title: any;
            description: any;
            media: {
                type: string;
                altText: string;
                path: string;
            };
            completionEvents?: never;
            when?: never;
        } | {
            id: string;
            title: any;
            description: any;
            completionEvents: string[];
            media: {
                type: string;
                path: string;
                altText?: never;
            };
            when?: never;
        } | {
            id: string;
            title: any;
            description: any;
            when: string;
            media: {
                type: string;
                altText: string;
                path: string;
            };
            completionEvents?: never;
        })[];
    };
    next?: never;
})[];
declare class y {
    a: Map<any, any>;
    registerProvider(n: any, l: any): void;
    getProvider(n: any): any;
}
export { A as $Fvc, s as $Gvc, B as $Hvc, S as $Ivc, N as $Jvc, R as $Kvc };
//# sourceMappingURL=gettingStartedContent.d.ts.map