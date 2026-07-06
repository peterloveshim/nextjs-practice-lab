/**
 * 예제 레지스트리.
 *
 * 새 예제를 추가할 때 이 배열에 항목을 하나 추가하면
 * 홈("/")의 갤러리에 카드가 자동으로 나타납니다.
 * 실제 기능은 src/features/<slug>/ 폴더로 만들고,
 * 라우트는 src/app/examples/<slug>/page.tsx 로 얇게 연결하세요.
 */
export type ExampleTopic =
  "react" | "typescript" | "nextjs" | "shadcn" | "tailwind";

export interface Example {
  /** URL slug. src/app/examples/<slug>/page.tsx 와 일치해야 합니다. */
  slug: string;
  title: string;
  description: string;
  /** 이 예제가 주로 다루는 주제(뱃지로 표시). */
  topics: ExampleTopic[];
}

export const examples: Example[] = [
  {
    slug: "counter",
    title: "01 · 상태와 이벤트 (useState)",
    description:
      "useState 로 카운터를 만들고 shadcn Button/Card 로 감쌉니다. 클라이언트 컴포넌트의 기본 패턴.",
    topics: ["react", "shadcn", "tailwind"],
  },
];

export function getExample(slug: string): Example | undefined {
  return examples.find((e) => e.slug === slug);
}
