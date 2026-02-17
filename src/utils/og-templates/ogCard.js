import { OG_COLORS } from "./constants.js";

export function ogCard(children) {
  return {
    type: "div",
    props: {
      style: {
        background: OG_COLORS.background,
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      children: [
        // 影カード
        {
          type: "div",
          props: {
            style: {
              position: "absolute",
              top: "-1px",
              right: "-1px",
              border: `4px solid ${OG_COLORS.border}`,
              background: OG_COLORS.shadow,
              opacity: "0.9",
              borderRadius: "4px",
              display: "flex",
              justifyContent: "center",
              margin: "2.5rem",
              width: "88%",
              height: "80%",
            },
          },
        },
        // メインカード
        {
          type: "div",
          props: {
            style: {
              border: `4px solid ${OG_COLORS.border}`,
              background: OG_COLORS.background,
              borderRadius: "4px",
              display: "flex",
              justifyContent: "center",
              margin: "2rem",
              width: "88%",
              height: "80%",
            },
            children,
          },
        },
      ],
    },
  };
}
