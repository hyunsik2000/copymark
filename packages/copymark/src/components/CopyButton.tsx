import React from "react";
import { useCopyValue } from "../hooks/useCopyValue";
import type { CopyButtonProps } from "../types/components";

export function CopyButton({
  value,
  children,
  className,
  unstyled,
  duration,
  theme,
  messages,
  toast,
}: CopyButtonProps) {
  const { handleCopy, status } = useCopyValue({
    duration,
    theme,
    messages,
    toast,
  });



  const handleClick = () => {
    // 중복 클릭 방지: copying 중이면 무시
    if (status === "copying") return;
    handleCopy(value);
  };

  return (
    <button
      type="button"
      className={unstyled ? className ?? "" : `cm-button ${className ?? ""}`}
      onClick={handleClick}
      disabled={status === "copying"}
      aria-label="Copy Button"
      aria-busy={status === "copying"}
    >
      {children ?? value}
    </button>
  );
}
