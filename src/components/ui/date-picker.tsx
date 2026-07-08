"use client";

import * as React from "react";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

/**
 * 데이트 피커 (Date Picker) — 에어비앤비 디자인 시스템 28
 *
 * react-day-picker 같은 의존성 없이 순수 React + Date 산술로 짠 경량 달력.
 *
 * 배우는 것:
 * - 한 달의 그리드를 만드는 Date 산술: 1일의 요일만큼 앞을 채우고(선행 공백),
 *   7의 배수가 되도록 뒤를 채워 6줄이 아닌 필요한 만큼의 주(week)만 렌더
 * - 시간(00:00 정규화) 기준 동일 날짜 비교 헬퍼(isSameDay)로 선택/오늘 판정
 * - Intl.DateTimeFormat(ko-KR) 로 "2026년 11월 3일" 같은 로케일 포맷
 * - 트리거는 인풋(03)의 h14·r8·inset box-shadow 보더 스펙을 그대로 재사용,
 *   달력은 팝오버(공통 컨테이너) 안에 띄운다
 *
 * 스펙:
 * - 달력: r14 · pad 24 · shadow-card
 * - 헤더: 월 라벨 title-md 16/600 · 이전/다음 버튼 32×32 r-full bg #F2F2F2
 * - 요일: caption 12px #6A6A6A · 셀 40×40 body-sm 14
 * - 선택: r-full bg #222 text #FFF · 오늘: 링(#222) · 이번달 밖: #C1C1C1
 */

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"] as const;

/** 00:00 로 정규화해 같은 날짜인지 비교 */
function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/** 해당 월 그리드에 그릴 날짜들(선행 공백은 이전달, 후행은 다음달로 채운다) */
function buildMonthGrid(viewDate: Date): Date[] {
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstOfMonth = new Date(year, month, 1);
  const leading = firstOfMonth.getDay(); // 0(일)~6(토)
  const start = new Date(year, month, 1 - leading);

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const total = Math.ceil((leading + daysInMonth) / 7) * 7;

  return Array.from({ length: total }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
}

const monthLabelFmt = new Intl.DateTimeFormat("ko-KR", {
  year: "numeric",
  month: "long",
});

const fullDateFmt = new Intl.DateTimeFormat("ko-KR", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

type CalendarProps = {
  selected?: Date;
  onSelect?: (date: Date) => void;
  /** 처음 보여줄 달(기본: 선택값 또는 오늘) */
  defaultMonth?: Date;
  className?: string;
};

function Calendar({
  selected,
  onSelect,
  defaultMonth,
  className,
}: CalendarProps) {
  const today = React.useMemo(() => new Date(), []);
  const [viewDate, setViewDate] = React.useState(
    () =>
      new Date(
        (defaultMonth ?? selected ?? today).getFullYear(),
        (defaultMonth ?? selected ?? today).getMonth(),
        1,
      ),
  );

  const days = React.useMemo(() => buildMonthGrid(viewDate), [viewDate]);
  const viewMonth = viewDate.getMonth();

  const goToMonth = (delta: number) =>
    setViewDate((d) => new Date(d.getFullYear(), d.getMonth() + delta, 1));

  return (
    <div data-slot="calendar" className={cn("w-min select-none", className)}>
      {/* 헤더: ‹ 2026년 11월 › */}
      <div className="mb-4 flex w-[280px] items-center justify-between">
        <button
          type="button"
          aria-label="이전 달"
          onClick={() => goToMonth(-1)}
          className="flex size-8 items-center justify-center rounded-full bg-surface-strong text-foreground transition-colors hover:bg-hairline-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <ChevronLeft className="size-4" />
        </button>
        <span className="text-title-md">{monthLabelFmt.format(viewDate)}</span>
        <button
          type="button"
          aria-label="다음 달"
          onClick={() => goToMonth(1)}
          className="flex size-8 items-center justify-center rounded-full bg-surface-strong text-foreground transition-colors hover:bg-hairline-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>

      {/* 요일 행 */}
      <div className="mb-1 grid grid-cols-7 justify-items-center">
        {WEEKDAYS.map((wd) => (
          <span key={wd} className="py-1.5 text-xs text-muted-foreground">
            {wd}
          </span>
        ))}
      </div>

      {/* 날짜 그리드 */}
      <div className="grid grid-cols-7">
        {days.map((day) => {
          const outside = day.getMonth() !== viewMonth;
          const isSelected = selected ? isSameDay(day, selected) : false;
          const isToday = isSameDay(day, today);

          return (
            <button
              type="button"
              key={day.toISOString()}
              onClick={() => onSelect?.(day)}
              aria-pressed={isSelected}
              className={cn(
                "flex size-10 items-center justify-center rounded-full text-body-sm text-foreground transition-colors",
                "hover:bg-surface-soft focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring",
                outside && "text-border-strong",
                isToday &&
                  !isSelected &&
                  "shadow-[inset_0_0_0_1px_var(--foreground)]",
                isSelected &&
                  "bg-foreground text-background hover:bg-foreground",
              )}
            >
              {day.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

type DatePickerProps = {
  value?: Date;
  onChange?: (date: Date) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
};

function DatePicker({
  value,
  onChange,
  placeholder = "날짜 선택",
  disabled,
  className,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          data-slot="date-picker-trigger"
          disabled={disabled}
          className={cn(
            "flex h-14 w-full min-w-0 items-center justify-between gap-2 rounded-sm bg-transparent px-3 text-left text-base text-foreground transition-shadow outline-none",
            !value && "text-muted-foreground",
            // 인풋(03)과 동일한 inset box-shadow 보더
            "shadow-[inset_0_0_0_1px_var(--input)]",
            "focus-visible:shadow-[inset_0_0_0_2px_var(--foreground)]",
            "data-[state=open]:shadow-[inset_0_0_0_2px_var(--foreground)]",
            "disabled:cursor-not-allowed disabled:bg-surface-soft disabled:text-muted-soft disabled:shadow-[inset_0_0_0_1px_var(--hairline-soft)]",
            className,
          )}
        >
          <span className="truncate">
            {value ? fullDateFmt.format(value) : placeholder}
          </span>
          <CalendarIcon className="size-5 shrink-0 text-body" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-6">
        <Calendar
          selected={value}
          defaultMonth={value}
          onSelect={(date) => {
            onChange?.(date);
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}

export { Calendar, DatePicker };
