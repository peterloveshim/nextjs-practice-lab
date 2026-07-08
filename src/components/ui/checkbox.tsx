"use client";

import * as React from "react";
import { Checkbox as CheckboxPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

/**
 * 체크박스 (Checkbox) — 에어비앤비 디자인 시스템 07
 *
 * 배우는 것:
 * - 인풋(03)의 inset box-shadow 보더 패턴 재사용 → 1px(기본)→2px(에러) 두께
 *   변화에 리플로우 없음. 체크 시엔 배경이 박스를 채우므로 shadow-none.
 * - data-[state=checked|indeterminate|unchecked] 로 세 상태 스타일 분기
 * - Indicator 안에 체크 SVG와 대시 막대를 함께 두고 group-data-state 로 토글
 *   (체크 아이콘은 스펙 path 를 인라인해 픽셀 일치 — lucide 대신 커스텀 SVG)
 * - aria-invalid 로 에러 보더 자동 연결 (인풋/셀렉트와 동일)
 *
 * 스펙: 24×24 · r4 · 기본 1px #C1C1C1 · 체크/중간 bg #222 · 마크 #FFF ·
 *       에러 2px #C2410C · 비활성 bg #F7F7F7 border #EBEBEB
 */
function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "group peer inline-flex size-6 shrink-0 items-center justify-center rounded-[4px] bg-background text-primary-foreground transition-shadow outline-none",
        // 테두리 = inset box-shadow (blur 0 → 실선). 두께가 바뀌어도 리플로우 없음
        "shadow-[inset_0_0_0_1px_var(--border-strong)]", // 기본 1px #C1C1C1
        // 체크/중간: 배경 #222 채움 + 보더 제거
        "data-[state=checked]:bg-foreground data-[state=checked]:shadow-none",
        "data-[state=indeterminate]:bg-foreground data-[state=indeterminate]:shadow-none",
        // 에러: 2px #C2410C
        "aria-invalid:shadow-[inset_0_0_0_2px_var(--destructive)]",
        // 포커스: outline 2px #222 offset 2px (버튼과 동일)
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        // 비활성: bg #F7F7F7 · border #EBEBEB
        "disabled:cursor-not-allowed disabled:bg-surface-soft disabled:shadow-[inset_0_0_0_1px_var(--hairline-soft)]",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
        {/* 체크: 스펙 path 그대로 인라인 (14×14, stroke 2 round) */}
        <svg
          viewBox="0 0 14 14"
          fill="none"
          aria-hidden="true"
          className="hidden size-3.5 group-data-[state=checked]:block"
        >
          <path
            d="M2.5 7.5L5.5 10.5 11.5 3.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {/* 중간(indeterminate): 12×2 흰 막대 */}
        <span className="hidden h-0.5 w-3 rounded-[1px] bg-current group-data-[state=indeterminate]:block" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
