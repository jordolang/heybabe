import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { site } from "@/data/site";

// Node runtime so the real logo can be read off disk and inlined.
export const runtime = "nodejs";
export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const badge = await readFile(
    path.join(process.cwd(), "public", "brand", "logo-badge.png"),
  );
  const badgeSrc = `data:image/png;base64,${badge.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 72,
          backgroundImage:
            "linear-gradient(118deg, #f6ccc4 0%, #f5cdc0 22%, #f7d6c3 48%, #f9dfc6 72%, #fae7d2 100%)",
          color: "#ffffff",
          fontFamily: "Helvetica, Arial, sans-serif",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={badgeSrc} width={340} height={340} alt="" />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 40, letterSpacing: 8, textTransform: "uppercase" }}>
            Handcrafted &amp; Permanent
          </div>
          <div
            style={{
              fontSize: 40,
              letterSpacing: 8,
              textTransform: "uppercase",
              marginTop: 8,
            }}
          >
            Fine Jewelry
          </div>
          <div
            style={{
              fontSize: 26,
              letterSpacing: 5,
              marginTop: 34,
              color: "rgba(255,255,255,0.85)",
              textTransform: "uppercase",
            }}
          >
            14K Gold-Filled &middot; Sterling Silver
          </div>
          <div
            style={{
              fontSize: 26,
              letterSpacing: 9,
              marginTop: 14,
              color: "rgba(255,255,255,0.85)",
            }}
          >
            {site.statesShort.join("  ·  ")}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
