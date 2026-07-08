import Link from "next/link";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { examples } from "../example-registry";

/**
 * 홈 예제 갤러리.
 *
 * example-registry 의 examples 배열을 읽어 카드 목록을 렌더하는
 * 서버 컴포넌트입니다. 라우트(app/page.tsx)는 이 컴포넌트를 렌더만 합니다.
 */
export function ExampleGallery() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight">
          Next.js Practice Lab
        </h1>
        <p className="mt-2 text-muted-foreground">
          React · TypeScript · Next.js · shadcn/ui · Tailwind 을 익히기 위한
          예제 모음입니다. 아래 카드를 눌러 각 예제를 확인하세요.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2">
        {examples.map((example) => (
          <Link key={example.slug} href={`/examples/${example.slug}`}>
            <Card className="h-full transition-colors hover:border-foreground/30">
              <CardHeader>
                <CardTitle>{example.title}</CardTitle>
                <CardDescription>{example.description}</CardDescription>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {example.topics.map((topic) => (
                    <Badge key={topic} variant="neutral">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </section>

      {examples.length === 0 && (
        <p className="text-muted-foreground">
          아직 예제가 없습니다. src/features/gallery/example-registry.ts 에
          항목을 추가하세요.
        </p>
      )}
    </main>
  );
}
