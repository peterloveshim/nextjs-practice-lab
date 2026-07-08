import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

/**
 * 페이지네이션 (Pagination) — 에어비앤비 디자인 시스템 23
 *
 * 배우는 것:
 * - nav[aria-label] > ul > li 시맨틱 구조로 페이지 목록 표현
 * - cva 로 링크 셀 상태(active/일반)를 조합 · 현재 페이지는 aria-current="page"
 * - 이전/다음은 인라인 SVG 셰브론(stroke=currentColor)으로 색을 토큰과 연결,
 *   disabled 시 화살표가 자동으로 흐려짐(#C1C1C1)
 *
 * 스펙: 셀 40×40 r-full · 현재 bg #222 text #FFF 600 · hover bg #F7F7F7 ·
 *       비활성 화살표 #C1C1C1 · gap 8
 */
function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  );
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex items-center gap-2", className)}
      {...props}
    />
  );
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />;
}

const paginationLinkVariants = cva(
  "inline-flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full text-sm transition-colors outline-none select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:text-border-strong [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      isActive: {
        // 현재: bg #222 · text #FFF · 600
        true: "bg-foreground font-semibold text-background",
        // 일반: hover 시 bg #F7F7F7
        false: "text-foreground hover:bg-surface-soft",
      },
    },
    defaultVariants: {
      isActive: false,
    },
  },
);

type PaginationLinkProps = React.ComponentProps<"a"> &
  VariantProps<typeof paginationLinkVariants> & {
    asChild?: boolean;
  };

function PaginationLink({
  className,
  isActive = false,
  asChild = false,
  ...props
}: PaginationLinkProps) {
  const Comp = asChild ? Slot.Root : "a";

  return (
    <Comp
      data-slot="pagination-link"
      aria-current={isActive ? "page" : undefined}
      data-active={isActive}
      className={cn(paginationLinkVariants({ isActive, className }))}
      {...props}
    />
  );
}

function PaginationPrevious({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="이전 페이지"
      className={cn(className)}
      {...props}
    >
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
        <path
          d="M8 2L4 6l4 4"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </PaginationLink>
  );
}

function PaginationNext({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="다음 페이지"
      className={cn(className)}
      {...props}
    >
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
        <path
          d="M4 2l4 4-4 4"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </PaginationLink>
  );
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn(
        "flex size-10 items-center justify-center text-sm text-muted-foreground select-none",
        className,
      )}
      {...props}
    >
      …<span className="sr-only">더 보기</span>
    </span>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
