import { jsx } from "react/jsx-runtime";
import classNames from "classnames";
import { memo, useLayoutEffect, useRef } from "react";
import { useAssetUrls } from "../../hooks/useAssetUrls.mjs";
const Icon = memo(function Icon2({
  small,
  invertIcon,
  icon,
  color,
  className,
  ...props
}) {
  const assetUrls = useAssetUrls();
  const asset = assetUrls.icons[icon];
  const ref = useRef(null);
  useLayoutEffect(() => {
    if (ref?.current) {
      ref.current.style.webkitMask = `url(${asset}) center 100% / 100% no-repeat`;
    }
  }, [ref, asset]);
  return /* @__PURE__ */ jsx(
    "div",
    {
      ...props,
      ref,
      className: classNames("tlui-icon", { "tlui-icon__small": small }, className),
      style: {
        color,
        mask: `url(${asset}) center 100% / 100% no-repeat`,
        transform: invertIcon ? "scale(-1, 1)" : void 0
      }
    }
  );
});
export {
  Icon
};
//# sourceMappingURL=Icon.mjs.map
