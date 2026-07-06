"use client";

import * as React from "react";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

/**
 * 폼 필드 (Form Field) — 에어비앤비 디자인 시스템 04
 *
 * 라벨 + 컨트롤 + 헬퍼/에러 를 8px 간격으로 묶고 접근성 속성을 자동 배선.
 *
 * 배우는 것:
 * - useId 로 id/htmlFor/aria-describedby/aria-invalid 자동 연결
 * - cloneElement 로 자식 컨트롤에 접근성 props 주입
 * - error 하나로 헬퍼 색(#6A6A6A→#C2410C)과 인풋 보더(aria-invalid)를 동시 제어
 * - useId 는 클라이언트 훅이라 "use client" 필요
 *
 * 스펙: gap 8 · label caption 14/500 #222 · helper caption-sm 13/400 #6A6A6A · error #C2410C
 */
type FieldChild = React.ReactElement<{
  id?: string;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
}>;

function Field({
  label,
  helper,
  error,
  className,
  children,
}: {
  label: React.ReactNode;
  helper?: React.ReactNode;
  error?: React.ReactNode;
  className?: string;
  children: FieldChild;
}) {
  const id = React.useId();
  const messageId = `${id}-message`;
  const message = error ?? helper;

  const control = React.cloneElement(children, {
    id,
    "aria-invalid": error ? true : children.props["aria-invalid"],
    "aria-describedby": message
      ? messageId
      : children.props["aria-describedby"],
  });

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label htmlFor={id} className="text-caption text-foreground">
        {label}
      </Label>
      {control}
      {message ? (
        <p
          id={messageId}
          className={cn(
            "text-caption-sm",
            error ? "text-destructive" : "text-muted-foreground",
          )}
        >
          {message}
        </p>
      ) : null}
    </div>
  );
}

export { Field };
