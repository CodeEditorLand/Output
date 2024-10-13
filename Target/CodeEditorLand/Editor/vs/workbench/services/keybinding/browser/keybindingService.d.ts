import {
	Keybinding,
	ResolvedKeybinding,
} from "../../../../base/common/keybindings.js";
import { ICommandService } from "../../../../platform/commands/common/commands.js";
import { IContextKeyService } from "../../../../platform/contextkey/common/contextkey.js";
import { IFileService } from "../../../../platform/files/common/files.js";
import { AbstractKeybindingService } from "../../../../platform/keybinding/common/abstractKeybindingService.js";
import {
	IKeyboardEvent,
	KeybindingsSchemaContribution,
} from "../../../../platform/keybinding/common/keybinding.js";
import { KeybindingResolver } from "../../../../platform/keybinding/common/keybindingResolver.js";
import { IKeyboardLayoutService } from "../../../../platform/keyboardLayout/common/keyboardLayout.js";
import { ILogService } from "../../../../platform/log/common/log.js";
import { INotificationService } from "../../../../platform/notification/common/notification.js";
import { ITelemetryService } from "../../../../platform/telemetry/common/telemetry.js";
import { IUriIdentityService } from "../../../../platform/uriIdentity/common/uriIdentity.js";
import { IExtensionService } from "../../extensions/common/extensions.js";
import { IHostService } from "../../host/browser/host.js";
import { IUserDataProfileService } from "../../userDataProfile/common/userDataProfile.js";

export declare class WorkbenchKeybindingService extends AbstractKeybindingService {
	private readonly hostService;
	private readonly keyboardLayoutService;
	private _keyboardMapper;
	private _cachedResolver;
	private userKeybindings;
	private isComposingGlobalContextKey;
	private _keybindingHoldMode;
	private readonly _contributions;
	private readonly kbsJsonSchema;
	constructor(
		contextKeyService: IContextKeyService,
		commandService: ICommandService,
		telemetryService: ITelemetryService,
		notificationService: INotificationService,
		userDataProfileService: IUserDataProfileService,
		hostService: IHostService,
		extensionService: IExtensionService,
		fileService: IFileService,
		uriIdentityService: IUriIdentityService,
		logService: ILogService,
		keyboardLayoutService: IKeyboardLayoutService,
	);
	private _registerKeyListeners;
	registerSchemaContribution(
		contribution: KeybindingsSchemaContribution,
	): void;
	private updateKeybindingsJsonSchema;
	private _printKeybinding;
	private _printResolvedKeybinding;
	private _printResolvedKeybindings;
	private _dumpResolveKeybindingDebugInfo;
	_dumpDebugInfo(): string;
	_dumpDebugInfoJSON(): string;
	enableKeybindingHoldMode(commandId: string): Promise<void> | undefined;
	private _resetKeybindingHoldMode;
	customKeybindingsCount(): number;
	private updateResolver;
	protected _getResolver(): KeybindingResolver;
	protected _documentHasFocus(): boolean;
	private _resolveKeybindingItems;
	private _resolveUserKeybindingItems;
	private _assertBrowserConflicts;
	resolveKeybinding(kb: Keybinding): ResolvedKeybinding[];
	resolveKeyboardEvent(keyboardEvent: IKeyboardEvent): ResolvedKeybinding;
	resolveUserBinding(userBinding: string): ResolvedKeybinding[];
	private _handleKeybindingsExtensionPointUser;
	private _handleKeybinding;
	private static bindToCurrentPlatform;
	private _asCommandRule;
	getDefaultKeybindingsContent(): string;
	private static _getDefaultKeybindings;
	private static _getAllCommandsAsComment;
	mightProducePrintableCharacter(event: IKeyboardEvent): boolean;
}
