"use client";

import * as React from "react";
import { Separator as SeparatorPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

/**
 * 세퍼레이터 (Separator) — 에어비앤비 디자인 시스템 27
 *
 * 배우는 것:
 * - orientation 에 따라 가로 1px 실선 / 세로 1px 실선으로 자동 전환.
 * - decorative 면 aria-hidden(순수 장식), 아니면 role="separator" 로 의미 부여.
 * - tone prop 으로 헤어라인 두 톤(#DDD / #EBEBEB)을 고른다.
 *
 * 스펙: 가로 1px #DDDDDD(기본) / #EBEBEB(soft) · 세로 1×20px #DDD gap 16
 */
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  tone = "default",
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root> & {
  tone?: "default" | "soft";
}) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      data-tone={tone}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0",
        // 톤: 기본 #DDD · soft #EBEBEB
        tone === "soft" ? "bg-hairline-soft" : "bg-hairline",
        // 방향: 가로는 폭 100%×1px, 세로는 1px×높이 100%
        "data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full",
        "data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className,
      )}
      {...props}
    />
  );
}

export { Separator };
