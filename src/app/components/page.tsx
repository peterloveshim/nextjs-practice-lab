"use client";

import * as React from "react";
import { Heart, Search, Settings } from "lucide-react";
import { toast } from "sonner";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { DatePicker } from "@/components/ui/date-picker";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Field } from "@/components/ui/field";
import { Footer } from "@/components/ui/footer";
import { IconButton } from "@/components/ui/icon-button";
import { Input } from "@/components/ui/input";
import { LegalLine, LegalLineLink } from "@/components/ui/legal-line";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Review } from "@/components/ui/review";
import { SearchBar } from "@/components/ui/search-bar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import { Stepper } from "@/components/ui/stepper";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";

/**
 * 디자인 시스템 쇼케이스 (/components)
 *
 * 지금까지 만든 31개 컴포넌트를 한 페이지에서 상태별로 확인한다.
 * (연습장용 스크래치 라우트 — 갤러리/레지스트리와 별개)
 */
export default function ComponentsShowcasePage() {
  const [guests, setGuests] = React.useState(2);
  const [checked, setChecked] = React.useState<boolean | "indeterminate">(true);
  const [date, setDate] = React.useState<Date>();

  return (
    <TooltipProvider>
      <main className="mx-auto flex max-w-3xl flex-col gap-14 px-6 py-16">
        <header className="flex flex-col gap-2">
          <p className="text-caption text-muted-foreground">
            에어비앤비 디자인 시스템
          </p>
          <h1 className="text-display-xl text-foreground">컴포넌트 쇼케이스</h1>
          <p className="text-body-md text-body">
            01–31 컴포넌트를 상태별로 모아 둔 확인용 페이지입니다.
          </p>
        </header>

        {/* 01 버튼 */}
        <Section n="01" title="버튼 (Button)">
          <Row>
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="tertiary">Tertiary</Button>
            <Button size="pill">Pill</Button>
            <Button disabled>Disabled</Button>
          </Row>
        </Section>

        {/* 02 아이콘 버튼 */}
        <Section n="02" title="아이콘 버튼 (Icon Button)">
          <Row>
            <IconButton aria-label="좋아요">
              <Heart />
            </IconButton>
            <IconButton aria-label="검색" variant="outline">
              <Search />
            </IconButton>
            <IconButton aria-label="설정" variant="primary">
              <Settings />
            </IconButton>
            <IconButton aria-label="작게" size="sm" variant="outline">
              <Heart />
            </IconButton>
          </Row>
        </Section>

        {/* 03 인풋 / 04 필드 / 05 텍스트에어리어 */}
        <Section n="03·04·05" title="인풋 · 필드 · 텍스트에어리어">
          <div className="flex flex-col gap-4">
            <Field label="이메일" helper="로그인에 사용됩니다.">
              <Input type="email" placeholder="you@example.com" />
            </Field>
            <Field label="전화번호" error="형식이 올바르지 않습니다.">
              <Input defaultValue="010-12" />
            </Field>
            <Field label="메모">
              <Textarea placeholder="자유롭게 적어 주세요" />
            </Field>
          </div>
        </Section>

        {/* 06 셀렉트 */}
        <Section n="06" title="셀렉트 (Select)">
          <Select defaultValue="entire">
            <SelectTrigger className="max-w-xs">
              <SelectValue placeholder="숙소 유형" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="entire">집 전체</SelectItem>
              <SelectItem value="private">개인실</SelectItem>
              <SelectItem value="hotel">호텔 객실</SelectItem>
            </SelectContent>
          </Select>
        </Section>

        {/* 07 체크박스 */}
        <Section n="07" title="체크박스 (Checkbox)">
          <Row>
            <Checkbox />
            <Checkbox defaultChecked />
            <Checkbox checked="indeterminate" />
            <Checkbox aria-invalid />
            <Checkbox disabled />
            <Label className="gap-3 text-base font-normal">
              <Checkbox checked={checked} onCheckedChange={setChecked} />
              전체 동의 (제어)
            </Label>
          </Row>
        </Section>

        {/* 08 라디오 */}
        <Section n="08" title="라디오 (Radio)">
          <RadioGroup defaultValue="flex" className="flex flex-col gap-3.5">
            <Label className="gap-3 text-base font-normal">
              <RadioGroupItem value="flex" /> 유연한 환불
            </Label>
            <Label className="gap-3 text-base font-normal">
              <RadioGroupItem value="std" /> 일반 환불
            </Label>
            <Label className="gap-3 text-base font-normal has-[:disabled]:text-muted-soft">
              <RadioGroupItem value="none" disabled /> 환불 불가
            </Label>
          </RadioGroup>
        </Section>

        {/* 09 스위치 / 10 슬라이더 / 11 스텝퍼 */}
        <Section n="09·10·11" title="스위치 · 슬라이더 · 스텝퍼">
          <div className="flex flex-col gap-6">
            <label className="flex items-center gap-3 text-body-md">
              <Switch defaultChecked /> 셀프 체크인만 보기
            </label>
            <Slider defaultValue={[60]} className="max-w-sm" />
            <Slider defaultValue={[20, 70]} className="max-w-sm" />
            <div className="flex items-center gap-3">
              <span className="text-body-md">성인</span>
              <Stepper
                aria-label="성인 인원"
                value={guests}
                onValueChange={setGuests}
                min={1}
                max={16}
              />
            </div>
          </div>
        </Section>

        {/* 12 배지 */}
        <Section n="12" title="배지 (Badge)">
          <Row>
            <Badge variant="neutral">신규</Badge>
            <Badge variant="guest-favorite">게스트 선호</Badge>
            <Badge variant="ink">Superhost</Badge>
            <Badge variant="promo">특가</Badge>
            <Badge variant="tag">new</Badge>
          </Row>
        </Section>

        {/* 13 아바타 */}
        <Section n="13" title="아바타 (Avatar)">
          <Row>
            <Avatar size="sm">
              <AvatarFallback>김</AvatarFallback>
            </Avatar>
            <Avatar size="md">
              <AvatarFallback>이</AvatarFallback>
            </Avatar>
            <Avatar size="lg">
              <AvatarImage src="https://i.pravatar.cc/80?img=5" alt="수진" />
              <AvatarFallback>수</AvatarFallback>
            </Avatar>
            <Avatar size="xl">
              <AvatarFallback>호</AvatarFallback>
            </Avatar>
          </Row>
        </Section>

        {/* 14 카드 */}
        <Section n="14" title="카드 (Card)">
          <Card className="max-w-sm">
            <CardHeader>
              <CardTitle>서귀포시의 독채</CardTitle>
              <CardDescription>제주도 · 4명 · 침대 2개</CardDescription>
            </CardHeader>
            <CardContent className="text-body-sm text-body">
              오션뷰 통창과 노천 욕조가 있는 독채 숙소입니다.
            </CardContent>
            <CardFooter className="justify-between">
              <span className="text-title-sm">₩211,000 / 박</span>
              <Button size="pill">예약</Button>
            </CardFooter>
          </Card>
        </Section>

        {/* 15 알럿 / 16 토스트 */}
        <Section n="15·16" title="알럿 · 토스트">
          <div className="flex flex-col gap-4">
            <Alert variant="info">
              <AlertTitle>결제 예정 안내</AlertTitle>
              <AlertDescription>
                체크인 7일 전에 잔액이 자동 결제됩니다.
              </AlertDescription>
            </Alert>
            <Alert variant="error">
              <AlertTitle>결제 실패</AlertTitle>
              <AlertDescription>
                카드 정보를 다시 확인해 주세요.
              </AlertDescription>
            </Alert>
            <div>
              <Button
                variant="secondary"
                onClick={() =>
                  toast("예약이 확정되었습니다", {
                    description: "11월 3일 ~ 11월 8일 · 서귀포시의 독채",
                  })
                }
              >
                토스트 띄우기
              </Button>
            </div>
          </div>
        </Section>

        {/* 17 다이얼로그 / 18 드롭다운 / 19 툴팁 */}
        <Section n="17·18·19" title="다이얼로그 · 드롭다운 · 툴팁">
          <Row>
            <Dialog>
              <DialogTrigger asChild>
                <Button>예약 취소</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>정말 취소하시겠어요?</DialogTitle>
                  <DialogDescription>
                    체크인 3일 전이므로 전액 환불됩니다.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="tertiary">닫기</Button>
                  </DialogClose>
                  <Button>취소하기</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary">메뉴</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuLabel>내 계정</DropdownMenuLabel>
                <DropdownMenuItem>여행</DropdownMenuItem>
                <DropdownMenuItem>위시리스트</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>로그아웃</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="tertiary">청소비 안내</Button>
              </TooltipTrigger>
              <TooltipContent>청소비가 포함된 가격입니다</TooltipContent>
            </Tooltip>
          </Row>
        </Section>

        {/* 20 탭 / 21 아코디언 */}
        <Section n="20·21" title="탭 · 아코디언">
          <div className="flex flex-col gap-8">
            <Tabs defaultValue="stay">
              <TabsList>
                <TabsTrigger value="stay">숙소</TabsTrigger>
                <TabsTrigger value="exp">체험</TabsTrigger>
                <TabsTrigger value="svc">서비스</TabsTrigger>
              </TabsList>
              <TabsContent value="stay" className="pt-4 text-body-sm text-body">
                숙소 목록입니다.
              </TabsContent>
              <TabsContent value="exp" className="pt-4 text-body-sm text-body">
                체험 목록입니다.
              </TabsContent>
              <TabsContent value="svc" className="pt-4 text-body-sm text-body">
                서비스 목록입니다.
              </TabsContent>
            </Tabs>

            <Accordion type="single" collapsible>
              <AccordionItem value="refund">
                <AccordionTrigger>환불 정책</AccordionTrigger>
                <AccordionContent>
                  체크인 3일 전까지 취소하면 전액 환불됩니다.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="checkin">
                <AccordionTrigger>체크인 안내</AccordionTrigger>
                <AccordionContent>
                  오후 3시부터 셀프 체크인이 가능합니다.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </Section>

        {/* 22 브레드크럼 / 23 페이지네이션 */}
        <Section n="22·23" title="브레드크럼 · 페이지네이션">
          <div className="flex flex-col gap-6">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">홈</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">제주도 숙소</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>서귀포시의 독채</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">12</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </Section>

        {/* 24 테이블 */}
        <Section n="24" title="테이블 (Table)">
          <Table>
            <TableCaption>최근 예약 내역</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>예약</TableHead>
                <TableHead>날짜</TableHead>
                <TableHead>상태</TableHead>
                <TableHead className="text-right">금액</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">서귀포시의 독채</TableCell>
                <TableCell className="text-muted-foreground">
                  11. 3. ~ 11. 8.
                </TableCell>
                <TableCell>확정</TableCell>
                <TableCell className="text-right">₩1,055,000</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">부산 오션뷰</TableCell>
                <TableCell className="text-muted-foreground">
                  12. 24. ~ 12. 26.
                </TableCell>
                <TableCell>대기</TableCell>
                <TableCell className="text-right">₩420,000</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Section>

        {/* 25 스켈레톤 */}
        <Section n="25" title="스켈레톤 (Skeleton)">
          <div className="flex items-center gap-4">
            <Skeleton className="size-14 rounded-full" />
            <div className="flex flex-1 flex-col gap-2">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </Section>

        {/* 26 법적 고지 / 27 세퍼레이터 */}
        <Section n="26·27" title="법적 고지 라인 · 세퍼레이터">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4 text-body-sm">
              후기 128개
              <Separator orientation="vertical" className="h-4" />
              슈퍼호스트
              <Separator orientation="vertical" className="h-4" />
              제주도
            </div>
            <Separator />
            <Separator tone="soft" />
            <LegalLine>
              © 2026 Airbnb, Inc. ·{" "}
              <LegalLineLink href="#">개인정보 처리방침</LegalLineLink> ·{" "}
              <LegalLineLink href="#">이용약관</LegalLineLink>
            </LegalLine>
          </div>
        </Section>

        {/* 28 데이트 피커 / 29 검색바 */}
        <Section n="28·29" title="데이트 피커 · 검색바">
          <div className="flex flex-col gap-6">
            <div className="max-w-xs">
              <DatePicker value={date} onChange={setDate} />
            </div>
            <SearchBar onSearch={() => toast("검색 실행")} />
          </div>
        </Section>

        {/* 30 리뷰 */}
        <Section n="30" title="리뷰 (Review)">
          <Review
            name="수진"
            meta="2026년 6월 · 에어비앤비 가입 3년"
            rating={5}
            body="사진보다 훨씬 좋았어요. 호스트님이 체크인 안내도 친절하게 해주셨고, 오션뷰가 정말 예술이었습니다. 다음에 제주도 오면 또 묵고 싶어요."
          />
        </Section>

        {/* 31 푸터 */}
        <Section n="31" title="푸터 (Footer)">
          <Footer />
        </Section>
      </main>
    </TooltipProvider>
  );
}

function Section({
  n,
  title,
  children,
}: {
  n: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-baseline gap-3">
        <span className="text-caption-sm text-muted-soft tabular-nums">
          {n}
        </span>
        <h2 className="text-display-sm text-foreground">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap items-center gap-4">{children}</div>;
}
