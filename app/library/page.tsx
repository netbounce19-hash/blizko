"use client";

import { useState } from "react";
import type { Metadata } from "next";
import { Search, SlidersHorizontal } from "lucide-react";
import { AudioCard } from "@/components/ui/AudioCard";
import { AudioPlayer } from "@/components/ui/AudioPlayer";
import { Tag } from "@/components/ui/Tag";
import { Modal, BottomSheet } from "@/components/ui/Modal";
import { SubscriptionPaywall } from "@/components/ui/SubscriptionPaywall";
import { mockTracks, allTags, type MockTrack } from "@/lib/mock-data";

/* Каталог аудио-библиотеки с фильтрацией по тегам и поиском */

export default function LibraryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [activeTrack, setActiveTrack] = useState<MockTrack | null>(null);
  const [showPaywall, setShowPaywall] = useState(false);

  /* Фильтрация треков */
  const filteredTracks = mockTracks.filter((track) => {
    const matchesSearch =
      searchQuery === "" ||
      track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.some((tag) => track.tags.includes(tag));

    return matchesSearch && matchesTags;
  });

  /* Переключение тега */
  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  /* Сброс фильтров */
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedTags([]);
  };

  return (
    <div className="py-12 md:py-20">
      <div className="container-site">
        {/* Заголовок */}
        <div className="max-w-2xl mb-10">
          <p
            className="text-sm font-medium mb-2 tracking-wide uppercase"
            style={{ color: "var(--color-accent)" }}
          >
            Библиотека
          </p>
          <h1
            className="text-3xl md:text-4xl mb-3"
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 400,
            }}
          >
            Аудио-практики
          </h1>
          <p
            className="leading-relaxed"
            style={{
              color: "var(--color-text-secondary)",
              lineHeight: 1.7,
            }}
          >
            Терапевтические аудиоролики для самостоятельной работы.
            Выберите тему или найдите практику по названию.
          </p>
        </div>

        {/* Поиск и фильтры */}
        <div className="mb-8">
          {/* Поисковая строка */}
          <div className="relative mb-4">
            <Search
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4"
              style={{ color: "var(--color-text-secondary)" }}
              strokeWidth={1.5}
            />
            <input
              type="text"
              placeholder="Найти практику..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 text-sm rounded-xl"
              style={{
                backgroundColor: "var(--color-white)",
                border: "1px solid var(--color-border)",
                color: "var(--color-text)",
                outline: "none",
                transition: "border-color var(--transition-base)",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "var(--color-accent)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "var(--color-border)";
              }}
              aria-label="Поиск аудио-практик"
            />
          </div>

          {/* Теги-фильтры */}
          <div className="flex flex-wrap gap-2 items-center">
            <SlidersHorizontal
              className="w-4 h-4 mr-1"
              style={{ color: "var(--color-text-secondary)" }}
              strokeWidth={1.5}
            />
            {allTags.map((tag) => (
              <Tag
                key={tag}
                label={tag}
                isActive={selectedTags.includes(tag)}
                onClick={() => toggleTag(tag)}
                size="md"
              />
            ))}
            {(selectedTags.length > 0 || searchQuery) && (
              <button
                onClick={resetFilters}
                className="text-xs px-3 py-1 ml-1"
                style={{
                  color: "var(--color-warning)",
                  transition: "opacity var(--transition-base)",
                }}
              >
                Сбросить
              </button>
            )}
          </div>
        </div>

        {/* Результаты */}
        {filteredTracks.length > 0 ? (
          <>
            <p
              className="text-sm mb-5"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {filteredTracks.length}{" "}
              {filteredTracks.length === 1
                ? "практика"
                : filteredTracks.length < 5
                ? "практики"
                : "практик"}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredTracks.map((track) => (
                <AudioCard
                  key={track.id}
                  track={track}
                  onPlay={setActiveTrack}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <p
              className="text-lg mb-2"
              style={{
                fontFamily: "var(--font-heading)",
                color: "var(--color-text-secondary)",
              }}
            >
              Ничего не найдено
            </p>
            <p
              className="text-sm mb-4"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Попробуйте изменить поисковый запрос или сбросить фильтры.
            </p>
            <button
              onClick={resetFilters}
              className="text-sm underline"
              style={{ color: "var(--color-accent)" }}
            >
              Сбросить фильтры
            </button>
          </div>
        )}
      </div>

      {/* Inline player — Modal (desktop) */}
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
                onLimitReached={() => setShowPaywall(true)}
              />
            </div>
          )}
        </Modal>
      </div>

      {/* Inline player — BottomSheet (mobile) */}
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
                onLimitReached={() => setShowPaywall(true)}
              />
            </div>
          )}
        </BottomSheet>
      </div>

      {/* Paywall */}
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
    </div>
  );
}
