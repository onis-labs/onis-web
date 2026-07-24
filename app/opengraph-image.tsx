import { ImageResponse } from "next/og";
import { site } from "./lib/config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "ONIS — Habit Tracker for iPhone, Apple Watch & Widgets";

const CREAM = "#F8EFE2";
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
              fontSize: 150,
              fontWeight: 700,
              color: INK,
              letterSpacing: "-4px",
            }}
          >
            {site.name}
          </span>
          <span
            style={{
              fontSize: 150,
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
            marginTop: 32,
            paddingLeft: 96,
            paddingRight: 96,
            fontSize: 44,
            fontWeight: 600,
            color: INK,
            textAlign: "center",
          }}
        >
          Track it before you forget it.
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: 26,
            color: TERRACOTTA,
            fontWeight: 600,
          }}
        >
          One tap keeps the real count.
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 48,
            fontSize: 24,
            color: INK,
            opacity: 0.55,
          }}
        >
          {"iPhone · Apple Watch · Widgets · Free to start"}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
