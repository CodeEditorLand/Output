import { ThemeIcon } from '../../../../base/common/themables.js';
import { IUntypedEditorInput } from '../../../../workbench/common/editor.js';
import { EditorInput } from '../../../../workbench/common/editor/editorInput.js';
/**
 * Editor input for the AI Customizations Management Editor.
 * This is a singleton-style input with no file resource.
 */
export declare class AICustomizationManagementEditorInput extends EditorInput {
    static readonly ID: string;
    readonly resource: undefined;
    private static _instance;
    private _sectionLabel;
    /**
     * Gets or creates the singleton instance of this input.
     */
    static getOrCreate(): AICustomizationManagementEditorInput;
    constructor();
    matches(otherInput: EditorInput | IUntypedEditorInput): boolean;
    get typeId(): string;
    getName(): string;
    /**
     * Updates the section label shown in the editor tab title.
     */
    setSectionLabel(label: string): void;
    getIcon(): ThemeIcon;
    resolve(): Promise<null>;
}
