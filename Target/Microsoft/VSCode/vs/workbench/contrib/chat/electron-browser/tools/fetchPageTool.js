var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __decorate = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
import { MarkdownString } from "../../../../../base/common/htmlContent.js";
import { ResourceSet } from "../../../../../base/common/map.js";
import { extname } from "../../../../../base/common/path.js";
import { URI } from "../../../../../base/common/uri.js";
import { localize } from "../../../../../nls.js";
import { IFileService } from "../../../../../platform/files/common/files.js";
import { IWebContentExtractorService } from "../../../../../platform/webContentExtractor/common/webContentExtractor.js";
import { detectEncodingFromBuffer } from "../../../../services/textfile/common/encoding.js";
import { ChatImageMimeType } from "../../common/languageModels.js";
import { ToolDataSource } from "../../common/languageModelToolsService.js";
import { InternalFetchWebPageToolId } from "../../common/tools/tools.js";
const FetchWebPageToolData = {
  id: InternalFetchWebPageToolId,
  displayName: "Fetch Web Page",
  canBeReferencedInPrompt: false,
  modelDescription: localize("fetchWebPage.modelDescription", "Fetches the main content from a web page. This tool is useful for summarizing or analyzing the content of a webpage."),
  source: ToolDataSource.Internal,
  inputSchema: {
    type: "object",
    properties: {
      urls: {
        type: "array",
        items: {
          type: "string"
        },
        description: localize("fetchWebPage.urlsDescription", "An array of URLs to fetch content from.")
      }
    },
    required: ["urls"]
  }
};
let FetchWebPageTool = class FetchWebPageTool2 {
  static {
    __name(this, "FetchWebPageTool");
  }
  constructor(_readerModeService, _fileService) {
    this._readerModeService = _readerModeService;
    this._fileService = _fileService;
    this._alreadyApprovedDomains = new ResourceSet();
  }
  async invoke(invocation, _countTokens, _progress, token) {
    const urls = invocation.parameters.urls || [];
    const { webUris, fileUris, invalidUris } = this._parseUris(urls);
    const allValidUris = [...webUris.values(), ...fileUris.values()];
    if (!allValidUris.length && invalidUris.size === 0) {
      return {
        content: [{ kind: "text", value: localize("fetchWebPage.noValidUrls", "No valid URLs provided.") }]
      };
    }
    for (const uri of webUris.values()) {
      this._alreadyApprovedDomains.add(uri);
    }
    const webContents = webUris.size > 0 ? await this._readerModeService.extract([...webUris.values()]) : [];
    const fileContents = [];
    const successfulFileUris = [];
    for (const uri of fileUris.values()) {
      try {
        const fileContent = await this._fileService.readFile(uri, void 0, token);
        const imageMimeType = this._getSupportedImageMimeType(uri);
        if (imageMimeType) {
          fileContents.push({
            kind: "data",
            value: {
              mimeType: imageMimeType,
              data: fileContent.value
            }
          });
        } else {
          const detected = detectEncodingFromBuffer({ buffer: fileContent.value, bytesRead: fileContent.value.byteLength });
          if (detected.seemsBinary) {
            fileContents.push(localize("fetchWebPage.binaryNotSupported", "Binary files are not supported at the moment."));
          } else {
            fileContents.push(fileContent.value.toString());
          }
        }
        successfulFileUris.push(uri);
      } catch (error) {
        fileContents.push(void 0);
      }
    }
    const results = [];
    let webIndex = 0;
    let fileIndex = 0;
    for (const url of urls) {
      if (invalidUris.has(url)) {
        results.push(void 0);
      } else if (webUris.has(url)) {
        results.push(webContents[webIndex]);
        webIndex++;
      } else if (fileUris.has(url)) {
        results.push(fileContents[fileIndex]);
        fileIndex++;
      } else {
        results.push(void 0);
      }
    }
    const actuallyValidUris = [...webUris.values(), ...successfulFileUris];
    return {
      content: this._getPromptPartsForResults(results),
      toolResultDetails: actuallyValidUris
    };
  }
  async prepareToolInvocation(context, token) {
    const { webUris, fileUris, invalidUris } = this._parseUris(context.parameters.urls);
    const validFileUris = [];
    const additionalInvalidUrls = [];
    for (const [originalUrl, uri] of fileUris.entries()) {
      try {
        await this._fileService.stat(uri);
        validFileUris.push(uri);
      } catch (error) {
        additionalInvalidUrls.push(originalUrl);
      }
    }
    const invalid = [...Array.from(invalidUris), ...additionalInvalidUrls];
    const valid = [...webUris.values(), ...validFileUris];
    const urlsNeedingConfirmation = webUris.size > 0 ? [...webUris.values()].filter((url) => !this._alreadyApprovedDomains.has(url)) : [];
    const pastTenseMessage = invalid.length ? invalid.length > 1 ? new MarkdownString(localize("fetchWebPage.pastTenseMessage.plural", "Fetched {0} resources, but the following were invalid URLs:\n\n{1}\n\n", valid.length, invalid.map((url) => `- ${url}`).join("\n"))) : new MarkdownString(localize("fetchWebPage.pastTenseMessage.singular", "Fetched resource, but the following was an invalid URL:\n\n{0}\n\n", invalid[0])) : new MarkdownString();
    const invocationMessage = new MarkdownString();
    if (valid.length > 1) {
      pastTenseMessage.appendMarkdown(localize("fetchWebPage.pastTenseMessageResult.plural", "Fetched {0} resources", valid.length));
      invocationMessage.appendMarkdown(localize("fetchWebPage.invocationMessage.plural", "Fetching {0} resources", valid.length));
    } else if (valid.length === 1) {
      const url = valid[0].toString();
      if (url.length > 400 || validFileUris.length === 1) {
        pastTenseMessage.appendMarkdown(localize({
          key: "fetchWebPage.pastTenseMessageResult.singularAsLink",
          comment: [
            // Make sure the link syntax is correct
            '{Locked="]({0})"}'
          ]
        }, "Fetched [resource]({0})", url));
        invocationMessage.appendMarkdown(localize({
          key: "fetchWebPage.invocationMessage.singularAsLink",
          comment: [
            // Make sure the link syntax is correct
            '{Locked="]({0})"}'
          ]
        }, "Fetching [resource]({0})", url));
      } else {
        pastTenseMessage.appendMarkdown(localize("fetchWebPage.pastTenseMessageResult.singular", "Fetched {0}", url));
        invocationMessage.appendMarkdown(localize("fetchWebPage.invocationMessage.singular", "Fetching {0}", url));
      }
    }
    const result = { invocationMessage, pastTenseMessage };
    if (urlsNeedingConfirmation.length) {
      let confirmationTitle;
      let confirmationMessage;
      if (urlsNeedingConfirmation.length === 1) {
        confirmationTitle = localize("fetchWebPage.confirmationTitle.singular", "Fetch web page?");
        confirmationMessage = new MarkdownString(urlsNeedingConfirmation[0].toString() + "\n\n$(info) " + localize("fetchWebPage.confirmationMessage.singular", "Web content may contain malicious code or attempt prompt injection attacks."), { supportThemeIcons: true });
      } else {
        confirmationTitle = localize("fetchWebPage.confirmationTitle.plural", "Fetch web pages?");
        confirmationMessage = new MarkdownString(urlsNeedingConfirmation.map((uri) => `- ${uri.toString()}`).join("\n") + "\n\n$(info) " + localize("fetchWebPage.confirmationMessage.plural", "Web content may contain malicious code or attempt prompt injection attacks."), { supportThemeIcons: true });
      }
      result.confirmationMessages = { title: confirmationTitle, message: confirmationMessage, allowAutoConfirm: true };
    }
    return result;
  }
  _parseUris(urls) {
    const webUris = /* @__PURE__ */ new Map();
    const fileUris = /* @__PURE__ */ new Map();
    const invalidUris = /* @__PURE__ */ new Set();
    urls?.forEach((url) => {
      try {
        const uriObj = URI.parse(url);
        if (uriObj.scheme === "http" || uriObj.scheme === "https") {
          webUris.set(url, uriObj);
        } else {
          fileUris.set(url, uriObj);
        }
      } catch (e) {
        invalidUris.add(url);
      }
    });
    return { webUris, fileUris, invalidUris };
  }
  _getPromptPartsForResults(results) {
    return results.map((value) => {
      if (!value) {
        return {
          kind: "text",
          value: localize("fetchWebPage.invalidUrl", "Invalid URL")
        };
      } else if (typeof value === "string") {
        return {
          kind: "text",
          value
        };
      } else {
        return value;
      }
    });
  }
  _getSupportedImageMimeType(uri) {
    const ext = extname(uri.path).toLowerCase();
    switch (ext) {
      case ".png":
        return ChatImageMimeType.PNG;
      case ".jpg":
      case ".jpeg":
        return ChatImageMimeType.JPEG;
      case ".gif":
        return ChatImageMimeType.GIF;
      case ".webp":
        return ChatImageMimeType.WEBP;
      case ".bmp":
        return ChatImageMimeType.BMP;
      default:
        return void 0;
    }
  }
};
FetchWebPageTool = __decorate([
  __param(0, IWebContentExtractorService),
  __param(1, IFileService)
], FetchWebPageTool);
export {
  FetchWebPageTool,
  FetchWebPageToolData
};
//# sourceMappingURL=fetchPageTool.js.map
