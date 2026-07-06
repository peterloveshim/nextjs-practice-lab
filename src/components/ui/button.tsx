import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

/**
 * 버튼 (Button) — 에어비앤비 디자인 시스템 01
 *
 * 배우는 것:
 * - cva 로 variant(색) × size(모양)를 조합해 컴포넌트 API 설계
 * - 디자인 토큰(--primary, --primary-active, --ring …)을 유틸리티로 소비
 * - 플랫 인터랙션: hover/press 시 이동·그림자 없이 색만 변경
 * - focus 는 outline 2px offset 2px (#222)
 *
 * 스펙: button-md 16/500 · r8 · h48 · pad 14×24
 */
const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-sm border border-transparent text-base font-medium whitespace-nowrap transition-colors outline-none select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-5",
  {
    variants: {
      variant: {
        // Primary: bg #3D5AF0 · text #FFF · hover #2A41D4 · disabled #CBD3FC
        primary:
          "bg-primary text-primary-foreground hover:bg-primary-active disabled:bg-primary-disabled disabled:text-primary-foreground",
        // Secondary: bg #FFF · border 1px #222 · disabled border #C1C1C1 · text #929292
        secondary:
          "border-foreground bg-background text-foreground hover:bg-surface-soft disabled:border-border-strong disabled:bg-background disabled:text-muted-soft",
        // Tertiary(Text): 투명 · hover 시 underline · 색상 유지
        tertiary:
          "text-foreground underline-offset-4 hover:underline disabled:text-muted-soft disabled:no-underline",
      },
      size: {
        // button-md 16/500 · h48 · pad 14×24
        default: "h-12 px-6",
        // Pill: r-full · pad 10×20 · button-sm 14/500
        pill: "rounded-full px-5 py-2.5 text-sm",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "primary",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
