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
      className="rounded-[4px] border border-rule px-2 py-0.5 text-sm text-ink-2 transition-colors hover:border-ink-2 hover:text-ink"
    >
      <span aria-live="polite">{copied ? done : label}</span>
    </button>
  );
}
