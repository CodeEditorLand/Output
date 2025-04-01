var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
function convertToReadibleFormat(axNodes) {
  if (!axNodes.length) {
    return "";
  }
  const nodeMap = /* @__PURE__ */ new Map();
  const processedNodes = /* @__PURE__ */ new Set();
  const rootNodes = [];
  for (const node of axNodes) {
    nodeMap.set(node.nodeId, node);
    if (!node.parentId || !axNodes.some((n) => n.nodeId === node.parentId)) {
      rootNodes.push(node);
    }
  }
  function isNavigationElement(node) {
    const skipRoles = [
      "navigation",
      "banner",
      "complementary",
      "toolbar",
      "menu",
      "menuitem",
      "tab",
      "tablist"
    ];
    const skipTexts = [
      "Skip to main content",
      "Toggle navigation",
      "Previous",
      "Next",
      "Copy",
      "Direct link to",
      "On this page",
      "Edit this page",
      "Search",
      "Command+K"
    ];
    const text = getNodeText(node);
    const role = node.role?.value?.toString().toLowerCase() || "";
    return skipRoles.includes(role) || skipTexts.some((skipText) => text.includes(skipText)) || text.startsWith("Direct link to") || text.startsWith("\xAB ") || // Left-pointing double angle quotation mark
    text.endsWith(" \xBB") || // Right-pointing double angle quotation mark
    /^#\s*$/.test(text) || // Skip standalone # characters
    text === "\u200B";
  }
  __name(isNavigationElement, "isNavigationElement");
  function getNodeText(node) {
    const parts = [];
    if (node.name?.value) {
      parts.push(String(node.name.value));
    }
    if (node.value?.value && node.value.value !== node.name?.value) {
      parts.push(String(node.value.value));
    }
    if (node.description?.value && node.description.value !== node.name?.value && node.description.value !== node.value?.value) {
      parts.push(String(node.description.value));
    }
    return parts.join(" ").trim();
  }
  __name(getNodeText, "getNodeText");
  function isCodeBlock(node) {
    return node.role?.value === "code" || (node.properties || []).some(
      (p) => p.name === "code-block" || p.name === "pre"
    );
  }
  __name(isCodeBlock, "isCodeBlock");
  function processNode(node, depth = 0, parentContext = {
    inCodeBlock: false,
    codeText: []
  }) {
    if (!node || node.ignored || processedNodes.has(node.nodeId)) {
      return [];
    }
    if (isNavigationElement(node)) {
      return [];
    }
    processedNodes.add(node.nodeId);
    const lines = [];
    const text = getNodeText(node);
    const currentIsCode = isCodeBlock(node);
    const context = currentIsCode ? { inCodeBlock: true, codeText: [] } : parentContext;
    if (text) {
      const indent = "  ".repeat(depth);
      if (currentIsCode || context.inCodeBlock) {
        context.codeText.push(text.trim());
      } else {
        lines.push(indent + text);
      }
    }
    if (node.childIds) {
      for (const childId of node.childIds) {
        const child = nodeMap.get(childId);
        if (child) {
          const childLines = processNode(child, depth + 1, context);
          lines.push(...childLines);
        }
      }
    }
    if (currentIsCode && context.codeText.length > 0) {
      const indent = "  ".repeat(depth);
      lines.push(indent + context.codeText.join(" "));
    }
    return lines;
  }
  __name(processNode, "processNode");
  const allLines = [];
  for (const node of rootNodes) {
    const nodeLines = processNode(node);
    if (nodeLines.length > 0) {
      allLines.push(...nodeLines);
    }
  }
  for (const node of axNodes) {
    if (!processedNodes.has(node.nodeId)) {
      const nodeLines = processNode(node);
      if (nodeLines.length > 0) {
        allLines.push(...nodeLines);
      }
    }
  }
  return allLines.filter((line, index, array) => {
    return line.trim() || index > 0 && array[index - 1].trim();
  }).join("\n").trim();
}
__name(convertToReadibleFormat, "convertToReadibleFormat");
export {
  convertToReadibleFormat
};
//# sourceMappingURL=cdpAccessibilityDomain.js.map
