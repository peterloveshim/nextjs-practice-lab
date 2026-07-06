import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function Test() {
  return (
    <div>
      {/* Default */}
      <Field label="전화번호" helper="예약 확인 메시지를 받을 번호입니다.">
        <Input placeholder="010-1234-5678" />
      </Field>

      {/* Error — 헬퍼 대신 error 를 넘기면 인풋 보더까지 자동으로 에러색 */}
      <Field label="전화번호" error="전화번호를 정확히 입력해 주세요.">
        <Input defaultValue="010-12" />
      </Field>
    </div>
  );
}
