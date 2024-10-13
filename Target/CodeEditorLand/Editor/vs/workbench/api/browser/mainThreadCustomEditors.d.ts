import { Disposable } from "../../../base/common/lifecycle.js";
import { UriComponents } from "../../../base/common/uri.js";
import { IInstantiationService } from "../../../platform/instantiation/common/instantiation.js";
import { IStorageService } from "../../../platform/storage/common/storage.js";
import { ICustomEditorService } from "../../contrib/customEditor/common/customEditor.js";
import { IWebviewWorkbenchService } from "../../contrib/webviewPanel/browser/webviewWorkbenchService.js";
import { IEditorGroupsService } from "../../services/editor/common/editorGroupsService.js";
import { IEditorService } from "../../services/editor/common/editorService.js";
import { IExtensionService } from "../../services/extensions/common/extensions.js";
import { IExtHostContext } from "../../services/extensions/common/extHostCustomers.js";
import { IWorkingCopyFileService } from "../../services/workingCopy/common/workingCopyFileService.js";
import { IWorkingCopyService } from "../../services/workingCopy/common/workingCopyService.js";
import * as extHostProtocol from "../common/extHost.protocol.js";
import { MainThreadWebviewPanels } from "./mainThreadWebviewPanels.js";
import { MainThreadWebviews } from "./mainThreadWebviews.js";

export declare class MainThreadCustomEditors
	extends Disposable
	implements extHostProtocol.MainThreadCustomEditorsShape
{
	private readonly mainThreadWebview;
	private readonly mainThreadWebviewPanels;
	private readonly _customEditorService;
	private readonly _editorGroupService;
	private readonly _editorService;
	private readonly _instantiationService;
	private readonly _webviewWorkbenchService;
	private readonly _proxyCustomEditors;
	private readonly _editorProviders;
	private readonly _editorRenameBackups;
	private readonly _webviewOriginStore;
	constructor(
		context: IExtHostContext,
		mainThreadWebview: MainThreadWebviews,
		mainThreadWebviewPanels: MainThreadWebviewPanels,
		extensionService: IExtensionService,
		storageService: IStorageService,
		workingCopyService: IWorkingCopyService,
		workingCopyFileService: IWorkingCopyFileService,
		_customEditorService: ICustomEditorService,
		_editorGroupService: IEditorGroupsService,
		_editorService: IEditorService,
		_instantiationService: IInstantiationService,
		_webviewWorkbenchService: IWebviewWorkbenchService,
	);
	$registerTextEditorProvider(
		extensionData: extHostProtocol.WebviewExtensionDescription,
		viewType: string,
		options: extHostProtocol.IWebviewPanelOptions,
		capabilities: extHostProtocol.CustomTextEditorCapabilities,
		serializeBuffersForPostMessage: boolean,
	): void;
	$registerCustomEditorProvider(
		extensionData: extHostProtocol.WebviewExtensionDescription,
		viewType: string,
		options: extHostProtocol.IWebviewPanelOptions,
		supportsMultipleEditorsPerDocument: boolean,
		serializeBuffersForPostMessage: boolean,
	): void;
	private registerEditorProvider;
	$unregisterEditorProvider(viewType: string): void;
	private getOrCreateCustomEditorModel;
	$onDidEdit(
		resourceComponents: UriComponents,
		viewType: string,
		editId: number,
		label: string | undefined,
	): Promise<void>;
	$onContentChange(
		resourceComponents: UriComponents,
		viewType: string,
	): Promise<void>;
	private getCustomEditorModel;
	private onWillRunWorkingCopyFileOperation;
}
