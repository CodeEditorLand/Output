import { Event, IWaitUntil } from "../../../../base/common/event.js";
import { IReference } from "../../../../base/common/lifecycle.js";
import { URI } from "../../../../base/common/uri.js";
import { NotebookTextModel } from "./model/notebookTextModel.js";
import {
	IResolvedNotebookEditorModel,
	NotebookEditorModelCreationOptions,
} from "./notebookCommon.js";

export declare const INotebookEditorModelResolverService: import("../../../../platform/instantiation/common/instantiation.js").ServiceIdentifier<INotebookEditorModelResolverService>;
/**
 * A notebook file can only be opened ONCE per notebook type.
 * This event fires when a file is already open as type A
 * and there is request to open it as type B. Listeners must
 * do cleanup (close editor, release references) or the request fails
 */
export interface INotebookConflictEvent extends IWaitUntil {
	resource: URI;
	viewType: string;
}
export interface IUntitledNotebookResource {
	/**
	 * Depending on the value of `untitledResource` will
	 * resolve a untitled notebook that:
	 * - gets a unique name if `undefined` (e.g. `Untitled-1')
	 * - uses the resource directly if the scheme is `untitled:`
	 * - converts any other resource scheme to `untitled:` and will
	 *   assume an associated file path
	 *
	 * Untitled notebook editors with associated path behave slightly
	 * different from other untitled editors:
	 * - they are dirty right when opening
	 * - they will not ask for a file path when saving but use the associated path
	 */
	untitledResource: URI | undefined;
}
export interface INotebookEditorModelResolverService {
	readonly _serviceBrand: undefined;
	readonly onDidSaveNotebook: Event<URI>;
	readonly onDidChangeDirty: Event<IResolvedNotebookEditorModel>;
	readonly onWillFailWithConflict: Event<INotebookConflictEvent>;
	isDirty(resource: URI): boolean;
	createUntitledNotebookTextModel(
		viewType: string,
	): Promise<NotebookTextModel>;
	resolve(
		resource: URI,
		viewType?: string,
		creationOptions?: NotebookEditorModelCreationOptions,
	): Promise<IReference<IResolvedNotebookEditorModel>>;
	resolve(
		resource: IUntitledNotebookResource,
		viewType: string,
		creationOtions?: NotebookEditorModelCreationOptions,
	): Promise<IReference<IResolvedNotebookEditorModel>>;
}
