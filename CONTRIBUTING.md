# Contributing Guide

## 브랜치 전략

### 네이밍 규칙

```
{type}/{area}/{이슈번호}--{kebab-case-설명}
```

**type**

| 값 | 설명 |
|---|---|
| `feature` | 새 기능 |
| `fix` | 버그 수정 |
| `refactor` | 리팩토링 |
| `docs` | 문서 |
| `chore` | 빌드/설정/인프라 |

**area**

| 값 | 대상 |
|---|---|
| `website` | `website/` 데모 사이트 |
| `lib` | `packages/copymark` 라이브러리 |
| `infra` | CI/CD, GitHub Actions, 루트 설정 |
| `docs` | 문서 파일 |

**예시**

```bash
feature/website/5--improve-playground
fix/lib/6--toast-z-index
refactor/website/7--split-demo-components
docs/docs/8--update-readme
chore/infra/9--add-prettier
```

---

## 커밋 메시지 규칙

```
#{이슈번호} {type}: {설명}
```

```bash
#5 feat: add theme selector to playground
#5 fix: correct button alignment on mobile
#5 refactor: split DemoOptions into sub-components
```

---

## 작업 흐름

```
1. GitHub 이슈 생성
2. 이슈 번호로 브랜치 생성
3. 작업 및 커밋
4. QA 검사 (ESLint + Prettier)
5. PR 생성 → main 머지
```

---

## QA 체크리스트 (PR 전 필수)

```bash
# ESLint
npm --workspace website run lint

# Prettier
npm --workspace website run format:check
```

두 검사 모두 통과해야 PR을 올린다.

---

## Tailwind 사용 범위

- `website/` 에서만 Tailwind CSS를 사용한다.
- `packages/copymark` 라이브러리는 순수 CSS (CSS Variables) 를 유지한다.
  npm 사용자에게 Tailwind 의존성이 강제되는 것을 방지하기 위함이다.
