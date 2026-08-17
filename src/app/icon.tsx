import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#173F3A", color: "#F7F5F0", fontFamily: "serif", fontSize: 42, lineHeight: 1 }}>M</div>,
    size,
  );
}
