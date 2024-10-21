var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { getActiveWindow } from "../../../base/browser/dom.js";
import { Event } from "../../../base/common/event.js";
import { IReference, MutableDisposable } from "../../../base/common/lifecycle.js";
import { EditorOption } from "../../common/config/editorOptions.js";
import { ViewEventHandler } from "../../common/viewEventHandler.js";
import { GPULifecycle } from "./gpuDisposable.js";
import { observeDevicePixelDimensions, quadVertices } from "./gpuUtils.js";
import { createObjectCollectionBuffer } from "./objectCollectionBuffer.js";
import { RectangleRendererBindingId, rectangleRendererWgsl } from "./rectangleRenderer.wgsl.js";
class RectangleRenderer extends ViewEventHandler {
  constructor(_context, _canvas, _ctx, device) {
    super();
    this._context = _context;
    this._canvas = _canvas;
    this._ctx = _ctx;
    this._context.addEventHandler(this);
    this._initWebgpu(device);
  }
  static {
    __name(this, "RectangleRenderer");
  }
  _device;
  _renderPassDescriptor;
  _renderPassColorAttachment;
  _bindGroup;
  _pipeline;
  _vertexBuffer;
  _shapeBindBuffer = this._register(new MutableDisposable());
  _scrollOffsetBindBuffer;
  _scrollOffsetValueBuffer;
  _initialized = false;
  _scrollChanged = true;
  _shapeCollection = this._register(createObjectCollectionBuffer([
    { name: "x" },
    { name: "y" },
    { name: "width" },
    { name: "height" },
    { name: "red" },
    { name: "green" },
    { name: "blue" },
    { name: "alpha" }
  ], 32));
  async _initWebgpu(device) {
    this._device = await device;
    if (this._store.isDisposed) {
      return;
    }
    const presentationFormat = navigator.gpu.getPreferredCanvasFormat();
    this._ctx.configure({
      device: this._device,
      format: presentationFormat,
      alphaMode: "premultiplied"
    });
    this._renderPassColorAttachment = {
      view: null,
      // Will be filled at render time
      loadOp: "load",
      storeOp: "store"
    };
    this._renderPassDescriptor = {
      label: "Monaco rectangle renderer render pass",
      colorAttachments: [this._renderPassColorAttachment]
    };
    let layoutInfoUniformBuffer;
    {
      let Info;
      ((Info2) => {
        Info2[Info2["FloatsPerEntry"] = 6] = "FloatsPerEntry";
        Info2[Info2["BytesPerEntry"] = 24] = "BytesPerEntry";
        Info2[Info2["Offset_CanvasWidth____"] = 0] = "Offset_CanvasWidth____";
        Info2[Info2["Offset_CanvasHeight___"] = 1] = "Offset_CanvasHeight___";
        Info2[Info2["Offset_ViewportOffsetX"] = 2] = "Offset_ViewportOffsetX";
        Info2[Info2["Offset_ViewportOffsetY"] = 3] = "Offset_ViewportOffsetY";
        Info2[Info2["Offset_ViewportWidth__"] = 4] = "Offset_ViewportWidth__";
        Info2[Info2["Offset_ViewportHeight_"] = 5] = "Offset_ViewportHeight_";
      })(Info || (Info = {}));
      const bufferValues = new Float32Array(6 /* FloatsPerEntry */);
      const updateBufferValues = /* @__PURE__ */ __name((canvasDevicePixelWidth = this._canvas.width, canvasDevicePixelHeight = this._canvas.height) => {
        bufferValues[0 /* Offset_CanvasWidth____ */] = canvasDevicePixelWidth;
        bufferValues[1 /* Offset_CanvasHeight___ */] = canvasDevicePixelHeight;
        bufferValues[2 /* Offset_ViewportOffsetX */] = Math.ceil(this._context.configuration.options.get(EditorOption.layoutInfo).contentLeft * getActiveWindow().devicePixelRatio);
        bufferValues[3 /* Offset_ViewportOffsetY */] = 0;
        bufferValues[4 /* Offset_ViewportWidth__ */] = bufferValues[0 /* Offset_CanvasWidth____ */] - bufferValues[2 /* Offset_ViewportOffsetX */];
        bufferValues[5 /* Offset_ViewportHeight_ */] = bufferValues[1 /* Offset_CanvasHeight___ */] - bufferValues[3 /* Offset_ViewportOffsetY */];
        return bufferValues;
      }, "updateBufferValues");
      layoutInfoUniformBuffer = this._register(GPULifecycle.createBuffer(this._device, {
        label: "Monaco rectangle renderer uniform buffer",
        size: 24 /* BytesPerEntry */,
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
      }, () => updateBufferValues())).object;
      this._register(observeDevicePixelDimensions(this._canvas, getActiveWindow(), (w, h) => {
        this._device.queue.writeBuffer(layoutInfoUniformBuffer, 0, updateBufferValues(w, h));
      }));
    }
    const scrollOffsetBufferSize = 2;
    this._scrollOffsetBindBuffer = this._register(GPULifecycle.createBuffer(this._device, {
      label: "Monaco rectangle renderer scroll offset buffer",
      size: scrollOffsetBufferSize * Float32Array.BYTES_PER_ELEMENT,
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
    })).object;
    this._scrollOffsetValueBuffer = new Float32Array(scrollOffsetBufferSize);
    const createShapeBindBuffer = /* @__PURE__ */ __name(() => {
      return GPULifecycle.createBuffer(this._device, {
        label: "Monaco rectangle renderer shape buffer",
        size: this._shapeCollection.buffer.byteLength,
        usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST
      });
    }, "createShapeBindBuffer");
    this._shapeBindBuffer.value = createShapeBindBuffer();
    this._register(Event.runAndSubscribe(this._shapeCollection.onDidChangeBuffer, () => {
      this._shapeBindBuffer.value = createShapeBindBuffer();
      if (this._pipeline) {
        this._updateBindGroup(this._pipeline, layoutInfoUniformBuffer);
      }
    }));
    this._vertexBuffer = this._register(GPULifecycle.createBuffer(this._device, {
      label: "Monaco rectangle renderer vertex buffer",
      size: quadVertices.byteLength,
      usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST
    }, quadVertices)).object;
    const module = this._device.createShaderModule({
      label: "Monaco rectangle renderer shader module",
      code: rectangleRendererWgsl
    });
    this._pipeline = this._device.createRenderPipeline({
      label: "Monaco rectangle renderer render pipeline",
      layout: "auto",
      vertex: {
        module,
        buffers: [
          {
            arrayStride: 2 * Float32Array.BYTES_PER_ELEMENT,
            // 2 floats, 4 bytes each
            attributes: [
              { shaderLocation: 0, offset: 0, format: "float32x2" }
              // position
            ]
          }
        ]
      },
      fragment: {
        module,
        targets: [
          {
            format: presentationFormat,
            blend: {
              color: {
                srcFactor: "src-alpha",
                dstFactor: "one-minus-src-alpha"
              },
              alpha: {
                srcFactor: "src-alpha",
                dstFactor: "one-minus-src-alpha"
              }
            }
          }
        ]
      }
    });
    this._updateBindGroup(this._pipeline, layoutInfoUniformBuffer);
    this._initialized = true;
  }
  _updateBindGroup(pipeline, layoutInfoUniformBuffer) {
    this._bindGroup = this._device.createBindGroup({
      label: "Monaco rectangle renderer bind group",
      layout: pipeline.getBindGroupLayout(0),
      entries: [
        { binding: RectangleRendererBindingId.Shapes, resource: { buffer: this._shapeBindBuffer.value.object } },
        { binding: RectangleRendererBindingId.LayoutInfoUniform, resource: { buffer: layoutInfoUniformBuffer } },
        { binding: RectangleRendererBindingId.ScrollOffset, resource: { buffer: this._scrollOffsetBindBuffer } }
      ]
    });
  }
  register(x, y, width, height, red, green, blue, alpha) {
    return this._shapeCollection.createEntry({ x, y, width, height, red, green, blue, alpha });
  }
  // --- begin event handlers
  onScrollChanged(e) {
    this._scrollChanged = true;
    return super.onScrollChanged(e);
  }
  // --- end event handlers
  _update() {
    const shapes = this._shapeCollection;
    if (shapes.dirtyTracker.isDirty) {
      this._device.queue.writeBuffer(this._shapeBindBuffer.value.object, 0, shapes.buffer, shapes.dirtyTracker.dataOffset, shapes.dirtyTracker.dirtySize * shapes.view.BYTES_PER_ELEMENT);
      shapes.dirtyTracker.clear();
    }
    if (this._scrollChanged) {
      const dpr = getActiveWindow().devicePixelRatio;
      this._scrollOffsetValueBuffer[0] = this._context.viewLayout.getCurrentScrollLeft() * dpr;
      this._scrollOffsetValueBuffer[1] = this._context.viewLayout.getCurrentScrollTop() * dpr;
      this._device.queue.writeBuffer(this._scrollOffsetBindBuffer, 0, this._scrollOffsetValueBuffer);
    }
  }
  draw(viewportData) {
    if (!this._initialized) {
      return;
    }
    this._update();
    const encoder = this._device.createCommandEncoder({ label: "Monaco rectangle renderer command encoder" });
    this._renderPassColorAttachment.view = this._ctx.getCurrentTexture().createView();
    const pass = encoder.beginRenderPass(this._renderPassDescriptor);
    pass.setPipeline(this._pipeline);
    pass.setVertexBuffer(0, this._vertexBuffer);
    pass.setBindGroup(0, this._bindGroup);
    pass.draw(quadVertices.length / 2, this._shapeCollection.entryCount);
    pass.end();
    const commandBuffer = encoder.finish();
    this._device.queue.submit([commandBuffer]);
  }
}
export {
  RectangleRenderer
};
//# sourceMappingURL=rectangleRenderer.js.map
