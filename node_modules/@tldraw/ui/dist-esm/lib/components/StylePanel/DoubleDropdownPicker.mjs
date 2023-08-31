import { jsx, jsxs } from "react/jsx-runtime";
import { Trigger } from "@radix-ui/react-dropdown-menu";
import classNames from "classnames";
import * as React from "react";
import { useTranslation } from "../../hooks/useTranslation/useTranslation.mjs";
import { Button } from "../primitives/Button.mjs";
import * as DropdownMenu from "../primitives/DropdownMenu.mjs";
const DoubleDropdownPicker = React.memo(function DoubleDropdownPicker2({
  label,
  uiTypeA,
  uiTypeB,
  labelA,
  labelB,
  itemsA,
  itemsB,
  styleA,
  styleB,
  valueA,
  valueB,
  onValueChange
}) {
  const msg = useTranslation();
  const iconA = React.useMemo(
    () => itemsA.find((item) => valueA.type === "shared" && valueA.value === item.value)?.icon ?? "mixed",
    [itemsA, valueA]
  );
  const iconB = React.useMemo(
    () => itemsB.find((item) => valueB.type === "shared" && valueB.value === item.value)?.icon ?? "mixed",
    [itemsB, valueB]
  );
  if (valueA === void 0 && valueB === void 0)
    return null;
  return /* @__PURE__ */ jsxs("div", { className: "tlui-style-panel__double-select-picker", children: [
    /* @__PURE__ */ jsx("div", { title: msg(label), className: "tlui-style-panel__double-select-picker-label", children: msg(label) }),
    /* @__PURE__ */ jsxs(DropdownMenu.Root, { id: `style panel ${uiTypeA} A`, children: [
      /* @__PURE__ */ jsx(Trigger, { asChild: true, children: /* @__PURE__ */ jsx(
        Button,
        {
          "data-testid": `style.${uiTypeA}`,
          title: msg(labelA) + " \u2014 " + (valueA === null ? msg("style-panel.mixed") : msg(`${uiTypeA}-style.${valueA}`)),
          icon: iconA,
          invertIcon: true,
          smallIcon: true
        }
      ) }),
      /* @__PURE__ */ jsx(DropdownMenu.Content, { side: "bottom", align: "end", sideOffset: 0, alignOffset: -2, children: /* @__PURE__ */ jsx(
        "div",
        {
          className: classNames("tlui-button-grid", {
            "tlui-button-grid__two": itemsA.length < 4,
            "tlui-button-grid__four": itemsA.length >= 4
          }),
          children: itemsA.map((item) => {
            return /* @__PURE__ */ jsx(
              DropdownMenu.Item,
              {
                className: "tlui-button-grid__button",
                title: msg(labelA) + " \u2014 " + msg(`${uiTypeA}-style.${item.value}`),
                "data-testid": `style.${uiTypeA}.${item.value}`,
                icon: item.icon,
                onClick: () => onValueChange(styleA, item.value, false),
                invertIcon: true
              },
              item.value
            );
          })
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxs(DropdownMenu.Root, { id: `style panel ${uiTypeB}`, children: [
      /* @__PURE__ */ jsx(Trigger, { asChild: true, children: /* @__PURE__ */ jsx(
        Button,
        {
          "data-testid": `style.${uiTypeB}`,
          title: msg(labelB) + " \u2014 " + (valueB === null ? msg("style-panel.mixed") : msg(`${uiTypeB}-style.${valueB}`)),
          icon: iconB,
          smallIcon: true
        }
      ) }),
      /* @__PURE__ */ jsx(DropdownMenu.Content, { side: "bottom", align: "end", sideOffset: 0, alignOffset: -2, children: /* @__PURE__ */ jsx(
        "div",
        {
          className: classNames("tlui-button-grid", {
            "tlui-button-grid__two": itemsA.length < 4,
            "tlui-button-grid__four": itemsA.length >= 4
          }),
          children: itemsB.map((item) => {
            return /* @__PURE__ */ jsx(
              DropdownMenu.Item,
              {
                className: "tlui-button-grid__button",
                title: msg(labelB) + " \u2014 " + msg(`${uiTypeB}-style.${item.value}`),
                "data-testid": `style.${uiTypeB}.${item.value}`,
                icon: item.icon,
                onClick: () => onValueChange(styleB, item.value, false)
              },
              item.value
            );
          })
        }
      ) })
    ] })
  ] });
});
export {
  DoubleDropdownPicker
};
//# sourceMappingURL=DoubleDropdownPicker.mjs.map
