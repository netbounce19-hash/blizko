"use client";

import Link from "next/link";
import { Heart, Headphones } from "lucide-react";

/* Ссылки в подвале */
const footerSections = [
  {
    title: "Платформа",
    links: [
      { href: "/library", label: "Библиотека аудио" },
      { href: "/feed", label: "Статьи" },
      { href: "/subscribe", label: "Подписка" },
      { href: "/ask", label: "Задать вопрос" },
      { href: "/booking", label: "Консультация" },
    ],
  },
  {
    title: "О нас",
    links: [
      { href: "/about", label: "О специалисте" },
      { href: "/contact", label: "Связаться с нами" },
      { href: "https://youtube.com/@supportclubblizko?si=YIgxykBl97wcGzA-", label: "Наш YouTube канал", external: true },
    ],
  },
  {
    title: "Правовая информация",
    links: [
      { href: "/legal/privacy", label: "Политика конфиденциальности" },
      { href: "/legal/offer", label: "Договор оферты" },
    ],
  },
];

export function Footer() {
  return (
    <footer
      className="border-t mt-auto"
      style={{ borderColor: "var(--color-border)" }}
    >
      <div className="container-site py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Логотип и описание */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "var(--color-accent)" }}
              >
                <Headphones className="w-3.5 h-3.5 text-white" strokeWidth={1.5} />
              </div>
              <span
                className="text-lg tracking-tight"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 500,
                }}
              >
                БЛИЗКО
              </span>
            </Link>
            <p
              className="text-sm leading-relaxed max-w-xs"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Платформа аудио-терапии с клиническим психологом.
              Бережный подход к вашему внутреннему миру.
            </p>
          </div>

          {/* Секции ссылок */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3
                className="text-sm font-medium mb-4"
                style={{ color: "var(--color-text)" }}
              >
                {section.title}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="text-sm"
                      style={{
                        color: "var(--color-text-secondary)",
                        transition: "color var(--transition-base)",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.color = "var(--color-accent)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.color = "var(--color-text-secondary)";
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Нижняя строка */}
        <div
          className="mt-12 pt-6 border-t flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderColor: "var(--color-border)" }}
        >
          <p
            className="text-xs"
            style={{ color: "var(--color-text-secondary)" }}
          >
            © {new Date().getFullYear()} БЛИЗКО. Все права защищены.
          </p>

          {/* Дисклеймер — важно для платформы психологической помощи */}
          <p
            className="text-xs text-center md:text-right max-w-md"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Материалы платформы не являются экстренной психологической помощью.
            При кризисной ситуации позвоните{" "}
            <a
              href="tel:88002000122"
              className="underline"
              style={{ color: "var(--color-accent)" }}
            >
              8-800-2000-122
            </a>{" "}
            (бесплатно, круглосуточно).
          </p>

          <div
            className="flex items-center gap-1 text-xs"
            style={{ color: "var(--color-text-secondary)" }}
          >
            <span>Сделано с</span>
            <Heart className="w-3 h-3" style={{ color: "var(--color-accent-2)" }} strokeWidth={1.5} />
          </div>
        </div>
      </div>
    </footer>
  );
}
