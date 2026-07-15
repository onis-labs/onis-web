import { ImageResponse } from "next/og";
import { site } from "./lib/config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "ONIS — Private Habit Tracker for iPhone and Apple Watch";

const CREAM = "#F4F0E6";
const INK = "#1A1A17";
const TERRACOTTA = "#B85A3F";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: CREAM,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "baseline",
          }}
        >
          <span
            style={{
              fontSize: 168,
              fontWeight: 700,
              color: INK,
              letterSpacing: "-4px",
            }}
          >
            {site.name}
          </span>
          <span
            style={{
              fontSize: 168,
              fontWeight: 700,
              color: TERRACOTTA,
            }}
          >
            .
          </span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 36,
            paddingLeft: 96,
            paddingRight: 96,
            fontSize: 36,
            textAlign: "center",
          }}
        >
          <span style={{ color: INK }}>{"Track honestly. "}</span>
          <span style={{ color: TERRACOTTA }}>{"See the pattern. "}</span>
          <span style={{ color: INK }}>{"Change one thing."}</span>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 56,
            fontSize: 24,
            color: INK,
            opacity: 0.55,
          }}
        >
          {"iPhone · Apple Watch · No account"}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
