import "./styles.css";

export { useCopymark } from "./hooks/useCopymark";
export { CopyText } from "./components/CopyText";
export { CopyButton } from "./components/CopyButton";

export {
  CopymarkToastProvider,
  CopymarkToaster,
  useCopymarkToast,
} from "./ui/toast";

// Export types
export type { CopyMethod, CopyResult } from "./types/core";
export type { CopyStatus, UseCopymarkOptions } from "./types/hooks";
export type { CopyButtonProps, CopyTextProps } from "./types/components";
export type {
  ToastTheme,
  ToastVariant,
  ToastItem,
  ToastOptions,
  ToastApi,
} from "./types/toast";