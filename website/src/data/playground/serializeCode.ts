import type { DemoOptions } from "../../types/playground/options";

export function serializeButtonCode(state: DemoOptions) {
  return `import {
  CopyButton,
  CopymarkToastProvider,
  CopymarkToaster
} from "@lyu_danny/copymark";

<CopymarkToastProvider>
  <CopymarkToaster />
  <CopyButton 
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
</CopyButton>
</CopymarkToastProvider>`;
}

export function serializeTextCode(state: DemoOptions) {
  return `import {
  CopyText,
  CopymarkToastProvider,
  CopymarkToaster
} from "@lyu_danny/copymark";

<CopymarkToastProvider>
  <CopymarkToaster />
  <CopyText 
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
</CopyText>
</CopymarkToastProvider>`;
}
