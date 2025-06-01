import type { ChangeEvent, InputHTMLAttributes } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

function formatPhoneNumber(value: string) {
  // 모든 +, -, 공백, 0, 82를 제거하고 숫자만 남김
  let numbers = value.replace(/[^0-9]/g, "");

  // 0으로 시작하면 0 제거
  if (numbers.startsWith("0")) {
    numbers = numbers.slice(1);
  }
  // 82로 시작하면 82 제거 (국제번호 붙여넣기 등)
  if (numbers.startsWith("82")) {
    numbers = numbers.slice(2);
  }

  // 아무것도 없으면 빈 문자열
  if (!numbers) return "";

  // 2자리 이하: +82-xx
  if (numbers.length <= 2) return `+82-${numbers}`;
  // 3~6자리: +82-xx-xxxx
  if (numbers.length <= 6)
    return `+82-${numbers.slice(0, 2)}-${numbers.slice(2)}`;
  // 7자리 이상: +82-xx-xxxx-xxxx
  return `+82-${numbers.slice(0, 2)}-${numbers.slice(2, 6)}-${numbers.slice(6, 10)}`;
}

export default function InputPair({
  label,
  description,
  textArea = false,
  onChange,
  type,
  id,
  name,
  ...rest
}: {
  label?: string;
  description?: string;
  textArea?: boolean;
} & InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>) {
  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    if ((type === "text" || id === "phone" || name === "phone") && !textArea) {
      const formatted = formatPhoneNumber(e.target.value);
      e.target.value = formatted;
      if (onChange) onChange(e);
    } else {
      if (onChange) onChange(e);
    }
  }

  return (
    <div className="flex flex-col space-y-2">
      <Label htmlFor={id} className="flex flex-col gap-1 text-left">
        {label}
        <small className="text-muted-foreground block text-left">
          {description}
        </small>
      </Label>
      {textArea ? (
        <Textarea
          rows={4}
          className="resize-none"
          onChange={handleChange}
          id={id}
          name={name}
          {...rest}
        />
      ) : (
        <Input
          onChange={handleChange}
          type={type}
          id={id}
          name={name}
          {...rest}
        />
      )}
    </div>
  );
}
