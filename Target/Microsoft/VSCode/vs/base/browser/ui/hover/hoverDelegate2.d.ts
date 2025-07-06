declare function u(d: any): void;
declare function t(): {
    showInstantHover: () => void;
    showDelayedHover: () => void;
    setupDelayedHover: () => Readonly<{
        dispose(): void;
    }> | undefined;
    setupDelayedHoverAtMouse: () => Readonly<{
        dispose(): void;
    }> | undefined;
    hideHover: () => void;
    showAndFocusLastHover: () => void;
    setupManagedHover: () => {
        dispose: () => void;
        show: () => void;
        hide: () => void;
        update: () => void;
    };
    showManagedHover: () => void;
};
export { u as $a9, t as $b9 };
//# sourceMappingURL=hoverDelegate2.d.ts.map