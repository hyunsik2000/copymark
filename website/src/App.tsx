import { DemoPlayground } from "./components/playground/DemoPlayground";

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
        </section>

        <DemoPlayground />
      </main>
    </div>
  );
}
