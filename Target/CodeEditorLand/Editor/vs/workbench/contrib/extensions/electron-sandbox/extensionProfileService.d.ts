import { Event } from "../../../../base/common/event.js";
import { Disposable } from "../../../../base/common/lifecycle.js";
import { URI } from "../../../../base/common/uri.js";
import { IDialogService } from "../../../../platform/dialogs/common/dialogs.js";
import { ExtensionIdentifier } from "../../../../platform/extensions/common/extensions.js";
import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import { INativeHostService } from "../../../../platform/native/common/native.js";
import { IProductService } from "../../../../platform/product/common/productService.js";
import { IEditorService } from "../../../services/editor/common/editorService.js";
import {
	IExtensionHostProfile,
	IExtensionService,
} from "../../../services/extensions/common/extensions.js";
import { IStatusbarService } from "../../../services/statusbar/browser/statusbar.js";
import {
	IExtensionHostProfileService,
	ProfileSessionState,
} from "./runtimeExtensionsEditor.js";

export declare class ExtensionHostProfileService
	extends Disposable
	implements IExtensionHostProfileService
{
	private readonly _extensionService;
	private readonly _editorService;
	private readonly _instantiationService;
	private readonly _nativeHostService;
	private readonly _dialogService;
	private readonly _statusbarService;
	private readonly _productService;
	readonly _serviceBrand: undefined;
	private readonly _onDidChangeState;
	readonly onDidChangeState: Event<void>;
	private readonly _onDidChangeLastProfile;
	readonly onDidChangeLastProfile: Event<void>;
	private readonly _unresponsiveProfiles;
	private _profile;
	private _profileSession;
	private _state;
	private profilingStatusBarIndicator;
	private readonly profilingStatusBarIndicatorLabelUpdater;
	lastProfileSavedTo: URI | undefined;
	get state(): ProfileSessionState;
	get lastProfile(): IExtensionHostProfile | null;
	constructor(
		_extensionService: IExtensionService,
		_editorService: IEditorService,
		_instantiationService: IInstantiationService,
		_nativeHostService: INativeHostService,
		_dialogService: IDialogService,
		_statusbarService: IStatusbarService,
		_productService: IProductService,
	);
	private _setState;
	private updateProfilingStatusBarIndicator;
	startProfiling(): Promise<any>;
	stopProfiling(): void;
	private _setLastProfile;
	getUnresponsiveProfile(
		extensionId: ExtensionIdentifier,
	): IExtensionHostProfile | undefined;
	setUnresponsiveProfile(
		extensionId: ExtensionIdentifier,
		profile: IExtensionHostProfile,
	): void;
}
