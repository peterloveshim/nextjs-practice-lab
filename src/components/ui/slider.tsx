"use client";

import * as React from "react";
import { Slider as SliderPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

/**
 * 슬라이더 (Slider) — 에어비앤비 디자인 시스템 10
 *
 * 배우는 것:
 * - radix Slider 는 value 배열 길이만큼 Thumb 를 렌더한다. 하나면 단일 값,
 *   둘이면 범위(가격 필터). value/defaultValue 로 Thumb 개수를 자동 계산한다.
 * - Track(레일) 위에 Range(채움)를 얹고, 세로 방향일 땐 h/w 를 바꿔 대응한다.
 * - Thumb 의 겹겹 box-shadow 로 살짝 떠 있는 느낌(엘리베이션)을 낸다.
 *
 * 스펙: 트랙 h4 #DDD r-full · 채움 #222 · 썸 24 #FFF border 1px #C1C1C1 ·
 *       상하 pad 12
 */
function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
  // value/defaultValue 로 Thumb 개수 산출 (없으면 min~max 단일 값)
  const thumbValues = React.useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
          ? defaultValue
          : [min, max],
    [value, defaultValue, min, max],
  );

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn(
        "relative flex w-full touch-none items-center py-3 select-none",
        "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
        "data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col data-[orientation=vertical]:px-3 data-[orientation=vertical]:py-0",
        className,
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className={cn(
          "relative grow overflow-hidden rounded-full bg-hairline",
          "data-[orientation=horizontal]:h-1 data-[orientation=horizontal]:w-full",
          "data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1",
        )}
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className={cn(
            "absolute rounded-full bg-foreground",
            "data-[orientation=horizontal]:h-full",
            "data-[orientation=vertical]:w-full",
          )}
        />
      </SliderPrimitive.Track>
      {thumbValues.map((_, i) => (
        <SliderPrimitive.Thumb
          key={i}
          data-slot="slider-thumb"
          className={cn(
            "block size-6 rounded-full border border-border-strong bg-background transition-shadow outline-none",
            "shadow-[rgba(0,0,0,0.02)_0_0_0_1px,rgba(0,0,0,0.04)_0_2px_6px_0,rgba(0,0,0,0.1)_0_4px_8px_0]",
            // 포커스: outline 2px #222 offset 2px (버튼과 동일)
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
          )}
        />
      ))}
    </SliderPrimitive.Root>
  );
}

export { Slider };
