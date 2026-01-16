# Copymark

copy-to-mark UX toolkit for React.

## Install

```bash
npm i @lyu_danny/copymark
```

## Usage (필수 설정)

- 토스트를 보려면 `CopymarkToastProvider`로 감싸고 `CopymarkToaster`를 렌더해야 합니다.

```tsx
import {
  CopyButton,
  CopyText,
  CopymarkToastProvider,
  CopymarkToaster,
} from "@lyu_danny/copymark";

function App() {
  return (
    <CopymarkToastProvider>
      <CopyButton value="Hello World">Copy</CopyButton>
      <CopyText value="Click to copy">Click me</CopyText>
      <CopymarkToaster />
    </CopymarkToastProvider>
  );
}
```

### With Options

```tsx
// Customize toast messages and theme
<CopyButton 
  value="Hello World"
  theme="blue"
  duration={3000}
  messages={{
    successTitle: "성공!",
    successDescription: "복사 완료되었습니다.",
    errorTitle: "실패",
    errorDescription: "다시 시도해주세요."
  }}
>
  Copy
</CopyButton>

// Disable toast
<CopyText 
  value="Click to copy"
  toast={false}
>
  Click me
</CopyText>
```

## Props (CopyButton / CopyText)

- `value` (string, required): 복사할 문자열
- `toast` (boolean, default `true`): 토스트 표시 여부
- `duration` (number, default `2000`): 토스트 표시 시간(ms)
- `theme` (`"grass" | "orange" | "blue" | "red" | "custom"`): 토스트 테마
- `messages` (object): 토스트 문구 커스터마이즈
  - `successTitle`, `successDescription`, `errorTitle`, `errorDescription`