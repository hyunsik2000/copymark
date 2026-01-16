import { useCallback } from "react";
import { useCopymark } from "./useCopymark";
import { useCopymarkToast } from "../ui/toast";
import type { UseCopyValueOptions } from "../types/hooks";

const DEFAULT_MESSAGES = {
  successTitle: "Copied",
  successDescription: "클립보드에 복사되었습니다.",
  errorTitle: "Copy failed",
  errorDescription: "복사에 실패했습니다.",
} as const;

export function useCopyValue(options: UseCopyValueOptions = {}) {
  const {
    toast: enableToast = true,
    duration = 2000,
    theme,
    messages,
  } = options;

  const toast = useCopymarkToast();
  const mergedMessages = { ...DEFAULT_MESSAGES, ...(messages ?? {}) };

  const { copy, status, lastResult, reset } = useCopymark({
    onResult: (r) => {
      if (!enableToast) return;
      if (!toast) return;
      if (r.ok)
        toast.success(
          mergedMessages.successTitle,
          mergedMessages.successDescription,
          duration,
          theme
        );
      else
        toast.error(
          mergedMessages.errorTitle,
          mergedMessages.errorDescription,
          duration,
          theme
        );
    },
  });

  const handleCopy = useCallback(
    async (value: string) => {
      await copy(value);
    },
    [copy]
  );

  return { handleCopy, status, lastResult, reset } as const;
}
