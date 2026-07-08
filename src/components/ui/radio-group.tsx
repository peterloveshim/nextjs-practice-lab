"use client";

import * as React from "react";
import { RadioGroup as RadioGroupPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

/**
 * 라디오 그룹 (Radio Group) — 에어비앤비 디자인 시스템 08
 *
 * 체크박스(07)의 상태 분기 패턴을 그대로 재사용한 원형 버전.
 *
 * 배우는 것:
 * - 테두리를 border 대신 inset box-shadow(blur 0)로 그려 1px→2px(에러) 두께
 *   변화에 리플로우가 없다 (인풋·체크박스와 동일).
 * - 선택 상태는 bg-foreground 로 원을 채우고 Indicator 로 흰 중앙 점을 찍는다.
 *   (스펙의 "border 7px #222 → 내부 원 자동 형성"과 시각적으로 동일:
 *    24px 원에서 흰 점 10px 를 남기면 #222 링 7px 가 만들어진다.)
 * - aria-invalid 로 에러 보더 자동 연결 (인풋/셀렉트/체크박스와 동일).
 *
 * 스펙: 24×24 · r-full · 선택 시 border 7px #222(내부 흰 원 10px) ·
 *       기본 1px #C1C1C1 · 에러 2px #C2410C · 비활성 bg #F7F7F7 border #EBEBEB ·
 *       행 간격 14px · 라벨 gap 12
 */
function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn("grid gap-3.5", className)}
      {...props}
    />
  );
}

function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        "group peer inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-background transition-shadow outline-none",
        // 테두리 = inset box-shadow (blur 0 → 실선). 두께가 바뀌어도 리플로우 없음
        "shadow-[inset_0_0_0_1px_var(--border-strong)]", // 기본 1px #C1C1C1
        // 선택: 배경 #222 채움 + 보더 제거 (Indicator 가 흰 중앙 점)
        "data-[state=checked]:bg-foreground data-[state=checked]:shadow-none",
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
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        {/* 흰 중앙 점 10px → 채워진 #222 원 위에서 7px 링처럼 보인다 */}
        <span className="size-2.5 rounded-full bg-background" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
}

export { RadioGroup, RadioGroupItem };
