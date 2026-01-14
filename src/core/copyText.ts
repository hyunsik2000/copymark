import type { CopyMethod, CopyResult } from "../types/core";

export type { CopyMethod, CopyResult };

function hasDOM() {
  return typeof window !== "undefined" && typeof document !== "undefined";
}

export async function copyText(text: string): Promise<CopyResult> {
  if (!hasDOM()) {
    return {
      ok: false,
      method: "clipboard",
      error: new Error("DOM is not available (SSR)"),
    };
  }

  try {
    if (!navigator?.clipboard?.writeText) {
      throw new Error("Clipboard API is not supported");
    }
    await navigator.clipboard.writeText(text);
    return { ok: true, method: "clipboard" };
  } catch (e) {
    return { ok: false, method: "clipboard", error: e };
  }
}
