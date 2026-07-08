import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * 알럿 (Alert) — 에어비앤비 디자인 시스템 15
 *
 * 배우는 것:
 * - 배경 필 없이 테두리 색만으로 톤을 구분하는 인라인 공지 패턴
 * - cva 로 컨테이너 테두리와 원형 아이콘 배지를 variant 별로 함께 전환
 * - 아이콘은 variant 기본 글리프를 렌더하되 `icon` prop 으로 교체 가능
 * - role="alert" 로 스크린리더에 상태 변화를 알림
 *
 * 스펙: border 1px · r12(rounded-xl) · pad 16 · gap 12 · 배경 필 없음
 *   · info 테두리 #DDD / 아이콘 링 #222 · error 테두리·아이콘 #C2410C
 *   · 타이틀 title-md(16/600) · 본문 body-sm #3F3F3F
 */
const alertVariants = cva("flex w-full gap-3 rounded-xl border p-4 text-left", {
  variants: {
    variant: {
      info: "border-hairline",
      error: "border-destructive",
    },
  },
  defaultVariants: {
    variant: "info",
  },
});

const alertIconVariants = cva(
  "inline-flex size-5 flex-none items-center justify-center rounded-full text-xs leading-none font-bold",
  {
    variants: {
      variant: {
        info: "border-[1.5px] border-foreground text-foreground",
        error: "bg-destructive text-destructive-foreground",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  },
);

const defaultGlyph: Record<"info" | "error", string> = {
  info: "i",
  error: "!",
};

function Alert({
  className,
  variant = "info",
  icon,
  children,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof alertVariants> & { icon?: React.ReactNode }) {
  return (
    <div
      role="alert"
      data-slot="alert"
      data-variant={variant}
      className={cn(alertVariants({ variant }), className)}
      {...props}
    >
      <span
        data-slot="alert-icon"
        aria-hidden="true"
        className={alertIconVariants({ variant })}
      >
        {icon ?? defaultGlyph[variant ?? "info"]}
      </span>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn("mb-0.5 text-title-md text-foreground", className)}
      {...props}
    />
  );
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "text-body-sm text-body [&_a]:text-destructive [&_a]:underline [&_a:hover]:text-[#9a3412]",
        className,
      )}
      {...props}
    />
  );
}

export { Alert, AlertTitle, AlertDescription, alertVariants };
