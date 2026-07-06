# 에어비앤비 디자인 시스템 — 진행 상황

> **다른 컴퓨터에서 이어서 작업하기 위한 인수인계 문서.**
> 저장소를 clone 한 뒤 이 파일 + `CLAUDE.md` 를 읽으면 어디까지 했고 다음에
> 무엇을 할지 바로 파악할 수 있다. (최종 갱신: 2026-07-06)

## 목표

`docs/component_design.html`(에어비앤비 UI 를 번들한 참고 문서)에서 **전역
토큰**(컬러/타이포/스페이싱/라디우스)과 **31개 컴포넌트**를 추출해
**shadcn + Tailwind CSS v4 + TypeScript** 로 재현한다. 학습용 연습장이므로
완벽함보다 개념이 드러나는 명료함을 우선한다.

## 작업 방식 (중요)

- **파일 생성·코딩은 사용자가 직접 한다.** 나(Claude)는 붙여넣을 코드와
  설명을 제공하고, **한 번에 컴포넌트 하나씩** 단계적으로 진행한다.
  - 예외: 도구/환경 설정(Prettier 등)은 내가 직접 수행해도 된다고 합의됨.
- 다크 모드: 토큰 구조는 지금 넣되 **컬러 값은 라이트와 동일**하게 두고
  나중에 다크 팔레트를 채운다. (`.dark` 블록이 이미 라이트값으로 미러됨)
- 스타일은 **유틸리티 클래스로 최대한 선언**하고 컴포넌트에서 그 클래스를
  사용한다.

## 참고 문서 (docs/)

- `component_design.html` — 컴포넌트별 스펙 원본 (대용량 번들, 5.3MB)
- `wireframe.html` — 화면 와이어프레임
- `tailwind-theme-notes.html` — 테마 메모

## 토큰 아키텍처 (`src/app/globals.css`)

Tailwind v4 `@theme inline` 방식. `:root`/`.dark` 에 raw 값을 넣고
`@theme inline` 에서 `--color-*`, `--text-*`, `--radius-*`, `--shadow-*` 로
매핑 → 다크 대응 유틸리티(`bg-*`, `text-*`, `rounded-*`)가 자동 생성된다.

**컬러 (shadcn 시맨틱)**: background `#fff` · foreground/ink `#222` ·
primary `#3d5af0` · secondary/muted `#f7f7f7` · accent `#f2f2f2` ·
destructive `#c2410c` · border/input `#ddd` · ring `#222`

**컬러 (에어비앤비 전용)**: primary-active `#2a41d4` · primary-disabled
`#cbd3fc` · legal-link `#428bff` · luxe `#460479` · plus `#92174d` ·
body `#3f3f3f` · muted-soft `#929292` · surface-soft `#f7f7f7` ·
surface-strong `#f2f2f2` · hairline `#ddd` · hairline-soft `#ebebeb` ·
border-strong `#c1c1c1`

**라디우스**: `--radius-sm` 8px(버튼·인풋) · `--radius-md` 14px(카드) ·
`--radius-lg` 20px · `rounded-full` 내장

**엘리베이션**: `--shadow-card 0 6px 20px rgba(0,0,0,.12)` (값 추정, 조정 가능)

**타이포 (`text-*`)**: rating-display 64/700 · display-xl 28/700 ·
display-lg 22/500 · display-md 21/700 · display-sm 20/600 · title-md 16/600 ·
title-sm 16/500 · body-md 16/400 · body-sm 14/400 · caption 14/500 ·
caption-sm 13/400 · badge 11/600 · **tag** 8/700(`uppercase` 는 내장
유틸리티와 조합해서 씀 — `class="text-tag uppercase"`)

## 확립된 패턴 (컴포넌트 재사용)

1. **cva 변형 API** — `variant × size` 를 class-variance-authority 로 정의,
   `defaultVariants` 지정. (button, icon-button)
2. **inset box-shadow 무리플로우 보더** — `shadow-[inset_0_0_0_Npx_var(--token)]`
   (blur=0 → 실선). 두께가 1px→2px 로 바뀌어도 레이아웃이 안 밀린다.
   border-width 를 바꾸는 대신 이 방식을 쓴다. (input, textarea, → select)
