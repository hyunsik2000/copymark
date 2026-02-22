import type { ToastTheme } from "@lyu_danny/copymark";

export type DemoMessages = {
  successTitle: string;
  successDescription: string;
  errorTitle: string;
  errorDescription: string;
};

export type DemoOptions = {
  label: string;
  value: string;
  toastEnabled: boolean;
  theme: ToastTheme;
  duration: number;
  messages: DemoMessages;
};

export const defaultButtonOptions: DemoOptions = {
  label: "Copy",
  value: "Hello World",
  toastEnabled: true,
  theme: "grass",
  duration: 3000,
  messages: {
    successTitle: "Success!",
    successDescription: "Copied to clipboard!",
    errorTitle: "Failed!",
    errorDescription: "Please try again.",
  },
};

export const defaultTextOptions: DemoOptions = {
  label: "Click me",
  value: "Click to copy",
  toastEnabled: true,
  theme: "grass",
  duration: 2000,
  messages: {
    successTitle: "Success!",
    successDescription: "Copied to clipboard!",
    errorTitle: "Failed!",
    errorDescription: "Please try again.",
  },
};
