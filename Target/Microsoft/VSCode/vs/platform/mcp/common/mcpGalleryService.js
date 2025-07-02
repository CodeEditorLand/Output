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
import { CancellationToken } from "../../../base/common/cancellation.js";
import { MarkdownString } from "../../../base/common/htmlContent.js";
import { Disposable } from "../../../base/common/lifecycle.js";
import { Schemas } from "../../../base/common/network.js";
import { dirname, joinPath } from "../../../base/common/resources.js";
import { uppercaseFirstLetter } from "../../../base/common/strings.js";
import { isString } from "../../../base/common/types.js";
import { URI } from "../../../base/common/uri.js";
import { localize } from "../../../nls.js";
import { IConfigurationService } from "../../configuration/common/configuration.js";
import { IFileService } from "../../files/common/files.js";
import { ILogService } from "../../log/common/log.js";
import { IProductService } from "../../product/common/productService.js";
import { asJson, asText, IRequestService } from "../../request/common/request.js";
import { mcpGalleryServiceUrlConfig } from "./mcpManagement.js";
let McpGalleryService = class McpGalleryService2 extends Disposable {
  static {
    __name(this, "McpGalleryService");
  }
  constructor(configurationService, requestService, fileService, productService, logService) {
    super();
    this.configurationService = configurationService;
    this.requestService = requestService;
    this.fileService = fileService;
    this.productService = productService;
    this.logService = logService;
  }
  isEnabled() {
    return this.getMcpGalleryUrl() !== void 0;
  }
  async query(options, token = CancellationToken.None) {
    let { servers } = await this.fetchGallery(token);
    if (options?.text) {
      const searchText = options.text.toLowerCase();
      servers = servers.filter((item) => item.name.toLowerCase().includes(searchText) || item.description.toLowerCase().includes(searchText));
    }
    const galleryServers = [];
    for (const item of servers) {
      galleryServers.push(this.toGalleryMcpServer(item));
    }
    return galleryServers;
  }
  async getMcpServer(name) {
    const mcpUrl = this.getMcpGalleryUrl() ?? this.productService.extensionsGallery?.mcpUrl;
    if (!mcpUrl) {
      return void 0;
    }
    const { servers } = await this.fetchGallery(mcpUrl, CancellationToken.None);
    const server = servers.find((item) => item.name === name);
    return server ? this.toGalleryMcpServer(server) : void 0;
  }
  async getManifest(gallery, token) {
    if (gallery.manifest) {
      return gallery.manifest;
    }
    if (!gallery.manifestUrl) {
      throw new Error(`No manifest URL found for ${gallery.name}`);
    }
    const uri = URI.parse(gallery.manifestUrl);
    if (uri.scheme === Schemas.file) {
      try {
        const content = await this.fileService.readFile(uri);
        const data = content.value.toString();
        return JSON.parse(data);
      } catch (error) {
        this.logService.error(`Failed to read file from ${uri}: ${error}`);
      }
    }
    const context = await this.requestService.request({
      type: "GET",
      url: gallery.manifestUrl
    }, token);
    const result = await asJson(context);
    if (!result) {
      throw new Error(`Failed to fetch manifest from ${gallery.manifestUrl}`);
    }
    return {
      packages: result.packages,
      remotes: result.remotes
    };
  }
  async getReadme(gallery, token) {
    const readmeUrl = gallery.readmeUrl;
    if (!readmeUrl) {
      return Promise.resolve(localize("noReadme", "No README available"));
    }
    const uri = URI.parse(readmeUrl);
    if (uri.scheme === Schemas.file) {
      try {
        const content = await this.fileService.readFile(uri);
        return content.value.toString();
      } catch (error) {
        this.logService.error(`Failed to read file from ${uri}: ${error}`);
      }
    }
    if (uri.authority !== "raw.githubusercontent.com") {
      return new MarkdownString(localize("readme.viewInBrowser", "You can find information about this server [here]({0})", readmeUrl)).value;
    }
    const context = await this.requestService.request({
      type: "GET",
      url: readmeUrl
    }, token);
    const result = await asText(context);
    if (!result) {
      throw new Error(`Failed to fetch README from ${readmeUrl}`);
    }
    return result;
  }
  toGalleryMcpServer(item) {
    let publisher = "";
    const nameParts = item.name.split("/");
    if (nameParts.length > 0) {
      const domainParts = nameParts[0].split(".");
      if (domainParts.length > 0) {
        publisher = domainParts[domainParts.length - 1];
      }
    }
    return {
      id: item.id ?? item.name,
      name: item.name,
      displayName: item.displayName ?? nameParts[nameParts.length - 1].split("-").map((s) => uppercaseFirstLetter(s)).join(" "),
      url: item.repository?.url,
      description: item.description,
      version: item.version_detail?.version,
      lastUpdated: item.version_detail ? Date.parse(item.version_detail.release_date) : void 0,
      repositoryUrl: item.repository?.url,
      codicon: item.codicon,
      readmeUrl: item.readmeUrl,
      manifestUrl: this.getManifestUrl(item),
      packageTypes: item.package_types ?? [],
      publisher,
      publisherDisplayName: item.publisher?.displayName,
      publisherDomain: item.publisher ? {
        link: item.publisher.url,
        verified: item.publisher.is_verified
      } : void 0,
      manifest: item.manifest
    };
  }
  async fetchGallery(arg1, arg2) {
    const mcpGalleryUrl = isString(arg1) ? arg1 : this.getMcpGalleryUrl();
    if (!mcpGalleryUrl) {
      return Promise.resolve({ servers: [] });
    }
    const token = isString(arg1) ? arg2 : arg1;
    const uri = URI.parse(mcpGalleryUrl);
    if (uri.scheme === Schemas.file) {
      try {
        const content = await this.fileService.readFile(uri);
        const data = content.value.toString();
        return JSON.parse(data);
      } catch (error) {
        this.logService.error(`Failed to read file from ${uri}: ${error}`);
      }
    }
    const context = await this.requestService.request({
      type: "GET",
      url: mcpGalleryUrl
    }, token);
    const result = await asJson(context);
    return result || { servers: [] };
  }
  getManifestUrl(item) {
    const mcpGalleryUrl = this.getMcpGalleryUrl();
    if (!mcpGalleryUrl) {
      return void 0;
    }
    const uri = URI.parse(mcpGalleryUrl);
    if (uri.scheme === Schemas.file) {
      return joinPath(dirname(uri), item.id ?? item.name).fsPath;
    }
    return `${mcpGalleryUrl}/${item.id}`;
  }
  getMcpGalleryUrl() {
    if (this.productService.quality === "stable") {
      return void 0;
    }
    return this.configurationService.getValue(mcpGalleryServiceUrlConfig);
  }
};
McpGalleryService = __decorate([
  __param(0, IConfigurationService),
  __param(1, IRequestService),
  __param(2, IFileService),
  __param(3, IProductService),
  __param(4, ILogService)
], McpGalleryService);
export {
  McpGalleryService
};
//# sourceMappingURL=mcpGalleryService.js.map
