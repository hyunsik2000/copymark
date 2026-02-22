// Types for useCopymark hook

import type { CopyResult } from "./core";
import type { ToastTheme } from "./toast";

export type CopyStatus = "idle" | "copying" | "success" | "error";

export type UseCopymarkOptions = {
  resetDelay?: number; // success/error 후에 idle로 돌아갈 시간(ms)
  onResult?: (result: CopyResult) => void; // 성공/실패 결과를 외부에서 받고 싶을 때(토스트 연동용)
};

export type CopyToastMessages = {
  successTitle?: string;
  successDescription?: string;
  errorTitle?: string;
  errorDescription?: string;
};

export type UseCopyValueOptions = {
  /**
   * 토스트 표시 설정
   * - "on": 토스트 활성화 (Provider가 없으면 자동으로 생성)
   * - "off": 토스트 비활성화
   * @default "on"
   */
  toast?: "on" | "off";
  /**
   * 토스트 테마
   * @default "grass"
   */
  theme?: ToastTheme;
  /**
   * 토스트 표시 시간(ms)
   * @default 2000
   */
  duration?: number;
  /**
   * 토스트 문구 커스터마이즈
   */
  messages?: CopyToastMessages;
};



