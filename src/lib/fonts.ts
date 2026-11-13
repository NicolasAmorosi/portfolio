import { Archivo, IBM_Plex_Mono } from "next/font/google";

// Archivo at its normal width for everything; hierarchy comes from size and
// weight. "latin" already covers Italian/Spanish accents, curly quotes and
// U+FFFD; latin-ext would add an 84 KB preload for nothing.
export const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

export const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-plex-mono",
  display: "swap",
});
