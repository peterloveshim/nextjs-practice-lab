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
 * - 세그먼트 자체가 클릭 대상(button)이라 hover 시 surface-soft 배경이 알약
 *   안쪽에서 부드럽게 뜬다. 어떤 세그먼트가 활성인지 최소 상태로 추적한다.
 * - 오브(검색 버튼)는 세그먼트와 형제 요소로 두어 버튼 중첩(invalid HTML)을 피한다.
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
  { id: "where", label: "여행지", value: "여행지 검색", grow: 1.2 },
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

  return (
    <div
      data-slot="search-bar"
      className={cn(
        "flex h-16 w-full max-w-[720px] items-center rounded-full border border-border bg-background pr-2",
        "shadow-[0_0_0_1px_rgba(0,0,0,0.02),0_2px_6px_0_rgba(0,0,0,0.04),0_4px_8px_0_rgba(0,0,0,0.1)]",
        className,
      )}
      {...props}
    >
      {segments.map((seg, i) => (
        <React.Fragment key={seg.id}>
          {i > 0 && (
            <span aria-hidden="true" className="h-8 w-px shrink-0 bg-border" />
          )}
          <button
            type="button"
            data-active={active === seg.id ? "" : undefined}
            onFocus={() => setActive(seg.id)}
            onBlur={() => setActive(null)}
            onClick={() => setActive(seg.id)}
            style={{ flex: seg.grow ?? 1 }}
            className={cn(
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
      ))}
      <button
        type="button"
        aria-label="검색"
        onClick={onSearch}
        className={cn(
          "flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors outline-none",
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
