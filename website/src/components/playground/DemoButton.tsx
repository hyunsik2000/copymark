import { useMemo, useState } from "react";
import { CopyButton } from "@lyu_danny/copymark";
import type { DemoOptions } from "../../types/playground/options";
import { defaultButtonOptions } from "../../types/playground/options";
import { DemoPanel } from "./DemoPanel";
import { serializeButtonCode } from "../../data/playground/serializeCode";

export function DemoButton() {
  const [state, setState] = useState<DemoOptions>(defaultButtonOptions);
  const code = useMemo(() => serializeButtonCode(state), [state]);

  return (
    <DemoPanel
      title="CopyButton"
      fileName="CopyButton.tsx"
      state={state}
      setState={setState}
      code={code}
      preview={
        <CopyButton
          value={state.value}
          toast={state.toastEnabled}
          theme={state.theme}
          duration={state.duration}
          messages={state.messages}
        >
          {state.label}
        </CopyButton>
      }
    />
  );
}
