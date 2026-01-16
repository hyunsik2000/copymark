import { useMemo, useState } from "react";
import type { ToastTheme } from "@lyu_danny/copymark";
import { CopyText } from "@lyu_danny/copymark";
import type { DemoOptions } from "./options";
import { defaultTextOptions } from "./options";

function serializeCode(state: DemoOptions) {
  return `<CopyText 
  value="${state.value}"
  toast={${state.toastEnabled}}
  theme="${state.theme}"
  duration={${state.duration}}
  messages={{
    successTitle: "${state.messages.successTitle}",
    successDescription: "${state.messages.successDescription}",
    errorTitle: "${state.messages.errorTitle}",
    errorDescription: "${state.messages.errorDescription}"
  }}
>
  ${state.label}
</CopyText>`;
}

export function DemoText() {
  const [state, setState] = useState<DemoOptions>(defaultTextOptions);
  const code = useMemo(() => serializeCode(state), [state]);

  return (
    <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
      <h2 className="text-xl font-semibold text-slate-900">CopyText</h2>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm">
          Label
          <input
            className="rounded-lg border border-black/10 px-3 py-2"
            value={state.label}
            onChange={(e) => setState((prev) => ({ ...prev, label: e.target.value }))}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Value
          <input
            className="rounded-lg border border-black/10 px-3 py-2"
            value={state.value}
            onChange={(e) => setState((prev) => ({ ...prev, value: e.target.value }))}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Theme
          <select
            className="rounded-lg border border-black/10 px-3 py-2"
            value={state.theme}
            onChange={(e) =>
              setState((prev) => ({
                ...prev,
                theme: e.target.value as ToastTheme,
              }))
            }
          >
            <option value="grass">grass</option>
            <option value="blue">blue</option>
            <option value="orange">orange</option>
            <option value="red">red</option>
            <option value="custom">custom</option>
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Duration (ms)
          <input
            type="number"
            className="rounded-lg border border-black/10 px-3 py-2"
            value={state.duration}
            onChange={(e) =>
              setState((prev) => ({
                ...prev,
                duration: Number(e.target.value) || 0,
              }))
            }
          />
        </label>

      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm">
          Success Title
          <input
            className="rounded-lg border border-black/10 px-3 py-2"
            value={state.messages.successTitle}
            onChange={(e) =>
              setState((prev) => ({
                ...prev,
                messages: { ...prev.messages, successTitle: e.target.value },
              }))
            }
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Success Description
          <input
            className="rounded-lg border border-black/10 px-3 py-2"
            value={state.messages.successDescription}
            onChange={(e) =>
              setState((prev) => ({
                ...prev,
                messages: { ...prev.messages, successDescription: e.target.value },
              }))
            }
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Error Title
          <input
            className="rounded-lg border border-black/10 px-3 py-2"
            value={state.messages.errorTitle}
            onChange={(e) =>
              setState((prev) => ({
                ...prev,
                messages: { ...prev.messages, errorTitle: e.target.value },
              }))
            }
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Error Description
          <input
            className="rounded-lg border border-black/10 px-3 py-2"
            value={state.messages.errorDescription}
            onChange={(e) =>
              setState((prev) => ({
                ...prev,
                messages: { ...prev.messages, errorDescription: e.target.value },
              }))
            }
          />
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            className="h-4 w-4"
            checked={state.toastEnabled}
            onChange={(e) =>
              setState((prev) => ({ ...prev, toastEnabled: e.target.checked }))
            }
          />
          Toast enabled
        </label>
      </div>

      <div className="mt-6 rounded-2xl border border-black/5 bg-slate-50 p-5">
        <h3 className="text-sm font-semibold text-slate-700">Preview</h3>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <CopyText
            value={state.value}
            toast={state.toastEnabled}
            theme={state.theme}
            duration={state.duration}
            messages={state.messages}
          >
            {state.label}
          </CopyText>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-black/5 bg-[#1e1e1e] p-4 text-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-500/80" />
            <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
            <span className="h-3 w-3 rounded-full bg-green-500/80" />
          </div>
          <button
            className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs text-slate-200"
            onClick={() => navigator.clipboard?.writeText(code)}
          >
            Copy
          </button>
        </div>
        <textarea
          className="h-80 w-full resize-none rounded-lg bg-[#1e1e1e] p-3 font-mono text-sm text-slate-100 outline-none"
          value={code}
          readOnly
          spellCheck={false}
        />
      </div>
    </div>
  );
}
