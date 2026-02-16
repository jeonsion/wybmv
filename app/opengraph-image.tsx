import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630
};

export const contentType = "image/png";

export default function OpenGraphImage() {
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
          background: "linear-gradient(135deg, #f9a8d4 0%, #fbcfe8 45%, #fce7f3 100%)",
          color: "#831843",
          fontFamily: "sans-serif",
          padding: 64,
          textAlign: "center"
        }}
      >
        <div style={{ fontSize: 84, lineHeight: 1.1, fontWeight: 800 }}>Will You Be My Valentine?</div>
        <div style={{ marginTop: 22, fontSize: 34, maxWidth: 900 }}>
          Create a custom Valentine link with countdown and playful yes/no interaction.
        </div>
      </div>
    ),
    size
  );
}
