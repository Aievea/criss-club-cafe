import { ImageResponse } from "next/og";
import { OG_IMAGE_SIZE } from "./site";

/**
 * Shared Open Graph / Twitter card image (1200×630), served by `app/og`.
 *
 * Rendered text is intentionally kept to basic Latin (no Romanian diacritics)
 * so it renders correctly with next/og's built-in font — no font file to fetch
 * at build time. Brand palette mirrors globals.css.
 */
const BG = "#0a0a0a";
const INK = "#f5f0e8";
const GOLD = "#c8922a";
const PINK = "#ff3da3";
const MUTED = "#8a8070";

export function renderOgImage(): ImageResponse {
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
          background: BG,
          color: INK,
          position: "relative",
        }}
      >
        {/* top + bottom gold/pink accent bars */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 8,
            background: `linear-gradient(to right, ${GOLD}, ${PINK})`,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 8,
            background: `linear-gradient(to right, ${PINK}, ${GOLD})`,
          }}
        />

        <div
          style={{
            fontSize: 26,
            letterSpacing: 18,
            textTransform: "uppercase",
            color: GOLD,
          }}
        >
          Criss
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 132,
            fontWeight: 700,
            letterSpacing: -2,
            marginTop: 8,
          }}
        >
          Cafe&nbsp;<span style={{ color: MUTED }}>&amp;</span>&nbsp;Club
        </div>

        <div
          style={{
            width: 120,
            height: 2,
            background: GOLD,
            marginTop: 28,
            marginBottom: 28,
          }}
        />

        <div style={{ fontSize: 34, color: INK, letterSpacing: 1 }}>
          Cafenea · Lounge · Social Club
        </div>
        <div style={{ fontSize: 26, color: MUTED, marginTop: 18, letterSpacing: 4 }}>
          PIATA TRANDAFIRILOR 43 · TARGU MURES
        </div>
      </div>
    ),
    { ...OG_IMAGE_SIZE },
  );
}
