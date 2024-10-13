import "./media/userDataProfilesEditor.css";

import { Dimension, IDomPosition } from "../../../../base/browser/dom.js";
import { CancellationToken } from "../../../../base/common/cancellation.js";
import { ThemeIcon } from "../../../../base/common/themables.js";
import { URI } from "../../../../base/common/uri.js";
import { IContextMenuService } from "../../../../platform/contextview/browser/contextView.js";
import { IFileDialogService } from "../../../../platform/dialogs/common/dialogs.js";
import { IEditorOptions } from "../../../../platform/editor/common/editor.js";
import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import { IQuickInputService } from "../../../../platform/quickinput/common/quickInput.js";
import { IStorageService } from "../../../../platform/storage/common/storage.js";
import { ITelemetryService } from "../../../../platform/telemetry/common/telemetry.js";
import { IThemeService } from "../../../../platform/theme/common/themeService.js";
import { IUserDataProfile } from "../../../../platform/userDataProfile/common/userDataProfile.js";
import { EditorPane } from "../../../browser/parts/editor/editorPane.js";
import {
	IEditorOpenContext,
	IEditorSerializer,
	IUntypedEditorInput,
} from "../../../common/editor.js";
import { EditorInput } from "../../../common/editor/editorInput.js";
import { IEditorGroup } from "../../../services/editor/common/editorGroupsService.js";
import { IUserDataProfilesEditor } from "../common/userDataProfile.js";
import { UserDataProfilesEditorModel } from "./userDataProfilesEditorModel.js";

export declare const profilesSashBorder: string;
export declare class UserDataProfilesEditor
	extends EditorPane
	implements IUserDataProfilesEditor
{
	private readonly quickInputService;
	private readonly fileDialogService;
	private readonly contextMenuService;
	private readonly instantiationService;
	static readonly ID: string;
	private container;
	private splitView;
	private profilesList;
	private profileWidget;
	private model;
	private templates;
	constructor(
		group: IEditorGroup,
		telemetryService: ITelemetryService,
		themeService: IThemeService,
		storageService: IStorageService,
		quickInputService: IQuickInputService,
		fileDialogService: IFileDialogService,
		contextMenuService: IContextMenuService,
		instantiationService: IInstantiationService,
	);
	layout(dimension: Dimension, position?: IDomPosition | undefined): void;
	protected createEditor(parent: HTMLElement): void;
	updateStyles(): void;
	private renderSidebar;
	private renderNewProfileButton;
	private getCreateFromTemplateActions;
	private registerListeners;
	private getTreeContextMenuActions;
	private importProfile;
	createNewProfile(copyFrom?: URI | IUserDataProfile): Promise<void>;
	selectProfile(profile: IUserDataProfile): void;
	private getProfileUriFromFileSystem;
	setInput(
		input: UserDataProfilesEditorInput,
		options: IEditorOptions | undefined,
		context: IEditorOpenContext,
		token: CancellationToken,
	): Promise<void>;
	focus(): void;
	private updateProfilesList;
}
export declare class UserDataProfilesEditorInput extends EditorInput {
	private readonly instantiationService;
	static readonly ID: string;
	readonly resource: undefined;
	private readonly model;
	private _dirty;
	get dirty(): boolean;
	set dirty(dirty: boolean);
	constructor(instantiationService: IInstantiationService);
	get typeId(): string;
	getName(): string;
	getIcon(): ThemeIcon | undefined;
	resolve(): Promise<UserDataProfilesEditorModel>;
	isDirty(): boolean;
	save(): Promise<EditorInput>;
	revert(): Promise<void>;
	matches(otherInput: EditorInput | IUntypedEditorInput): boolean;
	dispose(): void;
}
export declare class UserDataProfilesEditorInputSerializer
	implements IEditorSerializer
{
	canSerialize(editorInput: EditorInput): boolean;
	serialize(editorInput: EditorInput): string;
	deserialize(instantiationService: IInstantiationService): EditorInput;
}
