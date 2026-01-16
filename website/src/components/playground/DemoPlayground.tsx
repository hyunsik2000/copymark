import { CopymarkToastProvider, CopymarkToaster } from "@lyu_danny/copymark";
import { DemoButton } from "./DemoButton";
import { DemoText } from "./DemoText";

export function DemoPlayground() {

  return (
    <section id="demo" className="pb-20">
      <CopymarkToastProvider>
        <CopymarkToaster />
        <div className="grid gap-6 lg:grid-cols-2">
          <DemoButton />
          <DemoText />
        </div>
      </CopymarkToastProvider>
    </section>
  );
}
