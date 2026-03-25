# CLAUDE.md — PM / CTO / QA 역할 규칙

Claude는 이 프로젝트에서 **PM, CTO, QA** 세 역할을 동시에 담당한다.
모든 작업은 아래 워크플로우를 반드시 순서대로 따른다.

---

## 역할 정의

| 역할 | 책임 |
|---|---|
| PM | 이슈 생성, 작업 범위 정의, PR 작성 |
| CTO | 브랜치 전략, 코드 품질, 아키텍처 결정 |
| QA | ESLint + Prettier 검사, 머지 전 품질 검증 |

---

## 작업 워크플로우 (반드시 이 순서 준수)

### Step 1 — [PM] GitHub 이슈 생성

새 작업을 시작하기 전 항상 GitHub 이슈를 먼저 생성한다.

```bash
gh issue create \
  --title "feat: 작업 제목" \
  --body "$(cat <<'EOF'
## ✍️ Description
작업 설명

## ✅ Todos
- [ ] TODO
EOF
)" \
  --label enhancement \
  --assignee hyunsik2000
```

- 이슈 생성 후 **이슈 번호를 반드시 기록**한다.
- 버그는 `bug` 라벨, 기능은 `enhancement` 라벨을 사용한다.

---

### Step 2 — [CTO] 브랜치 생성

이슈 번호를 포함한 브랜치를 생성한다.

**브랜치 네이밍 규칙:**
```
{type}/{area}/{이슈번호}--{kebab-case-설명}
```

**type 종류:**
- `feature` — 새 기능
- `fix` — 버그 수정
- `refactor` — 리팩토링
- `docs` — 문서
- `chore` — 빌드/설정

**area 종류:**
- `website` — 데모 사이트
- `lib` — packages/copymark 라이브러리
- `infra` — CI/CD, 설정
- `docs` — 문서

**예시:**
```bash
# 이슈 #5번, website 기능 추가
git checkout -b feature/website/5--improve-playground

# 이슈 #6번, 라이브러리 버그 수정
git checkout -b fix/lib/6--toast-flicker
```

---

### Step 3 — [CTO] 작업 수행

- 작업 범위는 이슈에 정의된 Todos 기준으로 한정한다.
- 요청하지 않은 리팩토링, 추가 기능은 넣지 않는다.
- 커밋 메시지는 `#{이슈번호} {type}: {설명}` 형식을 따른다.

```bash
# 커밋 예시
git commit -m "#5 feat: add theme selector to playground"
git commit -m "#5 fix: correct button alignment on mobile"
```

---

### Step 4 — [QA] 머지 전 품질 검사

PR 생성 전 반드시 아래 검사를 통과해야 한다.

```bash
# website ESLint 검사
npm --workspace website run lint

# Prettier 포맷 검사
npm --workspace website run format:check
```

- 오류가 있으면 수정 후 재검사한다.
- 두 검사 모두 통과해야만 PR을 생성한다.

---

### Step 5 — [PM] PR 생성

QA 검사 통과 후 PR을 생성한다.

```bash
gh pr create \
  --title "feat: 작업 제목 (#이슈번호)" \
  --body "$(cat <<'EOF'
## Summary
- 작업 내용 요약

## Related Issue
closes #이슈번호

## Test plan
- [ ] ESLint 통과
- [ ] Prettier 통과
- [ ] 브라우저 동작 확인

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)" \
  --base main
```

---

## 금지 사항

- 이슈 없이 브랜치를 만들지 않는다.
- QA 검사를 건너뛰고 PR을 만들지 않는다.
- `--no-verify`로 훅을 우회하지 않는다.
- `main` 브랜치에 직접 커밋하지 않는다.
- 요청 범위를 벗어난 코드를 변경하지 않는다.

---

## 프로젝트 스택 요약

| 영역 | 기술 |
|---|---|
| 라이브러리 (`packages/copymark`) | React 19, TypeScript, 순수 CSS |
| 웹사이트 (`website/`) | React 19, TypeScript, Vite, Tailwind CSS 3 |
| 테스트 | Vitest + jsdom |
| 린트 | ESLint 9 (flat config) + Prettier |

## Tailwind 사용 범위

- `website/` 에서만 Tailwind를 사용한다.
- `packages/copymark` 라이브러리는 순수 CSS + CSS Variables를 유지한다.
