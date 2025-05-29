import type { InputHTMLAttributes } from "react";
import React, { forwardRef } from "react";

interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
  errors?: string[];
  onValueChange: (value: string) => void;
}

export const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(
  ({ errors = [], onValueChange, type, ...rest }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let { value } = e.target;
      if (type !== "number") {
        value = value.replace(/,/g, "");
        if (!isNaN(Number(value)) && value !== "") {
          value = Number(value).toLocaleString();
        }
      }
      onValueChange(value);
    };
    return (
      <div className="flex flex-col items-center gap-2">
        <input
          {...rest}
          ref={ref}
          className="h-10 w-full rounded-md border-none bg-transparent pl-4 ring-2 ring-neutral-200 transition placeholder:text-neutral-400 focus:ring-4 focus:ring-orange-500 focus:outline-none"
          onChange={handleChange}
        />
        {errors.length > 0 &&
          errors.map((error, idx) => (
            <span className="font-medium text-red-500" key={idx}>
              {error}
            </span>
          ))}
      </div>
    );
  }
);
InputNumber.displayName = "InputNumber";
