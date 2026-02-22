import type { ToastTheme } from "@lyu_danny/copymark";
import type { DemoOptions } from "../../types/playground/options";

type DemoOptionsProps = {
  state: DemoOptions;
  setState: (next: DemoOptions) => void;
};

export function DemoOptions({ state, setState }: DemoOptionsProps) {
  return (
    <>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm">
          Label
          <input
            className="rounded-lg border border-black/10 px-3 py-2"
            value={state.label}
            onChange={(e) => setState({ ...state, label: e.target.value })}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Value
          <input
            className="rounded-lg border border-black/10 px-3 py-2"
            value={state.value}
            onChange={(e) => setState({ ...state, value: e.target.value })}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Theme
          <select
            className="rounded-lg border border-black/10 px-3 py-2"
            value={state.theme}
            onChange={(e) =>
              setState({ ...state, theme: e.target.value as ToastTheme })
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
              setState({
                ...state,
                duration: Number(e.target.value) || 0,
              })
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
              setState({
                ...state,
                messages: { ...state.messages, successTitle: e.target.value },
              })
            }
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Success Description
          <input
            className="rounded-lg border border-black/10 px-3 py-2"
            value={state.messages.successDescription}
            onChange={(e) =>
              setState({
                ...state,
                messages: {
                  ...state.messages,
                  successDescription: e.target.value,
                },
              })
            }
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Error Title
          <input
            className="rounded-lg border border-black/10 px-3 py-2"
            value={state.messages.errorTitle}
            onChange={(e) =>
              setState({
                ...state,
                messages: { ...state.messages, errorTitle: e.target.value },
              })
            }
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Error Description
          <input
            className="rounded-lg border border-black/10 px-3 py-2"
            value={state.messages.errorDescription}
            onChange={(e) =>
              setState({
                ...state,
                messages: {
                  ...state.messages,
                  errorDescription: e.target.value,
                },
              })
            }
          />
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            className="h-4 w-4"
            checked={state.toastEnabled}
            onChange={(e) =>
              setState({ ...state, toastEnabled: e.target.checked })
            }
          />
          Toast enabled
        </label>
      </div>
    </>
  );
}
