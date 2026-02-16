import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 600
};

export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(120deg, #fce7f3 0%, #fbcfe8 50%, #f9a8d4 100%)",
          color: "#9d174d",
          fontFamily: "sans-serif",
          padding: 48,
          textAlign: "center"
        }}
      >
        <div style={{ fontSize: 70, lineHeight: 1.1, fontWeight: 800 }}>Valentine Link Generator</div>
        <div style={{ marginTop: 18, fontSize: 30 }}>Make a shareable "Will You Be My Valentine?" page in seconds.</div>
      </div>
    ),
    size
  );
}
