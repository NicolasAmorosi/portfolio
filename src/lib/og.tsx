import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// Shared renderer for Open Graph images and icons. Static Archivo instances
// live in src/assets/fonts (Satori can't read variable fonts).
const ink = "#13213c";
const ink2 = "#4a5670";
const paper = "#f1f2ef";
const mark = "#f4d23c";

export const ogSize = { width: 1200, height: 630 };

async function fonts() {
  const dir = join(process.cwd(), "src/assets/fonts");
  const [display, text] = await Promise.all([
    readFile(join(dir, "archivo-display.ttf")),
    readFile(join(dir, "archivo-text.ttf")),
  ]);
  return [
    { name: "Display", data: display, weight: 800 as const, style: "normal" as const },
    { name: "Text", data: text, weight: 400 as const, style: "normal" as const },
  ];
}

const Mark = ({ children }: { children: string }) => (
  <span style={{ backgroundColor: mark, color: ink, padding: "0 0.03em" }}>{children}</span>
);

export async function nameImage(tagline: string) {
  return new ImageResponse(
    (
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", backgroundColor: paper, color: ink, padding: "64px 72px" }}>
        <div style={{ display: "flex", flexDirection: "column", fontFamily: "Display", fontSize: 232, lineHeight: 0.84, letterSpacing: "-0.01em" }}>
          <div style={{ display: "flex" }}>
            Nicol<Mark>á</Mark>s
          </div>
          <div style={{ display: "flex" }}>Amorosi</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", fontFamily: "Text", fontSize: 34, color: ink2 }}>
          <div style={{ display: "flex", maxWidth: 760 }}>{tagline}</div>
          <div style={{ display: "flex" }}>nicolasamorosi.com</div>
        </div>
      </div>
    ),
    { ...ogSize, fonts: await fonts() },
  );
}

export async function caseImage({ client, title, footer }: { client: string; title: string; footer: string }) {
  return new ImageResponse(
    (
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", backgroundColor: paper, color: ink, padding: "64px 72px" }}>
        <div style={{ display: "flex", fontFamily: "Text", fontSize: 34, color: ink2 }}>{client}</div>
        <div style={{ display: "flex", fontFamily: "Display", fontSize: title.length > 18 ? 150 : 190, lineHeight: 0.88, letterSpacing: "-0.01em", maxWidth: 1056 }}>
          {title}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "Text", fontSize: 30, color: ink2, borderTop: `2px solid ${ink}`, paddingTop: 22 }}>
          <div style={{ display: "flex" }}>{footer}</div>
          <div style={{ display: "flex", fontFamily: "Display", fontSize: 40, color: ink }}>
            Nicol<Mark>á</Mark>s Amorosi
          </div>
        </div>
      </div>
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
