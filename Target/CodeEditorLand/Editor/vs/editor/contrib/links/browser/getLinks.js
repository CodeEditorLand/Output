var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { coalesce } from "../../../../base/common/arrays.js";
import { CancellationToken } from "../../../../base/common/cancellation.js";
import { onUnexpectedExternalError } from "../../../../base/common/errors.js";
import { DisposableStore, isDisposable } from "../../../../base/common/lifecycle.js";
import { assertType } from "../../../../base/common/types.js";
import { URI } from "../../../../base/common/uri.js";
import { IRange, Range } from "../../../common/core/range.js";
import { ITextModel } from "../../../common/model.js";
import { ILink, ILinksList, LinkProvider } from "../../../common/languages.js";
import { IModelService } from "../../../common/services/model.js";
import { CommandsRegistry } from "../../../../platform/commands/common/commands.js";
import { LanguageFeatureRegistry } from "../../../common/languageFeatureRegistry.js";
import { ILanguageFeaturesService } from "../../../common/services/languageFeatures.js";
class Link {
  static {
    __name(this, "Link");
  }
  _link;
  _provider;
  constructor(link, provider) {
    this._link = link;
    this._provider = provider;
  }
  toJSON() {
    return {
      range: this.range,
      url: this.url,
      tooltip: this.tooltip
    };
  }
  get range() {
    return this._link.range;
  }
  get url() {
    return this._link.url;
  }
  get tooltip() {
    return this._link.tooltip;
  }
  async resolve(token) {
    if (this._link.url) {
      return this._link.url;
    }
    if (typeof this._provider.resolveLink === "function") {
      return Promise.resolve(this._provider.resolveLink(this._link, token)).then((value) => {
        this._link = value || this._link;
        if (this._link.url) {
          return this.resolve(token);
        }
        return Promise.reject(new Error("missing"));
      });
    }
    return Promise.reject(new Error("missing"));
  }
}
class LinksList {
  static {
    __name(this, "LinksList");
  }
  links;
  _disposables = new DisposableStore();
  constructor(tuples) {
    let links = [];
    for (const [list, provider] of tuples) {
      const newLinks = list.links.map((link) => new Link(link, provider));
      links = LinksList._union(links, newLinks);
      if (isDisposable(list)) {
        this._disposables.add(list);
      }
    }
    this.links = links;
  }
  dispose() {
    this._disposables.dispose();
    this.links.length = 0;
  }
  static _union(oldLinks, newLinks) {
    const result = [];
    let oldIndex;
    let oldLen;
    let newIndex;
    let newLen;
    for (oldIndex = 0, newIndex = 0, oldLen = oldLinks.length, newLen = newLinks.length; oldIndex < oldLen && newIndex < newLen; ) {
      const oldLink = oldLinks[oldIndex];
      const newLink = newLinks[newIndex];
      if (Range.areIntersectingOrTouching(oldLink.range, newLink.range)) {
        oldIndex++;
        continue;
      }
      const comparisonResult = Range.compareRangesUsingStarts(oldLink.range, newLink.range);
      if (comparisonResult < 0) {
        result.push(oldLink);
        oldIndex++;
      } else {
        result.push(newLink);
        newIndex++;
      }
    }
    for (; oldIndex < oldLen; oldIndex++) {
      result.push(oldLinks[oldIndex]);
    }
    for (; newIndex < newLen; newIndex++) {
      result.push(newLinks[newIndex]);
    }
    return result;
  }
}
function getLinks(providers, model, token) {
  const lists = [];
  const promises = providers.ordered(model).reverse().map((provider, i) => {
    return Promise.resolve(provider.provideLinks(model, token)).then((result) => {
      if (result) {
        lists[i] = [result, provider];
      }
    }, onUnexpectedExternalError);
  });
  return Promise.all(promises).then(() => {
    const result = new LinksList(coalesce(lists));
    if (!token.isCancellationRequested) {
      return result;
    }
    result.dispose();
    return new LinksList([]);
  });
}
__name(getLinks, "getLinks");
CommandsRegistry.registerCommand("_executeLinkProvider", async (accessor, ...args) => {
  let [uri, resolveCount] = args;
  assertType(uri instanceof URI);
  if (typeof resolveCount !== "number") {
    resolveCount = 0;
  }
  const { linkProvider } = accessor.get(ILanguageFeaturesService);
  const model = accessor.get(IModelService).getModel(uri);
  if (!model) {
    return [];
  }
  const list = await getLinks(linkProvider, model, CancellationToken.None);
  if (!list) {
    return [];
  }
  for (let i = 0; i < Math.min(resolveCount, list.links.length); i++) {
    await list.links[i].resolve(CancellationToken.None);
  }
  const result = list.links.slice(0);
  list.dispose();
  return result;
});
export {
  Link,
  LinksList,
  getLinks
};
//# sourceMappingURL=getLinks.js.map
