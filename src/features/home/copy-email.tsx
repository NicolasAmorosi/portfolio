"use client";

import { useEffect, useState } from "react";

export function CopyEmail({ email, label, done }: { email: string; label: string; done: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      // Clipboard blocked: the address is still on screen to select by hand.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex h-12 items-center rounded-[4px] border border-ink/30 px-5 text-ui font-medium transition-colors hover:border-ink"
    >
      <span aria-live="polite">{copied ? done : label}</span>
    </button>
  );
}
