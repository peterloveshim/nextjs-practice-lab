"use client";

import * as React from "react";
import { Minus, Plus } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * 스텝퍼 (Stepper · 인원/수량 선택) — 에어비앤비 디자인 시스템 11
 *
 * 배우는 것:
 * - 완전 제어(controlled) 컴포넌트 패턴: value/onValueChange 를 부모가 소유하고
 *   내부는 min·max·step 범위로 clamp 만 담당
 * - 경계값에서 −/+ 버튼을 disabled 로 잠가 잘못된 조작을 원천 차단
 * - 원형 아웃라인 버튼: border-strong(#C1C1C1) 테두리 · disabled 시 hairline-soft
 * - aria(role/aria-valuenow/valuemin/valuemax)로 스핀버튼 접근성 배선
 *
 * 스펙: 버튼 32×32 r-full · 테두리 1px #C1C1C1 · 기호 #6A6A6A 18px ·
 *       값 body-md min-w 20 가운데정렬 · gap 16
 */

type StepperProps = Omit<
  React.ComponentProps<"div">,
  "onChange" | "defaultValue"
> & {
  value: number;
  onValueChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  "aria-label"?: string;
};

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function Stepper({
  className,
  value,
  onValueChange,
  min = 0,
  max = Infinity,
  step = 1,
  "aria-label": ariaLabel,
  ...props
}: StepperProps) {
  const atMin = value <= min;
  const atMax = value >= max;

  return (
    <div
      data-slot="stepper"
      className={cn("flex items-center gap-4", className)}
      {...props}
    >
      <StepperButton
        aria-label="빼기"
        disabled={atMin}
        onClick={() => onValueChange(clamp(value - step, min, max))}
      >
        <Minus className="size-[18px]" strokeWidth={2} aria-hidden />
      </StepperButton>
      <span
        role="spinbutton"
        aria-label={ariaLabel}
        aria-valuenow={value}
        aria-valuemin={min}
        aria-valuemax={Number.isFinite(max) ? max : undefined}
        className="min-w-5 text-center text-body-md text-foreground tabular-nums select-none"
      >
        {value}
      </span>
      <StepperButton
        aria-label="더하기"
        disabled={atMax}
        onClick={() => onValueChange(clamp(value + step, min, max))}
      >
        <Plus className="size-[18px]" strokeWidth={2} aria-hidden />
      </StepperButton>
    </div>
  );
}

function StepperButton({
  className,
  ...props
}: React.ComponentProps<"button">) {
  return (
    <button
      type="button"
      data-slot="stepper-button"
      className={cn(
        "inline-flex size-8 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors outline-none",
        // 테두리 = inset box-shadow(blur 0 → 실선). 두께가 변해도 리플로우 없음
        "shadow-[inset_0_0_0_1px_var(--border-strong)]",
        "hover:text-foreground hover:shadow-[inset_0_0_0_1px_var(--foreground)]",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        // 경계값 비활성: 흐린 구분선 + 흐린 기호
        "disabled:cursor-not-allowed disabled:text-border-strong disabled:shadow-[inset_0_0_0_1px_var(--hairline-soft)] disabled:hover:text-border-strong",
        className,
      )}
      {...props}
    />
  );
}

export { Stepper };
