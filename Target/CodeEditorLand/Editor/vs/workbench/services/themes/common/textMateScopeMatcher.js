var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
function createMatchers(selector, matchesName, results) {
  const tokenizer = newTokenizer(selector);
  let token = tokenizer.next();
  while (token !== null) {
    let priority = 0;
    if (token.length === 2 && token.charAt(1) === ":") {
      switch (token.charAt(0)) {
        case "R":
          priority = 1;
          break;
        case "L":
          priority = -1;
          break;
        default:
          console.log(`Unknown priority ${token} in scope selector`);
      }
      token = tokenizer.next();
    }
    const matcher = parseConjunction();
    if (matcher) {
      results.push({ matcher, priority });
    }
    if (token !== ",") {
      break;
    }
    token = tokenizer.next();
  }
  function parseOperand() {
    if (token === "-") {
      token = tokenizer.next();
      const expressionToNegate = parseOperand();
      if (!expressionToNegate) {
        return null;
      }
      return (matcherInput) => {
        const score = expressionToNegate(matcherInput);
        return score < 0 ? 0 : -1;
      };
    }
    if (token === "(") {
      token = tokenizer.next();
      const expressionInParents = parseInnerExpression();
      if (token === ")") {
        token = tokenizer.next();
      }
      return expressionInParents;
    }
    if (isIdentifier(token)) {
      const identifiers = [];
      do {
        identifiers.push(token);
        token = tokenizer.next();
      } while (isIdentifier(token));
      return (matcherInput) => matchesName(identifiers, matcherInput);
    }
    return null;
  }
  __name(parseOperand, "parseOperand");
  function parseConjunction() {
    let matcher = parseOperand();
    if (!matcher) {
      return null;
    }
    const matchers = [];
    while (matcher) {
      matchers.push(matcher);
      matcher = parseOperand();
    }
    return (matcherInput) => {
      let min = matchers[0](matcherInput);
      for (let i = 1; min >= 0 && i < matchers.length; i++) {
        min = Math.min(min, matchers[i](matcherInput));
      }
      return min;
    };
  }
  __name(parseConjunction, "parseConjunction");
  function parseInnerExpression() {
    let matcher = parseConjunction();
    if (!matcher) {
      return null;
    }
    const matchers = [];
    while (matcher) {
      matchers.push(matcher);
      if (token === "|" || token === ",") {
        do {
          token = tokenizer.next();
        } while (token === "|" || token === ",");
      } else {
        break;
      }
      matcher = parseConjunction();
    }
    return (matcherInput) => {
      let max = matchers[0](matcherInput);
      for (let i = 1; i < matchers.length; i++) {
        max = Math.max(max, matchers[i](matcherInput));
      }
      return max;
    };
  }
  __name(parseInnerExpression, "parseInnerExpression");
}
__name(createMatchers, "createMatchers");
function isIdentifier(token) {
  return !!token && !!token.match(/[\w\.:]+/);
}
__name(isIdentifier, "isIdentifier");
function newTokenizer(input) {
  const regex = /([LR]:|[\w\.:][\w\.:\-]*|[\,\|\-\(\)])/g;
  let match = regex.exec(input);
  return {
    next: /* @__PURE__ */ __name(() => {
      if (!match) {
        return null;
      }
      const res = match[0];
      match = regex.exec(input);
      return res;
    }, "next")
  };
}
__name(newTokenizer, "newTokenizer");
export {
  createMatchers
};
//# sourceMappingURL=textMateScopeMatcher.js.map
