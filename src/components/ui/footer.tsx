import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * 푸터 (Footer) — 에어비앤비 디자인 시스템 31
 *
 * 사이트 푸터: 링크 그룹 컬럼 + 하단 법적 밴드(저작권 · 법적 링크 · 지역/통화).
 *
 * 배우는 것:
 * - grid-cols 로 링크 그룹을 배치하고, 좁은 화면에서 1컬럼으로 접히게 한다.
 * - 헤드는 title-sm(16/500), 링크는 body-sm 잉크(#222) — 대비 배경 없이 흰색.
 * - 하단 밴드는 상단 헤어라인 + caption-sm(13/400) 회색, 법적 링크만 legal-link
 *   (#428BFF)로 강조한다.
 *
 * 스펙: bg #FFF · pad 48×80 · 3컬럼 gap 24 · 헤드 title-sm · 링크 body-sm ink ·
 *       legal-band: caption-sm 13/400 #6A6A6A · 법적 링크 #428BFF
 */
type FooterColumn = {
  heading: string;
  links: string[];
};

const DEFAULT_COLUMNS: FooterColumn[] = [
  { heading: "고객지원", links: ["도움말 센터", "에어커버", "차별 반대"] },
  {
    heading: "호스팅",
    links: [
      "당신의 공간을 에어비앤비하세요",
      "호스트를 위한 에어커버",
      "호스팅 자료",
    ],
  },
  { heading: "에어비앤비", links: ["뉴스룸", "새로운 기능", "채용정보"] },
];

function Footer({
  className,
  columns = DEFAULT_COLUMNS,
  ...props
}: React.ComponentProps<"footer"> & {
  columns?: FooterColumn[];
}) {
  return (
    <footer
      data-slot="footer"
      className={cn(
        "w-full bg-background px-6 py-12 text-foreground sm:px-12",
        className,
      )}
      {...props}
    >
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6">
        {columns.map((col) => (
          <nav key={col.heading} className="flex flex-col gap-3.5">
            <span className="text-title-sm text-foreground">{col.heading}</span>
            {col.links.map((link) => (
              <a
                key={link}
                href="#"
                className="w-fit text-body-sm text-foreground underline-offset-4 outline-none hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                {link}
              </a>
            ))}
          </nav>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6 text-caption-sm text-muted-foreground">
        <span>
          © 2026 Airbnb, Inc. ·{" "}
          <a
            href="#"
            className="text-legal-link underline-offset-4 outline-none hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            개인정보 처리방침
          </a>{" "}
          ·{" "}
          <a
            href="#"
            className="text-legal-link underline-offset-4 outline-none hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            이용약관
          </a>
        </span>
        <span className="flex flex-wrap gap-4 text-body-sm font-medium text-foreground">
          <button
            type="button"
            className="outline-none hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            🌐 한국어 (KR)
          </button>
          <button
            type="button"
            className="outline-none hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            ₩ KRW
          </button>
        </span>
      </div>
    </footer>
  );
}

export { Footer };
