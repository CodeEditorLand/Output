/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { localize } from '../../../../nls.js';
import { RawContextKey } from '../../../../platform/contextkey/common/contextkey.js';
export const CONTEXT_RESPONSE_VOTE = new RawContextKey('chatSessionResponseVote', '', { type: 'string', description: localize('interactiveSessionResponseVote', "When the response has been voted up, is set to 'up'. When voted down, is set to 'down'. Otherwise an empty string.") });
export const CONTEXT_RESPONSE_DETECTED_AGENT_COMMAND = new RawContextKey('chatSessionResponseDetectedAgentOrCommand', false, { type: 'boolean', description: localize('chatSessionResponseDetectedAgentOrCommand', "When the agent or command was automatically detected") });
export const CONTEXT_CHAT_RESPONSE_SUPPORT_ISSUE_REPORTING = new RawContextKey('chatResponseSupportsIssueReporting', false, { type: 'boolean', description: localize('chatResponseSupportsIssueReporting', "True when the current chat response supports issue reporting.") });
export const CONTEXT_RESPONSE_FILTERED = new RawContextKey('chatSessionResponseFiltered', false, { type: 'boolean', description: localize('chatResponseFiltered', "True when the chat response was filtered out by the server.") });
export const CONTEXT_RESPONSE_ERROR = new RawContextKey('chatSessionResponseError', false, { type: 'boolean', description: localize('chatResponseErrored', "True when the chat response resulted in an error.") });
export const CONTEXT_CHAT_REQUEST_IN_PROGRESS = new RawContextKey('chatSessionRequestInProgress', false, { type: 'boolean', description: localize('interactiveSessionRequestInProgress', "True when the current request is still in progress.") });
export const CONTEXT_RESPONSE = new RawContextKey('chatResponse', false, { type: 'boolean', description: localize('chatResponse', "The chat item is a response.") });
export const CONTEXT_REQUEST = new RawContextKey('chatRequest', false, { type: 'boolean', description: localize('chatRequest', "The chat item is a request") });
export const CONTEXT_ITEM_ID = new RawContextKey('chatItemId', '', { type: 'string', description: localize('chatItemId', "The id of the chat item.") });
export const CONTEXT_LAST_ITEM_ID = new RawContextKey('chatLastItemId', [], { type: 'string', description: localize('chatLastItemId', "The id of the last chat item.") });
export const CONTEXT_CHAT_EDIT_APPLIED = new RawContextKey('chatEditApplied', false, { type: 'boolean', description: localize('chatEditApplied', "True when the chat text edits have been applied.") });
export const CONTEXT_CHAT_INPUT_HAS_TEXT = new RawContextKey('chatInputHasText', false, { type: 'boolean', description: localize('interactiveInputHasText', "True when the chat input has text.") });
export const CONTEXT_CHAT_INPUT_HAS_FOCUS = new RawContextKey('chatInputHasFocus', false, { type: 'boolean', description: localize('interactiveInputHasFocus', "True when the chat input has focus.") });
export const CONTEXT_IN_CHAT_INPUT = new RawContextKey('inChatInput', false, { type: 'boolean', description: localize('inInteractiveInput', "True when focus is in the chat input, false otherwise.") });
export const CONTEXT_IN_CHAT_SESSION = new RawContextKey('inChat', false, { type: 'boolean', description: localize('inChat', "True when focus is in the chat widget, false otherwise.") });
export const CONTEXT_CHAT_ENABLED = new RawContextKey('chatIsEnabled', false, { type: 'boolean', description: localize('chatIsEnabled', "True when chat is enabled because a default chat participant is activated with an implementation.") });
export const CONTEXT_CHAT_PANEL_PARTICIPANT_REGISTERED = new RawContextKey('chatPanelParticipantRegistered', false, { type: 'boolean', description: localize('chatParticipantRegistered', "True when a default chat participant is registered for the panel.") });
export const CONTEXT_CHAT_EDITING_PARTICIPANT_REGISTERED = new RawContextKey('chatEditingParticipantRegistered', false, { type: 'boolean', description: localize('chatEditingParticipantRegistered', "True when a default chat participant is registered for editing.") });
export const CONTEXT_CHAT_EXTENSION_INVALID = new RawContextKey('chatExtensionInvalid', false, { type: 'boolean', description: localize('chatExtensionInvalid', "True when the installed chat extension is invalid and needs to be updated.") });
export const CONTEXT_CHAT_INPUT_CURSOR_AT_TOP = new RawContextKey('chatCursorAtTop', false);
export const CONTEXT_CHAT_INPUT_HAS_AGENT = new RawContextKey('chatInputHasAgent', false);
export const CONTEXT_CHAT_LOCATION = new RawContextKey('chatLocation', undefined);
export const CONTEXT_IN_QUICK_CHAT = new RawContextKey('quickChatHasFocus', false, { type: 'boolean', description: localize('inQuickChat', "True when the quick chat UI has focus, false otherwise.") });
export const CONTEXT_LANGUAGE_MODELS_ARE_USER_SELECTABLE = new RawContextKey('chatModelsAreUserSelectable', false, { type: 'boolean', description: localize('chatModelsAreUserSelectable', "True when the chat model can be selected manually by the user.") });
export const CONTEXT_PARTICIPANT_SUPPORTS_MODEL_PICKER = new RawContextKey('chatParticipantSupportsModelPicker', true, { type: 'boolean', description: localize('chatParticipantSupportsModelPicker', "True when the current chat participant supports picking the model manually.") });
