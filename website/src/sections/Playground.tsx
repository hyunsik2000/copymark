import { Container } from "../components/Container";

export function Playground() {
  return (
    <section id="demo" className="playground">
      <Container>
        <div className="section__header">
          <h2>Live Demo</h2>
          <p className="muted">
            옵션을 바꿔가며 Copymark 동작을 확인해보세요.
          </p>
        </div>
        <div className="playground__grid">
          <div className="panel">
            <h3>Controls</h3>
            <div className="placeholder">theme / duration / messages</div>
          </div>
          <div className="panel">
            <h3>Preview</h3>
            <div className="placeholder">CopyButton / CopyText</div>
          </div>
        </div>
      </Container>
    </section>
  );
}
