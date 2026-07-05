"use client";

import { useEffect, useRef, useCallback } from "react";
import { X } from "lucide-react";

/* Модальное окно для десктопа */

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  maxWidth?: string;
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "480px",
}: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  /* Закрытие по Escape */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  /* Фокус-трап */
  useEffect(() => {
    if (isOpen && contentRef.current) {
      const focusable = contentRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length > 0) {
        focusable[0].focus();
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        backgroundColor: "var(--color-overlay)",
        animation: "fade-in 0.2s ease-out",
      }}
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={title || "Диалоговое окно"}
    >
      <div
        ref={contentRef}
        className="relative w-full rounded-2xl overflow-hidden"
        style={{
          maxWidth,
          backgroundColor: "var(--color-bg)",
          boxShadow: "var(--shadow-elevated)",
          borderRadius: "var(--radius-lg)",
          animation: "scale-in 0.2s ease-out",
        }}
      >
        {/* Заголовок */}
        {title && (
          <div
            className="flex items-center justify-between px-6 py-4 border-b"
            style={{ borderColor: "var(--color-border)" }}
          >
            <h2
              className="text-lg"
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 500,
                color: "var(--color-text)",
              }}
            >
              {title}
            </h2>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full"
              style={{
                color: "var(--color-text-secondary)",
                transition: "all var(--transition-base)",
              }}
              aria-label="Закрыть"
            >
              <X className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </div>
        )}

        {/* Контент */}
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
}

/* Bottom Sheet для мобильных устройств */
interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export function BottomSheet({
  isOpen,
  onClose,
  title,
  children,
}: BottomSheetProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end"
      style={{
        backgroundColor: "var(--color-overlay)",
        animation: "fade-in 0.2s ease-out",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={title || "Панель"}
    >
      <div
        className="w-full max-h-[85vh] overflow-y-auto rounded-t-2xl"
        style={{
          backgroundColor: "var(--color-bg)",
          boxShadow: "var(--shadow-elevated)",
          animation: "slide-up 0.3s ease-out",
        }}
      >
        {/* Полоска-индикатор свайпа */}
        <div className="flex justify-center py-3">
          <div
            className="w-10 h-1 rounded-full"
            style={{ backgroundColor: "var(--color-border)" }}
          />
        </div>

        {/* Заголовок */}
        {title && (
          <div
            className="flex items-center justify-between px-5 pb-3 border-b"
            style={{ borderColor: "var(--color-border)" }}
          >
            <h2
              className="text-lg"
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 500,
              }}
            >
              {title}
            </h2>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full"
              style={{ color: "var(--color-text-secondary)" }}
              aria-label="Закрыть"
            >
              <X className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </div>
        )}

        <div className="px-5 py-4 pb-8">{children}</div>
      </div>
    </div>
  );
}
