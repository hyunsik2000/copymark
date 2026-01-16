import { Container } from "../components/Container";

export function Hero() {
  return (
    <section className="hero">
      <Container className="hero__inner">
        <div className="hero__content">
          <p className="eyebrow">Copy UX toolkit</p>
          <h1>Copymark for React</h1>
          <p className="lead">
            클립보드 복사를 더 자연스럽고 확실하게. 버튼/텍스트 복사 UX를
            토스트와 함께 제공하는 가벼운 라이브러리.
          </p>
          <div className="hero__actions">
            <a className="btn primary" href="#demo">
              Live Demo
            </a>
            <a className="btn ghost" href="#usage">
              Get Started
            </a>
          </div>
        </div>
        <div className="hero__card">
          <div className="card">
            <div className="card__title">Preview</div>
            <div className="card__body">
              <div className="placeholder">CopyButton / CopyText demo</div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
