import type { DemoOptions } from "../../types/playground/options";

export function serializeButtonCode(state: DemoOptions) {
  const toastProp = state.toastEnabled ? `\n  toast` : `\n  toast="off"`;
  return `import { CopyButton } from "@lyu_danny/copymark";
import "@lyu_danny/copymark/styles.css";

<CopyButton
  value="${state.value}"${toastProp}
  theme="${state.theme}"
  duration={${state.duration}}
  messages={{
    successTitle: "${state.messages.successTitle}",
    successDescription: "${state.messages.successDescription}",
    errorTitle: "${state.messages.errorTitle}",
    errorDescription: "${state.messages.errorDescription}",
  }}
>
  ${state.label}
</CopyButton>`;
}

export function serializeTextCode(state: DemoOptions) {
  const toastProp = state.toastEnabled ? `\n  toast` : `\n  toast="off"`;
  return `import { CopyText } from "@lyu_danny/copymark";
import "@lyu_danny/copymark/styles.css";

<CopyText
  value="${state.value}"${toastProp}
  theme="${state.theme}"
  duration={${state.duration}}
  messages={{
    successTitle: "${state.messages.successTitle}",
    successDescription: "${state.messages.successDescription}",
    errorTitle: "${state.messages.errorTitle}",
    errorDescription: "${state.messages.errorDescription}",
  }}
>
  ${state.label}
</CopyText>`;
}
