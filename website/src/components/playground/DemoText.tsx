import { useMemo, useState } from "react";
import { CopyText } from "@lyu_danny/copymark";
import type { DemoOptions } from "../../types/playground/options";
import { defaultTextOptions } from "../../types/playground/options";
import { DemoPanel } from "./DemoPanel";
import { serializeTextCode } from "../../data/playground/serializeCode";

export function DemoText() {
  const [state, setState] = useState<DemoOptions>(defaultTextOptions);
  const code = useMemo(() => serializeTextCode(state), [state]);

  return (
    <DemoPanel
      title="CopyText"
      fileName="CopyText.tsx"
      state={state}
      setState={setState}
      code={code}
      preview={
        <CopyText
          value={state.value}
          toast={state.toastEnabled}
          theme={state.theme}
          duration={state.duration}
          messages={state.messages}
        >
          {state.label}
        </CopyText>
      }
    />
  );
}
