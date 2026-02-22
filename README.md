# Copymark

[![npm version](https://badge.fury.io/js/%40lyu_danny%2Fcopymark.svg)](https://www.npmjs.com/package/@lyu_danny/copymark)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Copymark** is a sophisticated, zero-config React toolkit designed to elevate your "Copy-to-Clipboard" user experience. It seamlessly integrates clipboard functionality with beautiful, non-intrusive toast notifications out of the box.

---

## ✨ Key Features

- **🚀 Zero Configuration**: No Providers, no boilerplate. Just import and use.
- **🎨 Multi-Themed**: Choose from curated themes or customize your own.
- **🧩 Component-Driven**: Optimized `CopyButton` and `CopyText` for flexible UI implementation.
- **⚡ Lightweight & Fast**: Built with performance in mind using React's latest features.
- **📱 Responsive UI**: Beautiful toasts that work perfectly on mobile and desktop.

---

## 📦 Installation

```bash
npm install @lyu_danny/copymark
# or
yarn add @lyu_danny/copymark
# or
pnpm add @lyu_danny/copymark
```

---

## 🚀 Quick Start

Copymark is designed to work immediately without any complex setup.

```tsx
import { CopyButton, CopyText } from "@lyu_danny/copymark";

function App() {
  return (
    <div className="container">
      {/* Basic Button */}
      <CopyButton value="https://copymark.dev">
        Copy Link
      </CopyButton>

      {/* Inline Text Copy */}
      <p>
        My IP address is <CopyText value="192.168.0.1">192.168.0.1</CopyText>
      </p>
    </div>
  );
}
```

---

## 🛠 Advanced Usage

### Customizing Toasts
Tailor the feedback to match your application's brand.

```tsx
<CopyButton
  value="PromotionalCode2025"
  toast="on"
  theme="blue"
  duration={3000}
  messages={{
    successTitle: "Code Copied!",
    successDescription: "Use this code at checkout for 20% off.",
    errorTitle: "Failed to Copy",
    errorDescription: "Please try again manually."
  }}
>
  Get Deal
</CopyButton>
```

### Disabling Feedback
Sometimes you want silence. Use the `toast` prop to opt out.

```tsx
<CopyText value="Silent data" toast="off">
  Copy without toast
</CopyText>
```

---

## 📋 API Reference

### `CopyButton` / `CopyText` Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `value` | `string` | **Required** | The string to be copied to the clipboard. |
| `toast` | `"on" \| "off"` | `"on"` | Enables or disables the toast notification feedback. |
| `theme` | `ToastTheme` | `"grass"` | Visual preset: `"grass"`, `"orange"`, `"blue"`, `"red"`, `"dark"`. |
| `duration`| `number` | `2000` | Duration (ms) the toast stays visible. |
| `messages`| `Object` | (Default) | Custom text for success/error titles and descriptions. |
| `unstyled`| `boolean` | `false` | Removes default library styling for complete CSS control. |

---

## 🎨 Themes

Currently, Copymark supports following built-in themes:
- `grass`: Nature-inspired green (Success standard)
- `orange`: Vibrant warning/action orange
- `blue`: Clean, professional informative blue
- `red`: Error/Alert standard red
- `dark`: Modern, sleek dark mode with glassmorphism

---

## 📄 License

MIT © [lyu_danny](https://github.com/lyu_danny)