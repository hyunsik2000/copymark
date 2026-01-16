// Toast state management logic

import { useCallback, useMemo, useState } from "react";
import type {
  ToastTheme,
  ToastVariant,
  ToastItem,
  ToastApi,
} from "../types/toast";

function uid() {
  return Math.random().toString(16).slice(2);
}

export function useToastStore(defaultTheme: ToastTheme = "grass") {
  const [items, setItems] = useState<ToastItem[]>([]);

  const remove = useCallback((id: string) => {
    setItems((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const push = useCallback(
    (
      variant: ToastVariant,
      title: string,
      description?: string,
      duration = 2000,
      theme?: ToastTheme
    ) => {
      const id = uid();
      const toast: ToastItem = {
        id,
        variant,
        title,
        description,
        duration,
        theme: theme ?? defaultTheme,
      };
      setItems((prev) => [toast, ...prev]);
    },
    [defaultTheme]
  );

  const api = useMemo<ToastApi>(
    () => ({
      items,
      remove,
      success: (title, description, duration, theme) =>
        push("success", title, description, duration, theme),
      error: (title, description, duration, theme) =>
        push("error", title, description, duration, theme),
    }),
    [items, remove, push]
  );

  return api;
}
