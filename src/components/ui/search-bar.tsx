"use client";

import * as React from "react";
import { Search } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * 검색바 (Search Bar, 시그니처) — 에어비앤비 디자인 시스템 29
 *
 * 에어비앤비의 상징인 알약(pill) 검색바. 여러 세그먼트를 헤어라인으로 나누고
 * 오른쪽에 원형(orb) 검색 버튼을 둔다.
 *
 * 배우는 것:
 * - flex 비율(flex-[1.2] vs flex-1)로 세그먼트 폭을 배분하고, 1×32 헤어라인
 *   구분선을 사이에 끼워 넣는다.
 * - 세그먼트 자체가 클릭 대상(button)이라 hover/focus 시 surface-soft 배경이
 *   알약 안쪽에서 부드럽게 뜬다. 활성 세그먼트를 상태로 추적한다.
 * - 활성 세그먼트에 "인접한" 구분선은 숨긴다(에어비앤비 동작). 구분선은 제거하지
 *   않고 투명 처리해 폭(w-px)을 유지 → 세그먼트가 좌우로 밀리지 않는다.
 * - 세 세그먼트는 동일한 버튼이라 flex 로 "균등 너비"가 된다. 검색 오브는
 *   컨테이너 기준 절대배치라 flex 분배에서 빠지고, 마지막 셀 오른쪽 위에 겹쳐
 *   놓인다 → 마지막 셀 hover 배경이 오브 영역까지 확장돼 보인다(버튼 중첩 아님).
 * - r-full 컨테이너는 border 1px(#DDD) + 부드러운 3티어 그림자로 떠 있는 느낌.
 *
 * 스펙: h64 · r-full · border #DDD + 그림자 · 세그먼트 pad 8×24
 *       (라벨 caption 14/500 · 플레이스홀더 body-sm #6A6A6A) · 구분선 1×32 #DDD ·
 *       검색 오브 48 #3D5AF0 우측 8px 여백
 */
type Segment = {
  /** 세그먼트 키 (활성 추적용) */
  id: string;
  /** 상단 라벨 (예: 여행지) */
  label: string;
  /** 하단 값/플레이스홀더 (예: 여행지 검색) */
  value: string;
  /** flex 비율 (기본 1) */
  grow?: number;
};

const DEFAULT_SEGMENTS: Segment[] = [
  { id: "where", label: "여행지", value: "여행지 검색" },
  { id: "checkin", label: "체크인", value: "날짜 추가" },
  { id: "who", label: "여행자", value: "게스트 추가" },
];

function SearchBar({
  className,
  segments = DEFAULT_SEGMENTS,
  onSearch,
  ...props
}: Omit<React.ComponentProps<"div">, "onSelect"> & {
  segments?: Segment[];
  onSearch?: () => void;
}) {
  const [active, setActive] = React.useState<string | null>(null);
  const activeIndex = active ? segments.findIndex((s) => s.id === active) : -1;

  const lastId = segments[segments.length - 1]?.id;

  return (
    <div
      data-slot="search-bar"
      className={cn(
        "relative flex h-16 w-full max-w-[720px] items-center rounded-full border border-border bg-background pr-2",
        "shadow-[0_0_0_1px_rgba(0,0,0,0.02),0_2px_6px_0_rgba(0,0,0,0.04),0_4px_8px_0_rgba(0,0,0,0.1)]",
        className,
      )}
      {...props}
    >
      {segments.map((seg, i) => {
        // i 번째 세그먼트 "앞"의 구분선은 세그먼트 (i-1)와 i 사이에 있다.
        // 활성 세그먼트가 그 둘 중 하나면 숨긴다(투명 처리로 폭은 유지).
        const dividerHidden = activeIndex === i || activeIndex === i - 1;

        return (
          <React.Fragment key={seg.id}>
            {i > 0 && (
              <span
                aria-hidden="true"
                className={cn(
                  "h-8 w-px shrink-0 transition-colors",
                  dividerHidden ? "bg-transparent" : "bg-border",
                )}
              />
            )}
            <button
              type="button"
              data-active={active === seg.id ? "" : undefined}
              onMouseEnter={() => setActive(seg.id)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(seg.id)}
              onBlur={() => setActive(null)}
              onClick={() => setActive(seg.id)}
              style={{ flex: seg.grow ?? 1 }}
              className={cn(
                // 세 세그먼트 모두 동일한 버튼 + 동일 패딩(px-6) = flex 로 정확히
                // 균등 분배된다(각 셀 너비 = 패딩 + 균등분배분이라 패딩이 같아야 함).
                // 마지막 셀 오른쪽 위에 오브가 겹치지만, 값 텍스트가 짧아 겹치지 않는다.
                "flex min-w-0 flex-col items-start justify-center self-stretch rounded-full px-6 py-2 text-left transition-colors outline-none",
                "hover:bg-surface-soft data-active:bg-surface-soft",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
              )}
            >
              <span className="w-full truncate text-caption text-foreground">
                {seg.label}
              </span>
              <span className="w-full truncate text-body-sm text-muted-foreground">
                {seg.value}
              </span>
            </button>
          </React.Fragment>
        );
      })}

      {/*
        검색 오브: 컨테이너 기준 절대배치라 세그먼트 flex 분배에서 빠진다
        → 세 세그먼트 너비가 정확히 균등해진다. 마지막 셀의 오른쪽 위에 겹쳐
        놓이므로, 마지막 셀 hover 배경이 오브 영역까지 확장돼 보인다.
        오브 위에서도 highlight 가 유지되도록 hover 시 마지막 셀을 활성화한다.
      */}
      <button
        type="button"
        aria-label="검색"
        onClick={onSearch}
        onMouseEnter={() => setActive(lastId)}
        onMouseLeave={() => setActive(null)}
        className={cn(
          "absolute top-1/2 right-2 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors outline-none",
          "hover:bg-primary-active",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        )}
      >
        <Search className="size-4" strokeWidth={2.2} />
      </button>
    </div>
  );
}

export { SearchBar };
