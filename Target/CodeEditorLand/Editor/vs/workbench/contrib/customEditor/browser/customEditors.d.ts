import "./media/customEditor.css";

import { Event } from "../../../../base/common/event.js";
import { Disposable, IDisposable } from "../../../../base/common/lifecycle.js";
import { URI } from "../../../../base/common/uri.js";
import { IFileService } from "../../../../platform/files/common/files.js";
import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import { IStorageService } from "../../../../platform/storage/common/storage.js";
import { IUriIdentityService } from "../../../../platform/uriIdentity/common/uriIdentity.js";
import { IEditorGroupsService } from "../../../services/editor/common/editorGroupsService.js";
import {
	IEditorResolverService,
	IEditorType,
} from "../../../services/editor/common/editorResolverService.js";
import { IEditorService } from "../../../services/editor/common/editorService.js";
import {
	CustomEditorCapabilities,
	CustomEditorInfo,
	CustomEditorInfoCollection,
	ICustomEditorService,
} from "../common/customEditor.js";
import { CustomEditorModelManager } from "../common/customEditorModelManager.js";

export declare class CustomEditorService
	extends Disposable
	implements ICustomEditorService
{
	private readonly editorService;
	private readonly editorGroupService;
	private readonly instantiationService;
	private readonly uriIdentityService;
	private readonly editorResolverService;
	_serviceBrand: any;
	private readonly _contributedEditors;
	private _untitledCounter;
	private readonly _editorResolverDisposables;
	private readonly _editorCapabilities;
	private readonly _models;
	private readonly _onDidChangeEditorTypes;
	readonly onDidChangeEditorTypes: Event<void>;
	private readonly _fileEditorFactory;
	constructor(
		fileService: IFileService,
		storageService: IStorageService,
		editorService: IEditorService,
		editorGroupService: IEditorGroupsService,
		instantiationService: IInstantiationService,
		uriIdentityService: IUriIdentityService,
		editorResolverService: IEditorResolverService,
	);
	getEditorTypes(): IEditorType[];
	private withActiveCustomEditor;
	private registerContributionPoints;
	private createDiffEditorInput;
	get models(): CustomEditorModelManager;
	getCustomEditor(viewType: string): CustomEditorInfo | undefined;
	getContributedCustomEditors(resource: URI): CustomEditorInfoCollection;
	getUserConfiguredCustomEditors(resource: URI): CustomEditorInfoCollection;
	getAllCustomEditors(resource: URI): CustomEditorInfoCollection;
	registerCustomEditorCapabilities(
		viewType: string,
		options: CustomEditorCapabilities,
	): IDisposable;
	getCustomEditorCapabilities(
		viewType: string,
	): CustomEditorCapabilities | undefined;
	private getActiveCustomEditorId;
	private getCustomEditorIsEditable;
	private handleMovedFileInOpenedFileEditors;
}
