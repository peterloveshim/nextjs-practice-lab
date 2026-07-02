"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

/**
 * 예제 01 — useState 로 상태 관리하기.
 *
 * 배우는 것:
 * - "use client" 지시어: 상태/이벤트를 쓰는 컴포넌트는 클라이언트 컴포넌트여야 함
 * - useState 로 값 저장 + 갱신
 * - shadcn Button/Card 조합, sonner 토스트
 * - TypeScript: step 은 number 타입으로 좁혀짐
 */
export default function CounterExample() {
  const [count, setCount] = useState(0);
  const step = 1;

  return (
    <main className="mx-auto w-full max-w-lg px-6 py-16">
      <Link
        href="/"
        className="text-sm text-muted-foreground hover:underline"
      >
        ← 예제 목록으로
      </Link>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>01 · 상태와 이벤트 (useState)</CardTitle>
          <CardDescription>
            버튼으로 값을 늘리고 줄여 보세요. 상태가 바뀌면 React 가 화면을 다시
            그립니다.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex items-center justify-center">
          <span className="text-6xl font-bold tabular-nums">{count}</span>
        </CardContent>

        <CardFooter className="gap-2">
          <Button
            variant="outline"
            onClick={() => setCount((c) => c - step)}
          >
            −{step}
          </Button>
          <Button onClick={() => setCount((c) => c + step)}>+{step}</Button>
          <Button
            variant="ghost"
            className="ml-auto"
            onClick={() => {
              setCount(0);
              toast.success("카운터를 0으로 초기화했어요.");
            }}
          >
            리셋
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
