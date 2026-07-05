"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from "lucide-react";
import { formatDuration } from "@/lib/mock-data";

/* Кастомный аудиоплеер с прогресс-баром и управлением скоростью */

interface AudioPlayerProps {
  src: string;
  title: string;
  /** Ограничение по времени (для paywall — 60 секунд) */
  maxDurationSeconds?: number;
  /** Коллбэк при достижении лимита */
  onLimitReached?: () => void;
  /** Коллбэк при обновлении прогресса */
  onProgressUpdate?: (currentTime: number, duration: number) => void;
}

const SPEED_OPTIONS = [0.75, 1, 1.25, 1.5];

export function AudioPlayer({
  src,
  title,
  maxDurationSeconds,
  onLimitReached,
  onProgressUpdate,
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  /* Обновление времени воспроизведения */
  const handleTimeUpdate = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    setCurrentTime(audio.currentTime);
    onProgressUpdate?.(audio.currentTime, audio.duration);

    /* Paywall: остановка при достижении лимита */
    if (maxDurationSeconds && audio.currentTime >= maxDurationSeconds) {
      audio.pause();
      setIsPlaying(false);
      onLimitReached?.();
    }
  }, [maxDurationSeconds, onLimitReached, onProgressUpdate]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoaded = () => {
      setDuration(audio.duration);
      setIsLoaded(true);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener("loadedmetadata", handleLoaded);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoaded);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [handleTimeUpdate]);

  /* Play / Pause */
  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => {
        // Браузер заблокировал автовоспроизведение
      });
    }
    setIsPlaying(!isPlaying);
  };

  /* Перемотка ±15 секунд */
  const skip = (seconds: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(
      0,
      Math.min(audio.currentTime + seconds, audio.duration)
    );
  };

  /* Изменение скорости */
  const cycleSpeed = () => {
    const currentIndex = SPEED_OPTIONS.indexOf(speed);
    const nextIndex = (currentIndex + 1) % SPEED_OPTIONS.length;
    const newSpeed = SPEED_OPTIONS[nextIndex];
    setSpeed(newSpeed);
    if (audioRef.current) {
      audioRef.current.playbackRate = newSpeed;
    }
  };

  /* Мут */
  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
    setIsMuted(!isMuted);
  };

  /* Прогресс-бар: перемотка по клику */
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
    setCurrentTime(time);
  };

  /* Процент прогресса для стилизации ползунка */
  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
  const displayDuration = maxDurationSeconds
    ? Math.min(duration, maxDurationSeconds)
    : duration;

  return (
    <div
      className="rounded-2xl p-5"
      style={{
        backgroundColor: "var(--color-white)",
        boxShadow: "var(--shadow-card)",
        borderRadius: "var(--radius-card)",
      }}
    >
      <audio ref={audioRef} src={src} preload="metadata" />

      {/* Название трека */}
      <p
        className="text-sm font-medium mb-4 text-center"
        style={{
          fontFamily: "var(--font-heading)",
          color: "var(--color-text)",
        }}
      >
        {title}
      </p>

      {/* Прогресс-бар */}
      <div className="mb-3">
        <input
          type="range"
          min={0}
          max={displayDuration || 0}
          step={0.1}
          value={currentTime}
          onChange={handleSeek}
          className="audio-progress-track"
          aria-label="Прогресс воспроизведения"
          style={{
            background: `linear-gradient(to right, var(--color-accent) 0%, var(--color-accent) ${progressPercent}%, var(--color-border) ${progressPercent}%, var(--color-border) 100%)`,
          }}
        />
        <div className="flex justify-between mt-1">
          <span
            className="text-xs tabular-nums"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {formatDuration(Math.floor(currentTime))}
          </span>
          <span
            className="text-xs tabular-nums"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {isLoaded ? formatDuration(Math.floor(displayDuration)) : "—:——"}
          </span>
        </div>
      </div>

      {/* Контролы */}
      <div className="flex items-center justify-center gap-3">
        {/* Скорость */}
        <button
          onClick={cycleSpeed}
          className="px-2 py-1 text-xs font-medium rounded-full min-w-[2.5rem]"
          style={{
            color: "var(--color-text-secondary)",
            backgroundColor: "var(--color-surface)",
            transition: "all var(--transition-base)",
          }}
          aria-label={`Скорость воспроизведения: ${speed}x`}
        >
          {speed}×
        </button>

        {/* Перемотка назад */}
        <button
          onClick={() => skip(-15)}
          className="p-2 rounded-full"
          style={{
            color: "var(--color-text-secondary)",
            transition: "color var(--transition-base)",
          }}
          aria-label="Назад 15 секунд"
        >
          <SkipBack className="w-5 h-5" strokeWidth={1.5} />
        </button>

        {/* Play / Pause */}
        <button
          onClick={togglePlayPause}
          className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{
            backgroundColor: "var(--color-accent)",
            color: "#FFFFFF",
            transition: "background-color var(--transition-base), transform var(--transition-fast)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--color-accent-hover)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "var(--color-accent)";
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = "scale(0.93)";
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
          aria-label={isPlaying ? "Пауза" : "Воспроизвести"}
        >
          {isPlaying ? (
            <Pause className="w-5 h-5" fill="white" strokeWidth={0} />
          ) : (
            <Play className="w-5 h-5 ml-0.5" fill="white" strokeWidth={0} />
          )}
        </button>

        {/* Перемотка вперёд */}
        <button
          onClick={() => skip(15)}
          className="p-2 rounded-full"
          style={{
            color: "var(--color-text-secondary)",
            transition: "color var(--transition-base)",
          }}
          aria-label="Вперёд 15 секунд"
        >
          <SkipForward className="w-5 h-5" strokeWidth={1.5} />
        </button>

        {/* Мут */}
        <button
          onClick={toggleMute}
          className="p-2 rounded-full"
          style={{
            color: "var(--color-text-secondary)",
            transition: "color var(--transition-base)",
          }}
          aria-label={isMuted ? "Включить звук" : "Выключить звук"}
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5" strokeWidth={1.5} />
          ) : (
            <Volume2 className="w-5 h-5" strokeWidth={1.5} />
          )}
        </button>
      </div>

      {/* Индикатор лимита для неподписчиков */}
      {maxDurationSeconds && (
        <p
          className="text-xs text-center mt-3"
          style={{ color: "var(--color-text-secondary)" }}
        >
          Доступно {formatDuration(maxDurationSeconds)} из{" "}
          {isLoaded ? formatDuration(Math.floor(duration)) : "—:——"}
        </p>
      )}
    </div>
  );
}
