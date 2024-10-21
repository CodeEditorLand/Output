var RectangleRendererBindingId = /* @__PURE__ */ ((RectangleRendererBindingId2) => {
  RectangleRendererBindingId2[RectangleRendererBindingId2["Shapes"] = 0] = "Shapes";
  RectangleRendererBindingId2[RectangleRendererBindingId2["LayoutInfoUniform"] = 1] = "LayoutInfoUniform";
  RectangleRendererBindingId2[RectangleRendererBindingId2["ScrollOffset"] = 2] = "ScrollOffset";
  return RectangleRendererBindingId2;
})(RectangleRendererBindingId || {});
const rectangleRendererWgsl = (
  /*wgsl*/
  `

struct Vertex {
	@location(0) position: vec2f,
};

struct LayoutInfo {
	canvasDims: vec2f,
	viewportOffset: vec2f,
	viewportDims: vec2f,
}

struct ScrollOffset {
	offset: vec2f,
}

struct Shape {
	position: vec2f,
	size: vec2f,
	color: vec4f,
};

struct VSOutput {
	@builtin(position) position: vec4f,
	@location(1)       color:    vec4f,
};

// Uniforms
@group(0) @binding(${1 /* LayoutInfoUniform */}) var<uniform>       layoutInfo:      LayoutInfo;

// Storage buffers
@group(0) @binding(${0 /* Shapes */})            var<storage, read> shapes:          array<Shape>;
@group(0) @binding(${2 /* ScrollOffset */})      var<uniform>       scrollOffset:    ScrollOffset;

@vertex fn vs(
	vert: Vertex,
	@builtin(instance_index) instanceIndex: u32,
	@builtin(vertex_index) vertexIndex : u32
) -> VSOutput {
	let shape = shapes[instanceIndex];

	var vsOut: VSOutput;
	vsOut.position = vec4f(
		(
			// Top left corner
			vec2f(-1,  1) +
			// Convert pixel position to clipspace
			vec2f( 2, -2) / layoutInfo.canvasDims *
			// Shape position and size
			(layoutInfo.viewportOffset - scrollOffset.offset + shape.position + vert.position * shape.size)
		),
		0.0,
		1.0
	);
	vsOut.color = shape.color;
	return vsOut;
}

@fragment fn fs(vsOut: VSOutput) -> @location(0) vec4f {
	return vsOut.color;
}
`
);
export {
  RectangleRendererBindingId,
  rectangleRendererWgsl
};
//# sourceMappingURL=rectangleRenderer.wgsl.js.map
