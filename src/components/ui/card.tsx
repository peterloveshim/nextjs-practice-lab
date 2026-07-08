import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * 카드 (Card) — 에어비앤비 디자인 시스템 14
 *
 * 배우는 것:
 * - 실선 헤어라인 테두리(border #DDD) + r14(rounded-md) 컨테이너
 * - 서브컴포넌트(Header/Content/Footer)가 좌우 패딩을 담당하고
 *   Card 는 세로 리듬(gap·py)만 책임지는 합성 패턴
 * - 첫/마지막 자식 이미지를 카드 모서리에 맞춰 라운딩
 * - shadow-card 대신 spec 의 1티어 그림자(shadow-elevated)를 hover 로 옵트인
 *
 * 스펙: r14 · border 1px #DDD · pad 24 · gap 16 · 타이틀 title-md · hover 그림자 1티어
 */
function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "flex flex-col gap-4 overflow-hidden rounded-md border border-hairline bg-card py-6 text-card-foreground",
        "has-[>img:first-child]:pt-0 *:[img:first-child]:rounded-t-md *:[img:last-child]:rounded-b-md",
        className,
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "grid auto-rows-min items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto]",
        className,
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("text-title-md text-foreground", className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-body-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className,
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6 text-body-sm text-body", className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-4", className)}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};
