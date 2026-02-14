var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import "./motion.css";
class CubicBezierCurve {
  static {
    __name(this, "CubicBezierCurve");
  }
  constructor(x1, y1, x2, y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }
  /**
   * Evaluate the curve at time `t` (0-1), returning the eased value.
   */
  solve(t) {
    if (t <= 0) {
      return 0;
    }
    if (t >= 1) {
      return 1;
    }
    let u = t;
    for (let i = 0; i < 8; i++) {
      const currentX = bezierComponent(u, this.x1, this.x2);
      const error = currentX - t;
      if (Math.abs(error) < 1e-6) {
        break;
      }
      const dx = bezierComponentDerivative(u, this.x1, this.x2);
      if (Math.abs(dx) < 1e-6) {
        break;
      }
      u -= error / dx;
    }
    u = Math.max(0, Math.min(1, u));
    return bezierComponent(u, this.y1, this.y2);
  }
  /**
   * Returns the CSS `cubic-bezier(…)` string representation, for use in
   * CSS `transition` or `animation` properties.
   */
  toCssString() {
    return `cubic-bezier(${this.x1}, ${this.y1}, ${this.x2}, ${this.y2})`;
  }
}
const EASE_OUT = new CubicBezierCurve(0.1, 0.9, 0.2, 1);
const EASE_IN = new CubicBezierCurve(0.9, 0.1, 1, 0.2);
function parseCubicBezier(css) {
  const match = css.match(/cubic-bezier\(\s*([-\d.]+)\s*,\s*([-\d.]+)\s*,\s*([-\d.]+)\s*,\s*([-\d.]+)\s*\)/);
  if (!match) {
    return new CubicBezierCurve(0, 0, 1, 1);
  }
  return new CubicBezierCurve(parseFloat(match[1]), parseFloat(match[2]), parseFloat(match[3]), parseFloat(match[4]));
}
__name(parseCubicBezier, "parseCubicBezier");
function bezierComponent(u, p1, p2) {
  const oneMinusU = 1 - u;
  return 3 * oneMinusU * oneMinusU * u * p1 + 3 * oneMinusU * u * u * p2 + u * u * u;
}
__name(bezierComponent, "bezierComponent");
function bezierComponentDerivative(u, p1, p2) {
  const oneMinusU = 1 - u;
  return 3 * oneMinusU * oneMinusU * p1 + 6 * oneMinusU * u * (p2 - p1) + 3 * u * u * (1 - p2);
}
__name(bezierComponentDerivative, "bezierComponentDerivative");
const REFERENCE_DISTANCE = 300;
const MIN_DURATION = 50;
const MAX_DURATION = 300;
function scaleDuration(baseDuration, pixelDistance) {
  if (pixelDistance <= 0) {
    return baseDuration;
  }
  const scaled = baseDuration * (pixelDistance / REFERENCE_DISTANCE);
  return Math.round(Math.max(MIN_DURATION, Math.min(MAX_DURATION, scaled)));
}
__name(scaleDuration, "scaleDuration");
function isMotionReduced(element) {
  return element.closest(".monaco-reduce-motion") !== null;
}
__name(isMotionReduced, "isMotionReduced");
export {
  CubicBezierCurve,
  EASE_IN,
  EASE_OUT,
  isMotionReduced,
  parseCubicBezier,
  scaleDuration
};
//# sourceMappingURL=motion.js.map
