// ToastItem component

import React, { useState, useEffect, useCallback } from "react";
import type { ToastItem as ToastItemType } from "../../types/toast";

type ToastItemProps = {
  item: ToastItemType;
  onRemove: (id: string) => void;
};

const EXIT_ANIMATION_DURATION = 250;

export function ToastItem({ item, onRemove }: ToastItemProps) {
  const [isExiting, setIsExiting] = useState(false);

  // Auto-remove timer
  useEffect(() => {
    if (isExiting) return;

    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => onRemove(item.id), EXIT_ANIMATION_DURATION);
    }, item.duration);

    return () => clearTimeout(timer);
  }, [item.id, item.duration, isExiting, onRemove]);

  const handleRemove = useCallback(() => {
    if (isExiting) return;
    setIsExiting(true);
    setTimeout(() => onRemove(item.id), EXIT_ANIMATION_DURATION);
  }, [item.id, isExiting, onRemove]);

  return (
    <div
      className={`cm-toast ${isExiting ? "cm-toast--exiting" : ""}`}
      data-variant={item.variant}
      data-theme={item.theme ?? "grass"}
      role="status"
    >
      <div className="cm-toast__content">
        <div className="cm-toast__title">{item.title}</div>
        {item.description && (
          <div className="cm-toast__desc">{item.description}</div>
        )}
      </div>
      <button
        className="cm-toast__close"
        onClick={handleRemove}
        aria-label="Close"
        type="button"
      >
        ×
      </button>
    </div>
  );
}
