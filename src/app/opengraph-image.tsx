import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const runtime = "edge";
export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
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
          backgroundImage:
            "linear-gradient(118deg, #f6ccc4 0%, #f5cdc0 22%, #f7d6c3 48%, #f9dfc6 72%, #fae7d2 100%)",
          color: "#ffffff",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ fontSize: 152, fontStyle: "italic", letterSpacing: -2 }}>
          hey babe
        </div>
        <div
          style={{
            width: 380,
            height: 6,
            background: "#ffffff",
            borderRadius: 999,
            marginTop: 4,
          }}
        />
        <div
          style={{
            fontSize: 34,
            marginTop: 42,
            letterSpacing: 10,
            textTransform: "uppercase",
            fontFamily: "Helvetica, Arial, sans-serif",
          }}
        >
          Handcrafted &amp; Permanent
        </div>
        <div
          style={{
            fontSize: 24,
            marginTop: 18,
            letterSpacing: 6,
            color: "rgba(255,255,255,0.8)",
            textTransform: "uppercase",
            fontFamily: "Helvetica, Arial, sans-serif",
          }}
        >
          14K Gold-Filled &amp; Sterling Silver
        </div>
      </div>
    ),
    size,
  );
}
