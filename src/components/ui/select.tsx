"use client";

import * as React from "react";
import { Select as SelectPrimitive } from "radix-ui";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * 셀렉트 (Select) — 에어비앤비 디자인 시스템 06
 *
 * radix-ui Select 프리미티브 위에 우리 토큰을 입힌다.
 *
 * 배우는 것:
 * - 트리거는 인풋(03)과 "완전히 같은" 스펙 재사용: inset box-shadow 보더로
 *   리플로우 없는 focus/error 상태 전환 (Field(04)가 주입하는 aria-invalid 도 그대로 동작)
 * - radix Portal + Popper 로 메뉴를 띄우고, --radix-select-trigger-width 로
 *   메뉴 폭을 트리거에 맞춘다
 * - ItemIndicator(체크) + data-state 로 선택 항목을 굵게 표시
 *
 * 스펙:
 * - 트리거: h56 · r8 · pad 14×12 · body-md 16/400 · 셰브론 12px
 * - 메뉴: r14 · 세로 pad 8 · shadow-card
 * - 아이템: pad 12×16 · body-sm 14/400 · hover bg #F7F7F7 · 선택 시 500
 * - 비활성 아이템: text #929292
 */
function Select(props: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />;
}

function SelectGroup(
  props: React.ComponentProps<typeof SelectPrimitive.Group>,
) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />;
}

function SelectValue(
  props: React.ComponentProps<typeof SelectPrimitive.Value>,
) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}

function SelectTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger>) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      className={cn(
        "flex h-14 w-full items-center justify-between gap-2 rounded-sm bg-transparent px-3 text-base text-foreground transition-shadow outline-none",
        // 값이 없을 때(placeholder) 색
        "data-[placeholder]:text-muted-foreground",
        // 테두리 = inset box-shadow (blur 0 → 실선). 두께가 바뀌어도 리플로우 없음
        "shadow-[inset_0_0_0_1px_var(--input)]", // Default 1px #DDD
        "focus-visible:shadow-[inset_0_0_0_2px_var(--foreground)]", // Focus 2px #222
        "aria-invalid:shadow-[inset_0_0_0_2px_var(--destructive)]", // Error 2px #C2410C
        // 비활성: bg #F7F7F7 · 테두리 #EBEBEB · text #929292
        "disabled:cursor-not-allowed disabled:bg-surface-soft disabled:text-muted-soft disabled:shadow-[inset_0_0_0_1px_var(--hairline-soft)]",
        // 셰브론(12px)은 여닫힘에 따라 회전
        "[&>svg]:pointer-events-none [&>svg]:size-3 [&>svg]:shrink-0 [&>svg]:text-body [&>svg]:transition-transform [&[data-state=open]>svg]:rotate-180",
        className,
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDown />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

function SelectContent({
  className,
  children,
  position = "popper",
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        position={position}
        className={cn(
          "relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] overflow-hidden rounded-md bg-background py-2 text-foreground shadow-card",
          "shadow-[inset_0_0_0_1px_var(--hairline)]", // 얇은 헤어라인 테두리
          // 열림/닫힘 트랜지션 (tw-animate-css)
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
          "data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=top]:-translate-y-1",
          className,
        )}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            "p-0",
            position === "popper" &&
              "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn(
        "px-4 py-1.5 text-caption-sm text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "relative flex w-full cursor-default items-center justify-between gap-2 py-3 pr-9 pl-4 text-body-sm text-foreground outline-none select-none",
        // hover/키보드 포커스 배경 #F7F7F7
        "focus:bg-surface-soft data-[highlighted]:bg-surface-soft",
        // 선택된 항목은 500
        "data-[state=checked]:font-medium",
        // 비활성 항목
        "data-[disabled]:pointer-events-none data-[disabled]:text-muted-soft",
        className,
      )}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <span className="absolute right-4 flex size-4 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <Check className="size-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
    </SelectPrimitive.Item>
  );
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("my-2 h-px bg-hairline-soft", className)}
      {...props}
    />
  );
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1 text-body",
        className,
      )}
      {...props}
    >
      <ChevronUp className="size-4" />
    </SelectPrimitive.ScrollUpButton>
  );
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1 text-body",
        className,
      )}
      {...props}
    >
      <ChevronDown className="size-4" />
    </SelectPrimitive.ScrollDownButton>
  );
}

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};
