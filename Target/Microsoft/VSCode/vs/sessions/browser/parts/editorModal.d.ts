import { Disposable } from '../../../base/common/lifecycle.js';
import { Event } from '../../../base/common/event.js';
import { Part } from '../../../workbench/browser/part.js';
import { IEditorGroupsService } from '../../../workbench/services/editor/common/editorGroupsService.js';
export declare class EditorModal extends Disposable {
    private readonly parentContainer;
    private readonly editorPart;
    private readonly editorGroupService;
    private readonly _onDidChangeVisibility;
    readonly onDidChangeVisibility: Event<boolean>;
    private readonly overlay;
    private readonly container;
    private readonly content;
    private _visible;
    get visible(): boolean;
    private _workbenchWidth;
    private _workbenchHeight;
    constructor(parentContainer: HTMLElement, editorPart: Part, editorGroupService: IEditorGroupsService);
    private createOverlay;
    private createContainer;
    private createContent;
    private createEditorPart;
    private registerKeyboardHandler;
    show(): void;
    hide(): void;
    close(): void;
    layout(workbenchWidth: number, workbenchHeight: number): void;
    private doLayout;
}
