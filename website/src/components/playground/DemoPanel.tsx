import type { ReactNode } from "react";
import type { DemoOptions } from "../../types/playground/options";
import { DemoCode } from "./DemoCode";
import { DemoOptions as DemoOptionsForm } from "./DemoOptions";

type DemoPanelProps = {
  title: string;
  fileName: string;
  state: DemoOptions;
  setState: (next: DemoOptions) => void;
  code: string;
  preview: ReactNode;
};

export function DemoPanel({
  title,
  fileName,
  state,
  setState,
  code,
  preview,
}: DemoPanelProps) {
  return (
    <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
      <h2 className="text-xl font-semibold text-slate-900">{title}</h2>

      <DemoOptionsForm state={state} setState={setState} />

      <div className="mt-6 rounded-2xl border border-black/5 bg-slate-50 p-5">
        <h3 className="text-sm font-semibold text-slate-700">Preview</h3>
        <div className="mt-3 flex flex-wrap items-center gap-3">{preview}</div>
      </div>

      <DemoCode code={code} fileName={fileName} />
    </div>
  );
}
