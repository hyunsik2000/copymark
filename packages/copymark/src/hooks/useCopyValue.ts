import { useCallback } from "react";
import { useCopymark } from "./useCopymark";
import { copymarkToast } from "../ui/toast/autoToast";
import type { UseCopyValueOptions } from "../types/hooks";

const DEFAULT_MESSAGES = {
  successTitle: "Copied",
  successDescription: "클립보드에 복사되었습니다.",
  errorTitle: "Copy failed",
  errorDescription: "복사에 실패했습니다.",
} as const;

export function useCopyValue(options: UseCopyValueOptions = {}) {
  const {
    duration = 2000,
    theme,
    messages,
    toast = "on",
  } = options;

  const mergedMessages = { ...DEFAULT_MESSAGES, ...(messages ?? {}) };

  const { copy, status, lastResult, reset } = useCopymark({
    onResult: (r) => {
      // toast 설정이 "off"면 중단
      if (toast === "off") return;



      if (r.ok) {
        copymarkToast.success(
          mergedMessages.successTitle,
          mergedMessages.successDescription,
          duration,
          theme
        );
      } else {
        copymarkToast.error(
          mergedMessages.errorTitle,
          mergedMessages.errorDescription,
          duration,
          theme
        );
      }
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

