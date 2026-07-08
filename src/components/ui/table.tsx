import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * 테이블 (Table) — 에어비앤비 디자인 시스템 24
 *
 * 배우는 것:
 * - 시맨틱 <table> 구조(thead/tbody/tr/th/td/caption)를 슬롯 컴포넌트로 분해
 * - 헤어라인 행 구분선(border-b border-hairline)으로 가벼운 표 스타일 구성
 * - 헤더는 text-caption(작고 굵은 캡션) · 셀은 text-body-sm 로 타이포 위계
 * - overflow-x-auto 래퍼로 좁은 화면에서 표만 가로 스크롤(본문은 안 밀림)
 *
 * 스펙: 헤더 12/600 #6A6A6A 하단선 #DDD · 셀 14/400 pad-y 16 하단선 #EBEBEB ·
 *       강조 행 bg #F7F7F7
 */
function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto"
    >
      <table
        data-slot="table"
        className={cn("w-full caption-bottom border-collapse", className)}
        {...props}
      />
    </div>
  );
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn("[&_tr]:border-b [&_tr]:border-hairline", className)}
      {...props}
    />
  );
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  );
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      // 헤어라인 행 구분선 · 강조/선택 행은 data-state=selected 로 surface-soft
      className={cn(
        "border-b border-hairline transition-colors data-[state=selected]:bg-surface-soft",
        className,
      )}
      {...props}
    />
  );
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "py-3 text-left align-middle text-caption font-semibold whitespace-nowrap text-muted-foreground [&:has([role=checkbox])]:pr-0",
        className,
      )}
      {...props}
    />
  );
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "py-4 align-middle text-body-sm text-foreground [&:has([role=checkbox])]:pr-0",
        className,
      )}
      {...props}
    />
  );
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("mt-4 text-caption-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

export {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
};
