import type { Metadata } from "next";
import Link from "next/link";
import {
  Heart,
  GraduationCap,
  ArrowRight,
  MessageCircle,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { specialistInfo } from "@/lib/mock-data";
import Image from "next/image";

/* Страница «О специалисте» */

export const metadata: Metadata = {
  title: "О специалисте",
  description: `${specialistInfo.name} — ${specialistInfo.title}. ${specialistInfo.bio}`,
};

export default function AboutPage() {
  return (
    <div className="py-12 md:py-20">
      <div className="container-site">
        {/* Заголовок */}
        <div className="max-w-3xl mx-auto">
          <p
            className="text-sm font-medium mb-3 tracking-wide uppercase"
            style={{ color: "var(--color-accent)" }}
          >
            О специалисте
          </p>
          <h1
            className="text-3xl md:text-4xl lg:text-5xl mb-4"
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 400,
              lineHeight: 1.2,
            }}
          >
            {specialistInfo.name}
          </h1>
          <p
            className="text-lg mb-10"
            style={{ color: "var(--color-accent-2)" }}
          >
            {specialistInfo.title}
          </p>
        </div>

        {/* Контент */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16 max-w-5xl mx-auto">
          {/* Фото (левая колонка) */}
          <div className="lg:col-span-1">
            <div
              className="aspect-[3/4] rounded-2xl overflow-hidden sticky top-24"
              style={{
                backgroundColor: "var(--color-surface)",
                borderRadius: "var(--radius-lg)",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <Image 
                src="/images/specialist.jpg" 
                alt="Любовь Горская-Скрыпник" 
                fill 
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 33vw"
                priority
              />
            </div>
          </div>

          {/* Текст (правая колонка) */}
          <div className="lg:col-span-2">
            {/* Биография */}
            <section className="mb-12">
              <div
                className="prose-like space-y-4"
                style={{
                  color: "var(--color-text-secondary)",
                  lineHeight: 1.7,
                }}
              >
                {specialistInfo.fullBio.split("\n\n").map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </section>

            {/* Образование */}
            <section className="mb-12">
              <div className="flex items-center gap-2 mb-5">
                <GraduationCap
                  className="w-5 h-5"
                  style={{ color: "var(--color-accent)" }}
                  strokeWidth={1.5}
                />
                <h2
                  className="text-xl"
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 500,
                  }}
                >
                  Образование и квалификация
                </h2>
              </div>
              <ul className="space-y-3">
                {specialistInfo.education.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div
                      className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                      style={{ backgroundColor: "var(--color-accent)" }}
                    />
                    <span
                      className="text-sm leading-relaxed"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Подход к работе */}
            <section className="mb-12">
              <h2
                className="text-xl mb-5"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 500,
                }}
              >
                Подход к работе
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {specialistInfo.approach.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-xl p-5"
                    style={{
                      backgroundColor: "var(--color-surface)",
                      borderRadius: "var(--radius-card)",
                    }}
                  >
                    <h3
                      className="text-sm font-medium mb-2"
                      style={{ color: "var(--color-text)" }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* CTA */}
            <section
              className="rounded-2xl p-6 md:p-8"
              style={{
                backgroundColor: "var(--color-surface)",
                borderRadius: "var(--radius-lg)",
              }}
            >
              <h3
                className="text-lg mb-3"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 500,
                }}
              >
                Начните свой путь
              </h3>
              <p
                className="text-sm mb-5 leading-relaxed"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Вы можете начать с прослушивания бесплатных аудио-практик,
                задать анонимный вопрос или записаться на консультацию.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/library">
                  <Button variant="primary" size="md">
                    Библиотека аудио
                    <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                  </Button>
                </Link>
                <Link href="/ask">
                  <Button variant="outline" size="md">
                    <MessageCircle className="w-4 h-4" strokeWidth={1.5} />
                    Задать вопрос
                  </Button>
                </Link>
                <Link href="/booking">
                  <Button variant="outline" size="md">
                    <Calendar className="w-4 h-4" strokeWidth={1.5} />
                    Записаться
                  </Button>
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
