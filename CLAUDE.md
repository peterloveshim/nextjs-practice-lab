# Next.js Practice Lab

## 프로젝트 목적

**React · TypeScript · Next.js · shadcn/ui · Tailwind CSS** 의 실전 사용법에
숙련되기 위한 **학습용 예제 모음** 프로젝트입니다. 각 예제는 하나의 개념을
작고 독립적으로 보여 주며, 홈 화면(`/`)의 갤러리에서 모든 예제를 둘러볼 수
있습니다.

이 저장소는 배포용 제품이 아니라 **연습장**입니다. 완벽함보다 개념이 잘
드러나는 명료함을 우선합니다.

## 기술 스택

| 영역        | 사용 기술                                    |
| ----------- | -------------------------------------------- |
| 프레임워크  | Next.js 16 (App Router, Turbopack)           |
| 언어        | TypeScript (strict)                          |
| UI 컴포넌트 | shadcn/ui (radix 기반, `src/components/ui`)   |
| 스타일링    | Tailwind CSS v4 (CSS 변수 테마)              |
| 아이콘      | lucide-react                                 |
| 토스트      | sonner                                       |
| 패키지 매니저 | pnpm                                       |

## 디렉터리 구조

```
src/
├─ app/
│  ├─ layout.tsx            # 루트 레이아웃 (폰트, Toaster)
│  ├─ page.tsx              # 홈: 예제 갤러리 (examples 레지스트리 기반)
│  └─ examples/
│     └─ <slug>/page.tsx    # 예제 한 개 = 폴더 한 개
├─ components/ui/           # shadcn 컴포넌트 (직접 수정 가능)
└─ lib/
   ├─ examples.ts           # 예제 레지스트리 (홈 갤러리의 데이터 소스)
   └─ utils.ts              # cn() 클래스 병합 헬퍼
```

## 새 예제 추가하는 법

1. `src/app/examples/<slug>/page.tsx` 를 만든다.
2. `src/lib/examples.ts` 의 `examples` 배열에 `{ slug, title, description, topics }`
   항목을 추가한다. → 홈 갤러리에 카드가 자동으로 나타난다.
3. 상태/이벤트/브라우저 API 를 쓰면 파일 맨 위에 `"use client"` 를 붙인다.
   그렇지 않으면 기본은 서버 컴포넌트다.

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

- **예제는 자기완결적으로.** 한 예제가 한 개념에 집중하고, 무엇을 배우는지
  파일 상단 주석(JSDoc)에 "배우는 것" 목록으로 적는다.
- **서버 컴포넌트가 기본.** 상호작용이 필요할 때만 `"use client"`.
- **타입을 먼저.** `any` 지양, props/상태에 명시적 타입.
- **스타일은 Tailwind 유틸리티로.** 클래스 조합은 `cn()` 을 사용한다.
- **UI 는 shadcn 우선.** `src/components/ui` 의 컴포넌트는 우리 소유이므로
  필요하면 자유롭게 열어서 수정한다.

## 환경 메모

- pnpm 이 네이티브 의존성(`sharp`, `unrs-resolver`) 빌드를 승인하도록
  `pnpm-workspace.yaml` 의 `onlyBuiltDependencies` 에 등록되어 있다.
  (pnpm 이 `allowBuilds` 플레이스홀더 블록을 다시 넣을 수 있으나 무해하다.)
- `@/lib/utils` 의 `cn()` 은 shadcn 컴포넌트가 의존하므로 지우지 말 것.

## 현재 상태 (2026-07-03 기준)

프로젝트 초기 세팅과 첫 예제까지 완료된 상태다.

**완료된 것**
- Next.js 16 + TS + Tailwind v4 + shadcn(radix) 스캐폴딩
- shadcn 컴포넌트 설치: button, card, input, label, badge, tabs, dialog, sonner
- 홈 갤러리(`/`) + 예제 레지스트리(`src/lib/examples.ts`)
- 예제 01 `counter` — `useState` + shadcn + 토스트
- `pnpm build` / `tsc --noEmit` 통과 확인

**다음 할 일 (예제 후보)**
- [ ] 02 폼: `react-hook-form` + `zod` + shadcn Input/Label (설치 필요:
      `pnpm add react-hook-form zod @hookform/resolvers`, 그리고
      `pnpm dlx shadcn@latest add form`)
- [ ] 03 서버 컴포넌트 데이터 페칭: `async` 서버 컴포넌트 + `fetch` 캐싱
- [ ] 04 다크 모드 토글: `next-themes`(이미 설치됨) + Tabs/Button
- [ ] 05 Dialog / 모달 상호작용 패턴

> 새 세션에서 이어서 하려면: 이 폴더에서 세션을 열면 이 `CLAUDE.md` 가
> 자동으로 로드된다. 위 "다음 할 일" 중 하나를 골라 "새 예제 추가하는 법"
> 절차대로 진행하면 된다.
