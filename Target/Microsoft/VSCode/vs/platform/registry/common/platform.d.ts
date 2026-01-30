export const Registry: RegistryImpl;
declare class RegistryImpl {
    data: Map<any, any>;
    add(id: any, data: any): void;
    knows(id: any): boolean;
    as(id: any): any;
    dispose(): void;
}
export {};
//# sourceMappingURL=platform.d.ts.map