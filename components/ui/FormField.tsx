"use client";

import { forwardRef } from "react";
import type { FieldError } from "react-hook-form";

/* Обёртка для полей формы с поддержкой react-hook-form */

interface FormFieldProps {
  label: string;
  error?: FieldError;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}

export function FormFieldWrapper({
  label,
  error,
  hint,
  required,
  children,
}: FormFieldProps) {
  return (
    <div className="mb-5">
      <label className="block mb-1.5">
        <span
          className="text-sm font-medium"
          style={{ color: "var(--color-text)" }}
        >
          {label}
          {required && (
            <span style={{ color: "var(--color-warning)" }} className="ml-0.5">
              *
            </span>
          )}
        </span>
      </label>
      {children}
      {hint && !error && (
        <p
          className="mt-1 text-xs"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {hint}
        </p>
      )}
      {error && (
        <p
          className="mt-1 text-xs"
          style={{ color: "var(--color-warning)" }}
          role="alert"
        >
          {error.message}
        </p>
      )}
    </div>
  );
}

/* Стили для Input и Textarea */
const inputBaseStyles: React.CSSProperties = {
  width: "100%",
  padding: "0.625rem 0.875rem",
  fontSize: "0.875rem",
  lineHeight: "1.6",
  color: "var(--color-text)",
  backgroundColor: "var(--color-white)",
  border: "1px solid var(--color-border)",
  borderRadius: "var(--radius-md)",
  transition:
    "border-color var(--transition-base), box-shadow var(--transition-base)",
  outline: "none",
};

const inputFocusHandler = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  e.currentTarget.style.borderColor = "var(--color-accent)";
  e.currentTarget.style.boxShadow = "0 0 0 3px rgba(124, 152, 133, 0.1)";
};

const inputBlurHandler = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  e.currentTarget.style.borderColor = "var(--color-border)";
  e.currentTarget.style.boxShadow = "none";
};

/* Input компонент */
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input({ hasError, style, ...props }, ref) {
    return (
      <input
        ref={ref}
        style={{
          ...inputBaseStyles,
          borderColor: hasError ? "var(--color-warning)" : "var(--color-border)",
          ...style,
        }}
        onFocus={inputFocusHandler}
        onBlur={inputBlurHandler}
        {...props}
      />
    );
  }
);

/* Textarea компонент */
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea({ hasError, style, ...props }, ref) {
    return (
      <textarea
        ref={ref}
        style={{
          ...inputBaseStyles,
          minHeight: "120px",
          resize: "vertical",
          borderColor: hasError ? "var(--color-warning)" : "var(--color-border)",
          ...style,
        }}
        onFocus={(e) => inputFocusHandler(e as unknown as React.FocusEvent<HTMLInputElement>)}
        onBlur={(e) => inputBlurHandler(e as unknown as React.FocusEvent<HTMLInputElement>)}
        {...props}
      />
    );
  }
);

/* Select компонент */
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  hasError?: boolean;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select({ hasError, options, placeholder, style, ...props }, ref) {
    return (
      <select
        ref={ref}
        style={{
          ...inputBaseStyles,
          cursor: "pointer",
          borderColor: hasError ? "var(--color-warning)" : "var(--color-border)",
          ...style,
        }}
        onFocus={(e) => inputFocusHandler(e as unknown as React.FocusEvent<HTMLInputElement>)}
        onBlur={(e) => inputBlurHandler(e as unknown as React.FocusEvent<HTMLInputElement>)}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    );
  }
);

/* Checkbox компонент */
interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: React.ReactNode;
  error?: FieldError;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox({ label, error, ...props }, ref) {
    return (
      <div className="mb-4">
        <label className="flex items-start gap-2.5 cursor-pointer">
          <input
            ref={ref}
            type="checkbox"
            className="mt-1 w-4 h-4 rounded cursor-pointer accent-[var(--color-accent)]"
            {...props}
          />
          <span
            className="text-sm leading-relaxed"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {label}
          </span>
        </label>
        {error && (
          <p
            className="mt-1 text-xs ml-6"
            style={{ color: "var(--color-warning)" }}
            role="alert"
          >
            {error.message}
          </p>
        )}
      </div>
    );
  }
);

/* Статус формы — success / error */
interface FormStatusProps {
  type: "success" | "error";
  message: string;
}

export function FormStatus({ type, message }: FormStatusProps) {
  return (
    <div
      className="rounded-xl px-4 py-3 text-sm animate-fade-in"
      style={{
        backgroundColor:
          type === "success" ? "rgba(124, 152, 133, 0.08)" : "rgba(199, 123, 88, 0.08)",
        color: type === "success" ? "var(--color-accent)" : "var(--color-warning)",
        border: `1px solid ${type === "success" ? "rgba(124, 152, 133, 0.2)" : "rgba(199, 123, 88, 0.2)"}`,
      }}
      role="status"
    >
      {message}
    </div>
  );
}
