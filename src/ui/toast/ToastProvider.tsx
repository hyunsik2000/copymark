// Toast Provider component

import React, { createContext, useContext } from "react";
import { useToastStore } from "../../hooks/useToast";
import type { ToastTheme, ToastApi } from "../../types/toast";

const ToastContext = createContext<ToastApi | null>(null);

export function ToastProvider({
  children,
  defaultTheme = "grass",
}: {
  children: React.ReactNode;
  defaultTheme?: ToastTheme;
}) {
  const api = useToastStore(defaultTheme);

  return <ToastContext.Provider value={api}>{children}</ToastContext.Provider>;
}

export function useToastContext() {
  const ctx = useContext(ToastContext);
  return ctx; // provider 없으면 null
}
