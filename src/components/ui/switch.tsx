"use client";

import * as React from "react";
import { Switch as SwitchPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

/**
 * 스위치 (Switch) — 에어비앤비 디자인 시스템 09
 *
 * 배우는 것:
 * - 트랙(Root) 안에서 노브(Thumb)를 translate 로 슬라이드시킨다.
 *   이동량 = 트랙폭 48 − pad 2×2 − 노브 26 = 18px.
 * - data-[state=checked|unchecked] 로 트랙 색만 전환 (플랫 인터랙션).
 *   폼 중립을 위해 코발트 블루가 아닌 #222 를 켜짐 색으로 쓴다.
 * - 비활성은 트랙·노브 색을 동시에 낮춘다.
 *
 * 스펙: 트랙 48×30 · r-full · pad 2 · 노브 26 #FFF ·
 *       Off track #C1C1C1 · On track #222 · 비활성 track #EBEBEB knob #F7F7F7 ·
 *       라벨 body-md · gap 12
 */
function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer inline-flex h-[30px] w-12 shrink-0 items-center rounded-full p-0.5 transition-colors outline-none",
        // 트랙 색: Off #C1C1C1 → On #222
        "bg-border-strong data-[state=checked]:bg-foreground",
        // 포커스: outline 2px #222 offset 2px (버튼과 동일)
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        // 비활성: track #EBEBEB (노브 색은 Thumb 에서)
        "disabled:cursor-not-allowed disabled:bg-hairline-soft",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none block size-[26px] rounded-full bg-background transition-transform",
          // Off 위치 0 → On 위치 18px (48 − 4 − 26)
          "data-[state=checked]:translate-x-[18px] data-[state=unchecked]:translate-x-0",
          // 비활성 노브 #F7F7F7 (radix 가 Thumb 에 data-disabled 부여)
          "data-[disabled]:bg-surface-soft",
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
