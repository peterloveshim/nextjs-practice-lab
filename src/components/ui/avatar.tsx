"use client";

import * as React from "react";
import { Avatar as AvatarPrimitive } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * 아바타 (Avatar) — 에어비앤비 디자인 시스템 13
 *
 * 배우는 것:
 * - radix Avatar 로 이미지 로드 실패 시 폴백을 자동 전환
 * - cva size 변형(24/32/40/56)이 지름과 폴백 글자 크기를 함께 제어
 *   (font-size 는 상속되므로 Root 에만 지정하면 Fallback 이 물려받음)
 * - 폴백은 잉크 배경(#222) + 흰 글자 · 원형(rounded-full)
 * - 그룹 겹침은 소비 측에서 ring-2 ring-background + -space-x 로 구성
 *
 * 스펙: 24(11/600) · 32(13/600·내비) · 40(16/600·리뷰) · 56(22/600·호스트) · r-full
 */
const avatarVariants = cva(
  "relative flex shrink-0 overflow-hidden rounded-full",
  {
    variants: {
      size: {
        sm: "size-6 text-[11px]", // 24
        md: "size-8 text-[13px]", // 32 · 내비
        lg: "size-10 text-base", // 40 · 리뷰
        xl: "size-14 text-[22px]", // 56 · 호스트
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

function Avatar({
  className,
  size = "md",
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root> &
  VariantProps<typeof avatarVariants>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={size}
      className={cn(avatarVariants({ size }), className)}
      {...props}
    />
  );
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full object-cover", className)}
      {...props}
    />
  );
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "flex size-full items-center justify-center rounded-full bg-foreground font-semibold text-background",
        className,
      )}
      {...props}
    />
  );
}

export { Avatar, AvatarImage, AvatarFallback, avatarVariants };
