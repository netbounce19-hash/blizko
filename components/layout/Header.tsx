"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, User, Headphones } from "lucide-react";

/* Навигационные ссылки платформы */
const navLinks = [
  { href: "/library", label: "Библиотека" },
  { href: "/about", label: "О специалисте" },
  { href: "/subscribe", label: "Подписка" },
  { href: "/ask", label: "Задать вопрос" },
  { href: "/booking", label: "Консультация" },
  { href: "/contact", label: "Контакты" },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 border-b border-border"
      style={{
        backgroundColor: "rgba(250, 248, 245, 0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <div className="container-site">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Логотип */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
            aria-label="БЛИЗКО — на главную"
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: "var(--color-accent)",
                transition: "transform var(--transition-base)",
              }}
            >
              <Headphones className="w-4 h-4 text-white" strokeWidth={1.5} />
            </div>
            <span
              className="text-xl tracking-tight"
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 500,
                color: "var(--color-text)",
              }}
            >
              БЛИЗКО
            </span>
          </Link>

          {/* Десктопная навигация */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Основная навигация">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm rounded-lg"
                style={{
                  color: "var(--color-text-secondary)",
                  transition: "color var(--transition-base), background-color var(--transition-base)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--color-text)";
                  e.currentTarget.style.backgroundColor = "var(--color-surface)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--color-text-secondary)";
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Кнопки справа */}
          <div className="flex items-center gap-2">
            <Link
              href="/account"
              className="hidden md:flex items-center gap-2 px-4 py-2 text-sm rounded-full"
              style={{
                border: "1px solid var(--color-border)",
                color: "var(--color-text-secondary)",
                transition: "all var(--transition-base)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--color-accent)";
                e.currentTarget.style.color = "var(--color-accent)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--color-border)";
                e.currentTarget.style.color = "var(--color-text-secondary)";
              }}
              aria-label="Личный кабинет"
            >
              <User className="w-4 h-4" strokeWidth={1.5} />
              <span>Кабинет</span>
            </Link>

            {/* Мобильное меню — кнопка */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg"
              style={{
                color: "var(--color-text)",
                transition: "background-color var(--transition-base)",
              }}
              aria-label={isMobileMenuOpen ? "Закрыть меню" : "Открыть меню"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" strokeWidth={1.5} />
              ) : (
                <Menu className="w-5 h-5" strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>

        {/* Мобильное меню — выпадающая панель */}
        {isMobileMenuOpen && (
          <nav
            className="lg:hidden pb-4 animate-slide-down"
            aria-label="Мобильная навигация"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-3 py-2.5 text-sm rounded-lg"
                  style={{
                    color: "var(--color-text-secondary)",
                    transition: "all var(--transition-base)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--color-text)";
                    e.currentTarget.style.backgroundColor = "var(--color-surface)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--color-text-secondary)";
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/account"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2.5 text-sm rounded-lg mt-2"
                style={{
                  color: "var(--color-accent)",
                  backgroundColor: "var(--color-surface)",
                }}
              >
                <User className="w-4 h-4" strokeWidth={1.5} />
                Личный кабинет
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
