import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * 텍스트 인풋 (Input) — 에어비앤비 디자인 시스템 03
 *
 * 배우는 것:
 * - 테두리를 border 대신 inset box-shadow(blur 0)로 그려 리플로우 제거
 *   (border-width 는 박스 크기를 바꾸지만 box-shadow 는 레이아웃에 영향 없음)
 * - aria-invalid 로 에러 상태를 스타일과 연결
 * - focus 2px #222 / error 2px #C2410C / disabled 색 3종 동시 전환
 *
 * 스펙: h56 · r8 · pad 14×12 · body-md 16/400 · placeholder #6A6A6A
 */
function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-14 w-full min-w-0 rounded-sm bg-transparent px-3 text-base text-foreground transition-shadow outline-none",
        "placeholder:text-muted-foreground",
        "file:inline-flex file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
        // 테두리 = inset box-shadow (blur 0 → 실선). 두께가 바뀌어도 리플로우 없음
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

export { Input };
