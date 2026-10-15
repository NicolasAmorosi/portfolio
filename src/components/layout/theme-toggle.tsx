"use client";

// The current scheme is either explicit (data-theme, set by the inline script
// in the layout) or the OS preference. Toggling stores the explicit choice.
function toggleTheme(): void {
  const root = document.documentElement;
  const current =
    root.dataset.theme ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  const next = current === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  try {
    localStorage.setItem("theme", next);
  } catch {
    // Storage blocked (private mode): the choice lasts for this page only.
  }
}

export function ThemeToggle({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className="grid size-10 place-items-center rounded-full text-ink-2 transition-colors hover:text-ink"
    >
      <svg viewBox="0 0 20 20" className="theme-icon size-5" aria-hidden="true">
        <circle cx="10" cy="10" r="8.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 1.75a8.25 8.25 0 0 1 0 16.5Z" fill="currentColor" />
      </svg>
    </button>
  );
}
