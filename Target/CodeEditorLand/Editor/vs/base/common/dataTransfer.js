var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { distinct } from "./arrays.js";
import { Iterable } from "./iterator.js";
import { URI } from "./uri.js";
import { generateUuid } from "./uuid.js";
function createStringDataTransferItem(stringOrPromise) {
  return {
    asString: /* @__PURE__ */ __name(async () => stringOrPromise, "asString"),
    asFile: /* @__PURE__ */ __name(() => void 0, "asFile"),
    value: typeof stringOrPromise === "string" ? stringOrPromise : void 0
  };
}
__name(createStringDataTransferItem, "createStringDataTransferItem");
function createFileDataTransferItem(fileName, uri, data) {
  const file = { id: generateUuid(), name: fileName, uri, data };
  return {
    asString: /* @__PURE__ */ __name(async () => "", "asString"),
    asFile: /* @__PURE__ */ __name(() => file, "asFile"),
    value: void 0
  };
}
__name(createFileDataTransferItem, "createFileDataTransferItem");
class VSDataTransfer {
  static {
    __name(this, "VSDataTransfer");
  }
  _entries = /* @__PURE__ */ new Map();
  get size() {
    let size = 0;
    for (const _ of this._entries) {
      size++;
    }
    return size;
  }
  has(mimeType) {
    return this._entries.has(this.toKey(mimeType));
  }
  matches(pattern) {
    const mimes = [...this._entries.keys()];
    if (Iterable.some(this, ([_, item]) => item.asFile())) {
      mimes.push("files");
    }
    return matchesMimeType_normalized(normalizeMimeType(pattern), mimes);
  }
  get(mimeType) {
    return this._entries.get(this.toKey(mimeType))?.[0];
  }
  /**
   * Add a new entry to this data transfer.
   *
   * This does not replace existing entries for `mimeType`.
   */
  append(mimeType, value) {
    const existing = this._entries.get(mimeType);
    if (existing) {
      existing.push(value);
    } else {
      this._entries.set(this.toKey(mimeType), [value]);
    }
  }
  /**
   * Set the entry for a given mime type.
   *
   * This replaces all existing entries for `mimeType`.
   */
  replace(mimeType, value) {
    this._entries.set(this.toKey(mimeType), [value]);
  }
  /**
   * Remove all entries for `mimeType`.
   */
  delete(mimeType) {
    this._entries.delete(this.toKey(mimeType));
  }
  /**
   * Iterate over all `[mime, item]` pairs in this data transfer.
   *
   * There may be multiple entries for each mime type.
   */
  *[Symbol.iterator]() {
    for (const [mine, items] of this._entries) {
      for (const item of items) {
        yield [mine, item];
      }
    }
  }
  toKey(mimeType) {
    return normalizeMimeType(mimeType);
  }
}
function normalizeMimeType(mimeType) {
  return mimeType.toLowerCase();
}
__name(normalizeMimeType, "normalizeMimeType");
function matchesMimeType(pattern, mimeTypes) {
  return matchesMimeType_normalized(
    normalizeMimeType(pattern),
    mimeTypes.map(normalizeMimeType)
  );
}
__name(matchesMimeType, "matchesMimeType");
function matchesMimeType_normalized(normalizedPattern, normalizedMimeTypes) {
  if (normalizedPattern === "*/*") {
    return normalizedMimeTypes.length > 0;
  }
  if (normalizedMimeTypes.includes(normalizedPattern)) {
    return true;
  }
  const wildcard = normalizedPattern.match(/^([a-z]+)\/([a-z]+|\*)$/i);
  if (!wildcard) {
    return false;
  }
  const [_, type, subtype] = wildcard;
  if (subtype === "*") {
    return normalizedMimeTypes.some((mime) => mime.startsWith(type + "/"));
  }
  return false;
}
__name(matchesMimeType_normalized, "matchesMimeType_normalized");
const UriList = Object.freeze({
  // http://amundsen.com/hypermedia/urilist/
  create: /* @__PURE__ */ __name((entries) => {
    return distinct(entries.map((x) => x.toString())).join("\r\n");
  }, "create"),
  split: /* @__PURE__ */ __name((str) => {
    return str.split("\r\n");
  }, "split"),
  parse: /* @__PURE__ */ __name((str) => {
    return UriList.split(str).filter((value) => !value.startsWith("#"));
  }, "parse")
});
export {
  UriList,
  VSDataTransfer,
  createFileDataTransferItem,
  createStringDataTransferItem,
  matchesMimeType
};
//# sourceMappingURL=dataTransfer.js.map
