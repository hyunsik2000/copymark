// src/ui/toast/autoToast.tsx
import React from "react";
import { createRoot, type Root } from "react-dom/client";
import { useToastItems, toastStore, toast } from "./store";
import { ToastItem as ToastItemView } from "./ToastItem";

let autoRoot: Root | null = null;
const TOASTER_ID = "cm-toaster-container";

function AutoToaster() {
  const items = useToastItems();

  if (items.length === 0) return null;

  return (
    <div className="cm-toaster" aria-live="polite">
      {items.map((item) => (
        <ToastItemView key={item.id} item={item} onRemove={(id) => toastStore.remove(id)} />
      ))}
    </div>
  );
}

export function ensureToasterVisible() {
  if (typeof document === "undefined") return;

  // 1. 이미 Provider가 만든 혹은 Auto로 만든 Toaster가 DOM에 있는지 확인
  const existingContainer = document.getElementById(TOASTER_ID) || document.querySelector(".cm-toaster");
  if (existingContainer) return;

  // 2. 없다면 새로 생성하여 Body에 주입 (Auto Mode)
  let container = document.getElementById(TOASTER_ID);
  if (!container) {
    container = document.createElement("div");
    container.id = TOASTER_ID;
    document.body.appendChild(container);
  }

  if (!autoRoot) {
    autoRoot = createRoot(container);
    autoRoot.render(<AutoToaster />);
  }
}

/**
 * 전역에서 사용 가능한 토스트 API
 * 호출 시점에 Toaster 유무를 판단하여 자동 주입합니다.
 */
export const copymarkToast = {
  success: (title: string, desc?: string, dur?: number, theme?: any) => {
    ensureToasterVisible();
    toast.success(title, desc, dur, theme);
  },
  error: (title: string, desc?: string, dur?: number, theme?: any) => {
    ensureToasterVisible();
    toast.error(title, desc, dur, theme);
  },
};

