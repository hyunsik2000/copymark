// Types for toast functionality

export type ToastTheme = "grass" | "orange" | "blue" | "red" | "custom";

export type ToastVariant = "success" | "error";

export type ToastItem = {
  id: string;
  title: string;
  description?: string;
  variant: ToastVariant;
  duration: number;
  theme?: ToastTheme;
};

export type ToastOptions = {
  description?: string;
  duration?: number;
  theme?: ToastTheme;
};

export type ToastApi = {
  success: (
    title: string,
    description?: string,
    duration?: number,
    theme?: ToastTheme
  ) => void;
  error: (
    title: string,
    description?: string,
    duration?: number,
    theme?: ToastTheme
  ) => void;
  remove: (id: string) => void;
  items: ToastItem[];
};
