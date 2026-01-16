import { Container } from "@/components/Container";
import { Hero } from "@/sections/Hero";
import { Playground } from "@/sections/Playground";

export default function App() {
  return (
    <div className="page">
      <header className="nav">
        <Container className="nav__inner">
          <div className="logo">Copymark</div>
          <nav className="nav__links">
            <a href="#demo">Demo</a>
            <a href="#usage">Usage</a>
            <a href="https://www.npmjs.com/package/@lyu_danny/copymark" target="_blank" rel="noreferrer">
              NPM
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer">
              GitHub
            </a>
          </nav>
        </Container>
      </header>

      <main>
        <Hero />
        <Playground />
      </main>
    </div>
  );
}
