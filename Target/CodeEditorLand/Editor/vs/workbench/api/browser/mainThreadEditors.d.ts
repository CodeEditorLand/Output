import { UriComponents } from "../../../base/common/uri.js";
import { ICodeEditor } from "../../../editor/browser/editorBrowser.js";
import { ICodeEditorService } from "../../../editor/browser/services/codeEditorService.js";
import { ISingleEditOperation } from "../../../editor/common/core/editOperation.js";
import { IRange } from "../../../editor/common/core/range.js";
import { ISelection } from "../../../editor/common/core/selection.js";
import { IChange } from "../../../editor/common/diff/legacyLinesDiffComputer.js";
import {
	IDecorationOptions,
	IDecorationRenderOptions,
} from "../../../editor/common/editorCommon.js";
import { IConfigurationService } from "../../../platform/configuration/common/configuration.js";
import { ExtensionIdentifier } from "../../../platform/extensions/common/extensions.js";
import { IEditorControl } from "../../common/editor.js";
import { EditorGroupColumn } from "../../services/editor/common/editorGroupColumn.js";
import { IEditorGroupsService } from "../../services/editor/common/editorGroupsService.js";
import { IEditorService } from "../../services/editor/common/editorService.js";
import { IExtHostContext } from "../../services/extensions/common/extHostCustomers.js";
import {
	IApplyEditsOptions,
	ITextDocumentShowOptions,
	ITextEditorConfigurationUpdate,
	IUndoStopOptions,
	MainThreadTextEditorsShape,
	TextEditorRevealType,
} from "../common/extHost.protocol.js";
import { MainThreadTextEditor } from "./mainThreadEditor.js";

export interface IMainThreadEditorLocator {
	getEditor(id: string): MainThreadTextEditor | undefined;
	findTextEditorIdFor(editorControl: IEditorControl): string | undefined;
	getIdOfCodeEditor(codeEditor: ICodeEditor): string | undefined;
}
export declare class MainThreadTextEditors
	implements MainThreadTextEditorsShape
{
	private readonly _editorLocator;
	private readonly _codeEditorService;
	private readonly _editorService;
	private readonly _editorGroupService;
	private readonly _configurationService;
	private static INSTANCE_COUNT;
	private readonly _instanceId;
	private readonly _proxy;
	private readonly _toDispose;
	private _textEditorsListenersMap;
	private _editorPositionData;
	private _registeredDecorationTypes;
	constructor(
		_editorLocator: IMainThreadEditorLocator,
		extHostContext: IExtHostContext,
		_codeEditorService: ICodeEditorService,
		_editorService: IEditorService,
		_editorGroupService: IEditorGroupsService,
		_configurationService: IConfigurationService,
	);
	dispose(): void;
	handleTextEditorAdded(textEditor: MainThreadTextEditor): void;
	handleTextEditorRemoved(id: string): void;
	private _updateActiveAndVisibleTextEditors;
	private _getTextEditorPositionData;
	$tryShowTextDocument(
		resource: UriComponents,
		options: ITextDocumentShowOptions,
	): Promise<string | undefined>;
	$tryShowEditor(id: string, position?: EditorGroupColumn): Promise<void>;
	$tryHideEditor(id: string): Promise<void>;
	$trySetSelections(id: string, selections: ISelection[]): Promise<void>;
	$trySetDecorations(
		id: string,
		key: string,
		ranges: IDecorationOptions[],
	): Promise<void>;
	$trySetDecorationsFast(
		id: string,
		key: string,
		ranges: number[],
	): Promise<void>;
	$tryRevealRange(
		id: string,
		range: IRange,
		revealType: TextEditorRevealType,
	): Promise<void>;
	$trySetOptions(
		id: string,
		options: ITextEditorConfigurationUpdate,
	): Promise<void>;
	$tryApplyEdits(
		id: string,
		modelVersionId: number,
		edits: ISingleEditOperation[],
		opts: IApplyEditsOptions,
	): Promise<boolean>;
	$tryInsertSnippet(
		id: string,
		modelVersionId: number,
		template: string,
		ranges: readonly IRange[],
		opts: IUndoStopOptions,
	): Promise<boolean>;
	$registerTextEditorDecorationType(
		extensionId: ExtensionIdentifier,
		key: string,
		options: IDecorationRenderOptions,
	): void;
	$removeTextEditorDecorationType(key: string): void;
	$getDiffInformation(id: string): Promise<IChange[]>;
}
