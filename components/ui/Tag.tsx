"use client";

/* Тег / бейдж для обозначения темы ролика */

interface TagProps {
  label: string;
  isActive?: boolean;
  onClick?: () => void;
  size?: "sm" | "md";
}

export function Tag({ label, isActive = false, onClick, size = "sm" }: TagProps) {
  const isClickable = !!onClick;

  const baseStyles: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    borderRadius: "var(--radius-full)",
    fontWeight: 400,
    transition:
      "background-color var(--transition-base), color var(--transition-base), border-color var(--transition-base)",
    cursor: isClickable ? "pointer" : "default",
    border: "1px solid",
    borderColor: isActive ? "var(--color-accent)" : "var(--color-border)",
    backgroundColor: isActive ? "var(--color-accent)" : "transparent",
    color: isActive ? "#FFFFFF" : "var(--color-text-secondary)",
    fontSize: size === "sm" ? "0.75rem" : "0.8125rem",
    padding: size === "sm" ? "0.25rem 0.75rem" : "0.375rem 1rem",
    lineHeight: "1.4",
  };

  if (isClickable) {
    return (
      <button
        onClick={onClick}
        style={baseStyles}
        onMouseEnter={(e) => {
          if (!isActive) {
            e.currentTarget.style.borderColor = "var(--color-accent)";
            e.currentTarget.style.color = "var(--color-accent)";
          }
        }}
        onMouseLeave={(e) => {
          if (!isActive) {
            e.currentTarget.style.borderColor = "var(--color-border)";
            e.currentTarget.style.color = "var(--color-text-secondary)";
          }
        }}
        aria-pressed={isActive}
        type="button"
      >
        {label}
      </button>
    );
  }

  return <span style={baseStyles}>{label}</span>;
}

/* Бейдж «Бесплатно» для превью-треков */
export function FreeBadge() {
  return (
    <span
      className="inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-full"
      style={{
        backgroundColor: "rgba(124, 152, 133, 0.1)",
        color: "var(--color-accent)",
      }}
    >
      Бесплатно
    </span>
  );
}
