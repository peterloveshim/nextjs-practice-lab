import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * 텍스트에어리어 (Textarea) — 에어비앤비 디자인 시스템 05
 *
 * 배우는 것:
 * - 인풋(03)과 동일한 "inset box-shadow 테두리"로 리플로우 없는 상태 전환 재사용
 * - 여러 줄 입력: min-height + 세로 리사이즈(resize-y)
 *
 * 스펙: r8 · pad 14×12 · body-md 16/400 · min-h 120 · focus 2px #222
 */
function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "min-h-30 w-full resize-y rounded-sm bg-transparent px-3 py-3.5 text-base text-foreground transition-shadow outline-none",
        "placeholder:text-muted-foreground",
        // 테두리 = inset box-shadow (blur 0 → 실선). 두께가 변해도 리플로우 없음
        "shadow-[inset_0_0_0_1px_var(--input)]", // Default 1px #DDD
        "focus-visible:shadow-[inset_0_0_0_2px_var(--foreground)]", // Focus 2px #222
        "aria-invalid:shadow-[inset_0_0_0_2px_var(--destructive)]", // Error 2px #C2410C
        // 비활성: bg #F7F7F7 · 테두리 #EBEBEB · text #929292
        "disabled:cursor-not-allowed disabled:bg-surface-soft disabled:text-muted-soft disabled:shadow-[inset_0_0_0_1px_var(--hairline-soft)]",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
