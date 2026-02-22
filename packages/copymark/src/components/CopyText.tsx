import React from "react";
import { useCopyValue } from "../hooks/useCopyValue";
import type { CopyTextProps } from "../types/components";

export function CopyText({
  value,
  children,
  className,
  unstyled,
  duration,
  theme,
  messages,
  toast,
}: CopyTextProps) {
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
    <span
      className={unstyled ? className ?? "" : `cm-copyText ${className ?? ""}`}
      data-status={status}
      role="button"
      onClick={handleClick}
      aria-label="Copy Text"
      aria-busy={status === "copying"}
    >
      {children ?? value}
    </span>
  );
}
