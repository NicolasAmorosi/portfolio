import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// Shared renderer for Open Graph images and icons. Static Archivo instances
// live in src/assets/fonts (Satori can't read variable fonts).
const ink = "#13213c";
const ink2 = "#4a5670";
const paper = "#f1f2ef";
const mark = "#f4d23c";
const rule = "#cbd0d7";

export const ogSize = { width: 1200, height: 630 };

async function fonts() {
  const dir = join(process.cwd(), "src/assets/fonts");
  const [display, semibold, text] = await Promise.all([
    readFile(join(dir, "archivo-display.ttf")),
    readFile(join(dir, "archivo-semibold.ttf")),
    readFile(join(dir, "archivo-text.ttf")),
  ]);
  return [
    { name: "Display", data: display, weight: 800 as const, style: "normal" as const },
    { name: "Semibold", data: semibold, weight: 600 as const, style: "normal" as const },
    { name: "Text", data: text, weight: 400 as const, style: "normal" as const },
  ];
}

const Mark = ({ children }: { children: string }) => (
  <span style={{ backgroundColor: mark, color: ink, padding: "0 0.04em" }}>{children}</span>
);

const Name = ({ size }: { size: number }) => (
  <div style={{ display: "flex", fontFamily: "Semibold", fontSize: size, letterSpacing: "-0.02em" }}>
    Nicol<Mark>á</Mark>s Amorosi
  </div>
);

// Same quiet layout as the site: one column of text, a hairline, the address.
function Card({ children, byline = "" }: { children: React.ReactNode; byline?: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", backgroundColor: paper, color: ink, padding: "72px 80px", fontFamily: "Text" }}>
      <div style={{ display: "flex", flexDirection: "column" }}>{children}</div>
      <div style={{ display: "flex", justifyContent: "space-between", borderTop: `2px solid ${rule}`, paddingTop: 24, fontSize: 28, color: ink2 }}>
        <div style={{ display: "flex", color: ink }}>{byline}</div>
        <div style={{ display: "flex" }}>nicolasamorosi.com</div>
      </div>
    </div>
  );
}

export async function nameImage(tagline: string) {
  return new ImageResponse(
    (
      <Card>
        <Name size={104} />
        <div style={{ display: "flex", marginTop: 28, fontSize: 40, lineHeight: 1.35, color: ink2, maxWidth: 940 }}>{tagline}</div>
      </Card>
    ),
    { ...ogSize, fonts: await fonts() },
  );
}

export async function caseImage({ client, title, summary }: { client: string; title: string; summary: string }) {
  return new ImageResponse(
    (
      <Card byline="Nicolás Amorosi">
        <div style={{ display: "flex", fontSize: 30, color: ink2 }}>{client}</div>
        <div style={{ display: "flex", marginTop: 14, fontFamily: "Semibold", fontSize: title.length > 18 ? 84 : 104, lineHeight: 1.05, letterSpacing: "-0.02em" }}>
          {title}
        </div>
        <div style={{ display: "flex", marginTop: 26, fontSize: 32, lineHeight: 1.4, color: ink2, maxWidth: 1000 }}>{summary}</div>
      </Card>
    ),
    { ...ogSize, fonts: await fonts() },
  );
}

export async function iconImage(size: number, radius: number) {
  return new ImageResponse(
    (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", backgroundColor: mark, color: ink, borderRadius: radius, fontFamily: "Display", fontSize: size * 0.98, lineHeight: 1, paddingBottom: size * 0.06 }}>
        á
      </div>
    ),
    { width: size, height: size, fonts: await fonts() },
  );
}
