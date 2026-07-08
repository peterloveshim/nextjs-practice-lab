"use client";

import * as React from "react";
import { Tabs as TabsPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

/**
 * 탭 (Tabs) — 에어비앤비 디자인 시스템 20
 *
 * radix-ui Tabs 프리미티브 위에 우리 토큰을 입힌 "언더라인 탭"(제품 내비).
 *
 * 배우는 것:
 * - 밑줄 인디케이터는 border-width 토글이 아니라 "항상 2px border-b + 색만 전환"
 *   으로 그린다 → 활성/비활성 전환 시 리플로우가 없다 (인풋의 inset box-shadow와
 *   같은 철학). -mb-px 로 리스트의 1px 헤어라인 위에 밑줄을 겹쳐 얹는다.
 * - data-[state=active] 로 활성 트리거의 텍스트색(#222)·밑줄(#222)을 켠다.
 * - List 는 gap-8(32px) + 하단 헤어라인 1px(#EBEBEB) 만 담당한다.
 *
 * 스펙: nav-link title-md 16/600 · 활성 #222 + 언더라인 2px #222 ·
 *       비활성 #6A6A6A · gap 32 · 리스트 하단 헤어라인 1px #EBEBEB
 */
function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-6", className)}
      {...props}
    />
  );
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "inline-flex items-center gap-8 border-b border-hairline-soft",
        className,
      )}
      {...props}
    />
  );
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        // 항상 2px border-b(투명) + -mb-px → 활성 시 색만 켜져 리플로우 없음
        "relative -mb-px inline-flex items-center gap-2 border-b-2 border-transparent pb-3 text-title-md whitespace-nowrap text-muted-foreground transition-colors outline-none",
        "hover:text-foreground",
        // 활성: 밑줄 2px #222 + 텍스트 #222
        "data-[state=active]:border-foreground data-[state=active]:text-foreground",
        // 포커스: outline 2px offset 2px (버튼/체크박스와 동일)
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        "disabled:pointer-events-none disabled:text-muted-soft",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn(
        "flex-1 text-body-md text-foreground outline-none",
        className,
      )}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
