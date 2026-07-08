import * as React from "react";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

/**
 * 법적 고지 라인 (Legal Line) — 에어비앤비 디자인 시스템 26
 *
 * 배우는 것:
 * - 푸터 저작권·약관 밴드처럼 촘촘한 잔글씨 문단을 하나의 타이포 토큰으로 통일
 * - 문단(caption-sm 13/400 #6A6A6A) 안에 끼워 넣는 링크만 legal-link(#428BFF)로
 *   강조 — LegalLineLink 로 색을 토큰에 위임(asChild 로 <Link> 교체 가능)
 *
 * 스펙: caption-sm 13/400 #6A6A6A · 법적 링크 #428BFF
 */
function LegalLine({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="legal-line"
      className={cn("text-caption-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

function LegalLineLink({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"a"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "a";

  return (
    <Comp
      data-slot="legal-line-link"
      // 법적 링크 #428BFF · hover 시 밑줄
      className={cn(
        "cursor-pointer text-legal-link underline-offset-2 hover:underline",
        className,
      )}
      {...props}
    />
  );
}

export { LegalLine, LegalLineLink };
