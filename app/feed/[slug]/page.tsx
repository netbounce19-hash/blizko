import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";
import { mockArticles } from "@/lib/mock-data";

interface FeedArticlePageProps {
  params: {
    slug: string;
  };
}

export function generateMetadata({ params }: FeedArticlePageProps) {
  const article = mockArticles.find((a) => a.slug === params.slug);
  if (!article) return { title: "Статья не найдена" };
  return {
    title: `${article.title} | Клуб поддержки БЛИЗКО`,
    description: article.excerpt,
  };
}

export default function FeedArticlePage({ params }: FeedArticlePageProps) {
  const article = mockArticles.find((a) => a.slug === params.slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="py-12 md:py-20">
      <div className="container-site">
        <div className="max-w-2xl mx-auto">
          <Link
            href="/feed"
            className="inline-flex items-center gap-2 text-sm font-medium mb-8 hover:opacity-80 transition-opacity"
            style={{ color: "var(--color-text-secondary)" }}
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
            К ленте статей
          </Link>

          <div className="flex items-center gap-2 mb-6 text-sm font-medium uppercase tracking-wide" style={{ color: "var(--color-accent)" }}>
            <BookOpen className="w-4 h-4" />
            <span>{new Date(article.publishedAt).toLocaleDateString("ru-RU", {
              day: "numeric",
              month: "long",
              year: "numeric"
            })}</span>
          </div>

          <h1
            className="text-3xl md:text-5xl mb-6 leading-tight"
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 400,
            }}
          >
            {article.title}
          </h1>

          <div className="flex items-center gap-3 mb-10 pb-10 border-b" style={{ borderColor: "var(--color-border)" }}>
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              {/* Заглушка аватара */}
              <span className="text-sm font-medium text-gray-500">ЛГ</span>
            </div>
            <div>
              <p className="font-medium text-sm" style={{ color: "var(--color-text)" }}>{article.author}</p>
              <p className="text-xs" style={{ color: "var(--color-text-secondary)" }}>Клинический психолог</p>
            </div>
          </div>

          <div 
            className="prose prose-lg max-w-none"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {article.content.split("\n").map((paragraph, i) => (
              <p key={i} className="mb-4 leading-relaxed">{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
