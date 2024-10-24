var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { VSBuffer } from "../../../../base/common/buffer.js";
import { URI } from "../../../../base/common/uri.js";
import { localize } from "../../../../nls.js";
import { IConfigurationService } from "../../../../platform/configuration/common/configuration.js";
import { ContextKeyExpr } from "../../../../platform/contextkey/common/contextkey.js";
import { IFileService } from "../../../../platform/files/common/files.js";
import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import { ILogService } from "../../../../platform/log/common/log.js";
import { IQuickInputService } from "../../../../platform/quickinput/common/quickInput.js";
import { IWorkspaceContextService } from "../../../../platform/workspace/common/workspace.js";
import { EditorAction, registerEditorAction } from "../../../browser/editorExtensions.js";
import { ensureNonNullable } from "../../../browser/gpu/gpuUtils.js";
import { GlyphRasterizer } from "../../../browser/gpu/raster/glyphRasterizer.js";
import { ViewGpuContext } from "../../../browser/gpu/viewGpuContext.js";
class DebugEditorGpuRendererAction extends EditorAction {
  static {
    __name(this, "DebugEditorGpuRendererAction");
  }
  constructor() {
    super({
      id: "editor.action.debugEditorGpuRenderer",
      label: localize("gpuDebug.label", "Developer: Debug Editor GPU Renderer"),
      alias: "Developer: Debug Editor GPU Renderer",
      // TODO: Why doesn't `ContextKeyExpr.equals('config:editor.experimentalGpuAcceleration', 'on')` work?
      precondition: ContextKeyExpr.true()
    });
  }
  async run(accessor, editor) {
    const instantiationService = accessor.get(IInstantiationService);
    const quickInputService = accessor.get(IQuickInputService);
    const choice = await quickInputService.pick([
      {
        label: localize("logTextureAtlasStats.label", "Log Texture Atlas Stats"),
        id: "logTextureAtlasStats"
      },
      {
        label: localize("saveTextureAtlas.label", "Save Texture Atlas"),
        id: "saveTextureAtlas"
      },
      {
        label: localize("drawGlyph.label", "Draw Glyph"),
        id: "drawGlyph"
      }
    ], { canPickMany: false });
    if (!choice) {
      return;
    }
    switch (choice.id) {
      case "logTextureAtlasStats":
        instantiationService.invokeFunction((accessor2) => {
          const logService = accessor2.get(ILogService);
          const atlas = ViewGpuContext.atlas;
          if (!ViewGpuContext.atlas) {
            logService.error("No texture atlas found");
            return;
          }
          const stats = atlas.getStats();
          logService.info(["Texture atlas stats", ...stats].join("\n\n"));
        });
        break;
      case "saveTextureAtlas":
        instantiationService.invokeFunction(async (accessor2) => {
          const workspaceContextService = accessor2.get(IWorkspaceContextService);
          const fileService = accessor2.get(IFileService);
          const folders = workspaceContextService.getWorkspace().folders;
          if (folders.length > 0) {
            const atlas = ViewGpuContext.atlas;
            const promises = [];
            for (const [layerIndex, page] of atlas.pages.entries()) {
              promises.push(...[
                fileService.writeFile(
                  URI.joinPath(folders[0].uri, `textureAtlasPage${layerIndex}_actual.png`),
                  VSBuffer.wrap(new Uint8Array(await (await page.source.convertToBlob()).arrayBuffer()))
                ),
                fileService.writeFile(
                  URI.joinPath(folders[0].uri, `textureAtlasPage${layerIndex}_usage.png`),
                  VSBuffer.wrap(new Uint8Array(await (await page.getUsagePreview()).arrayBuffer()))
                )
              ]);
            }
            await Promise.all(promises);
          }
        });
        break;
      case "drawGlyph":
        instantiationService.invokeFunction(async (accessor2) => {
          const configurationService = accessor2.get(IConfigurationService);
          const fileService = accessor2.get(IFileService);
          const quickInputService2 = accessor2.get(IQuickInputService);
          const workspaceContextService = accessor2.get(IWorkspaceContextService);
          const folders = workspaceContextService.getWorkspace().folders;
          if (folders.length === 0) {
            return;
          }
          const atlas = ViewGpuContext.atlas;
          const fontFamily = configurationService.getValue("editor.fontFamily");
          const fontSize = configurationService.getValue("editor.fontSize");
          const rasterizer = new GlyphRasterizer(fontSize, fontFamily);
          let chars = await quickInputService2.input({
            prompt: "Enter a character to draw (prefix with 0x for code point))"
          });
          if (!chars) {
            return;
          }
          const codePoint = chars.match(/0x(?<codePoint>[0-9a-f]+)/i)?.groups?.codePoint;
          if (codePoint !== void 0) {
            chars = String.fromCodePoint(parseInt(codePoint, 16));
          }
          const metadata = 0;
          const rasterizedGlyph = atlas.getGlyph(rasterizer, chars, metadata);
          if (!rasterizedGlyph) {
            return;
          }
          const imageData = atlas.pages[rasterizedGlyph.pageIndex].source.getContext("2d")?.getImageData(
            rasterizedGlyph.x,
            rasterizedGlyph.y,
            rasterizedGlyph.w,
            rasterizedGlyph.h
          );
          if (!imageData) {
            return;
          }
          const canvas = new OffscreenCanvas(imageData.width, imageData.height);
          const ctx = ensureNonNullable(canvas.getContext("2d"));
          ctx.putImageData(imageData, 0, 0);
          const blob = await canvas.convertToBlob({ type: "image/png" });
          const resource = URI.joinPath(folders[0].uri, `glyph_${chars}_${metadata}_${fontSize}px_${fontFamily.replaceAll(/[,\\\/\.'\s]/g, "_")}.png`);
          await fileService.writeFile(resource, VSBuffer.wrap(new Uint8Array(await blob.arrayBuffer())));
        });
        break;
    }
  }
}
registerEditorAction(DebugEditorGpuRendererAction);
//# sourceMappingURL=gpuActions.js.map
