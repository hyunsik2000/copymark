# Copymark — 아키텍처 문서

> 버전: 0.0.3 | 패키지명: `@lyu_danny/copymark`

---

## 목차

1. [프로젝트 개요](#1-프로젝트-개요)
2. [모노레포 구조](#2-모노레포-구조)
3. [핵심 패키지 (packages/copymark)](#3-핵심-패키지-packagescopymark)
4. [데이터 흐름](#4-데이터-흐름)
5. [토스트 시스템](#5-토스트-시스템)
6. [웹사이트 (website/)](#6-웹사이트-website)
7. [스타일링 전략](#7-스타일링-전략)
8. [주요 설계 결정](#8-주요-설계-결정)

---

## 1. 프로젝트 개요

Copymark는 **클립보드 복사 기능 + 토스트 알림을 통합한 제로-설정(zero-config) React 컴포넌트 라이브러리**다.

- Provider 래핑 불필요
- 첫 사용 시 Toaster DOM이 자동 주입됨
- `CopyButton`, `CopyText` 두 컴포넌트로 구성
- 5가지 빌트인 테마 (grass, orange, blue, red, dark) + 커스텀 지원

---

## 2. 모노레포 구조

```
copymark/
├── packages/
│   └── copymark/          # npm 배포 라이브러리
├── website/               # 데모 & 문서 사이트
├── package.json           # npm workspaces 루트
└── ARCHITECTURE.md
```

**npm workspaces** 구성 (`"workspaces": ["packages/*", "website"]`)을 사용하며, website는 라이브러리를 `workspace:*` 프로토콜로 참조한다.

| 스크립트 | 설명 |
|---|---|
| `npm run dev:website` | 웹사이트 개발 서버 실행 |
| `npm run build:website` | 웹사이트 프로덕션 빌드 |

---

## 3. 핵심 패키지 (packages/copymark)

### 디렉토리 구조

```
packages/copymark/src/
├── components/
│   ├── CopyButton.tsx       # <button> 기반 컴포넌트
│   └── CopyText.tsx         # <span role="button"> 기반 컴포넌트
├── core/
│   ├── copyText.ts          # Clipboard API 순수 함수 래퍼
│   └── __tests__/
│       └── copyText.test.ts
├── hooks/
│   ├── useCopymark.ts       # 저수준: 클립보드 상태 관리
│   └── useCopyValue.ts      # 고수준: 클립보드 + 토스트 통합
├── ui/toast/
│   ├── store.ts             # 외부 상태 저장소
│   ├── autoToast.tsx        # DOM 자동 주입 시스템
│   ├── Toaster.tsx          # 토스트 컨테이너 컴포넌트
│   ├── ToastItem.tsx        # 개별 토스트 UI
│   └── index.ts
├── types/
│   ├── components.ts
│   ├── core.ts
│   ├── hooks.ts
│   └── toast.ts
├── styles.css               # CSS 진입점
└── index.ts                 # Public API 진입점
```

### Public API (`index.ts`)

```typescript
export { useCopymark }      // 저수준 훅 (직접 제어)
export { CopyText }         // 인라인 텍스트 컴포넌트
export { CopyButton }       // 버튼 컴포넌트
export { CopymarkToaster }  // 토스트 컨테이너 (선택적 명시 사용)
// + 타입 exports
```

### 레이어 구조

```
[ CopyButton / CopyText ]   ← UI 레이어 (HTML 렌더링)
         │
         ▼
  [ useCopyValue() ]        ← 통합 레이어 (클립보드 + 토스트)
         │
    ┌────┴────┐
    ▼         ▼
[ useCopymark() ]   [ copymarkToast ]
    │                      │
    ▼                      ▼
[ copyText() ]       [ toastStore ]
(Clipboard API)    (useSyncExternalStore)
```

---

## 4. 데이터 흐름

### 복사 실행 흐름

```
1. 사용자가 CopyButton / CopyText 클릭
        │
        ▼
2. handleClick() 실행
   - 복사 중(copying) 상태면 중복 클릭 차단
        │
        ▼
3. useCopyValue().handleCopy(value) 호출
        │
        ▼
4. useCopymark().copy(text) 호출
   - 상태: idle → copying
        │
        ▼
5. copyText(text) 실행
   - navigator.clipboard.writeText() 호출
   - 반환: { ok: true, method: "clipboard" }
          또는 { ok: false, method: "clipboard", error }
        │
        ▼
6. onResult 콜백 실행
   - 상태: copying → success | error
        │
        ▼
7. toast="on" 이면 copymarkToast.success() / .error() 호출
        │
        ▼
8. ensureToasterVisible()
   - document에 #cm-toaster-container 없으면 생성
   - createRoot()로 독립 React 트리 마운트
        │
        ▼
9. toastStore.add(item) 실행
   - subscribers에 변경 알림
        │
        ▼
10. Toaster 컴포넌트 리렌더링
    - ToastItem 표시 (duration 후 자동 제거)
        │
        ▼
11. resetDelay(기본 1000ms) 후 상태 → idle
```

### 상태 머신 (useCopymark)

```
idle ──(copy 호출)──→ copying ──(성공)──→ success ──(resetDelay)──→ idle
                              └──(실패)──→ error   ──(resetDelay)──→ idle
```

---

## 5. 토스트 시스템

### 핵심 원칙: Provider 없는 전역 상태

React Context 대신 `useSyncExternalStore`를 사용한 외부 저장소 패턴으로 구현됐다. 이를 통해 Provider 없이도 전역 상태 공유가 가능하다.

### store.ts

```typescript
// 구독 기반 외부 저장소
const toastStore = {
  items: ToastItem[],
  subscribe(listener) { ... },   // 컴포넌트 구독
  add(item) { ... },             // 토스트 추가 + 구독자 알림
  remove(id) { ... },            // 토스트 제거 + 구독자 알림
}
```

### autoToast.tsx (DOM 자동 주입)

```typescript
function ensureToasterVisible() {
  // 이미 존재하면 스킵
  if (document.getElementById("cm-toaster-container")) return;

  // 새 컨테이너 생성 후 body에 삽입
  const container = document.createElement("div");
  container.id = "cm-toaster-container";
  document.body.appendChild(container);

  // 독립 React 트리로 Toaster 마운트
  createRoot(container).render(<Toaster />);
}
```

### ToastItem 생명주기

```
add(item) → duration 타이머 시작
         → 타이머 만료: isExiting = true (exit 애니메이션 시작, 250ms)
         → 애니메이션 완료: remove(id)
```

---

## 6. 웹사이트 (website/)

### 기술 스택

| 항목 | 사용 기술 |
|---|---|
| 빌드 도구 | Vite 7.x |
| CSS | Tailwind CSS 3.x + PostCSS |
| 프레임워크 | React 19 |
| 문법 강조 | 직접 구현 (TypeScript) |

### 디렉토리 구조

```
website/src/
├── components/playground/
│   ├── DemoPlayground.tsx   # 전체 데모 컨테이너
│   ├── DemoPanel.tsx        # 패널 레이아웃
│   ├── DemoButton.tsx       # CopyButton 라이브 데모
│   ├── DemoText.tsx         # CopyText 라이브 데모
│   ├── DemoCode.tsx         # 코드 미리보기 패널
│   └── DemoOptions.tsx      # 옵션 폼 컨트롤
├── data/playground/
│   └── serializeCode.ts     # 컴포넌트 코드 문자열 생성기
├── types/playground/
│   └── options.ts           # 데모 상태 타입 정의
├── utils/
│   └── highlightFont.ts     # 구문 강조 유틸
├── App.tsx
└── main.tsx
```

### 데모 사이트 데이터 흐름

```
DemoOptions (폼) → 상태 변경
        │
        ▼
serializeButtonCode / serializeTextCode
→ 현재 옵션을 반영한 JSX 코드 문자열 생성
        │
        ▼
highlightCode()
→ 토큰 분류 후 span 태그로 문법 강조 적용
        │
        ▼
DemoCode → 강조된 코드 표시
DemoButton/DemoText → 실제 컴포넌트 라이브 프리뷰
```

---

## 7. 스타일링 전략

### CSS Variables 기반 테마

```css
[data-theme="grass"] {
  --cm-bg: ...;
  --cm-border: ...;
  --cm-radius: ...;
}
```

- 5가지 내장 테마: `grass` | `orange` | `blue` | `red` | `dark`
- `unstyled` prop으로 기본 CSS 완전 제거 후 커스텀 스타일 적용 가능
- `data-status`, `data-theme` 속성을 통한 CSS 상태 제어

### 토스트 애니메이션

| 단계 | 내용 |
|---|---|
| Enter | scale 0.95→1, opacity 0→1, translateX(100%)→0 (0.3s cubic-bezier) |
| Exit | 역방향 (0.2s) |

---

## 8. 주요 설계 결정

### 제로-설정 (Zero Config)

Provider 없이 동작하도록 설계됐다. 토스터는 첫 토스트 발생 시 자동으로 DOM에 주입된다.

**Why**: 라이브러리 사용자의 설정 부담을 제거하고, 기존 앱 구조 변경 없이 드롭인(drop-in) 사용 가능하게 하기 위함.

### useSyncExternalStore 사용

Context API 대신 React 18+의 `useSyncExternalStore`를 활용한 외부 저장소 패턴을 채택했다.

**Why**: Provider 없이 어떤 컴포넌트에서든 상태를 구독할 수 있고, Concurrent Mode에서도 안전하게 동작한다.

### 순수 함수 + 훅 분리

`copyText()` (순수 함수) → `useCopymark()` (상태) → `useCopyValue()` (통합) 레이어로 점진적으로 분리됐다.

**Why**: 테스트 용이성과 관심사 분리. `copyText()`는 React 없이 단독 테스트 가능.

### 독립 React 트리 (createRoot)

토스터를 앱의 React 트리 외부에 별도 `createRoot()`로 마운트한다.

**Why**: 라이브러리가 앱의 Context나 상태에 영향받지 않도록 격리하기 위함.

### 두 컴포넌트 (CopyButton / CopyText) 공유 훅

두 컴포넌트는 동일한 `useCopyValue()` 훅을 공유하며, 차이점은 렌더링하는 HTML 요소(`<button>` vs `<span>`)뿐이다.

**Why**: 로직 중복 없이 다양한 UI 패턴 지원.

---

## Tech Stack 요약

| 항목 | 라이브러리 패키지 | 웹사이트 |
|---|---|---|
| 언어 | TypeScript 5.x | TypeScript 5.x |
| 프레임워크 | React 19 | React 19 |
| 빌드 | tsup | Vite 7 |
| 테스트 | Vitest + jsdom | - |
| CSS | 순수 CSS (CSS Variables) | Tailwind CSS 3 |
