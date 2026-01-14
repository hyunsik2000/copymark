import React from "react";
import { useCopyValue } from "../hooks/useCopyValue";
import type { CopyButtonProps } from "../types/components";

export function CopyButton({
  value,
  children,
  className,
  toast,
  duration,
  theme,
  messages,
}: CopyButtonProps) {
  const { handleCopy, status } = useCopyValue({
    toast,
    duration,
    theme,
    messages,
  });

  const handleClick = () => {
    // 중복 클릭 방지: copying 중이면 무시
    if (status === "copying") return;
    handleCopy(value);
  };

  return (
    <button
      type="button"
      className={`cm-button ${className ?? ""}`}
      onClick={handleClick}
      disabled={status === "copying"}
      aria-label="Copy Button"
      aria-busy={status === "copying"}
    >
      {children ?? value}
    </button>
  );
}