3. **접근성 자동 배선** — `useId` + `cloneElement` 로 id/htmlFor/
   aria-describedby/aria-invalid 를 Field 가 자식 컨트롤에 주입. `error`
   하나로 헬퍼 색과 인풋 보더(aria-invalid)를 동시 제어. (`useId` 는
   클라이언트 훅이라 `"use client"` 필요)
4. **필수 aria** — icon-button 은 타입에서 `aria-label` 을 필수로 강제.

## 컴포넌트 로드맵 (31개)

| # | 컴포넌트 | 상태 | 파일 |
| --- | --- | --- | --- |
| 01 | 버튼 | ✅ | `components/ui/button.tsx` |
| 02 | 아이콘 버튼 | ✅ | `components/ui/icon-button.tsx` |
| 03 | 인풋 | ✅ | `components/ui/input.tsx` |
| 04 | 폼 필드 | ✅ | `components/ui/field.tsx` |
| 05 | 텍스트에어리어 | ✅ | `components/ui/textarea.tsx` |
| 06 | **셀렉트** | ⏭️ **다음** | (예정) |
| 07 | 체크박스 | ⬜ | |
| 08 | 라디오 | ⬜ | |
| 09 | 스위치 | ⬜ | |
| 10 | 슬라이더 | ⬜ | |
| 11 | 스텝퍼 | ⬜ | |
| 12 | 배지 | ⬜ | |
| 13 | 아바타 | ⬜ | |
| 14 | 카드 | ⬜ | |
| 15 | 알럿 | ⬜ | |
| 16 | 토스트 | ⬜ | |
| 17 | 다이얼로그 | ⬜ | |
| 18 | 드롭다운 메뉴 | ⬜ | |
| 19 | 툴팁 | ⬜ | |
| 20 | 탭 | ⬜ | |
| 21 | 아코디언 | ⬜ | |
| 22 | 브레드크럼 | ⬜ | |
| 23 | 페이지네이션 | ⬜ | |
| 24 | 테이블 | ⬜ | |
| 25 | 스켈레톤 | ⬜ | |
| 26 | 법적 고지 라인 | ⬜ | |
| 27 | 세퍼레이터 | ⬜ | |
| 28 | 데이트 피커 | ⬜ | |
| 29 | 검색바 | ⬜ | |
| 30 | 리뷰 | ⬜ | |
| 31 | 푸터 | ⬜ | |

## 다음 작업 — 06 셀렉트 (Select)

`component_design.html` 의 셀렉트 스펙:

- **트리거**: 인풋과 동일 스펙(h-14, `rounded-sm`, inset box-shadow 보더,
  focus/error 상태 동일). 우측에 셰브론 아이콘 12px.
- **열린 메뉴**: `rounded-md`(14px), 세로 패딩 8px.
- **아이템**: 패딩 12×16, `text-body-sm`. hover 배경 `#f7f7f7`(surface-soft).
- **선택된 아이템**: 체크 표시 + font-weight 500.
- **비활성**: 텍스트 `#929292`(muted-soft).
- radix-ui 의 Select 프리미티브 기반으로, input/textarea 의 inset
  box-shadow 무리플로우 보더 패턴을 재사용한다.

## 도구/환경 설정 (완료)

- **Prettier** 세팅 완료: `.prettierrc.json`
  (`prettier-plugin-tailwindcss` + `tailwindStylesheet` +
  `tailwindFunctions: ["cn","cva"]`), `.prettierignore`(docs/ 등 제외),
  `package.json` 스크립트 `format` / `format:check`,
  `eslint.config.mjs` 에 `eslint-config-prettier/flat` 연결.
  - 클래스 정렬은 `className` 과 `cn()`/`cva()` 안에서 모두 동작 확인됨.
  - 전체 정규화가 필요하면 `pnpm format` 실행 (세미콜론 추가 + 클래스 정렬).

## 이어서 하는 법

1. 저장소 clone 후 `pnpm install`.
2. 이 문서 + `CLAUDE.md` 를 읽어 진행 지점 확인.
3. 로드맵의 "다음"(현재 06 셀렉트)부터, 위 "작업 방식"대로
   **한 컴포넌트씩** 진행한다. (사용자가 코드를 붙여넣음)
4. 컴포넌트를 끝낼 때마다 이 문서의 로드맵 표 상태(⬜→✅)와 "다음 작업"
   섹션을 갱신하고 커밋한다.
