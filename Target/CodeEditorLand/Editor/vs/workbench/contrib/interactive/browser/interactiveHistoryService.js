var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { HistoryNavigator2 } from "../../../../base/common/history.js";
import { Disposable } from "../../../../base/common/lifecycle.js";
import { ResourceMap } from "../../../../base/common/map.js";
import { URI } from "../../../../base/common/uri.js";
import { createDecorator } from "../../../../platform/instantiation/common/instantiation.js";
const IInteractiveHistoryService = createDecorator("IInteractiveHistoryService");
class InteractiveHistoryService extends Disposable {
  static {
    __name(this, "InteractiveHistoryService");
  }
  _history;
  constructor() {
    super();
    this._history = new ResourceMap();
  }
  matchesCurrent(uri, value) {
    const history = this._history.get(uri);
    if (!history) {
      return false;
    }
    return history.current() === value;
  }
  addToHistory(uri, value) {
    const history = this._history.get(uri);
    if (!history) {
      this._history.set(uri, new HistoryNavigator2([value], 50));
      return;
    }
    history.resetCursor();
    history.add(value);
  }
  getPreviousValue(uri) {
    const history = this._history.get(uri);
    return history?.previous() ?? null;
  }
  getNextValue(uri) {
    const history = this._history.get(uri);
    return history?.next() ?? null;
  }
  replaceLast(uri, value) {
    const history = this._history.get(uri);
    if (!history) {
      this._history.set(uri, new HistoryNavigator2([value], 50));
      return;
    } else {
      history.replaceLast(value);
      history.resetCursor();
    }
  }
  clearHistory(uri) {
    this._history.delete(uri);
  }
  has(uri) {
    return this._history.has(uri) ? true : false;
  }
}
export {
  IInteractiveHistoryService,
  InteractiveHistoryService
};
//# sourceMappingURL=interactiveHistoryService.js.map
