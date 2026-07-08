"use client";

import * as React from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/**
 * 임시 확인용 페이지(/test) — 컴포넌트 상태 점검.
 * (디자인 시스템 로드맵과 무관한 스크래치 라우트)
 */
export default function Test() {
  const [type, setType] = React.useState<string>();
  const [checked, setChecked] = React.useState<boolean | "indeterminate">(
    "indeterminate",
  );

  return (
    <main className="mx-auto flex max-w-md flex-col gap-10 px-6 py-16">
      <header className="flex flex-col gap-1">
        <h1 className="text-display-sm text-foreground">
          06 셀렉트 · 07 체크박스
        </h1>
        <p className="text-body-sm text-muted-foreground">
          디자인 시스템 컴포넌트 상태 점검용 스크래치 페이지
        </p>
      </header>

      {/* ═══ 07 체크박스 ═══ */}
      <div className="flex flex-col gap-6">
        <h2 className="text-title-md text-foreground">
          07 체크박스 (Checkbox)
        </h2>

        {/* 상태 6종 나란히 */}
        <div className="flex flex-wrap items-start gap-6">
          <div className="flex flex-col items-center gap-2">
            <Checkbox />
            <span className="text-caption-sm text-muted-foreground">기본</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Checkbox defaultChecked />
            <span className="text-caption-sm text-muted-foreground">
              체크됨
            </span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Checkbox checked="indeterminate" />
            <span className="text-caption-sm text-muted-foreground">중간</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Checkbox aria-invalid />
            <span className="text-caption-sm text-muted-foreground">에러</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Checkbox disabled />
            <span className="text-caption-sm text-muted-foreground">
              비활성
            </span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Checkbox disabled defaultChecked />
            <span className="text-caption-sm text-muted-foreground">
              비활성·체크
            </span>
          </div>
        </div>

        {/* 라벨 옆배치 — 클릭 토글 + 비활성 라벨색 */}
        <div className="flex flex-col gap-3">
          <Label className="gap-3 text-base font-normal has-[:disabled]:text-muted-soft">
            <Checkbox defaultChecked />
            이용약관에 동의합니다
          </Label>
          <Label className="gap-3 text-base font-normal has-[:disabled]:text-muted-soft">
            <Checkbox disabled />
            마케팅 정보 수신 (현재 불가)
          </Label>
        </div>

        {/* 제어(indeterminate ↔ checked ↔ unchecked) */}
        <div className="flex flex-col gap-3">
          <Label className="gap-3 text-base font-normal">
            <Checkbox checked={checked} onCheckedChange={setChecked} />
            제어 컴포넌트 (상태: {String(checked)})
          </Label>
          <button
            type="button"
            className="self-start text-caption-sm text-legal-link underline"
            onClick={() => setChecked("indeterminate")}
          >
            indeterminate 로 되돌리기
          </button>
        </div>
      </div>

      {/* ═══ 06 셀렉트 ═══ */}
      <div className="flex flex-col gap-6">
        <h2 className="text-title-md text-foreground">06 셀렉트 (Select)</h2>

        {/* 1. 기본 (제어 컴포넌트) */}
        <section className="flex flex-col gap-2">
          <p className="text-caption text-foreground">1 · 기본</p>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger>
              <SelectValue placeholder="숙소 유형을 선택하세요" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="entire">집 전체</SelectItem>
              <SelectItem value="private">개인실</SelectItem>
              <SelectItem value="hotel">호텔 객실</SelectItem>
              <SelectItem value="shared" disabled>
                다인실 (품절)
              </SelectItem>
            </SelectContent>
          </Select>
          <p className="text-caption-sm text-muted-foreground">
            선택된 값: {type ?? "(없음)"}
          </p>
        </section>

        {/* 2. Field 조합 — 라벨 + 헬퍼, 접근성 자동 배선 */}
        <section className="flex flex-col gap-2">
          <p className="text-caption text-foreground">2 · Field + 헬퍼</p>
          <Select>
            <Field label="숙소 유형" helper="원하는 유형을 골라 주세요">
              <SelectTrigger>
                <SelectValue placeholder="선택하세요" />
              </SelectTrigger>
            </Field>
            <SelectContent>
              <SelectItem value="entire">집 전체</SelectItem>
              <SelectItem value="private">개인실</SelectItem>
              <SelectItem value="hotel">호텔 객실</SelectItem>
            </SelectContent>
          </Select>
        </section>

        {/* 3. 에러 상태 — Field 의 error 가 트리거 보더까지 자동 연결 */}
        <section className="flex flex-col gap-2">
          <p className="text-caption text-foreground">3 · 에러 상태</p>
          <Select>
            <Field label="숙소 유형" error="숙소 유형을 선택해 주세요">
              <SelectTrigger>
                <SelectValue placeholder="선택하세요" />
              </SelectTrigger>
            </Field>
            <SelectContent>
              <SelectItem value="entire">집 전체</SelectItem>
              <SelectItem value="private">개인실</SelectItem>
            </SelectContent>
          </Select>
        </section>

        {/* 4. 비활성 트리거 */}
        <section className="flex flex-col gap-2">
          <p className="text-caption text-foreground">4 · 비활성</p>
          <Select disabled>
            <SelectTrigger>
              <SelectValue placeholder="선택할 수 없음" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="entire">집 전체</SelectItem>
            </SelectContent>
          </Select>
        </section>

        {/* 5. 그룹 + 라벨 + 세퍼레이터 (기본 선택값) */}
        <section className="flex flex-col gap-2">
          <p className="text-caption text-foreground">5 · 그룹</p>
          <Select defaultValue="seoul">
            <SelectTrigger>
              <SelectValue placeholder="지역 선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>국내</SelectLabel>
                <SelectItem value="seoul">서울</SelectItem>
                <SelectItem value="busan">부산</SelectItem>
                <SelectItem value="jeju">제주</SelectItem>
              </SelectGroup>
              <SelectSeparator />
              <SelectGroup>
                <SelectLabel>해외</SelectLabel>
                <SelectItem value="tokyo">도쿄</SelectItem>
                <SelectItem value="paris">파리</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </section>

        {/* 참고: 인풋(03) — 트리거와 같은 스펙인지 나란히 비교 */}
        <section className="flex flex-col gap-4 border-t border-hairline pt-8">
          <p className="text-caption text-foreground">참고 · 인풋(03) 비교</p>
          <Field label="전화번호" helper="예약 확인 메시지를 받을 번호입니다.">
            <Input placeholder="010-1234-5678" />
          </Field>
          <Field label="전화번호" error="전화번호를 정확히 입력해 주세요.">
            <Input defaultValue="010-12" />
          </Field>
        </section>
      </div>
    </main>
  );
}
