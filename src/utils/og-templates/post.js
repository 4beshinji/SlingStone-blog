import satori from "satori";
import { SITE } from "@/config";
import loadGoogleFonts from "../loadGoogleFont";
import { OG_DIMENSIONS } from "./constants.js";
import { ogCard } from "./ogCard.js";

export default async post => {
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
            type: "p",
            props: {
              style: {
                fontSize: 72,
                fontWeight: "bold",
                maxHeight: "84%",
                overflow: "hidden",
              },
              children: post.data.title,
            },
          },
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                marginBottom: "8px",
                fontSize: 28,
              },
              children: [
                {
                  type: "span",
                  props: {
                    children: [
                      "by ",
                      {
                        type: "span",
                        props: {
                          style: { color: "transparent" },
                          children: '"',
                        },
                      },
                      {
                        type: "span",
                        props: {
                          style: {
                            overflow: "hidden",
                            fontWeight: "bold",
                          },
                          children: post.data.author,
                        },
                      },
                    ],
                  },
                },
                {
                  type: "span",
                  props: {
                    style: { overflow: "hidden", fontWeight: "bold" },
                    children: SITE.title,
                  },
                },
              ],
            },
          },
        ],
      },
    }),
    {
      width: OG_DIMENSIONS.width,
      height: OG_DIMENSIONS.height,
      embedFont: true,
      fonts: await loadGoogleFonts(
        post.data.title + post.data.author + SITE.title + "by"
      ),
    }
  );
};
