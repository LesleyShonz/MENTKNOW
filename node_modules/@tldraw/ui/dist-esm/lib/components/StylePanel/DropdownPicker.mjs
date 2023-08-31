import { jsx, jsxs } from "react/jsx-runtime";
import { Trigger } from "@radix-ui/react-dropdown-menu";
import classNames from "classnames";
import * as React from "react";
import { useTranslation } from "../../hooks/useTranslation/useTranslation.mjs";
import { Button } from "../primitives/Button.mjs";
import * as DropdownMenu from "../primitives/DropdownMenu.mjs";
const DropdownPicker = React.memo(function DropdownPicker2({
  id,
  label,
  uiType,
  style,
  items,
  value,
  onValueChange
}) {
  const msg = useTranslation();
  const icon = React.useMemo(
    () => items.find((item) => value.type === "shared" && item.value === value.value)?.icon,
    [items, value]
  );
  return /* @__PURE__ */ jsxs(DropdownMenu.Root, { id: `style panel ${id}`, children: [
    /* @__PURE__ */ jsx(Trigger, { asChild: true, children: /* @__PURE__ */ jsx(
      Button,
      {
        "data-testid": `style.${uiType}`,
        title: value.type === "mixed" ? msg("style-panel.mixed") : msg(`${uiType}-style.${value.value}`),
        label,
        icon: icon ?? "mixed"
      }
    ) }),
    /* @__PURE__ */ jsx(DropdownMenu.Content, { side: "left", align: "center", alignOffset: 0, children: /* @__PURE__ */ jsx(
      "div",
      {
        className: classNames("tlui-button-grid", {
          "tlui-button-grid__two": items.length < 3,
          "tlui-button-grid__three": items.length == 3,
          "tlui-button-grid__four": items.length >= 4
        }),
        children: items.map((item) => {
          return /* @__PURE__ */ jsx(
            DropdownMenu.Item,
            {
              className: "tlui-button-grid__button",
              "data-testid": `style.${uiType}.${item.value}`,
              title: msg(`${uiType}-style.${item.value}`),
              icon: item.icon,
              onClick: () => onValueChange(style, item.value, false)
            },
            item.value
          );
        })
      }
    ) })
  ] });
});
export {
  DropdownPicker
};
//# sourceMappingURL=DropdownPicker.mjs.map
