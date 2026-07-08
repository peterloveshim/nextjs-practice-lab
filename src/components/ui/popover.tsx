"use client";

import * as React from "react";
import { Popover as PopoverPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

/**
 * 팝오버 (Popover) — 에어비앤비 디자인 시스템
 *
 * radix-ui Popover 프리미티브 위에 우리 토큰을 입힌 얇은 래퍼.
 * 데이트 피커(28) 등 "트리거를 눌러 떠오르는 패널"의 공통 컨테이너다.
 *
 * 배우는 것:
 * - Portal + Popper 로 앵커(트리거) 기준 위치 계산
 * - 컨텐츠 테두리는 셀렉트(06)와 동일하게 inset box-shadow 헤어라인
 * - tw-animate-css 로 열림/닫힘 페이드·줌 트랜지션
 */
function Popover(props: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />;
}

function PopoverTrigger(
  props: React.ComponentProps<typeof PopoverPrimitive.Trigger>,
) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />;
}

function PopoverAnchor(
  props: React.ComponentProps<typeof PopoverPrimitive.Anchor>,
) {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />;
}

function PopoverContent({
  className,
  align = "center",
  sideOffset = 8,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="popover-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md bg-popover p-4 text-popover-foreground shadow-card outline-none",
          "shadow-[inset_0_0_0_1px_var(--hairline)]", // 얇은 헤어라인 테두리
          // 열림/닫힘 트랜지션 (tw-animate-css)
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
          "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          className,
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  );
}

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };
