import { DemoButton } from "./DemoButton";
import { DemoText } from "./DemoText";

export function DemoPlayground() {
  return (
    <section id="demo" className="pb-20">
      <div className="grid gap-6 lg:grid-cols-2">
        <DemoButton />
        <DemoText />
      </div>
    </section>
  );
}
