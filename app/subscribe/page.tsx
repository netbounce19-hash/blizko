"use client";

import { useState } from "react";
import type { Metadata } from "next";
import {
  Check,
  Headphones,
  MessageCircle,
  Clock,
  Sparkles,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

/* Страница подписки с переключателем RUB/USD */

type Currency = "RUB" | "USD";

const plans: Record<Currency, { price: string; period: string; amount: number }> = {
  RUB: { price: "2 999 ₽", period: "месяц", amount: 299900 },
  USD: { price: "$39.99", period: "month", amount: 3999 },
};

const features = [
  {
    icon: Headphones,
    title: "Полный доступ к библиотеке",
    description: "Все аудио-ролики без ограничений по времени",
  },
  {
    icon: RefreshCw,
    title: "Новые практики каждую неделю",
    description: "Регулярные обновления библиотеки",
  },
  {
    icon: Clock,
    title: "История прослушивания",
    description: "Персональная статистика и прогресс",
  },
  {
    icon: MessageCircle,
    title: "Приоритет для вопросов",
    description: "Подписчики получают ответ быстрее",
  },
  {
    icon: Sparkles,
    title: "Эксклюзивные серии",
    description: "Доступ к углублённым курсам",
  },
];

export default function SubscribePage() {
  const [currency, setCurrency] = useState<Currency>("RUB");
  const [isLoading, setIsLoading] = useState(false);

  const plan = plans[currency];

  /* Обработка оплаты через адаптер */
  const handleSubscribe = async () => {
    setIsLoading(true);

    try {
      // TODO: Реальный вызов API для создания платежа
      // const res = await fetch("/api/payments/create", {
      //   method: "POST",
      //   body: JSON.stringify({ currency, amount: plan.amount }),
      // });
      // const { paymentUrl } = await res.json();
      // window.location.href = paymentUrl;

      // Заглушка
      alert(
        `Переход к оплате: ${plan.price}/${plan.period}\n\nТОДО: Подключить ${
          currency === "RUB" ? "YooKassa" : "Stripe"
        }`
      );
    } catch (error) {
      console.error("Ошибка создания платежа:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-12 md:py-20">
      <div className="container-site">
        <div className="max-w-2xl mx-auto text-center">
          {/* Заголовок */}
          <p
            className="text-sm font-medium mb-2 tracking-wide uppercase"
            style={{ color: "var(--color-accent)" }}
          >
            Подписка
          </p>
          <h1
            className="text-3xl md:text-4xl mb-4"
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 400,
            }}
          >
            Откройте полный доступ
          </h1>
          <p
            className="mb-8 max-w-md mx-auto leading-relaxed"
            style={{
              color: "var(--color-text-secondary)",
              lineHeight: 1.7,
            }}
          >
            Подписка открывает безлимитный доступ ко всей библиотеке
            аудио-терапии и эксклюзивным материалам.
          </p>

          {/* Переключатель валюты */}
          <div
            className="inline-flex items-center rounded-full p-1 mb-10"
            style={{
              backgroundColor: "var(--color-surface)",
            }}
            role="radiogroup"
            aria-label="Выбор валюты"
          >
            {(["RUB", "USD"] as Currency[]).map((curr) => (
              <button
                key={curr}
                onClick={() => setCurrency(curr)}
                className="px-5 py-2 text-sm font-medium rounded-full"
                style={{
                  backgroundColor:
                    currency === curr ? "var(--color-white)" : "transparent",
                  color:
                    currency === curr
                      ? "var(--color-text)"
                      : "var(--color-text-secondary)",
                  boxShadow: currency === curr ? "var(--shadow-card)" : "none",
                  transition: "all var(--transition-base)",
                }}
                role="radio"
                aria-checked={currency === curr}
              >
                {curr === "RUB" ? "₽ Рубли" : "$ Доллары"}
              </button>
            ))}
          </div>

          {/* Карточка тарифа */}
          <div
            className="rounded-2xl p-8 md:p-10 text-center mx-auto max-w-md"
            style={{
              backgroundColor: "var(--color-white)",
              boxShadow: "var(--shadow-card-hover)",
              borderRadius: "var(--radius-lg)",
              border: "1px solid rgba(124, 152, 133, 0.15)",
            }}
          >
            <p
              className="text-sm mb-2"
              style={{ color: "var(--color-accent)" }}
            >
              Ежемесячная подписка
            </p>
            <p
              className="text-4xl md:text-5xl mb-1"
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 500,
                color: "var(--color-text)",
              }}
            >
              {plan.price}
            </p>
            <p
              className="text-sm mb-6"
              style={{ color: "var(--color-text-secondary)" }}
            >
              / {plan.period}
            </p>

            {/* Список преимуществ */}
            <ul className="text-left space-y-3 mb-8">
              {features.map((feature) => (
                <li key={feature.title} className="flex items-start gap-3">
                  <Check
                    className="w-4 h-4 mt-0.5 flex-shrink-0"
                    style={{ color: "var(--color-accent)" }}
                    strokeWidth={2}
                  />
                  <div>
                    <p className="text-sm font-medium">
                      {feature.title}
                    </p>
                    <p
                      className="text-xs"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      {feature.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <Button
              variant="primary"
              size="lg"
              fullWidth
              isLoading={isLoading}
              onClick={handleSubscribe}
            >
              Оформить подписку
            </Button>

            <p
              className="text-xs mt-4"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Отмена в любое время. Оплата через{" "}
              {currency === "RUB" ? "ЮKassa" : "Stripe"}.
            </p>
          </div>

          {/* Дополнительная информация */}
          <div
            className="mt-10 rounded-xl p-5 text-left max-w-md mx-auto"
            style={{
              backgroundColor: "var(--color-surface)",
              borderRadius: "var(--radius-card)",
            }}
          >
            <h3
              className="text-sm font-medium mb-2"
              style={{ color: "var(--color-text)" }}
            >
              Часто задаваемые вопросы
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium">Можно ли отменить подписку?</p>
                <p
                  className="text-xs"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  Да, вы можете отменить подписку в любой момент в личном
                  кабинете. Доступ сохранится до конца оплаченного периода.
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Есть ли пробный период?</p>
                <p
                  className="text-xs"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  Вы можете прослушать первые 60 секунд любого ролика бесплатно,
                  а также полностью прослушать ролики с бейджем «Бесплатно».
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
