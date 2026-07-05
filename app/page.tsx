"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Headphones,
  ArrowRight,
  MessageCircle,
  Shield,
  Heart,
  Sparkles,
  BookOpen,
  PlayCircle,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { AudioCard } from "@/components/ui/AudioCard";
import { AudioPlayer } from "@/components/ui/AudioPlayer";
import { Modal, BottomSheet } from "@/components/ui/Modal";
import { SubscriptionPaywall } from "@/components/ui/SubscriptionPaywall";
import { mockTracks, specialistInfo, mockArticles } from "@/lib/mock-data";

/* Главная страница платформы «БЛИЗКО» */

export default function HomePage() {
  const [activeTrack, setActiveTrack] = useState<(typeof mockTracks)[0] | null>(null);
  const [showPaywall, setShowPaywall] = useState(false);

  /* Показываем первые 6 треков на главной */
  const featuredTracks = mockTracks.slice(0, 6);

  const handlePlay = (track: (typeof mockTracks)[0]) => {
    setActiveTrack(track);
  };

  const handleLimitReached = () => {
    setShowPaywall(true);
  };

  return (
    <>
      {/* === HERO === */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(ellipse at 30% 20%, rgba(124, 152, 133, 0.12) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(217, 166, 121, 0.08) 0%, transparent 50%)",
          }}
        />
        <div className="container-site relative">
          <div className="py-20 md:py-28 lg:py-36 max-w-2xl">
            <p
              className="text-sm font-medium mb-4 tracking-wide uppercase"
              style={{ color: "var(--color-accent)" }}
            >
              Аудио-терапия
            </p>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl mb-6"
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 400,
                color: "var(--color-text)",
                lineHeight: 1.15,
              }}
            >
              Клуб поддержки{" "}
              <span style={{ color: "var(--color-accent)" }}>БЛИЗКО</span>
            </h1>
            <p
              className="text-lg md:text-xl mb-8 leading-relaxed max-w-lg"
              style={{
                color: "var(--color-text-secondary)",
                lineHeight: 1.7,
              }}
            >
              Аудиотерапия от практикующего специалиста Любови Горской-Скрыпник. 
              Короткие терапевтические аудиоролики: тревога, отношения, самооценка, сон — в вашем темпе и пространстве.
            </p>
            
            <div className="flex flex-wrap gap-3 mb-10">
              <Link href="/library">
                <Button variant="primary" size="lg">
                  <Headphones className="w-4 h-4" strokeWidth={1.5} />
                  Начать слушать
                </Button>
              </Link>
              <Link href="/ask">
                <Button variant="outline" size="lg">
                  <MessageCircle className="w-4 h-4" strokeWidth={1.5} />
                  Задать вопрос
                </Button>
              </Link>
            </div>

            {/* Сноска - Дисклеймер */}
            <div 
              className="flex items-start gap-3 p-4 rounded-2xl max-w-lg" 
              style={{ 
                backgroundColor: "rgba(124, 152, 133, 0.05)",
                border: "1px solid rgba(124, 152, 133, 0.15)"
              }}
            >
              <Shield 
                className="w-5 h-5 flex-shrink-0 mt-0.5" 
                style={{ color: "var(--color-accent)" }} 
                strokeWidth={1.5} 
              />
              <p 
                className="text-sm leading-relaxed" 
                style={{ color: "var(--color-text-secondary)" }}
              >
                Вы также можете прислать ваши вопросы анонимно и получить развернутые ответы в формате аудиопрактики.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* === СЕТКА АУДИО-КАРТОЧЕК === */}
      <section className="py-16 md:py-20">
        <div className="container-site">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p
                className="text-sm font-medium mb-2 tracking-wide uppercase"
                style={{ color: "var(--color-accent)" }}
              >
                Библиотека
              </p>
              <h2
                className="text-2xl md:text-3xl"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 400,
                }}
              >
                Популярные практики
              </h2>
            </div>
            <Link
              href="/library"
              className="hidden md:flex items-center gap-1 text-sm"
              style={{
                color: "var(--color-accent)",
                transition: "opacity var(--transition-base)",
              }}
            >
              Все ролики
              <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredTracks.map((track) => (
              <AudioCard key={track.id} track={track} onPlay={handlePlay} />
            ))}
          </div>

          <div className="md:hidden mt-6 text-center">
            <Link href="/library">
              <Button variant="outline" size="md">
                Все ролики
                <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* === О СПЕЦИАЛИСТЕ (краткий блок) === */}
      <section
        className="py-16 md:py-20"
        style={{ backgroundColor: "var(--color-surface)" }}
      >
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Фото специалиста */}
            <div
              className="aspect-[4/5] max-w-sm mx-auto lg:mx-0 rounded-2xl overflow-hidden relative"
              style={{
                backgroundColor: "var(--color-border)",
                borderRadius: "var(--radius-lg)",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <Image 
                src="/images/specialist.jpg" 
                alt="Любовь Горская-Скрыпник" 
                fill 
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
            </div>

            <div>
              <p
                className="text-sm font-medium mb-2 tracking-wide uppercase"
                style={{ color: "var(--color-accent)" }}
              >
                Ваш терапевт
              </p>
              <h2
                className="text-2xl md:text-3xl mb-4"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 400,
                }}
              >
                {specialistInfo.shortName}
              </h2>
              <p
                className="text-sm mb-2"
                style={{ color: "var(--color-accent-2)" }}
              >
                {specialistInfo.title}
              </p>
              <p
                className="mb-6 leading-relaxed"
                style={{
                  color: "var(--color-text-secondary)",
                  lineHeight: 1.7,
                }}
              >
                {specialistInfo.bio}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {specialistInfo.specializations.map((spec) => (
                  <span
                    key={spec}
                    className="text-xs px-3 py-1.5 rounded-full"
                    style={{
                      backgroundColor: "rgba(124, 152, 133, 0.08)",
                      color: "var(--color-accent)",
                    }}
                  >
                    {spec}
                  </span>
                ))}
              </div>

              <Link href="/about">
                <Button variant="outline" size="md">
                  Подробнее
                  <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* === СВЕЖИЕ СТАТЬИ === */}
      <section className="py-16 md:py-20">
        <div className="container-site">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p
                className="text-sm font-medium mb-2 tracking-wide uppercase"
                style={{ color: "var(--color-accent)" }}
              >
                Блог
              </p>
              <h2
                className="text-2xl md:text-3xl"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 400,
                }}
              >
                Свежие статьи
              </h2>
            </div>
            <Link
              href="/feed"
              className="hidden md:flex items-center gap-1 text-sm"
              style={{
                color: "var(--color-accent)",
                transition: "opacity var(--transition-base)",
              }}
            >
              Все статьи
              <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {mockArticles.slice(0, 3).map(article => (
              <Link href={`/feed/${article.slug}`} key={article.id} className="block group h-full">
                <article 
                  className="p-6 rounded-2xl h-full flex flex-col transition-all duration-300" 
                  style={{ 
                    backgroundColor: "var(--color-surface)", 
                    border: "1px solid var(--color-border)" 
                  }} 
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--color-accent)";
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "var(--shadow-card)";
                  }} 
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--color-border)";
                    e.currentTarget.style.transform = "none";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div className="flex items-center gap-2 mb-3 text-[10px] font-medium uppercase tracking-wider" style={{ color: "var(--color-text-secondary)" }}>
                    <BookOpen className="w-3.5 h-3.5" strokeWidth={1.5} />
                    <span>{new Date(article.publishedAt).toLocaleDateString("ru-RU", { day: "numeric", month: "long" })}</span>
                  </div>
                  <h4 
                    className="text-lg font-medium mb-3 transition-opacity" 
                    style={{ color: "var(--color-text)", fontFamily: "var(--font-heading)", lineHeight: 1.4 }}
                  >
                    {article.title}
                  </h4>
                  <p 
                    className="text-sm line-clamp-3 mt-auto" 
                    style={{ color: "var(--color-text-secondary)", lineHeight: 1.6 }}
                  >
                    {article.excerpt}
                  </p>
                </article>
              </Link>
            ))}
          </div>

          <div className="md:hidden mt-6 text-center">
            <Link href="/feed">
              <Button variant="outline" size="md">
                Все статьи
                <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* === YOUTUBE BANNER === */}
      <section className="pb-16 md:pb-20">
        <div className="container-site">
          <div 
            className="rounded-2xl p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8"
            style={{ 
              backgroundColor: "rgba(217, 166, 121, 0.1)",
            }}
          >
            <div className="relative z-10 max-w-xl text-center md:text-left">
              <div className="flex items-center gap-3 mb-4 justify-center md:justify-start">
                <PlayCircle className="w-7 h-7" style={{ color: "var(--color-accent-2)" }} strokeWidth={1.5} />
                <h3 
                  className="text-2xl md:text-3xl" 
                  style={{ fontFamily: "var(--font-heading)", color: "var(--color-text)" }}
                >
                  Смотрите нас на YouTube
                </h3>
              </div>
              <p 
                className="text-base md:text-lg leading-relaxed mb-0" 
                style={{ color: "var(--color-text-secondary)" }}
              >
                Я регулярно публикую видео-разборы, практические советы по психологии и ответы на частые вопросы. Подписывайтесь, чтобы всегда быть на связи и не пропускать полезные материалы.
              </p>
            </div>
            
            <div className="relative z-10 shrink-0">
              <a 
                href="https://youtube.com/@supportclubblizko?si=YIgxykBl97wcGzA-" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button variant="secondary" size="lg">
                  <PlayCircle className="w-5 h-5" strokeWidth={1.5} />
                  Перейти на канал
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* === БЛОК ПОДПИСКИ === */}
      <section className="py-16 md:py-20">
        <div className="container-site">
          <div
            className="rounded-2xl p-8 md:p-12 text-center max-w-2xl mx-auto"
            style={{
              backgroundColor: "var(--color-white)",
              boxShadow: "var(--shadow-card)",
              borderRadius: "var(--radius-lg)",
            }}
          >
            <div
              className="w-12 h-12 rounded-full mx-auto mb-5 flex items-center justify-center"
              style={{ backgroundColor: "rgba(124, 152, 133, 0.08)" }}
            >
              <Sparkles
                className="w-5 h-5"
                style={{ color: "var(--color-accent)" }}
                strokeWidth={1.5}
              />
            </div>
            <h2
              className="text-2xl md:text-3xl mb-3"
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 400,
              }}
            >
              Полный доступ к библиотеке
            </h2>
            <p
              className="mb-6 max-w-md mx-auto leading-relaxed"
              style={{
                color: "var(--color-text-secondary)",
                lineHeight: 1.7,
              }}
            >
              Все аудио-практики, новые ролики каждую неделю и персональная
              история прослушивания.
            </p>
            <p
              className="text-3xl mb-6"
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 500,
                color: "var(--color-text)",
              }}
            >
              2 999 ₽
              <span
                className="text-base ml-1"
                style={{ color: "var(--color-text-secondary)" }}
              >
                / месяц
              </span>
            </p>
            <Link href="/subscribe">
              <Button variant="primary" size="lg">
                Оформить подписку
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* === CTA АНОНИМНОГО ВОПРОСА === */}
      <section
        className="py-16 md:py-20"
        style={{ backgroundColor: "var(--color-surface)" }}
      >
        <div className="container-site">
          <div className="max-w-xl mx-auto text-center">
            <div
              className="w-12 h-12 rounded-full mx-auto mb-5 flex items-center justify-center"
              style={{ backgroundColor: "rgba(217, 166, 121, 0.1)" }}
            >
              <MessageCircle
                className="w-5 h-5"
                style={{ color: "var(--color-accent-2)" }}
                strokeWidth={1.5}
              />
            </div>
            <h2
              className="text-2xl md:text-3xl mb-3"
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 400,
              }}
            >
              Задайте анонимный вопрос
            </h2>
            <p
              className="mb-6 leading-relaxed"
              style={{
                color: "var(--color-text-secondary)",
                lineHeight: 1.7,
              }}
            >
              Вы можете задать вопрос специалисту анонимно — без регистрации
              и указания личных данных. Ответ придёт в формате персонального
              аудио.
            </p>
            <Link href="/ask">
              <Button variant="secondary" size="lg">
                <MessageCircle className="w-4 h-4" strokeWidth={1.5} />
                Задать вопрос
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* === INLINE PLAYER MODAL === */}
      {/* Десктоп — Modal, мобильный — BottomSheet */}
      <div className="hidden md:block">
        <Modal
          isOpen={!!activeTrack && !showPaywall}
          onClose={() => setActiveTrack(null)}
          title={activeTrack?.title}
          maxWidth="520px"
        >
          {activeTrack && (
            <div>
              <p
                className="text-sm mb-4 leading-relaxed"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {activeTrack.description}
              </p>
              <AudioPlayer
                src={activeTrack.audioUrl}
                title={activeTrack.title}
                maxDurationSeconds={activeTrack.isFreePreview ? undefined : 60}
                onLimitReached={handleLimitReached}
              />
              {!activeTrack.isFreePreview && (
                <p
                  className="text-xs text-center mt-3"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  <Shield className="w-3 h-3 inline mr-1" strokeWidth={1.5} />
                  Превью — первые 60 секунд. Оформите подписку для полного
                  доступа.
                </p>
              )}
              <div className="mt-4 text-center">
                <Link href={`/library/${activeTrack.slug}`}>
                  <Button variant="ghost" size="sm">
                    <BookOpen className="w-4 h-4" strokeWidth={1.5} />
                    Подробнее о ролике
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </Modal>
      </div>

      <div className="md:hidden">
        <BottomSheet
          isOpen={!!activeTrack && !showPaywall}
          onClose={() => setActiveTrack(null)}
          title={activeTrack?.title}
        >
          {activeTrack && (
            <div>
              <p
                className="text-sm mb-4 leading-relaxed"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {activeTrack.description}
              </p>
              <AudioPlayer
                src={activeTrack.audioUrl}
                title={activeTrack.title}
                maxDurationSeconds={activeTrack.isFreePreview ? undefined : 60}
                onLimitReached={handleLimitReached}
              />
              <div className="mt-4 text-center">
                <Link href={`/library/${activeTrack.slug}`}>
                  <Button variant="ghost" size="sm">
                    <BookOpen className="w-4 h-4" strokeWidth={1.5} />
                    Подробнее о ролике
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </BottomSheet>
      </div>

      {/* Paywall модалка */}
      <Modal
        isOpen={showPaywall}
        onClose={() => {
          setShowPaywall(false);
          setActiveTrack(null);
        }}
        maxWidth="420px"
      >
        <SubscriptionPaywall
          onClose={() => {
            setShowPaywall(false);
            setActiveTrack(null);
          }}
        />
      </Modal>
    </>
  );
}
