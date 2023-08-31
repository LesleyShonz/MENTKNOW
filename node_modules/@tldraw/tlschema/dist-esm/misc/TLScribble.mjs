import { T } from "@tldraw/validate";
import { canvasUiColorTypeValidator } from "./TLColor.mjs";
import { vec2dModelValidator } from "./geometry-types.mjs";
const TL_SCRIBBLE_STATES = /* @__PURE__ */ new Set(["starting", "paused", "active", "stopping"]);
const scribbleValidator = T.object({
  points: T.arrayOf(vec2dModelValidator),
  size: T.positiveNumber,
  color: canvasUiColorTypeValidator,
  opacity: T.number,
  state: T.setEnum(TL_SCRIBBLE_STATES),
  delay: T.number
});
export {
  TL_SCRIBBLE_STATES,
  scribbleValidator
};
//# sourceMappingURL=TLScribble.mjs.map
