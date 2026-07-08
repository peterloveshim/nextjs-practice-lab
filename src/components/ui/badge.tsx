import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

/**
 * 배지 (Badge) — 에어비앤비 디자인 시스템 12
 *
 * 배우는 것:
 * - cva 로 배지 색/모양 변형을 한 곳에 모으기
 * - 알약형(rounded-full) 라벨 · badge 타이포(11/600) 토큰 소비
 * - "게스트 선호" 배지의 1티어 그림자(--shadow-elevated) 재현
 * - tag 변형은 padding·타이포(text-tag 8/700, uppercase)를 base 위에 덮어쓰기
 *
 * 스펙: pad 4×10 · badge 11/600 · r-full
 *   · guest-favorite bg #FFF + 그림자 1티어
 *   · ink bg #222/text #FFF · promo bg #3D5AF0 · neutral bg #F7F7F7/text #6A6A6A
 *   · new 태그 pad 2×6 · border #DDD · uppercase-tag 8/700 ls .32
 */
const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center gap-1 rounded-full border border-transparent px-2.5 py-1 text-badge whitespace-nowrap [&>svg]:pointer-events-none [&>svg]:size-3",
  {
    variants: {
      variant: {
        // 중립 회색 태그 (마감 등)
        neutral: "bg-surface-soft text-muted-foreground",
        // 게스트 선호: 흰 배경 + 1티어 그림자
        "guest-favorite": "bg-background text-foreground shadow-elevated",
        // 강조: 잉크 배경 (슈퍼호스트 등)
        ink: "bg-foreground text-background",
        // 프로모션: 코발트 블루 — 절제해서 사용
        promo: "bg-primary text-primary-foreground",
        // New 태그: 얇은 테두리 + 초소형 대문자 타이포
        tag: "border-hairline bg-background px-1.5 py-0.5 text-tag text-foreground uppercase",
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  },
);

function Badge({
  className,
  variant = "neutral",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span";

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
