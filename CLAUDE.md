# Next.js Practice Lab

## 프로젝트 목적

**React · TypeScript · Next.js · shadcn/ui · Tailwind CSS** 의 실전 사용법에
숙련되기 위한 **학습용 예제 모음** 프로젝트입니다. 각 예제는 하나의 개념을
작고 독립적으로 보여 주며, 홈 화면(`/`)의 갤러리에서 모든 예제를 둘러볼 수
있습니다.

이 저장소는 배포용 제품이 아니라 **연습장**입니다. 완벽함보다 개념이 잘
드러나는 명료함을 우선합니다.

## 기술 스택

| 영역          | 사용 기술                                   |
| ------------- | ------------------------------------------- |
| 프레임워크    | Next.js 16 (App Router, Turbopack)          |
| 언어          | TypeScript (strict)                         |
| UI 컴포넌트   | shadcn/ui (radix 기반, `src/components/ui`) |
| 스타일링      | Tailwind CSS v4 (CSS 변수 테마)             |
| 아이콘        | lucide-react                                |
| 토스트        | sonner                                      |
| 패키지 매니저 | pnpm                                        |

## 디렉터리 구조 (feature-based)

`app/` 은 **라우팅만** 담당하고, 실제 코드는 **기능(feature)별 폴더**에 모은다.
예제 한 개 = feature 폴더 한 개.

```
src/
├─ app/                                # 라우팅 레이어 (얇게 유지)
│  ├─ layout.tsx                       # 루트 레이아웃 (폰트, Toaster)
│  ├─ page.tsx                         # <ExampleGallery /> 렌더만
│  └─ examples/
│     └─ <slug>/page.tsx               # feature 컴포넌트 렌더만
│
├─ features/                           # 기능(도메인)별 모듈 — 개발의 중심
│  ├─ gallery/                         # 홈 예제 갤러리 기능
│  │  ├─ components/example-gallery.tsx
│  │  ├─ example-registry.ts           # 예제 레지스트리 (갤러리의 데이터 소스)
│  │  └─ index.ts                      # public API 배럴
│  └─ <slug>/                          # 예제 한 개 = feature 한 개
│     ├─ components/<slug>-card.tsx
│     └─ index.ts                      # public API 배럴
│
├─ components/ui/                      # shadcn 컴포넌트 (직접 수정 가능)
└─ lib/
   └─ utils.ts                         # cn() 클래스 병합 헬퍼
```

## 새 예제 추가하는 법

1. `src/features/<slug>/` 를 만든다.
   - `components/<slug>-card.tsx` 에 실제 컴포넌트(마크업·상태·로직)를 작성.
   - `index.ts` 에서 `export { <Name> } from "./components/<slug>-card"` 로 노출.
2. `src/app/examples/<slug>/page.tsx` 를 얇은 라우트로 만든다.
   feature 컴포넌트를 `@/features/<slug>` 에서 import 해서 렌더만 한다.
3. `src/features/gallery/example-registry.ts` 의 `examples` 배열에
   `{ slug, title, description, topics }` 항목을 추가한다.
   → 홈 갤러리에 카드가 자동으로 나타난다.
4. 상태/이벤트/브라우저 API 를 쓰면 feature 컴포넌트 파일 맨 위에
   `"use client"` 를 붙인다. 그렇지 않으면 기본은 서버 컴포넌트다.

## 자주 쓰는 명령어

```bash
pnpm dev            # 개발 서버 (http://localhost:3000)
pnpm build          # 프로덕션 빌드 (타입 체크 포함)
pnpm lint           # ESLint
pnpm exec tsc --noEmit   # 타입 체크만

# shadcn 컴포넌트 추가
pnpm dlx shadcn@latest add <component>
```

## 규칙 / 컨벤션

- **예제는 자기완결적으로.** 한 예제 = feature 폴더 하나. 한 개념에 집중하고,
  무엇을 배우는지 컴포넌트 파일 상단 주석(JSDoc)에 "배우는 것" 목록으로 적는다.
- **`app/` 은 라우팅만.** route `page.tsx` 는 feature 컴포넌트를 렌더만 한다.
  마크업·상태·로직은 `features/` 쪽에 둔다.
