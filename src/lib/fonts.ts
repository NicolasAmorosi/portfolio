import { Archivo, IBM_Plex_Mono } from "next/font/google";

// Archivo's width axis carries the whole type system: 62% for display, 75% for
// headings, 100% for text (see the type-* utilities in globals.css).
// "latin" already covers Italian/Spanish accents, curly quotes and U+FFFD;
// latin-ext would add an 84 KB preload for nothing.
export const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

export const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-plex-mono",
  display: "swap",
});
