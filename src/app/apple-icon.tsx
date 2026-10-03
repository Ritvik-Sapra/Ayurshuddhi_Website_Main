import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const emblem = await readFile(join(process.cwd(), "public/brand/ayurshuddhi-logo-emblem.svg"));
  const src = `data:image/svg+xml;base64,${emblem.toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#456a4b",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} width={124} height={120} alt="" />
    </div>,
    { ...size },
  );
}
