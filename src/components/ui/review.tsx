import * as React from "react";
import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * 리뷰 · 평점 (Reviews / Rating) — 에어비앤비 디자인 시스템 30
 *
 * 후기 카드: 별점 → 리뷰어(아바타·이름·메타) → 본문(3줄 클램프 + 더 보기).
 *
 * 배우는 것:
 * - 별점은 채운 별 n개 + 빈 별 (5-n)개를 map 으로 그린다. 에어비앤비는 금색이
 *   아니라 잉크(#222)로 별을 칠한다 (fill-current + text-foreground).
 * - line-clamp-3 로 본문을 3줄로 자르고 "더 보기"를 tertiary 링크로 붙인다.
 * - 아바타 컴포넌트가 없으므로 이니셜 원형으로 우아하게 대체(graceful fallback):
 *   src 가 있으면 img, 없으면 이름 첫 글자를 #222 원 안에 흰 글씨로.
 *
 * 스펙: 아바타 40 · 이름 title-md 16/600 · 메타 body-sm #6A6A6A ·
 *       별 잉크 #222 (금색 미사용) · 본문 body-sm #3F3F3F 3줄 클램프 ·
 *       더 보기 tertiary 14/600 underline
 */
function StarRating({
  rating = 5,
  max = 5,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  /** 채운 별 개수 */
  rating?: number;
  /** 전체 별 개수 */
  max?: number;
}) {
  const filled = Math.max(0, Math.min(max, Math.round(rating)));
  return (
    <div
      data-slot="star-rating"
      role="img"
      aria-label={`5점 만점에 ${rating}점`}
      className={cn("flex items-center gap-0.5 text-foreground", className)}
      {...props}
    >
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          aria-hidden="true"
          className={cn(
            "size-3.5",
            i < filled ? "fill-current" : "fill-transparent text-hairline",
          )}
          strokeWidth={i < filled ? 0 : 1.5}
        />
      ))}
    </div>
  );
}

function ReviewAvatar({ name, src }: { name: string; src?: string }) {
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={name}
        className="size-10 shrink-0 rounded-full object-cover"
      />
    );
  }
  return (
    <div
      aria-hidden="true"
      className="flex size-10 shrink-0 items-center justify-center rounded-full bg-foreground text-title-md text-background"
    >
      {name.slice(0, 1)}
    </div>
  );
}

function Review({
  className,
  name,
  meta,
  rating = 5,
  body,
  avatarSrc,
  showMore = true,
  ...props
}: Omit<React.ComponentProps<"article">, "title"> & {
  /** 리뷰어 이름 */
  name: string;
  /** 메타 (예: "2026년 6월 · 에어비앤비 가입 3년") */
  meta?: string;
  /** 별점 (채운 별 개수) */
  rating?: number;
  /** 본문 */
  body: string;
  /** 아바타 이미지 (없으면 이니셜 원형) */
  avatarSrc?: string;
  /** "더 보기" 링크 노출 여부 */
  showMore?: boolean;
}) {
  return (
    <article
      data-slot="review"
      className={cn("flex w-[340px] max-w-full flex-col gap-3", className)}
      {...props}
    >
      <header className="flex items-center gap-3">
        <ReviewAvatar name={name} src={avatarSrc} />
        <div className="min-w-0">
          <div className="truncate text-title-md text-foreground">{name}</div>
          {meta && (
            <div className="truncate text-body-sm text-muted-foreground">
              {meta}
            </div>
          )}
        </div>
      </header>

      <StarRating rating={rating} />

      <p className="line-clamp-3 text-body-sm text-body">{body}</p>

      {showMore && (
        <button
          type="button"
          className={cn(
            "w-fit text-body-sm font-semibold text-foreground underline underline-offset-4 outline-none",
            "hover:no-underline",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
          )}
        >
          더 보기
        </button>
      )}
    </article>
  );
}

export { Review, StarRating };
