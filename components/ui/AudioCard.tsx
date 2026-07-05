"use client";

import { Play, Clock } from "lucide-react";
import { Tag, FreeBadge } from "./Tag";
import { formatDuration, type MockTrack } from "@/lib/mock-data";

/* Карточка аудиоролика для библиотеки и главной */

interface AudioCardProps {
  track: MockTrack;
  onPlay?: (track: MockTrack) => void;
}

export function AudioCard({ track, onPlay }: AudioCardProps) {
  return (
    <article
      className="group relative rounded-2xl overflow-hidden cursor-pointer"
      style={{
        backgroundColor: "var(--color-white)",
        boxShadow: "var(--shadow-card)",
        transition:
          "box-shadow var(--transition-slow), transform var(--transition-slow)",
        borderRadius: "var(--radius-card)",
      }}
      onClick={() => onPlay?.(track)}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "var(--shadow-card-hover)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "var(--shadow-card)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
      role="button"
      tabIndex={0}
      aria-label={`Прослушать: ${track.title}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onPlay?.(track);
        }
      }}
    >
      {/* Обложка / цветовой блок */}
      <div
        className="relative h-36 flex items-center justify-center"
        style={{
          background: `linear-gradient(135deg, var(--color-surface) 0%, ${getTagColor(track.tags[0])} 100%)`,
        }}
      >
        {/* Кнопка Play (появляется при наведении) */}
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100"
          style={{
            backgroundColor: "var(--color-accent)",
            transition: "opacity var(--transition-base), transform var(--transition-base)",
            transform: "scale(0.9)",
          }}
        >
          <Play className="w-5 h-5 text-white ml-0.5" fill="white" strokeWidth={0} />
        </div>

        {/* Бейджи */}
        <div className="absolute top-3 left-3 flex gap-1.5">
          {track.isFreePreview && <FreeBadge />}
        </div>

        {/* Длительность */}
        <div
          className="absolute bottom-3 right-3 flex items-center gap-1 text-xs px-2 py-1 rounded-full"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.85)",
            color: "var(--color-text-secondary)",
            backdropFilter: "blur(4px)",
          }}
        >
          <Clock className="w-3 h-3" strokeWidth={1.5} />
          {formatDuration(track.durationSeconds)}
        </div>
      </div>

      {/* Контент карточки */}
      <div className="p-4">
        <h3
          className="text-base mb-1.5 leading-snug"
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 500,
            color: "var(--color-text)",
          }}
        >
          {track.title}
        </h3>
        <p
          className="text-sm line-clamp-2 mb-3"
          style={{
            color: "var(--color-text-secondary)",
            lineHeight: "1.6",
          }}
        >
          {track.description}
        </p>

        {/* Теги */}
        <div className="flex flex-wrap gap-1.5">
          {track.tags.map((tag) => (
            <Tag key={tag} label={tag} size="sm" />
          ))}
        </div>
      </div>
    </article>
  );
}

/* Вспомогательная функция: мягкий цвет фона на основе тега */
function getTagColor(tag?: string): string {
  const colors: Record<string, string> = {
    тревога: "rgba(124, 152, 133, 0.15)",
    отношения: "rgba(217, 166, 121, 0.15)",
    самооценка: "rgba(180, 140, 180, 0.12)",
    выгорание: "rgba(199, 123, 88, 0.12)",
    сон: "rgba(120, 140, 170, 0.12)",
    психосоматика: "rgba(150, 160, 140, 0.12)",
    чувства: "rgba(170, 130, 150, 0.12)",
    стресс: "rgba(160, 150, 130, 0.12)",
  };
  return tag ? colors[tag] || "rgba(124, 152, 133, 0.08)" : "rgba(124, 152, 133, 0.08)";
}
