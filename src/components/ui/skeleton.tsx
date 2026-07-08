import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * 스켈레톤 (Skeleton) — 에어비앤비 디자인 시스템 25
 *
 * 배우는 것:
 * - animate-pulse 로 콘텐츠 로딩 자리표시자를 표현
 * - 크기·모양은 소비 측이 className(width/height/rounded)으로 지정
 * - surface 토큰(#EBEBEB hairline-soft)을 기본 채움색으로 사용
 *
 * 스펙(원문 미문서화 · surface 토큰 기반 제안): 블록 #EBEBEB / #F2F2F2
 *   · 사진 r14(rounded-md) · 라인 r6 · 카드와 동일한 gap 으로 배치
 */
function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("animate-pulse rounded-md bg-hairline-soft", className)}
      {...props}
    />
  );
}

export { Skeleton };
