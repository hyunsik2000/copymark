// Toaster component

import React from "react";
import { useToastContext } from "./ToastProvider";
import { ToastItem } from "./ToastItem";

export function Toaster() {
  const toast = useToastContext();
  if (!toast) return null;

  return (
    <div className="cm-toaster" aria-live="polite" aria-relevant="additions">
      {toast.items.map((item) => (
        <ToastItem key={item.id} item={item} onRemove={toast.remove} />
      ))}
    </div>
  );
}
