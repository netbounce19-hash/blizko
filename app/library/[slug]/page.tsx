"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Share2, Shield } from "lucide-react";
import { AudioPlayer } from "@/components/ui/AudioPlayer";
import { AudioCard } from "@/components/ui/AudioCard";
import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { SubscriptionPaywall } from "@/components/ui/SubscriptionPaywall";
import { mockTracks, formatDuration, type MockTrack } from "@/lib/mock-data";

/* Страница отдельного аудиоролика */

export default function TrackPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [showPaywall, setShowPaywall] = useState(false);

  /* Находим трек по slug */
  const track = mockTracks.find((t) => t.slug === slug);

  if (!track) {
    return (
      <div className="py-20 text-center container-site">
        <h1
          className="text-2xl mb-4"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Ролик не найден
        </h1>
        <p
          className="mb-6"
          style={{ color: "var(--color-text-secondary)" }}
        >
          Возможно, ролик был удалён или ссылка неверна.
        </p>
        <Link href="/library">
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
            Вернуться в библиотеку
          </Button>
        </Link>
      </div>
    );
  }

  /* Похожие ролики — по совпадению тегов */
  const relatedTracks = mockTracks
    .filter(
      (t) =>
        t.id !== track.id &&
        t.tags.some((tag) => track.tags.includes(tag))
    )
    .slice(0, 3);

  return (
    <div className="py-12 md:py-20">
      <div className="container-site">
        {/* Навигация */}
        <Link
          href="/library"
          className="inline-flex items-center gap-1.5 text-sm mb-8"
          style={{
            color: "var(--color-text-secondary)",
            transition: "color var(--transition-base)",
          }}
        >
          <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
          Библиотека
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
          {/* Левая колонка — плеер */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <AudioPlayer
                src={track.audioUrl}
                title={track.title}
                maxDurationSeconds={track.isFreePreview ? undefined : 60}
                onLimitReached={() => setShowPaywall(true)}
              />

              {/* Информация под плеером */}
              <div className="mt-4 flex items-center justify-between">
                <span
                  className="text-sm"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {formatDuration(track.durationSeconds)}
                </span>
                <button
                  className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full"
                  style={{
                    color: "var(--color-text-secondary)",
                    border: "1px solid var(--color-border)",
                    transition: "all var(--transition-base)",
                  }}
                  aria-label="Поделиться"
                >
                  <Share2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                  Поделиться
                </button>
              </div>

              {!track.isFreePreview && (
                <div
                  className="mt-4 rounded-xl p-3 flex items-start gap-2"
                  style={{
                    backgroundColor: "rgba(124, 152, 133, 0.06)",
                    border: "1px solid rgba(124, 152, 133, 0.12)",
                  }}
                >
                  <Shield
                    className="w-4 h-4 mt-0.5 flex-shrink-0"
                    style={{ color: "var(--color-accent)" }}
                    strokeWidth={1.5}
                  />
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    Доступно превью (60 сек). Для полного прослушивания
                    необходима{" "}
                    <Link
                      href="/subscribe"
                      className="underline"
                      style={{ color: "var(--color-accent)" }}
                    >
                      подписка
                    </Link>
                    .
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Правая колонка — описание */}
          <div className="lg:col-span-2">
            {/* Теги */}
            <div className="flex flex-wrap gap-2 mb-4">
              {track.tags.map((tag) => (
                <Tag key={tag} label={tag} />
              ))}
              {track.isFreePreview && (
                <span
                  className="inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full"
                  style={{
                    backgroundColor: "rgba(124, 152, 133, 0.1)",
                    color: "var(--color-accent)",
                  }}
                >
                  Бесплатно
                </span>
              )}
            </div>

            <h1
              className="text-2xl md:text-3xl mb-4"
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 400,
                lineHeight: 1.3,
              }}
            >
              {track.title}
            </h1>

            <p
              className="text-lg mb-6 leading-relaxed"
              style={{
                color: "var(--color-text-secondary)",
                lineHeight: 1.7,
              }}
            >
              {track.description}
            </p>

            {/* Полное описание */}
            <div
              className="mb-10 space-y-4"
              style={{
                color: "var(--color-text-secondary)",
                lineHeight: 1.7,
              }}
            >
              {track.fullDescription.split("\n").map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            {/* Похожие ролики */}
            {relatedTracks.length > 0 && (
              <section>
                <h2
                  className="text-xl mb-5"
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 500,
                  }}
                >
                  Похожие практики
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {relatedTracks.map((related) => (
                    <Link
                      key={related.id}
                      href={`/library/${related.slug}`}
                    >
                      <AudioCard track={related} />
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>

      {/* Paywall */}
      <Modal
        isOpen={showPaywall}
        onClose={() => setShowPaywall(false)}
        maxWidth="420px"
      >
        <SubscriptionPaywall onClose={() => setShowPaywall(false)} />
      </Modal>
    </div>
  );
}
