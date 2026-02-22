# @lyu_danny/copymark

> A sophisticated, zero-config React toolkit for "Copy-to-Clipboard" with integrated Toasts.

## Install

```bash
npm install @lyu_danny/copymark
```

## Features

- **No Provider needed**: Just import and use. Infrastructure is initialized lazily.
- **Auto-Injection**: Toaster is automatically managed within the DOM.
- **Full Customizability**: Override messages, durations, and themes per component.

## Usage

```tsx
import { CopyButton, CopyText } from "@lyu_danny/copymark";

function Example() {
  return (
    <>
      {/* Smart injection of Toast UI happens on the first click */}
      <CopyButton value="Shareable Text">Copy to Clipboard</CopyButton>

      {/* Opt-out of feedback if necessary */}
      <CopyText value="Secret" toast="off">Click to copy silently</CopyText>
    </>
  );
}
```

## API

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `value` | `string` | - | Text to copy |
| `toast` | `"on" \| "off"` | `"on"` | Toggle toast feedback |
| `theme` | `ToastTheme` | `"grass"` | Visual preset: `grass`, `orange`, `blue`, `red`, `dark` |

| `duration` | `number` | `2000` | Visibility time in ms |

---
MIT Licensed | © 2025 lyu_danny