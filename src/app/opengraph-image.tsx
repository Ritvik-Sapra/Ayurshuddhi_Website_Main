import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/frontend/content/site";

export const alt = `${site.name}: Ayurveda & Naturopathy in Greater Noida`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Default share image: the full logo and tagline on brand green. */
export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), "public/brand/ayurshuddhi-logo-full.svg"));
  const logoSrc = `data:image/svg+xml;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        gap: 72,
        padding: "0 96px",
        background: "#456a4b",
        color: "#fffbe7",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={logoSrc} width={300} height={261} alt="" />
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ fontSize: 68, lineHeight: 1.1, letterSpacing: -2 }}>{site.name}</div>
        <div style={{ fontSize: 34, lineHeight: 1.3, opacity: 0.85 }}>{site.tagline}</div>
      </div>
    </div>,
    { ...size },
  );
}
