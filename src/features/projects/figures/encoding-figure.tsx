"use client";

import { useTranslations } from "next-intl";
import { useId, useState } from "react";
import { Figure } from "@/components/ui/figure";

// Sample words as a latin1/Windows-1252 column would store them. Decoding is
// real: the browser's own TextDecoder, plus strict ISO-8859-1 by hand (the
// WHATWG "latin1" label is an alias of windows-1252, so it can't be used).
const samples: { word: string; bytes: number[] }[] = [
  { word: "l’esame", bytes: [0x6c, 0x92, 0x65, 0x73, 0x61, 0x6d, 0x65] },
  { word: "perché", bytes: [0x70, 0x65, 0x72, 0x63, 0x68, 0xe9] },
  { word: "così", bytes: [0x63, 0x6f, 0x73, 0xec] },
  { word: "Nicolás", bytes: [0x4e, 0x69, 0x63, 0x6f, 0x6c, 0xe1, 0x73] },
];

const decoders: { codec: string; decode: (bytes: Uint8Array) => string }[] = [
  { codec: "UTF-8", decode: (bytes) => new TextDecoder("utf-8").decode(bytes) },
  { codec: "latin1", decode: (bytes) => String.fromCharCode(...bytes) },
  { codec: "Windows-1252", decode: (bytes) => new TextDecoder("windows-1252").decode(bytes) },
];

const isC1Control = (char: string) => {
  const code = char.charCodeAt(0);
  return code >= 0x80 && code <= 0x9f;
};

const hex = (value: number, width = 2) => value.toString(16).toUpperCase().padStart(width, "0");

export function EncodingFigure() {
  const t = useTranslations("figures.encoding");
  const name = useId();
  const [index, setIndex] = useState(0);
  const sample = samples[index] ?? samples[0]!;
  const bytes = Uint8Array.from(sample.bytes);

  return (
    <Figure caption={t("caption")}>
      <fieldset>
        <legend className="text-sm text-ink-2">{t("legend")}</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {samples.map((s, i) => (
            <label
              key={s.word}
              className="cursor-pointer rounded-[4px] border border-rule px-3 py-1.5 text-ui transition-colors hover:border-ink has-checked:border-ink has-checked:bg-ink has-checked:text-paper has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-ink"
            >
              <input
                type="radio"
                name={name}
                className="sr-only"
                checked={i === index}
                onChange={() => setIndex(i)}
              />
              {s.word}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-7">
        <p className="text-sm text-ink-2">{t("bytes")}</p>
        <p className="mt-2 flex flex-wrap gap-1.5 font-mono text-sm">
          {sample.bytes.map((byte, i) => (
            <span
              key={i}
              className={
                byte >= 0x80
                  ? "rounded-[3px] bg-ink px-1.5 py-0.5 text-paper"
                  : "rounded-[3px] border border-rule px-1.5 py-0.5"
              }
            >
              {hex(byte)}
            </span>
          ))}
        </p>
      </div>

      <ul className="mt-7 divide-y divide-rule border-y border-rule">
        {decoders.map(({ codec, decode }) => {
          const text = decode(bytes);
          const replacements = [...text].filter((char) => char === "�").length;
          const silent = replacements === 0 && [...text].some(isC1Control);
          const ok = replacements === 0 && !silent;
          return (
            <li key={codec} className="grid gap-x-6 gap-y-1 py-4 sm:grid-cols-[11rem_1fr_auto] sm:items-baseline">
              <p className="text-sm text-ink-2">{t("as", { codec })}</p>
              <p className="type-heading text-xl" aria-live="polite">
                {[...text].map((char, i) =>
                  char === "�" ? (
                    <span key={i} className="rounded-[3px] bg-mark px-0.5 text-mark-ink">
                      {char}
                    </span>
                  ) : isC1Control(char) ? (
                    <span
                      key={i}
                      title={t("invisible", { code: `U+${hex(char.charCodeAt(0), 4)}` })}
                      className="mx-px inline-block h-[0.8em] w-[0.45em] rounded-[2px] border border-dashed border-ink-2 align-baseline"
                    >
                      <span className="sr-only">{t("invisible", { code: `U+${hex(char.charCodeAt(0), 4)}` })}</span>
                    </span>
                  ) : (
                    <span key={i}>{char}</span>
                  ),
                )}
              </p>
              <p className={ok ? "text-sm font-medium" : "text-sm text-ink-2"}>
                <span aria-hidden="true" className="mr-1.5">
                  {ok ? "✓" : "✕"}
                </span>
                {ok ? t("ok") : replacements > 0 ? t("fffd", { count: replacements }) : t("silent")}
              </p>
            </li>
          );
        })}
      </ul>
    </Figure>
  );
}
