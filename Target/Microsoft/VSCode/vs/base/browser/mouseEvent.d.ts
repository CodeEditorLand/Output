declare class c {
    constructor(t: any, e: any);
    timestamp: number;
    browserEvent: any;
    leftButton: boolean;
    middleButton: boolean;
    rightButton: boolean;
    buttons: any;
    defaultPrevented: any;
    target: any;
    detail: any;
    ctrlKey: any;
    shiftKey: any;
    altKey: any;
    metaKey: any;
    posx: any;
    posy: any;
    preventDefault(): void;
    stopPropagation(): void;
}
declare class u extends c {
    dataTransfer: any;
}
declare class m {
    constructor(t: any, e?: number, o?: number);
    browserEvent: any;
    target: any;
    deltaY: number;
    deltaX: number;
    preventDefault(): void;
    stopPropagation(): void;
}
export { c as $35, u as $45, m as $55 };
//# sourceMappingURL=mouseEvent.d.ts.map