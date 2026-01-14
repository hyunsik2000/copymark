// src/hooks/useCopymark.ts

import { useCallback, useRef, useState } from "react";
import { copyText, type CopyResult } from "../core/copyText";
import type { CopyStatus, UseCopymarkOptions } from "../types/hooks";

export function useCopymark(options: UseCopymarkOptions = {}) {
  const { resetDelay = 1000, onResult } = options;

  const [status, setStatus] = useState<CopyStatus>("idle");
  const [lastResult, setLastResult] = useState<CopyResult | null>(null);

  const timerRef = useRef<number | null>(null);

  const reset = useCallback(() => {
    setStatus("idle");
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = null;
  }, []);

  const copy = useCallback(
    async (text: string) => {
      if (timerRef.current) window.clearTimeout(timerRef.current);

      setStatus("copying");

      const result = await copyText(text);

      setLastResult(result);
      onResult?.(result);

      setStatus(result.ok ? "success" : "error");

      timerRef.current = window.setTimeout(() => {
        setStatus("idle");
      }, resetDelay);

      return result;
    },
    [onResult, resetDelay]
  );

  return { copy, status, lastResult, reset } as const;
}
