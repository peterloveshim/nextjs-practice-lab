import * as React from "react";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

/**
 * 브레드크럼 (Breadcrumb) — 에어비앤비 디자인 시스템 22
 *
 * 배우는 것:
 * - 시맨틱 마크업으로 경로 내비게이션 구성: nav > ol > li, 마지막 항목은
 *   링크가 아닌 현재 위치(aria-current="page")로 표기
 * - 구분자는 장식이므로 role="presentation" + aria-hidden 으로 스크린리더 제외
 * - asChild(Slot)로 링크를 Next <Link> 등 임의 요소로 교체 가능
 *
 * 스펙: 링크 14/400 #6A6A6A underline · 현재 500 #222 · 구분 › #929292 · gap 10
 */
function Breadcrumb({ ...props }: React.ComponentProps<"nav">) {
  return <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} />;
}

function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(
        "flex flex-wrap items-center gap-2.5 text-sm break-words",
        className,
      )}
      {...props}
    />
  );
}

function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn("inline-flex items-center gap-2.5", className)}
      {...props}
    />
  );
}

function BreadcrumbLink({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"a"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "a";

  return (
    <Comp
      data-slot="breadcrumb-link"
      className={cn(
        // 링크 14/400 #6A6A6A underline · hover 시 잉크로 진해짐
        "cursor-pointer text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground",
        className,
      )}
      {...props}
    />
  );
}

function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      // 현재 위치 500 #222 (링크 아님)
      className={cn("font-medium text-foreground", className)}
      {...props}
    />
  );
}

function BreadcrumbSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      // 구분 › #929292
      className={cn("text-muted-soft select-none", className)}
      {...props}
    >
      {children ?? "›"}
    </li>
  );
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
};
