"use client";

import * as React from "react";
import { Accordion as AccordionPrimitive } from "radix-ui";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * 아코디언 (Accordion) — 에어비앤비 디자인 시스템 21
 *
 * radix-ui Accordion 프리미티브 위에 우리 토큰을 입힌다.
 *
 * 배우는 것:
 * - Item 사이를 헤어라인(#EBEBEB) 실선으로만 구분(테두리·배경 없음)
 * - Trigger 우측 셰브론(12px)이 data-[state=open] 에서 180° 회전
 * - Content 는 radix Presence 로 열림/닫힘 (닫히면 언마운트)
 *
 * 스펙:
 * - Item: border-bottom 1px #EBEBEB
 * - Trigger: pad-y 20 · title 16/600 · 셰브론 12px
 * - Content: pad-bottom 20 · body 16/400 · #3F3F3F · line-height 1.5
 */
function Accordion(
  props: React.ComponentProps<typeof AccordionPrimitive.Root>,
) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b border-hairline-soft", className)}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "flex flex-1 items-center justify-between gap-4 py-5 text-left text-title-md font-semibold text-foreground transition-colors outline-none",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
          "[&[data-state=open]>svg]:rotate-180",
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDown className="size-3 shrink-0 text-foreground transition-transform duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className={cn(
        "overflow-hidden text-body-md leading-[1.5] text-body",
        "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
      )}
      {...props}
    >
      <div className={cn("pt-0 pb-5", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
