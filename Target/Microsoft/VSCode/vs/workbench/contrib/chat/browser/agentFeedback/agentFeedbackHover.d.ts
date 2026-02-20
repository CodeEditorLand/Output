import { Disposable } from '../../../../../base/common/lifecycle.js';
import { IHoverService } from '../../../../../platform/hover/browser/hover.js';
import { IInstantiationService } from '../../../../../platform/instantiation/common/instantiation.js';
import { IEditorService } from '../../../../services/editor/common/editorService.js';
import { IAgentFeedbackService } from './agentFeedbackService.js';
import { IAgentFeedbackVariableEntry } from '../../common/attachments/chatVariableEntries.js';
/**
 * Creates the custom hover content for the "N comments" attachment.
 * Shows each feedback item with its file, range, text, and actions (remove / go to).
 */
export declare class AgentFeedbackHover extends Disposable {
    private readonly _element;
    private readonly _attachment;
    private readonly _hoverService;
    private readonly _instantiationService;
    private readonly _editorService;
    private readonly _agentFeedbackService;
    constructor(_element: HTMLElement, _attachment: IAgentFeedbackVariableEntry, _hoverService: IHoverService, _instantiationService: IInstantiationService, _editorService: IEditorService, _agentFeedbackService: IAgentFeedbackService);
    private _showHoverNow;
    private _buildHoverContent;
    private _goToFeedback;
}
