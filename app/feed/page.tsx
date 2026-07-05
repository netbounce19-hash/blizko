import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";
import { mockArticles } from "@/lib/mock-data";

export const metadata = {
  title: "Лента статей | Клуб поддержки БЛИЗКО",
  description: "Статьи и полезные материалы от клинического психолога.",
};

export default function FeedPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="container-site">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h1
              className="text-3xl md:text-5xl mb-4"
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 400,
              }}
            >
              Лента статей
            </h1>
            <p
              className="text-lg"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Полезные материалы, истории из практики и разбор актуальных тем.
            </p>
          </div>

          <div className="space-y-8">
            {mockArticles.map((article) => (
              <article
                key={article.id}
                className="p-6 md:p-8 rounded-2xl transition-all"
                style={{
                  backgroundColor: "var(--color-surface)",
                  boxShadow: "var(--shadow-card)",
                }}
              >
                <div className="flex items-center gap-2 mb-4 text-xs font-medium uppercase tracking-wide" style={{ color: "var(--color-accent)" }}>
                  <BookOpen className="w-4 h-4" />
                  <span>{new Date(article.publishedAt).toLocaleDateString("ru-RU", {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                  })}</span>
                </div>
                
                <h2 className="text-2xl md:text-3xl mb-4 leading-tight" style={{ fontFamily: "var(--font-heading)", fontWeight: 400 }}>
                  <Link href={`/feed/${article.slug}`} className="hover:opacity-80 transition-opacity">
                    {article.title}
                  </Link>
                </h2>
                
                <p className="mb-6 text-base md:text-lg leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                  {article.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium" style={{ color: "var(--color-text)" }}>
                    {article.author}
                  </span>
                  
                  <Link
                    href={`/feed/${article.slug}`}
                    className="inline-flex items-center gap-1 text-sm font-medium hover:opacity-80 transition-opacity"
                    style={{ color: "var(--color-accent)" }}
                  >
                    Читать далее
                    <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
