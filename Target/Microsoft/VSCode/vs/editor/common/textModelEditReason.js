var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
const privateSymbol = Symbol("TextModelEditReason");
class TextModelEditReason {
  static {
    __name(this, "TextModelEditReason");
  }
  constructor(metadata, _privateCtorGuard) {
    this.metadata = metadata;
  }
  toString() {
    return `${this.metadata.source}`;
  }
  getType() {
    const metadata = this.metadata;
    switch (metadata.source) {
      case "cursor":
        return metadata.kind;
      case "inlineCompletionAccept":
        return metadata.source + (metadata.$nes ? ":nes" : "");
      case "unknown":
        return metadata.name || "unknown";
      default:
        return metadata.source;
    }
  }
  /**
   * Converts the metadata to a key string.
   * Only includes properties/values that have `level` many `$` prefixes or less.
  */
  toKey(level) {
    const metadata = this.metadata;
    const keys = Object.entries(metadata).filter(([key, value]) => {
      const prefixCount = (key.match(/\$/g) || []).length;
      return prefixCount <= level && value !== void 0 && value !== null && value !== "";
    }).map(([key, value]) => `${key}:${value}`);
    return keys.join("-");
  }
}
function createEditReason(metadata) {
  return new TextModelEditReason(metadata, privateSymbol);
}
__name(createEditReason, "createEditReason");
const EditReasons = {
  unknown(data) {
    return createEditReason({
      source: "unknown",
      name: data.name
    });
  },
  rename: /* @__PURE__ */ __name(() => createEditReason({ source: "rename" }), "rename"),
  chatApplyEdits(data) {
    return createEditReason({
      source: "Chat.applyEdits",
      $modelId: data.modelId
    });
  },
  inlineCompletionAccept(data) {
    return createEditReason({
      source: "inlineCompletionAccept",
      $nes: data.nes,
      $extensionId: data.extensionId,
      $$requestUuid: data.requestUuid
    });
  },
  inlineCompletionPartialAccept(data) {
    return createEditReason({
      source: "inlineCompletionPartialAccept",
      type: data.type,
      $nes: data.nes,
      $extensionId: data.extensionId,
      $$requestUuid: data.requestUuid
    });
  },
  inlineChatApplyEdit(data) {
    return createEditReason({
      source: "inlineChat.applyEdits",
      $modelId: avoidRedaction(data.modelId)
    });
  },
  reloadFromDisk: /* @__PURE__ */ __name(() => createEditReason({ source: "reloadFromDisk" }), "reloadFromDisk"),
  cursor(data) {
    return createEditReason({
      source: "cursor",
      kind: data.kind,
      detailedSource: data.detailedSource
    });
  },
  setValue: /* @__PURE__ */ __name(() => createEditReason({ source: "setValue" }), "setValue"),
  eolChange: /* @__PURE__ */ __name(() => createEditReason({ source: "eolChange" }), "eolChange"),
  applyEdits: /* @__PURE__ */ __name(() => createEditReason({ source: "applyEdits" }), "applyEdits"),
  snippet: /* @__PURE__ */ __name(() => createEditReason({ source: "snippet" }), "snippet"),
  suggest: /* @__PURE__ */ __name((data) => createEditReason({ source: "suggest", $extensionId: data.extensionId }), "suggest"),
  codeAction: /* @__PURE__ */ __name((data) => createEditReason({ source: "codeAction", $kind: data.kind, $extensionId: data.extensionId }), "codeAction")
};
function avoidRedaction(str) {
  if (str === void 0) {
    return void 0;
  }
  return str.replaceAll("/", "|");
}
__name(avoidRedaction, "avoidRedaction");
export {
  EditReasons,
  TextModelEditReason
};
//# sourceMappingURL=textModelEditReason.js.map
