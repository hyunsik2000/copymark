import React from "react";
import { useToastItems, toastStore } from "./store";
import { ToastItem } from "./ToastItem";

export function Toaster() {
  const items = useToastItems();

  if (items.length === 0) return null;

  return (
    <div className="cm-toaster" aria-live="polite">
      {items.map((item) => (
        <ToastItem key={item.id} item={item} onRemove={(id) => toastStore.remove(id)} />
      ))}
    </div>
  );
}

