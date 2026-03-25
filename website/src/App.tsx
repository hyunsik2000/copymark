import { DemoPlayground } from "./components/playground/DemoPlayground";
import { DemoCode } from "./components/playground/DemoCode";

const installCode = `npm install @lyu_danny/copymark`;

const usageCode = `import { CopyButton, CopyText } from "@lyu_danny/copymark";
import "@lyu_danny/copymark/styles.css";

// 버튼 형태 — 클릭 시 복사 + 토스트 알림
<CopyButton value="Hello World" toast theme="grass">
  Copy
</CopyButton>

// 텍스트 형태 — 클릭 가능한 인라인 텍스트
<CopyText value="Hello World" toast theme="grass">
  Click to copy
</CopyText>`;

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <header className="sticky top-0 z-10 border-b border-black/5 bg-slate-50/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="text-lg font-semibold tracking-tight">Copymark</div>
          <nav className="flex items-center gap-4 text-sm text-slate-600">
            <a className="hover:text-slate-900" href="#demo">
              Demo
            </a>
            <a className="hover:text-slate-900" href="#usage">
              Usage
            </a>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6">
        {/* Hero */}
        <section className="py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Copy UX toolkit
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">
            Copymark for React
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-600">
            버튼/텍스트 복사 UX를 토스트와 함께 제공하는 가벼운 라이브러리.
          </p>

          {/* Install command */}
          <div className="mt-8 inline-flex items-center gap-3 rounded-xl border border-black/5 bg-[#1e1e1e] px-5 py-3">
            <span className="select-none text-slate-500">$</span>
            <code className="text-sm text-[#d4d4d4]">npm install @lyu_danny/copymark</code>
          </div>
        </section>

        {/* Demo */}
        <DemoPlayground />

        {/* Usage */}
        <section id="usage" className="pb-24 pt-4">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Usage</h2>
          <p className="mt-2 text-slate-500">Provider 없이 바로 import해서 사용할 수 있습니다.</p>
          <DemoCode code={installCode} fileName="terminal" />
          <DemoCode code={usageCode} fileName="App.tsx" />
        </section>
      </main>
    </div>
  );
}
