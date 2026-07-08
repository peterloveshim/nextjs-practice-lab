import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

/**
 * 아이콘 버튼 (Icon Button) — 에어비앤비 디자인 시스템 02
 *
 * 배우는 것:
 * - 정사각형 아이콘 전용 버튼을 cva variant×size 로 정의 (button 과 형제 API)
 * - 타입에서 `aria-label` 을 필수로 강제 → 접근성 누락을 컴파일 타임에 차단
 * - 플랫 인터랙션: hover 시 이동·그림자 없이 배경만 변경
 * - focus 는 outline 2px offset 2px (#222)
 *
 * 스펙: 정사각형(40/32) · r-full · [&_svg] 자동 크기 · hover bg #F7F7F7
 */
const iconButtonVariants = cva(
  "inline-flex shrink-0 items-center justify-center rounded-full border border-transparent transition-colors outline-none select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Ghost: 투명 · hover 시 옅은 배경
        ghost:
          "text-foreground hover:bg-surface-soft disabled:text-muted-soft disabled:hover:bg-transparent",
        // Outline: 1px #C1C1C1 테두리
        outline:
          "border-border-strong text-foreground hover:bg-surface-soft disabled:border-hairline-soft disabled:text-muted-soft",
        // Primary: 코발트 블루 채움
        primary:
          "bg-primary text-primary-foreground hover:bg-primary-active disabled:bg-primary-disabled",
      },
      size: {
        default: "size-10 [&_svg:not([class*='size-'])]:size-5",
        sm: "size-8 [&_svg:not([class*='size-'])]:size-4",
      },
    },
    defaultVariants: {
      variant: "ghost",
      size: "default",
    },
  },
);

type IconButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof iconButtonVariants> & {
    asChild?: boolean;
    /** 아이콘 버튼은 시각적 텍스트가 없으므로 aria-label 을 필수로 요구한다. */
    "aria-label": string;
  };

function IconButton({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: IconButtonProps) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="icon-button"
      data-variant={variant}
      data-size={size}
      className={cn(iconButtonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { IconButton, iconButtonVariants };
