import { useSyncExternalStore } from "react";
import type { ToastItem, ToastApi, ToastVariant, ToastTheme } from "../../types/toast";

type Listener = () => void;

let items: ToastItem[] = [];
let listeners = new Set<Listener>();

function subscribe(listener: Listener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function notify() {
  listeners.forEach((l) => l());
}

function uid() {
  return Math.random().toString(36).substring(2, 9);
}

export const toastStore = {
  getMessages() {
    return items;
  },
  subscribe,
  add(variant: ToastVariant, title: string, description?: string, duration = 2000, theme: ToastTheme = "grass") {
    const id = uid();
    const newItem: ToastItem = { id, variant, title, description, duration, theme };
    items = [newItem, ...items];
    notify();
    return id;
  },
  remove(id: string) {
    items = items.filter((item) => item.id !== id);
    notify();
  },
};

export const toast: ToastApi = {
  items: [], // This won't be used directly but satisfies the interface
  success: (title, desc, dur, theme) => {
    toastStore.add("success", title, desc, dur, theme);
  },
  error: (title, desc, dur, theme) => {
    toastStore.add("error", title, desc, dur, theme);
  },
  remove: (id) => toastStore.remove(id),
};

export function useToastItems() {
  return useSyncExternalStore(toastStore.subscribe, toastStore.getMessages, toastStore.getMessages);
}
