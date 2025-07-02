export declare enum ChatConfiguration {
    UseFileStorage = "chat.useFileStorage",
    AgentEnabled = "chat.agent.enabled",
    Edits2Enabled = "chat.edits2.enabled",
    ExtensionToolsEnabled = "chat.extensionTools.enabled",
    EditRequests = "chat.editRequests"
}
/**
 * The "kind" of the chat mode- "Agent" for custom modes.
 */
export declare enum ChatModeKind {
    Ask = "ask",
    Edit = "edit",
    Agent = "agent"
}
export declare function validateChatMode(mode: unknown): ChatModeKind | undefined;
export declare function isChatMode(mode: unknown): mode is ChatModeKind;
export type RawChatParticipantLocation = 'panel' | 'terminal' | 'notebook' | 'editing-session';
export declare enum ChatAgentLocation {
    Panel = "panel",
    Terminal = "terminal",
    Notebook = "notebook",
    Editor = "editor"
}
export declare namespace ChatAgentLocation {
    function fromRaw(value: RawChatParticipantLocation | string): ChatAgentLocation;
}
