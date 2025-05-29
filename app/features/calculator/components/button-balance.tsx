import React from "react";
import { useFormStatus } from "react-dom";

interface ButtonBalanceProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  className?: string;
}

export function ButtonBalance({
  text,
  className = "",
  ...rest
}: ButtonBalanceProps) {
  const { pending } = useFormStatus();
  return (
    <button
      className={`primary-btn h-10 disabled:cursor-not-allowed disabled:bg-neutral-400 disabled:text-neutral-300 ${className}`}
      disabled={pending}
      {...rest}
    >
      {pending ? "로딩 중..." : text}
    </button>
  );
}
