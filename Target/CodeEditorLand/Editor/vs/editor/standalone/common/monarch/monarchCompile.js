var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import * as monarchCommon from "./monarchCommon.js";
import { IMonarchLanguage, IMonarchLanguageBracket } from "./monarchTypes.js";
function isArrayOf(elemType, obj) {
  if (!obj) {
    return false;
  }
  if (!Array.isArray(obj)) {
    return false;
  }
  for (const el of obj) {
    if (!elemType(el)) {
      return false;
    }
  }
  return true;
}
__name(isArrayOf, "isArrayOf");
function bool(prop, defValue) {
  if (typeof prop === "boolean") {
    return prop;
  }
  return defValue;
}
__name(bool, "bool");
function string(prop, defValue) {
  if (typeof prop === "string") {
    return prop;
  }
  return defValue;
}
__name(string, "string");
function arrayToHash(array) {
  const result = {};
  for (const e of array) {
    result[e] = true;
  }
  return result;
}
__name(arrayToHash, "arrayToHash");
function createKeywordMatcher(arr, caseInsensitive = false) {
  if (caseInsensitive) {
    arr = arr.map(function(x) {
      return x.toLowerCase();
    });
  }
  const hash = arrayToHash(arr);
  if (caseInsensitive) {
    return function(word) {
      return hash[word.toLowerCase()] !== void 0 && hash.hasOwnProperty(word.toLowerCase());
    };
  } else {
    return function(word) {
      return hash[word] !== void 0 && hash.hasOwnProperty(word);
    };
  }
}
__name(createKeywordMatcher, "createKeywordMatcher");
function compileRegExp(lexer, str, handleSn) {
  str = str.replace(/@@/g, ``);
  let n = 0;
  let hadExpansion;
  do {
    hadExpansion = false;
    str = str.replace(/@(\w+)/g, function(s, attr) {
      hadExpansion = true;
      let sub = "";
      if (typeof lexer[attr] === "string") {
        sub = lexer[attr];
      } else if (lexer[attr] && lexer[attr] instanceof RegExp) {
        sub = lexer[attr].source;
      } else {
        if (lexer[attr] === void 0) {
          throw monarchCommon.createError(lexer, "language definition does not contain attribute '" + attr + "', used at: " + str);
        } else {
          throw monarchCommon.createError(lexer, "attribute reference '" + attr + "' must be a string, used at: " + str);
        }
      }
      return monarchCommon.empty(sub) ? "" : "(?:" + sub + ")";
    });
    n++;
  } while (hadExpansion && n < 5);
  str = str.replace(/\x01/g, "@");
  const flags = (lexer.ignoreCase ? "i" : "") + (lexer.unicode ? "u" : "");
  if (handleSn) {
    const match = str.match(/\$[sS](\d\d?)/g);
    if (match) {
      let lastState = null;
      let lastRegEx = null;
      return (state) => {
        if (lastRegEx && lastState === state) {
          return lastRegEx;
        }
        lastState = state;
        lastRegEx = new RegExp(monarchCommon.substituteMatchesRe(lexer, str, state), flags);
        return lastRegEx;
      };
    }
  }
  return new RegExp(str, flags);
}
__name(compileRegExp, "compileRegExp");
function selectScrutinee(id, matches, state, num) {
  if (num < 0) {
    return id;
  }
  if (num < matches.length) {
    return matches[num];
  }
  if (num >= 100) {
    num = num - 100;
    const parts = state.split(".");
    parts.unshift(state);
    if (num < parts.length) {
      return parts[num];
    }
  }
  return null;
}
__name(selectScrutinee, "selectScrutinee");
function createGuard(lexer, ruleName, tkey, val) {
  let scrut = -1;
  let oppat = tkey;
  let matches = tkey.match(/^\$(([sS]?)(\d\d?)|#)(.*)$/);
  if (matches) {
    if (matches[3]) {
      scrut = parseInt(matches[3]);
      if (matches[2]) {
        scrut = scrut + 100;
      }
    }
    oppat = matches[4];
  }
  let op = "~";
  let pat = oppat;
  if (!oppat || oppat.length === 0) {
    op = "!=";
    pat = "";
  } else if (/^\w*$/.test(pat)) {
    op = "==";
  } else {
    matches = oppat.match(/^(@|!@|~|!~|==|!=)(.*)$/);
    if (matches) {
      op = matches[1];
      pat = matches[2];
    }
  }
  let tester;
  if ((op === "~" || op === "!~") && /^(\w|\|)*$/.test(pat)) {
    const inWords = createKeywordMatcher(pat.split("|"), lexer.ignoreCase);
    tester = /* @__PURE__ */ __name(function(s) {
      return op === "~" ? inWords(s) : !inWords(s);
    }, "tester");
  } else if (op === "@" || op === "!@") {
    const words = lexer[pat];
    if (!words) {
      throw monarchCommon.createError(lexer, "the @ match target '" + pat + "' is not defined, in rule: " + ruleName);
    }
    if (!isArrayOf(function(elem) {
      return typeof elem === "string";
    }, words)) {
      throw monarchCommon.createError(lexer, "the @ match target '" + pat + "' must be an array of strings, in rule: " + ruleName);
    }
    const inWords = createKeywordMatcher(words, lexer.ignoreCase);
    tester = /* @__PURE__ */ __name(function(s) {
      return op === "@" ? inWords(s) : !inWords(s);
    }, "tester");
  } else if (op === "~" || op === "!~") {
    if (pat.indexOf("$") < 0) {
      const re = compileRegExp(lexer, "^" + pat + "$", false);
      tester = /* @__PURE__ */ __name(function(s) {
        return op === "~" ? re.test(s) : !re.test(s);
      }, "tester");
    } else {
      tester = /* @__PURE__ */ __name(function(s, id, matches2, state) {
        const re = compileRegExp(lexer, "^" + monarchCommon.substituteMatches(lexer, pat, id, matches2, state) + "$", false);
        return re.test(s);
      }, "tester");
    }
  } else {
    if (pat.indexOf("$") < 0) {
      const patx = monarchCommon.fixCase(lexer, pat);
      tester = /* @__PURE__ */ __name(function(s) {
        return op === "==" ? s === patx : s !== patx;
      }, "tester");
    } else {
      const patx = monarchCommon.fixCase(lexer, pat);
      tester = /* @__PURE__ */ __name(function(s, id, matches2, state, eos) {
        const patexp = monarchCommon.substituteMatches(lexer, patx, id, matches2, state);
        return op === "==" ? s === patexp : s !== patexp;
      }, "tester");
    }
  }
  if (scrut === -1) {
    return {
      name: tkey,
      value: val,
      test: /* @__PURE__ */ __name(function(id, matches2, state, eos) {
        return tester(id, id, matches2, state, eos);
      }, "test")
    };
  } else {
    return {
      name: tkey,
      value: val,
      test: /* @__PURE__ */ __name(function(id, matches2, state, eos) {
        const scrutinee = selectScrutinee(id, matches2, state, scrut);
        return tester(!scrutinee ? "" : scrutinee, id, matches2, state, eos);
      }, "test")
    };
  }
}
__name(createGuard, "createGuard");
function compileAction(lexer, ruleName, action) {
  if (!action) {
    return { token: "" };
  } else if (typeof action === "string") {
    return action;
  } else if (action.token || action.token === "") {
    if (typeof action.token !== "string") {
      throw monarchCommon.createError(lexer, "a 'token' attribute must be of type string, in rule: " + ruleName);
    } else {
      const newAction = { token: action.token };
      if (action.token.indexOf("$") >= 0) {
        newAction.tokenSubst = true;
      }
      if (typeof action.bracket === "string") {
        if (action.bracket === "@open") {
          newAction.bracket = monarchCommon.MonarchBracket.Open;
        } else if (action.bracket === "@close") {
          newAction.bracket = monarchCommon.MonarchBracket.Close;
        } else {
          throw monarchCommon.createError(lexer, "a 'bracket' attribute must be either '@open' or '@close', in rule: " + ruleName);
        }
      }
      if (action.next) {
        if (typeof action.next !== "string") {
          throw monarchCommon.createError(lexer, "the next state must be a string value in rule: " + ruleName);
        } else {
          let next = action.next;
          if (!/^(@pop|@push|@popall)$/.test(next)) {
            if (next[0] === "@") {
              next = next.substr(1);
            }
            if (next.indexOf("$") < 0) {
              if (!monarchCommon.stateExists(lexer, monarchCommon.substituteMatches(lexer, next, "", [], ""))) {
                throw monarchCommon.createError(lexer, "the next state '" + action.next + "' is not defined in rule: " + ruleName);
              }
            }
          }
          newAction.next = next;
        }
      }
      if (typeof action.goBack === "number") {
        newAction.goBack = action.goBack;
      }
      if (typeof action.switchTo === "string") {
        newAction.switchTo = action.switchTo;
      }
      if (typeof action.log === "string") {
        newAction.log = action.log;
      }
      if (typeof action.nextEmbedded === "string") {
        newAction.nextEmbedded = action.nextEmbedded;
        lexer.usesEmbedded = true;
      }
      return newAction;
    }
  } else if (Array.isArray(action)) {
    const results = [];
    for (let i = 0, len = action.length; i < len; i++) {
      results[i] = compileAction(lexer, ruleName, action[i]);
    }
    return { group: results };
  } else if (action.cases) {
    const cases = [];
    for (const tkey in action.cases) {
      if (action.cases.hasOwnProperty(tkey)) {
        const val = compileAction(lexer, ruleName, action.cases[tkey]);
        if (tkey === "@default" || tkey === "@" || tkey === "") {
          cases.push({ test: void 0, value: val, name: tkey });
        } else if (tkey === "@eos") {
          cases.push({ test: /* @__PURE__ */ __name(function(id, matches, state, eos) {
            return eos;
          }, "test"), value: val, name: tkey });
        } else {
          cases.push(createGuard(lexer, ruleName, tkey, val));
        }
      }
    }
    const def = lexer.defaultToken;
    return {
      test: /* @__PURE__ */ __name(function(id, matches, state, eos) {
        for (const _case of cases) {
          const didmatch = !_case.test || _case.test(id, matches, state, eos);
          if (didmatch) {
            return _case.value;
          }
        }
        return def;
      }, "test")
    };
  } else {
    throw monarchCommon.createError(lexer, "an action must be a string, an object with a 'token' or 'cases' attribute, or an array of actions; in rule: " + ruleName);
  }
}
__name(compileAction, "compileAction");
class Rule {
  static {
    __name(this, "Rule");
  }
  regex = new RegExp("");
  action = { token: "" };
  matchOnlyAtLineStart = false;
  name = "";
  constructor(name) {
    this.name = name;
  }
  setRegex(lexer, re) {
    let sregex;
    if (typeof re === "string") {
      sregex = re;
    } else if (re instanceof RegExp) {
      sregex = re.source;
    } else {
      throw monarchCommon.createError(lexer, "rules must start with a match string or regular expression: " + this.name);
    }
    this.matchOnlyAtLineStart = sregex.length > 0 && sregex[0] === "^";
    this.name = this.name + ": " + sregex;
    this.regex = compileRegExp(lexer, "^(?:" + (this.matchOnlyAtLineStart ? sregex.substr(1) : sregex) + ")", true);
  }
  setAction(lexer, act) {
    this.action = compileAction(lexer, this.name, act);
  }
  resolveRegex(state) {
    if (this.regex instanceof RegExp) {
      return this.regex;
    } else {
      return this.regex(state);
    }
  }
}
function compile(languageId, json) {
  if (!json || typeof json !== "object") {
    throw new Error("Monarch: expecting a language definition object");
  }
  const lexer = {
    languageId,
    includeLF: bool(json.includeLF, false),
    noThrow: false,
    // raise exceptions during compilation
    maxStack: 100,
    start: typeof json.start === "string" ? json.start : null,
    ignoreCase: bool(json.ignoreCase, false),
    unicode: bool(json.unicode, false),
    tokenPostfix: string(json.tokenPostfix, "." + languageId),
    defaultToken: string(json.defaultToken, "source"),
    usesEmbedded: false,
    // becomes true if we find a nextEmbedded action
    stateNames: {},
    tokenizer: {},
    brackets: []
  };
  const lexerMin = json;
  lexerMin.languageId = languageId;
  lexerMin.includeLF = lexer.includeLF;
  lexerMin.ignoreCase = lexer.ignoreCase;
  lexerMin.unicode = lexer.unicode;
  lexerMin.noThrow = lexer.noThrow;
  lexerMin.usesEmbedded = lexer.usesEmbedded;
  lexerMin.stateNames = json.tokenizer;
  lexerMin.defaultToken = lexer.defaultToken;
  function addRules(state, newrules, rules) {
    for (const rule of rules) {
      let include = rule.include;
      if (include) {
        if (typeof include !== "string") {
          throw monarchCommon.createError(lexer, "an 'include' attribute must be a string at: " + state);
        }
        if (include[0] === "@") {
          include = include.substr(1);
        }
        if (!json.tokenizer[include]) {
          throw monarchCommon.createError(lexer, "include target '" + include + "' is not defined at: " + state);
        }
        addRules(state + "." + include, newrules, json.tokenizer[include]);
      } else {
        const newrule = new Rule(state);
        if (Array.isArray(rule) && rule.length >= 1 && rule.length <= 3) {
          newrule.setRegex(lexerMin, rule[0]);
          if (rule.length >= 3) {
            if (typeof rule[1] === "string") {
              newrule.setAction(lexerMin, { token: rule[1], next: rule[2] });
            } else if (typeof rule[1] === "object") {
              const rule1 = rule[1];
              rule1.next = rule[2];
              newrule.setAction(lexerMin, rule1);
            } else {
              throw monarchCommon.createError(lexer, "a next state as the last element of a rule can only be given if the action is either an object or a string, at: " + state);
            }
          } else {
            newrule.setAction(lexerMin, rule[1]);
          }
        } else {
          if (!rule.regex) {
            throw monarchCommon.createError(lexer, "a rule must either be an array, or an object with a 'regex' or 'include' field at: " + state);
          }
          if (rule.name) {
            if (typeof rule.name === "string") {
              newrule.name = rule.name;
            }
          }
          if (rule.matchOnlyAtStart) {
            newrule.matchOnlyAtLineStart = bool(rule.matchOnlyAtLineStart, false);
          }
          newrule.setRegex(lexerMin, rule.regex);
          newrule.setAction(lexerMin, rule.action);
        }
        newrules.push(newrule);
      }
    }
  }
  __name(addRules, "addRules");
  if (!json.tokenizer || typeof json.tokenizer !== "object") {
    throw monarchCommon.createError(lexer, "a language definition must define the 'tokenizer' attribute as an object");
  }
  lexer.tokenizer = [];
  for (const key in json.tokenizer) {
    if (json.tokenizer.hasOwnProperty(key)) {
      if (!lexer.start) {
        lexer.start = key;
      }
      const rules = json.tokenizer[key];
      lexer.tokenizer[key] = new Array();
      addRules("tokenizer." + key, lexer.tokenizer[key], rules);
    }
  }
  lexer.usesEmbedded = lexerMin.usesEmbedded;
  if (json.brackets) {
    if (!Array.isArray(json.brackets)) {
      throw monarchCommon.createError(lexer, "the 'brackets' attribute must be defined as an array");
    }
  } else {
    json.brackets = [
      { open: "{", close: "}", token: "delimiter.curly" },
      { open: "[", close: "]", token: "delimiter.square" },
      { open: "(", close: ")", token: "delimiter.parenthesis" },
      { open: "<", close: ">", token: "delimiter.angle" }
    ];
  }
  const brackets = [];
  for (const el of json.brackets) {
    let desc = el;
    if (desc && Array.isArray(desc) && desc.length === 3) {
      desc = { token: desc[2], open: desc[0], close: desc[1] };
    }
    if (desc.open === desc.close) {
      throw monarchCommon.createError(lexer, "open and close brackets in a 'brackets' attribute must be different: " + desc.open + "\n hint: use the 'bracket' attribute if matching on equal brackets is required.");
    }
    if (typeof desc.open === "string" && typeof desc.token === "string" && typeof desc.close === "string") {
      brackets.push({
        token: desc.token + lexer.tokenPostfix,
        open: monarchCommon.fixCase(lexer, desc.open),
        close: monarchCommon.fixCase(lexer, desc.close)
      });
    } else {
      throw monarchCommon.createError(lexer, "every element in the 'brackets' array must be a '{open,close,token}' object or array");
    }
  }
  lexer.brackets = brackets;
  lexer.noThrow = true;
  return lexer;
}
__name(compile, "compile");
export {
  compile
};
//# sourceMappingURL=monarchCompile.js.map