- **feature는 `index.ts` 배럴로만 노출.** 외부(app, 다른 feature)는
  `@/features/<name>` 에서 import 한다. feature 내부 파일끼리는 상대경로.
- **공유 자산은 이동하지 않는다.** shadcn 은 `@/components/ui/*`, `cn()` 은
  `@/lib/utils`. (shadcn CLI 설정 `components.json` 과 호환 유지)
- **서버 컴포넌트가 기본.** 상호작용이 필요할 때만 `"use client"`.
- **타입을 먼저.** `any` 지양, props/상태에 명시적 타입.
- **스타일은 Tailwind 유틸리티로.** 클래스 조합은 `cn()` 을 사용한다.
- **UI 는 shadcn 우선.** `src/components/ui` 의 컴포넌트는 우리 소유이므로
  필요하면 자유롭게 열어서 수정한다.

## 환경 메모

- pnpm 이 네이티브 의존성(`sharp`, `unrs-resolver`) 빌드를 승인하도록
  `pnpm-workspace.yaml` 의 `onlyBuiltDependencies` 와 `allowBuilds` 에 등록되어
  있다.
  - **주의**: pnpm 이 `allowBuilds` 블록을 플레이스홀더 문자열
    (`sharp: set this to true or false`)로 다시 넣을 수 있다. 이 상태면
    `ERR_PNPM_IGNORED_BUILDS` 가 나고 Next 16 preflight 가 이를 하드 에러로
    취급해 `pnpm build` / `pnpm dev` 가 막힌다(`onlyBuiltDependencies` 만으로는
    안 풀림 — `.modules.yaml` 의 `ignoredBuilds` 캐시 때문). 이럴 땐 값을
    `true` 로 고치고 `pnpm install` 을 한 번 돌려 빌드 스크립트를 실행시킨다:
    ```yaml
    allowBuilds:
      sharp: true
      unrs-resolver: true
    ```
- `@/lib/utils` 의 `cn()` 은 shadcn 컴포넌트가 의존하므로 지우지 말 것.

## 현재 상태 (2026-07-06 기준)

feature-based 스캐폴딩 위에서 **에어비앤비 디자인 시스템**을 구축 중이다.
`docs/component_design.html` 에서 전역 토큰과 31개 컴포넌트를 shadcn +
Tailwind v4 + TS 로 재현한다.

> 📋 **상세 진행 상황·로드맵·다음 작업은 [`docs/design-system-progress.md`](docs/design-system-progress.md)
> 참고.** (다른 컴퓨터에서 clone 해 이어서 작업하기 위한 인수인계 문서.)

**완료된 것**

- Next.js 16 + TS + Tailwind v4 + shadcn(radix) 스캐폴딩, feature-based 구조
  (`app/`=라우팅, `src/features/*`=코드, `index.ts` 배럴)
- 예제 01 `counter` (`features/counter`)
- **디자인 토큰** (`src/app/globals.css`): 컬러/타이포/라디우스/섀도를
  `@theme inline` 로 정의. 다크는 구조만(라이트값 미러).
- **컴포넌트 01~05 완료**: 버튼, 아이콘 버튼, 인풋, 폼 필드, 텍스트에어리어
  (`src/components/ui/*`). cva 변형 · inset box-shadow 무리플로우 보더 ·
  `useId`+`cloneElement` 접근성 자동 배선 패턴 확립.
- **Prettier 세팅 완료** (`.prettierrc.json`, `.prettierignore`,
  format 스크립트, eslint-config-prettier 연결). `pnpm format` 로 정규화.

**다음 할 일**

- [ ] **06 셀렉트** (다음 차례) — 스펙은 진행 문서 참고.
- [ ] 07~31 나머지 컴포넌트 (로드맵은 진행 문서 표 참고)

> 새 세션/새 컴퓨터에서 이어서 하려면: 저장소를 clone → `pnpm install` →
> 이 `CLAUDE.md` 와 `docs/design-system-progress.md` 를 읽고 로드맵의
> "다음"부터 **한 컴포넌트씩** 진행한다. (파일 생성·코딩은 사용자가 직접,
> Claude 는 붙여넣을 코드·설명 제공)
