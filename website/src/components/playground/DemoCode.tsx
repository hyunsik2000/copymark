import { useMemo } from "react";
import { CopyButton } from "@lyu_danny/copymark";
import { highlightCode } from "../../utils/highlightFont";

type DemoCodeProps = {
  code: string;
  fileName: string;
};

export function DemoCode({ code }: DemoCodeProps) {
  const highlighted = useMemo(() => highlightCode(code), [code]);

  return (
    <div className="mt-6 rounded-2xl border border-black/5 bg-[#1e1e1e] p-4 text-[#d4d4d4]">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-red-500/80" />
          <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
          <span className="h-3 w-3 rounded-full bg-green-500/80" />
        </div>
        <CopyButton
          value={code}
          toast
          unstyled
          className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs text-slate-200 transition active:translate-y-[1px] active:scale-[0.98] hover:bg-white/10"
        >
          Copy
        </CopyButton>
      </div>
      <pre
        className="cm-code w-full rounded-lg bg-[#1e1e1e] p-3 text-sm text-[#d4d4d4]"
        dangerouslySetInnerHTML={{ __html: highlighted }}
      />
    </div>
  );
}
