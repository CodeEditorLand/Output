export const INotificationService: any;
export var NeverShowAgainScope: any;
export class NoOpNotification {
    progress: NoOpProgress;
    onDidClose: any;
    onDidChangeVisibility: any;
    updateSeverity(severity: any): void;
    updateMessage(message: any): void;
    updateActions(actions: any): void;
    close(): void;
}
export class NoOpProgress {
    infinite(): void;
    done(): void;
    total(value: any): void;
    worked(value: any): void;
}
export var NotificationPriority: any;
export var NotificationsFilter: any;
export var Severity: {};
export function isNotificationSource(thing: any): boolean;
export function withSeverityPrefix(label: any, severity: any): any;
//# sourceMappingURL=notification.d.ts.map