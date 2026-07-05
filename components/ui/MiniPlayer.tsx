"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, X } from "lucide-react";
import { formatDuration, type MockTrack } from "@/lib/mock-data";

/* Sticky mini-player — появляется внизу экрана при активном воспроизведении */

interface MiniPlayerProps {
  track: MockTrack | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  onTogglePlay: () => void;
  onClose: () => void;
}

export function MiniPlayer({
  track,
  isPlaying,
  currentTime,
  duration,
  onTogglePlay,
  onClose,
}: MiniPlayerProps) {
  if (!track) return null;

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        boxShadow: "var(--shadow-mini-player)",
      }}
      role="region"
      aria-label="Мини-плеер"
    >
      {/* Прогресс-бар тонкий */}
      <div
        className="h-0.5 w-full"
        style={{ backgroundColor: "var(--color-border)" }}
      >
        <div
          className="h-full"
          style={{
            width: `${progressPercent}%`,
            backgroundColor: "var(--color-accent)",
            transition: "width 0.3s linear",
          }}
        />
      </div>

      <div className="container-site">
        <div className="flex items-center gap-3 py-3">
          {/* Кнопка Play/Pause */}
          <button
            onClick={onTogglePlay}
            className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
            style={{
              backgroundColor: "var(--color-accent)",
              color: "#FFFFFF",
              transition: "background-color var(--transition-base)",
            }}
            aria-label={isPlaying ? "Пауза" : "Воспроизвести"}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4" fill="white" strokeWidth={0} />
            ) : (
              <Play className="w-4 h-4 ml-0.5" fill="white" strokeWidth={0} />
            )}
          </button>

          {/* Информация о треке */}
          <div className="flex-1 min-w-0">
            <p
              className="text-sm font-medium truncate"
              style={{
                fontFamily: "var(--font-heading)",
                color: "var(--color-text)",
              }}
            >
              {track.title}
            </p>
            <p
              className="text-xs tabular-nums"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {formatDuration(Math.floor(currentTime))} /{" "}
              {formatDuration(Math.floor(duration))}
            </p>
          </div>

          {/* Закрыть */}
          <button
            onClick={onClose}
            className="p-1.5 rounded-full flex-shrink-0"
            style={{
              color: "var(--color-text-secondary)",
              transition: "color var(--transition-base)",
            }}
            aria-label="Закрыть плеер"
          >
            <X className="w-4 h-4" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </div>
  );
}
