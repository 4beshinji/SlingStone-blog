import satori from "satori";
import { SITE } from "@/config";
import loadGoogleFonts from "../loadGoogleFont";
import { OG_DIMENSIONS } from "./constants.js";
import { ogCard } from "./ogCard.js";

export default async () => {
  return satori(
    ogCard({
      type: "div",
      props: {
        style: {
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          margin: "20px",
          width: "90%",
          height: "90%",
        },
        children: [
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "90%",
                maxHeight: "90%",
                overflow: "hidden",
                textAlign: "center",
              },
              children: [
                {
                  type: "p",
                  props: {
                    style: { fontSize: 72, fontWeight: "bold" },
                    children: SITE.title,
                  },
                },
                {
                  type: "p",
                  props: {
                    style: { fontSize: 28 },
                    children: SITE.desc,
                  },
                },
              ],
            },
          },
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                justifyContent: "flex-end",
                width: "100%",
                marginBottom: "8px",
                fontSize: 28,
              },
              children: {
                type: "span",
                props: {
                  style: { overflow: "hidden", fontWeight: "bold" },
                  children: new URL(SITE.website).hostname,
                },
              },
            },
          },
        ],
      },
    }),
    {
      width: OG_DIMENSIONS.width,
      height: OG_DIMENSIONS.height,
      embedFont: true,
      fonts: await loadGoogleFonts(SITE.title + SITE.desc + SITE.website),
    }
  );
};
