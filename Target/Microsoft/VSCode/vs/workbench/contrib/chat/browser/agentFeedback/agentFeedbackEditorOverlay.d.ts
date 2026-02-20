import './media/agentFeedbackEditorOverlay.css';
import { IInstantiationService } from '../../../../../platform/instantiation/common/instantiation.js';
import { IWorkbenchContribution } from '../../../../common/contributions.js';
import { IEditorGroupsService } from '../../../../services/editor/common/editorGroupsService.js';
export declare class AgentFeedbackEditorOverlay implements IWorkbenchContribution {
    static readonly ID = "chat.agentFeedback.editorOverlay";
    private readonly _store;
    constructor(editorGroupsService: IEditorGroupsService, instantiationService: IInstantiationService);
    dispose(): void;
}
