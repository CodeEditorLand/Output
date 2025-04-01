var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};
var __decorateParam = (index, decorator) => (target, key) => decorator(target, key, index);
import { coalesce, isNonEmptyArray } from "../../../../base/common/arrays.js";
import { Codicon } from "../../../../base/common/codicons.js";
import { toErrorMessage } from "../../../../base/common/errorMessage.js";
import { Event } from "../../../../base/common/event.js";
import { MarkdownString } from "../../../../base/common/htmlContent.js";
import { KeyCode, KeyMod } from "../../../../base/common/keyCodes.js";
import {
  Disposable,
  DisposableMap,
  DisposableStore
} from "../../../../base/common/lifecycle.js";
import * as strings from "../../../../base/common/strings.js";
import { URI } from "../../../../base/common/uri.js";
import { ServicesAccessor } from "../../../../editor/browser/editorExtensions.js";
import { localize, localize2 } from "../../../../nls.js";
import { CommandsRegistry } from "../../../../platform/commands/common/commands.js";
import { IConfigurationService } from "../../../../platform/configuration/common/configuration.js";
import {
  ContextKeyExpr,
  IContextKey,
  IContextKeyService,
  RawContextKey
} from "../../../../platform/contextkey/common/contextkey.js";
import {
  ExtensionIdentifier,
  IExtensionManifest
} from "../../../../platform/extensions/common/extensions.js";
import { SyncDescriptor } from "../../../../platform/instantiation/common/descriptors.js";
import { ILogService } from "../../../../platform/log/common/log.js";
import { IOpenerService } from "../../../../platform/opener/common/opener.js";
import { IProductService } from "../../../../platform/product/common/productService.js";
import { Registry } from "../../../../platform/registry/common/platform.js";
import {
  IStorageService,
  StorageScope,
  StorageTarget
} from "../../../../platform/storage/common/storage.js";
import { ViewPane } from "../../../browser/parts/views/viewPane.js";
import { ViewPaneContainer } from "../../../browser/parts/views/viewPaneContainer.js";
import {
  IWorkbenchContribution,
  registerWorkbenchContribution2,
  WorkbenchPhase
} from "../../../common/contributions.js";
import {
  IViewContainersRegistry,
  IViewDescriptor,
  IViewsRegistry,
  ViewContainer,
  ViewContainerLocation,
  Extensions as ViewExtensions
} from "../../../common/views.js";
import {
  Extensions,
  IExtensionFeaturesRegistry,
  IExtensionFeatureTableRenderer,
  IRenderedData,
  IRowData,
  ITableData
} from "../../../services/extensionManagement/common/extensionFeatures.js";
import { isProposedApiEnabled } from "../../../services/extensions/common/extensions.js";
import * as extensionsRegistry from "../../../services/extensions/common/extensionsRegistry.js";
import { IViewsService } from "../../../services/views/common/viewsService.js";
import { showExtensionsWithIdsCommandId } from "../../extensions/browser/extensionsActions.js";
import {
  IExtension,
  IExtensionsWorkbenchService
} from "../../extensions/common/extensions.js";
import { IChatAgentData, IChatAgentService } from "../common/chatAgents.js";
import { ChatContextKeys } from "../common/chatContextKeys.js";
import { IRawChatParticipantContribution } from "../common/chatParticipantContribTypes.js";
import { IChatService } from "../common/chatService.js";
import { ChatAgentLocation, ChatConfiguration } from "../common/constants.js";
import { ChatViewId, showChatView } from "./chat.js";
import {
  CHAT_EDITING_SIDEBAR_PANEL_ID,
  CHAT_SIDEBAR_PANEL_ID,
  ChatViewPane
} from "./chatViewPane.js";
const chatViewContainer = Registry.as(
  ViewExtensions.ViewContainersRegistry
).registerViewContainer(
  {
    id: CHAT_SIDEBAR_PANEL_ID,
    title: localize2("chat.viewContainer.label", "Chat"),
    icon: Codicon.commentDiscussion,
    ctorDescriptor: new SyncDescriptor(ViewPaneContainer, [
      CHAT_SIDEBAR_PANEL_ID,
      { mergeViewWithContainerWhenSingleView: true }
    ]),
    storageId: CHAT_SIDEBAR_PANEL_ID,
    hideIfEmpty: true,
    order: 100
  },
  ViewContainerLocation.AuxiliaryBar,
  { isDefault: true, doNotRegisterOpenCommand: true }
);
const chatViewDescriptor = [
  {
    id: ChatViewId,
    containerIcon: chatViewContainer.icon,
    containerTitle: chatViewContainer.title.value,
    singleViewPaneContainerTitle: chatViewContainer.title.value,
    name: localize2("chat.viewContainer.label", "Chat"),
    canToggleVisibility: false,
    canMoveView: true,
    openCommandActionDescriptor: {
      id: CHAT_SIDEBAR_PANEL_ID,
      title: chatViewContainer.title,
      mnemonicTitle: localize(
        { key: "miToggleChat", comment: ["&& denotes a mnemonic"] },
        "&&Chat"
      ),
      keybindings: {
        primary: KeyMod.CtrlCmd | KeyMod.Alt | KeyCode.KeyI,
        mac: {
          primary: KeyMod.CtrlCmd | KeyMod.WinCtrl | KeyCode.KeyI
        }
      },
      order: 1
    },
    ctorDescriptor: new SyncDescriptor(ChatViewPane, [
      { location: ChatAgentLocation.Panel }
    ]),
    when: ContextKeyExpr.or(
      ChatContextKeys.Setup.hidden.negate(),
      ChatContextKeys.Setup.installed,
      ChatContextKeys.panelParticipantRegistered,
      ChatContextKeys.extensionInvalid
    )
  }
];
Registry.as(ViewExtensions.ViewsRegistry).registerViews(
  chatViewDescriptor,
  chatViewContainer
);
const editsViewContainer = Registry.as(
  ViewExtensions.ViewContainersRegistry
).registerViewContainer(
  {
    id: CHAT_EDITING_SIDEBAR_PANEL_ID,
    title: localize2("chatEditing.viewContainer.label", "Copilot Edits"),
    icon: Codicon.editSession,
    ctorDescriptor: new SyncDescriptor(ViewPaneContainer, [
      CHAT_EDITING_SIDEBAR_PANEL_ID,
      { mergeViewWithContainerWhenSingleView: true }
    ]),
    storageId: CHAT_EDITING_SIDEBAR_PANEL_ID,
    hideIfEmpty: true,
    order: 101
  },
  ViewContainerLocation.AuxiliaryBar,
  { doNotRegisterOpenCommand: true }
);
const chatParticipantExtensionPoint = extensionsRegistry.ExtensionsRegistry.registerExtensionPoint({
  extensionPoint: "chatParticipants",
  jsonSchema: {
    description: localize(
      "vscode.extension.contributes.chatParticipant",
      "Contributes a chat participant"
    ),
    type: "array",
    items: {
      additionalProperties: false,
      type: "object",
      defaultSnippets: [{ body: { name: "", description: "" } }],
      required: ["name", "id"],
      properties: {
        id: {
          description: localize(
            "chatParticipantId",
            "A unique id for this chat participant."
          ),
          type: "string"
        },
        name: {
          description: localize(
            "chatParticipantName",
            "User-facing name for this chat participant. The user will use '@' with this name to invoke the participant. Name must not contain whitespace."
          ),
          type: "string",
          pattern: "^[\\w-]+$"
        },
        fullName: {
          markdownDescription: localize(
            "chatParticipantFullName",
            "The full name of this chat participant, which is shown as the label for responses coming from this participant. If not provided, {0} is used.",
            "`name`"
          ),
          type: "string"
        },
        description: {
          description: localize(
            "chatParticipantDescription",
            "A description of this chat participant, shown in the UI."
          ),
          type: "string"
        },
        isSticky: {
          description: localize(
            "chatCommandSticky",
            "Whether invoking the command puts the chat into a persistent mode, where the command is automatically added to the chat input for the next message."
          ),
          type: "boolean"
        },
        sampleRequest: {
          description: localize(
            "chatSampleRequest",
            "When the user clicks this participant in `/help`, this text will be submitted to the participant."
          ),
          type: "string"
        },
        when: {
          description: localize(
            "chatParticipantWhen",
            "A condition which must be true to enable this participant."
          ),
          type: "string"
        },
        disambiguation: {
          description: localize(
            "chatParticipantDisambiguation",
            "Metadata to help with automatically routing user questions to this chat participant."
          ),
          type: "array",
          items: {
            additionalProperties: false,
            type: "object",
            defaultSnippets: [
              {
                body: {
                  category: "",
                  description: "",
                  examples: []
                }
              }
            ],
            required: ["category", "description", "examples"],
            properties: {
              category: {
                markdownDescription: localize(
                  "chatParticipantDisambiguationCategory",
                  "A detailed name for this category, e.g. `workspace_questions` or `web_questions`."
                ),
                type: "string"
              },
              description: {
                description: localize(
                  "chatParticipantDisambiguationDescription",
                  "A detailed description of the kinds of questions that are suitable for this chat participant."
                ),
                type: "string"
              },
              examples: {
                description: localize(
                  "chatParticipantDisambiguationExamples",
                  "A list of representative example questions that are suitable for this chat participant."
                ),
                type: "array"
              }
            }
          }
        },
        commands: {
          markdownDescription: localize(
            "chatCommandsDescription",
            "Commands available for this chat participant, which the user can invoke with a `/`."
          ),
          type: "array",
          items: {
            additionalProperties: false,
            type: "object",
            defaultSnippets: [
              { body: { name: "", description: "" } }
            ],
            required: ["name"],
            properties: {
              name: {
                description: localize(
                  "chatCommand",
                  "A short name by which this command is referred to in the UI, e.g. `fix` or * `explain` for commands that fix an issue or explain code. The name should be unique among the commands provided by this participant."
                ),
                type: "string"
              },
              description: {
                description: localize(
                  "chatCommandDescription",
                  "A description of this command."
                ),
                type: "string"
              },
              when: {
                description: localize(
                  "chatCommandWhen",
                  "A condition which must be true to enable this command."
                ),
                type: "string"
              },
              sampleRequest: {
                description: localize(
                  "chatCommandSampleRequest",
                  "When the user clicks this command in `/help`, this text will be submitted to the participant."
                ),
                type: "string"
              },
              isSticky: {
                description: localize(
                  "chatCommandSticky",
                  "Whether invoking the command puts the chat into a persistent mode, where the command is automatically added to the chat input for the next message."
                ),
                type: "boolean"
              },
              disambiguation: {
                description: localize(
                  "chatCommandDisambiguation",
                  "Metadata to help with automatically routing user questions to this chat command."
                ),
                type: "array",
                items: {
                  additionalProperties: false,
                  type: "object",
                  defaultSnippets: [
                    {
                      body: {
                        category: "",
                        description: "",
                        examples: []
                      }
                    }
                  ],
                  required: [
                    "category",
                    "description",
                    "examples"
                  ],
                  properties: {
                    category: {
                      markdownDescription: localize(
                        "chatCommandDisambiguationCategory",
                        "A detailed name for this category, e.g. `workspace_questions` or `web_questions`."
                      ),
                      type: "string"
                    },
                    description: {
                      description: localize(
                        "chatCommandDisambiguationDescription",
                        "A detailed description of the kinds of questions that are suitable for this chat command."
                      ),
                      type: "string"
                    },
                    examples: {
                      description: localize(
                        "chatCommandDisambiguationExamples",
                        "A list of representative example questions that are suitable for this chat command."
                      ),
                      type: "array"
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  activationEventsGenerator: /* @__PURE__ */ __name((contributions, result) => {
    for (const contrib of contributions) {
      result.push(`onChatParticipant:${contrib.id}`);
    }
  }, "activationEventsGenerator")
});
let ChatExtensionPointHandler = class {
  constructor(_chatAgentService, logService) {
    this._chatAgentService = _chatAgentService;
    this.logService = logService;
    this.handleAndRegisterChatExtensions();
  }
  static {
    __name(this, "ChatExtensionPointHandler");
  }
  static ID = "workbench.contrib.chatExtensionPointHandler";
  _participantRegistrationDisposables = new DisposableMap();
  handleAndRegisterChatExtensions() {
    chatParticipantExtensionPoint.setHandler((extensions, delta) => {
      for (const extension of delta.added) {
        for (const providerDescriptor of extension.value) {
          if (!providerDescriptor.name?.match(/^[\w-]+$/)) {
            this.logService.error(
              `Extension '${extension.description.identifier.value}' CANNOT register participant with invalid name: ${providerDescriptor.name}. Name must match /^[\\w-]+$/.`
            );
            continue;
          }
          if (providerDescriptor.fullName && strings.AmbiguousCharacters.getInstance(
            /* @__PURE__ */ new Set()
          ).containsAmbiguousCharacter(
            providerDescriptor.fullName
          )) {
            this.logService.error(
              `Extension '${extension.description.identifier.value}' CANNOT register participant with fullName that contains ambiguous characters: ${providerDescriptor.fullName}.`
            );
            continue;
          }
          if (providerDescriptor.fullName && strings.InvisibleCharacters.containsInvisibleCharacter(
            providerDescriptor.fullName.replace(/ /g, "")
          )) {
            this.logService.error(
              `Extension '${extension.description.identifier.value}' CANNOT register participant with fullName that contains invisible characters: ${providerDescriptor.fullName}.`
            );
            continue;
          }
          if ((providerDescriptor.isDefault || providerDescriptor.isAgent) && !isProposedApiEnabled(
            extension.description,
            "defaultChatParticipant"
          )) {
            this.logService.error(
              `Extension '${extension.description.identifier.value}' CANNOT use API proposal: defaultChatParticipant.`
            );
            continue;
          }
          if (providerDescriptor.locations && !isProposedApiEnabled(
            extension.description,
            "chatParticipantAdditions"
          )) {
            this.logService.error(
              `Extension '${extension.description.identifier.value}' CANNOT use API proposal: chatParticipantAdditions.`
            );
            continue;
          }
          if (!providerDescriptor.id || !providerDescriptor.name) {
            this.logService.error(
              `Extension '${extension.description.identifier.value}' CANNOT register participant without both id and name.`
            );
            continue;
          }
          const participantsDisambiguation = [];
          if (providerDescriptor.disambiguation?.length) {
            participantsDisambiguation.push(
              ...providerDescriptor.disambiguation.map((d) => ({
                ...d,
                category: d.category ?? d.categoryName
              }))
            );
          }
          try {
            const store = new DisposableStore();
            store.add(
              this._chatAgentService.registerAgent(
                providerDescriptor.id,
                {
                  extensionId: extension.description.identifier,
                  publisherDisplayName: extension.description.publisherDisplayName ?? extension.description.publisher,
                  // May not be present in OSS
                  extensionPublisherId: extension.description.publisher,
                  extensionDisplayName: extension.description.displayName ?? extension.description.name,
                  id: providerDescriptor.id,
                  description: providerDescriptor.description,
                  when: providerDescriptor.when,
                  metadata: {
                    isSticky: providerDescriptor.isSticky,
                    sampleRequest: providerDescriptor.sampleRequest
                  },
                  name: providerDescriptor.name,
                  fullName: providerDescriptor.fullName,
                  isDefault: providerDescriptor.isDefault,
                  isToolsAgent: providerDescriptor.isAgent,
                  locations: isNonEmptyArray(
                    providerDescriptor.locations
                  ) ? providerDescriptor.locations.map(
                    ChatAgentLocation.fromRaw
                  ) : [ChatAgentLocation.Panel],
                  slashCommands: providerDescriptor.commands ?? [],
                  disambiguation: coalesce(
                    participantsDisambiguation.flat()
                  )
                }
              )
            );
            this._participantRegistrationDisposables.set(
              getParticipantKey(
                extension.description.identifier,
                providerDescriptor.id
              ),
              store
            );
          } catch (e) {
            this.logService.error(
              `Failed to register participant ${providerDescriptor.id}: ${toErrorMessage(e, true)}`
            );
          }
        }
      }
      for (const extension of delta.removed) {
        for (const providerDescriptor of extension.value) {
          this._participantRegistrationDisposables.deleteAndDispose(
            getParticipantKey(
              extension.description.identifier,
              providerDescriptor.id
            )
          );
        }
      }
    });
  }
};
ChatExtensionPointHandler = __decorateClass([
  __decorateParam(0, IChatAgentService),
  __decorateParam(1, ILogService)
], ChatExtensionPointHandler);
function getParticipantKey(extensionId, participantName) {
  return `${extensionId.value}_${participantName}`;
}
__name(getParticipantKey, "getParticipantKey");
let ChatCompatibilityNotifier = class extends Disposable {
  constructor(extensionsWorkbenchService, contextKeyService, productService) {
    super();
    this.productService = productService;
    const isInvalid = ChatContextKeys.extensionInvalid.bindTo(contextKeyService);
    this._register(
      Event.runAndSubscribe(
        extensionsWorkbenchService.onDidChangeExtensionsNotification,
        () => {
          const notification = extensionsWorkbenchService.getExtensionsNotification();
          const chatExtension = notification?.extensions.find(
            (ext) => ExtensionIdentifier.equals(
              ext.identifier.id,
              this.productService.defaultChatAgent?.chatExtensionId
            )
          );
          if (chatExtension) {
            isInvalid.set(true);
            this.registerWelcomeView(chatExtension);
          } else {
            isInvalid.set(false);
          }
        }
      )
    );
  }
  static {
    __name(this, "ChatCompatibilityNotifier");
  }
  static ID = "workbench.contrib.chatCompatNotifier";
  registeredWelcomeView = false;
  registerWelcomeView(chatExtension) {
    if (this.registeredWelcomeView) {
      return;
    }
    this.registeredWelcomeView = true;
    const showExtensionLabel = localize("showExtension", "Show Extension");
    const mainMessage = localize(
      "chatFailErrorMessage",
      "Chat failed to load because the installed version of the Copilot Chat extension is not compatible with this version of {0}. Please ensure that the Copilot Chat extension is up to date.",
      this.productService.nameLong
    );
    const commandButton = `[${showExtensionLabel}](command:${showExtensionsWithIdsCommandId}?${encodeURIComponent(JSON.stringify([[this.productService.defaultChatAgent?.chatExtensionId]]))})`;
    const versionMessage = `Copilot Chat version: ${chatExtension.version}`;
    const viewsRegistry = Registry.as(
      ViewExtensions.ViewsRegistry
    );
    this._register(
      viewsRegistry.registerViewWelcomeContent(ChatViewId, {
        content: [mainMessage, commandButton, versionMessage].join(
          "\n\n"
        ),
        when: ChatContextKeys.extensionInvalid
      })
    );
  }
};
ChatCompatibilityNotifier = __decorateClass([
  __decorateParam(0, IExtensionsWorkbenchService),
  __decorateParam(1, IContextKeyService),
  __decorateParam(2, IProductService)
], ChatCompatibilityNotifier);
class ChatParticipantDataRenderer extends Disposable {
  static {
    __name(this, "ChatParticipantDataRenderer");
  }
  type = "table";
  shouldRender(manifest) {
    return !!manifest.contributes?.chatParticipants;
  }
  render(manifest) {
    const nonDefaultContributions = manifest.contributes?.chatParticipants?.filter(
      (c) => !c.isDefault
    ) ?? [];
    if (!nonDefaultContributions.length) {
      return { data: { headers: [], rows: [] }, dispose: /* @__PURE__ */ __name(() => {
      }, "dispose") };
    }
    const headers = [
      localize("participantName", "Name"),
      localize("participantFullName", "Full Name"),
      localize("participantDescription", "Description"),
      localize("participantCommands", "Commands")
    ];
    const rows = nonDefaultContributions.map((d) => {
      return [
        "@" + d.name,
        d.fullName,
        d.description ?? "-",
        d.commands?.length ? new MarkdownString(
          d.commands.map((c) => `- /` + c.name).join("\n")
        ) : "-"
      ];
    });
    return {
      data: {
        headers,
        rows
      },
      dispose: /* @__PURE__ */ __name(() => {
      }, "dispose")
    };
  }
}
Registry.as(
  Extensions.ExtensionFeaturesRegistry
).registerExtensionFeature({
  id: "chatParticipants",
  label: localize("chatParticipants", "Chat Participants"),
  access: {
    canToggle: false
  },
  renderer: new SyncDescriptor(ChatParticipantDataRenderer)
});
class MovedChatEditsViewPane extends ViewPane {
  static {
    __name(this, "MovedChatEditsViewPane");
  }
  shouldShowWelcome() {
    return true;
  }
}
const editsViewId = "workbench.panel.chat.view.edits";
const baseEditsViewDescriptor = {
  id: editsViewId,
  containerIcon: editsViewContainer.icon,
  containerTitle: editsViewContainer.title.value,
  singleViewPaneContainerTitle: editsViewContainer.title.value,
  name: editsViewContainer.title,
  canToggleVisibility: false,
  canMoveView: true,
  openCommandActionDescriptor: {
    id: CHAT_EDITING_SIDEBAR_PANEL_ID,
    title: editsViewContainer.title,
    mnemonicTitle: localize(
      { key: "miToggleEdits", comment: ["&& denotes a mnemonic"] },
      "Copilot Ed&&its"
    ),
    keybindings: {
      primary: KeyMod.CtrlCmd | KeyMod.Shift | KeyCode.KeyI,
      linux: {
        primary: KeyMod.CtrlCmd | KeyMod.Alt | KeyMod.Shift | KeyCode.KeyI
      }
    },
    order: 2
  },
  ctorDescriptor: new SyncDescriptor(ChatViewPane, [
    { location: ChatAgentLocation.EditingSession }
  ]),
  when: ContextKeyExpr.and(
    ContextKeyExpr.has(
      `config.${ChatConfiguration.UnifiedChatView}`
    ).negate(),
    ContextKeyExpr.or(
      ChatContextKeys.Setup.hidden.negate(),
      ChatContextKeys.Setup.installed,
      ChatContextKeys.editingParticipantRegistered
    )
  )
};
const ShowMovedChatEditsView = new RawContextKey(
  "showMovedChatEditsView",
  true,
  {
    type: "boolean",
    description: localize(
      "hideMovedChatEditsView",
      "True when the moved chat edits view should be hidden."
    )
  }
);
let EditsViewContribution = class extends Disposable {
  constructor(configurationService, storageService, contextKeyService, chatService) {
    super();
    this.configurationService = configurationService;
    this.storageService = storageService;
    this.contextKeyService = contextKeyService;
    this.chatService = chatService;
    this.showWelcomeViewCtx = ShowMovedChatEditsView.bindTo(
      this.contextKeyService
    );
    const unifiedViewEnabled = this.configurationService.getValue(
      ChatConfiguration.UnifiedChatView
    );
    const movedEditsViewDescriptor = {
      ...baseEditsViewDescriptor,
      ctorDescriptor: new SyncDescriptor(MovedChatEditsViewPane),
      when: ContextKeyExpr.and(
        ContextKeyExpr.has(
          `config.${ChatConfiguration.UnifiedChatView}`
        ),
        ShowMovedChatEditsView,
        ContextKeyExpr.or(
          ChatContextKeys.Setup.hidden.negate(),
          ChatContextKeys.Setup.installed,
          ChatContextKeys.editingParticipantRegistered
        )
      )
    };
    const editsViewToRegister = unifiedViewEnabled ? movedEditsViewDescriptor : baseEditsViewDescriptor;
    if (unifiedViewEnabled) {
      this.init();
      this.updateContextKey();
      this.registerWelcomeView();
      this.registerCommands();
    }
    Registry.as(ViewExtensions.ViewsRegistry).registerViews(
      [editsViewToRegister],
      editsViewContainer
    );
  }
  static {
    __name(this, "EditsViewContribution");
  }
  static ID = "workbench.contrib.chatEditsView";
  static HideMovedEditsViewKey = "chatEditsView.hideMovedEditsView";
  showWelcomeViewCtx;
  registerWelcomeView() {
    const welcomeViewMainMessage = localize(
      "editsMovedMainMessage",
      "Copilot Edits has been moved to the [main Chat view](command:workbench.action.chat.open). You can switch between modes by using the dropdown in the Chat input box."
    );
    const okButton = `[${localize("ok", "Got it")}](command:_movedEditsView.ok)`;
    const welcomeViewFooterMessage = localize(
      "editsMovedFooterMessage",
      "[Learn more](command:_movedEditsView.learnMore) about the Chat view."
    );
    const viewsRegistry = Registry.as(
      ViewExtensions.ViewsRegistry
    );
    this._register(
      viewsRegistry.registerViewWelcomeContent(editsViewId, {
        content: [
          welcomeViewMainMessage,
          okButton,
          welcomeViewFooterMessage
        ].join("\n\n"),
        renderSecondaryButtons: true,
        when: ShowMovedChatEditsView
      })
    );
  }
  markViewToHide() {
    this.storageService.store(
      EditsViewContribution.HideMovedEditsViewKey,
      true,
      StorageScope.APPLICATION,
      StorageTarget.USER
    );
    this.updateContextKey();
  }
  init() {
    const hasChats = this.chatService.hasSessions();
    if (!hasChats) {
      this.markViewToHide();
    }
  }
  updateContextKey() {
    const hidden = this.storageService.getBoolean(
      EditsViewContribution.HideMovedEditsViewKey,
      StorageScope.APPLICATION,
      false
    );
    const hasChats = this.chatService.hasSessions();
    this.showWelcomeViewCtx.set(!hidden && hasChats);
  }
  registerCommands() {
    this._register(
      CommandsRegistry.registerCommand({
        id: "_movedEditsView.ok",
        handler: /* @__PURE__ */ __name(async (accessor) => {
          showChatView(accessor.get(IViewsService));
          this.markViewToHide();
        }, "handler")
      })
    );
    this._register(
      CommandsRegistry.registerCommand({
        id: "_movedEditsView.learnMore",
        handler: /* @__PURE__ */ __name(async (accessor) => {
          const openerService = accessor.get(IOpenerService);
          openerService.open(
            URI.parse("https://aka.ms/vscode-chat-modes")
          );
        }, "handler")
      })
    );
  }
};
EditsViewContribution = __decorateClass([
  __decorateParam(0, IConfigurationService),
  __decorateParam(1, IStorageService),
  __decorateParam(2, IContextKeyService),
  __decorateParam(3, IChatService)
], EditsViewContribution);
registerWorkbenchContribution2(
  EditsViewContribution.ID,
  EditsViewContribution,
  WorkbenchPhase.BlockRestore
);
export {
  ChatCompatibilityNotifier,
  ChatExtensionPointHandler,
  MovedChatEditsViewPane
};
//# sourceMappingURL=chatParticipant.contribution.js.map
