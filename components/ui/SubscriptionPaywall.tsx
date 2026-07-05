"use client";

import { Lock, Sparkles } from "lucide-react";
import { Button } from "./Button";
import Link from "next/link";

/* Модалка paywall — мягкий призыв оформить подписку */
/* Без давящего тона: тёплый, поддерживающий текст */

interface SubscriptionPaywallProps {
  onClose: () => void;
}

export function SubscriptionPaywall({ onClose }: SubscriptionPaywallProps) {
  return (
    <div className="text-center py-2">
      {/* Иконка */}
      <div
        className="w-14 h-14 rounded-full mx-auto mb-5 flex items-center justify-center"
        style={{
          backgroundColor: "rgba(124, 152, 133, 0.08)",
        }}
      >
        <Lock
          className="w-6 h-6"
          style={{ color: "var(--color-accent)" }}
          strokeWidth={1.5}
        />
      </div>

      {/* Заголовок — без давления */}
      <h3
        className="text-xl mb-2"
        style={{
          fontFamily: "var(--font-heading)",
          fontWeight: 500,
          color: "var(--color-text)",
        }}
      >
        Этот ролик доступен по подписке
      </h3>

      {/* Тёплый текст */}
      <p
        className="text-sm mb-6 max-w-sm mx-auto leading-relaxed"
        style={{ color: "var(--color-text-secondary)" }}
      >
        Подписка открывает доступ ко всей библиотеке аудио-терапии —
        более 50 практик для работы с тревогой, самооценкой, сном
        и другими важными темами.
      </p>

      {/* Преимущества */}
      <ul className="text-left max-w-xs mx-auto mb-6 space-y-2.5">
        {[
          "Полный доступ ко всем аудио-роликам",
          "Новые практики каждую неделю",
          "Персональная история прослушивания",
          "Возможность задать анонимный вопрос",
        ].map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm">
            <Sparkles
              className="w-4 h-4 mt-0.5 flex-shrink-0"
              style={{ color: "var(--color-accent)" }}
              strokeWidth={1.5}
            />
            <span style={{ color: "var(--color-text-secondary)" }}>{item}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div className="space-y-2.5">
        <Link href="/subscribe">
          <Button variant="primary" size="lg" fullWidth>
            Оформить подписку
          </Button>
        </Link>
        <button
          onClick={onClose}
          className="text-sm w-full py-2"
          style={{
            color: "var(--color-text-secondary)",
            transition: "color var(--transition-base)",
          }}
        >
          Продолжить бесплатно
        </button>
      </div>
    </div>
  );
}
