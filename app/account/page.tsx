"use client";

import Link from "next/link";
import {
  User,
  CreditCard,
  Clock,
  Heart,
  LogOut,
  Settings,
  Headphones,
  Crown,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { mockTracks, formatDuration } from "@/lib/mock-data";

/* Личный кабинет — страница требует авторизации */
/* TODO: Подключить реальные данные из Prisma после настройки NextAuth + DB */

/* Моковые данные для демонстрации кабинета */
const mockUser = {
  name: "Демо пользователь",
  email: "demo@blizko.app",
  subscriptionStatus: "ACTIVE" as const,
  subscriptionExpiresAt: "2025-02-15",
};

const mockHistory = mockTracks.slice(0, 4).map((track, i) => ({
  ...track,
  progressSeconds: Math.floor(track.durationSeconds * (0.3 + i * 0.15)),
  completed: i === 0,
  lastListened: `${i + 1} дн. назад`,
}));

const mockFavorites = mockTracks.slice(0, 3);

export default function AccountPage() {
  const isSubscribed = mockUser.subscriptionStatus === "ACTIVE";

  return (
    <div className="py-12 md:py-20">
      <div className="container-site">
        {/* Заголовок */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <p
              className="text-sm font-medium mb-2 tracking-wide uppercase"
              style={{ color: "var(--color-accent)" }}
            >
              Личный кабинет
            </p>
            <h1
              className="text-3xl md:text-4xl"
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 400,
              }}
            >
              Привет, {mockUser.name?.split(" ")[0] || "друг"} 👋
            </h1>
          </div>
          <button
            className="flex items-center gap-2 px-4 py-2 text-sm rounded-full"
            style={{
              border: "1px solid var(--color-border)",
              color: "var(--color-text-secondary)",
              transition: "all var(--transition-base)",
            }}
          >
            <LogOut className="w-4 h-4" strokeWidth={1.5} />
            Выйти
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* === Левая колонка — профиль и подписка === */}
          <div className="lg:col-span-1 space-y-6">
            {/* Профиль */}
            <div
              className="rounded-2xl p-5"
              style={{
                backgroundColor: "var(--color-white)",
                boxShadow: "var(--shadow-card)",
                borderRadius: "var(--radius-card)",
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "var(--color-surface)" }}
                >
                  <User
                    className="w-5 h-5"
                    style={{ color: "var(--color-text-secondary)" }}
                    strokeWidth={1.5}
                  />
                </div>
                <div>
                  <p className="text-sm font-medium">{mockUser.name}</p>
                  <p
                    className="text-xs"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    {mockUser.email}
                  </p>
                </div>
              </div>
              <button
                className="w-full text-left flex items-center gap-2 px-3 py-2 text-sm rounded-lg"
                style={{
                  color: "var(--color-text-secondary)",
                  transition: "background-color var(--transition-base)",
                }}
              >
                <Settings className="w-4 h-4" strokeWidth={1.5} />
                Настройки профиля
              </button>
            </div>

            {/* Статус подписки */}
            <div
              className="rounded-2xl p-5"
              style={{
                backgroundColor: isSubscribed
                  ? "rgba(124, 152, 133, 0.06)"
                  : "var(--color-white)",
                border: isSubscribed
                  ? "1px solid rgba(124, 152, 133, 0.15)"
                  : "none",
                boxShadow: isSubscribed ? "none" : "var(--shadow-card)",
                borderRadius: "var(--radius-card)",
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Crown
                  className="w-5 h-5"
                  style={{
                    color: isSubscribed
                      ? "var(--color-accent)"
                      : "var(--color-text-secondary)",
                  }}
                  strokeWidth={1.5}
                />
                <h3
                  className="text-sm font-medium"
                  style={{ color: "var(--color-text)" }}
                >
                  Подписка
                </h3>
              </div>

              {isSubscribed ? (
                <>
                  <p
                    className="text-sm mb-1"
                    style={{ color: "var(--color-accent)" }}
                  >
                    ✓ Активна
                  </p>
                  <p
                    className="text-xs mb-4"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    Следующее списание: {mockUser.subscriptionExpiresAt}
                  </p>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" fullWidth>
                      <CreditCard className="w-4 h-4" strokeWidth={1.5} />
                      Управление платежами
                    </Button>
                    <button
                      className="w-full text-xs py-2"
                      style={{
                        color: "var(--color-warning)",
                        transition: "opacity var(--transition-base)",
                      }}
                    >
                      Отменить подписку
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p
                    className="text-sm mb-4"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    У вас нет активной подписки
                  </p>
                  <Link href="/subscribe">
                    <Button variant="primary" size="md" fullWidth>
                      Оформить подписку
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* === Правая колонка — история и избранное === */}
          <div className="lg:col-span-2 space-y-6">
            {/* История прослушивания */}
            <div
              className="rounded-2xl p-5 md:p-6"
              style={{
                backgroundColor: "var(--color-white)",
                boxShadow: "var(--shadow-card)",
                borderRadius: "var(--radius-card)",
              }}
            >
              <div className="flex items-center gap-2 mb-5">
                <Clock
                  className="w-5 h-5"
                  style={{ color: "var(--color-accent)" }}
                  strokeWidth={1.5}
                />
                <h2
                  className="text-lg"
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 500,
                  }}
                >
                  История прослушивания
                </h2>
              </div>

              <div className="space-y-3">
                {mockHistory.map((item) => {
                  const progress = Math.round(
                    (item.progressSeconds / item.durationSeconds) * 100
                  );
                  return (
                    <Link
                      key={item.id}
                      href={`/library/${item.slug}`}
                      className="flex items-center gap-4 p-3 rounded-xl group"
                      style={{
                        transition: "background-color var(--transition-base)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "var(--color-surface)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                      }}
                    >
                      {/* Мини-иконка */}
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: "var(--color-surface)" }}
                      >
                        <Headphones
                          className="w-4 h-4"
                          style={{ color: "var(--color-accent)" }}
                          strokeWidth={1.5}
                        />
                      </div>

                      {/* Инфо */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {item.title}
                        </p>
                        <p
                          className="text-xs"
                          style={{ color: "var(--color-text-secondary)" }}
                        >
                          {item.lastListened} ·{" "}
                          {formatDuration(item.progressSeconds)} /{" "}
                          {formatDuration(item.durationSeconds)}
                        </p>
                      </div>

                      {/* Прогресс-бар */}
                      <div className="w-20 flex-shrink-0">
                        <div
                          className="h-1.5 rounded-full overflow-hidden"
                          style={{ backgroundColor: "var(--color-border)" }}
                        >
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${progress}%`,
                              backgroundColor: item.completed
                                ? "var(--color-accent)"
                                : "var(--color-accent-2)",
                            }}
                          />
                        </div>
                        <p
                          className="text-xs text-right mt-0.5"
                          style={{ color: "var(--color-text-secondary)" }}
                        >
                          {item.completed ? "✓" : `${progress}%`}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Избранное */}
            <div
              className="rounded-2xl p-5 md:p-6"
              style={{
                backgroundColor: "var(--color-white)",
                boxShadow: "var(--shadow-card)",
                borderRadius: "var(--radius-card)",
              }}
            >
              <div className="flex items-center gap-2 mb-5">
                <Heart
                  className="w-5 h-5"
                  style={{ color: "var(--color-accent-2)" }}
                  strokeWidth={1.5}
                />
                <h2
                  className="text-lg"
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 500,
                  }}
                >
                  Избранное
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockFavorites.map((track) => (
                  <Link key={track.id} href={`/library/${track.slug}`}>
                    <div
                      className="p-3 rounded-xl"
                      style={{
                        backgroundColor: "var(--color-surface)",
                        borderRadius: "var(--radius-md)",
                        transition: "all var(--transition-base)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = "var(--shadow-card)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      <p
                        className="text-sm font-medium mb-1"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        {track.title}
                      </p>
                      <p
                        className="text-xs"
                        style={{ color: "var(--color-text-secondary)" }}
                      >
                        {formatDuration(track.durationSeconds)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
