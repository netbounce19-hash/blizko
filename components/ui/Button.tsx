"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";
import { Loader2 } from "lucide-react";

/* Варианты кнопок дизайн-системы «БЛИЗКО» */
type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  fullWidth?: boolean;
}

/* Стили для каждого варианта */
const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    backgroundColor: "var(--color-accent)",
    color: "#FFFFFF",
    border: "none",
  },
  secondary: {
    backgroundColor: "var(--color-accent-2)",
    color: "#FFFFFF",
    border: "none",
  },
  outline: {
    backgroundColor: "transparent",
    color: "var(--color-text)",
    border: "1px solid var(--color-border)",
  },
  ghost: {
    backgroundColor: "transparent",
    color: "var(--color-text-secondary)",
    border: "none",
  },
};

const hoverStyles: Record<ButtonVariant, React.CSSProperties> = {
  primary: { backgroundColor: "var(--color-accent-hover)" },
  secondary: { backgroundColor: "var(--color-accent-2-hover)" },
  outline: {
    borderColor: "var(--color-accent)",
    color: "var(--color-accent)",
  },
  ghost: {
    backgroundColor: "var(--color-surface)",
    color: "var(--color-text)",
  },
};

/* Размеры */
const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3 text-base",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      fullWidth = false,
      className = "",
      disabled,
      children,
      style,
      onMouseEnter,
      onMouseLeave,
      ...props
    },
    ref
  ) {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`
          inline-flex items-center justify-center gap-2
          font-medium rounded-full
          ${sizeStyles[size]}
          ${fullWidth ? "w-full" : ""}
          ${disabled || isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
          ${className}
        `}
        style={{
          ...variantStyles[variant],
          transition:
            "background-color var(--transition-base), color var(--transition-base), border-color var(--transition-base), transform var(--transition-fast)",
          ...style,
        }}
        onMouseEnter={(e) => {
          if (!disabled && !isLoading) {
            Object.assign(e.currentTarget.style, hoverStyles[variant]);
          }
          onMouseEnter?.(e);
        }}
        onMouseLeave={(e) => {
          if (!disabled && !isLoading) {
            Object.assign(e.currentTarget.style, variantStyles[variant]);
          }
          onMouseLeave?.(e);
        }}
        onMouseDown={(e) => {
          if (!disabled && !isLoading) {
            e.currentTarget.style.transform = "scale(0.97)";
          }
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
        {...props}
      >
        {isLoading && (
          <Loader2
            className="w-4 h-4 animate-spin"
            strokeWidth={1.5}
            aria-hidden="true"
          />
        )}
        {children}
      </button>
    );
  }
);
