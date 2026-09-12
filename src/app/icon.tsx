import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: "linear-gradient(125deg, #f5cdc0 0%, #fae7d2 100%)",
          color: "#ffffff",
          fontSize: 22,
          fontStyle: "italic",
          fontFamily: "Georgia, serif",
          borderRadius: 6,
        }}
      >
        h
      </div>
    ),
    size,
  );
}
