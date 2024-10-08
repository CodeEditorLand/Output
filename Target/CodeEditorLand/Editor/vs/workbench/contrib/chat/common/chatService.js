import"../../../../base/common/async.js";import"../../../../base/common/cancellation.js";import"../../../../base/common/event.js";import"../../../../base/common/htmlContent.js";import"../../../../base/common/themables.js";import{URI as a}from"../../../../base/common/uri.js";import{Range as i}from"../../../../editor/common/core/range.js";import"../../../../editor/common/core/selection.js";import"../../../../editor/common/languages.js";import"../../../../platform/files/common/files.js";import{createDecorator as r}from"../../../../platform/instantiation/common/instantiation.js";import"../../search/common/search.js";import"./chatAgents.js";import"./chatModel.js";import"./chatParserTypes.js";import"./chatRequestParser.js";import"./chatVariables.js";import"./languageModelToolsService.js";function s(e){return!!e&&typeof e=="object"&&"uri"in e&&e.uri instanceof a&&"version"in e&&typeof e.version=="number"&&"ranges"in e&&Array.isArray(e.ranges)&&e.ranges.every(i.isIRange)}function ae(e){return!!e&&typeof e=="object"&&"documents"in e&&Array.isArray(e.documents)&&e.documents.every(s)}var d=(o=>(o[o.Complete=1]="Complete",o[o.Partial=2]="Partial",o[o.Omitted=3]="Omitted",o))(d||{}),I=(t=>(t[t.Down=0]="Down",t[t.Up=1]="Up",t))(I||{}),c=(n=>(n.IncorrectCode="incorrectCode",n.DidNotFollowInstructions="didNotFollowInstructions",n.IncompleteCode="incompleteCode",n.MissingContext="missingContext",n.PoorlyWrittenOrFormatted="poorlyWrittenOrFormatted",n.RefusedAValidRequest="refusedAValidRequest",n.OffensiveOrUnsafe="offensiveOrUnsafe",n.Other="other",n.WillReportIssue="willReportIssue",n))(c||{}),C=(t=>(t[t.Action=1]="Action",t[t.Toolbar=2]="Toolbar",t))(C||{});const ie=r("IChatService"),re="accessibility.voice.keywordActivation";export{I as ChatAgentVoteDirection,c as ChatAgentVoteDownReason,C as ChatCopyKind,d as ChatResponseReferencePartStatusKind,ie as IChatService,re as KEYWORD_ACTIVIATION_SETTING_ID,s as isIDocumentContext,ae as isIUsedContext};
