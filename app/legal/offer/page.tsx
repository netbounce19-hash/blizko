import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Договор оферты",
  description: "Публичная оферта о предоставлении услуг платформы БЛИЗКО",
};

export default function OfferPage() {
  return (
    <div className="py-12 md:py-20">
      <div className="container-site">
        <div className="max-w-3xl mx-auto">
          <p
            className="text-sm font-medium mb-2 tracking-wide uppercase"
            style={{ color: "var(--color-accent)" }}
          >
            Правовая информация
          </p>
          <h1
            className="text-3xl md:text-4xl mb-8"
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 400,
            }}
          >
            Договор оферты
          </h1>

          <div
            className="space-y-6"
            style={{
              color: "var(--color-text-secondary)",
              lineHeight: 1.7,
            }}
          >
            <p>
              Дата публикации: 1 января 2025 года.
            </p>

            <section>
              <h2
                className="text-lg mb-3"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 500,
                  color: "var(--color-text)",
                }}
              >
                1. Предмет оферты
              </h2>
              <p>
                Настоящий документ является публичной офертой (далее — «Оферта»)
                и определяет условия предоставления доступа к аудио-контенту
                платформы «БЛИЗКО» (далее — «Платформа») на условиях подписки.
              </p>
              <p className="mt-2">
                Акцептом настоящей Оферты является оплата подписки через
                платёжные системы, представленные на Платформе.
              </p>
            </section>

            <section>
              <h2
                className="text-lg mb-3"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 500,
                  color: "var(--color-text)",
                }}
              >
                2. Описание услуг
              </h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>Доступ к библиотеке аудио-роликов терапевтического содержания</li>
                <li>Возможность задать анонимный вопрос специалисту</li>
                <li>Персональная история прослушивания и избранное</li>
                <li>Доступ к новым материалам по мере их публикации</li>
              </ul>
            </section>

            <section>
              <h2
                className="text-lg mb-3"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 500,
                  color: "var(--color-text)",
                }}
              >
                3. Стоимость и порядок оплаты
              </h2>
              <p>
                Стоимость подписки: 2 999 ₽/месяц (или эквивалент в иностранной
                валюте). Оплата осуществляется через платёжные системы YooKassa
                (для платежей в рублях) или Stripe (для платежей в долларах).
              </p>
              <p className="mt-2">
                Подписка продлевается автоматически. Пользователь может отменить
                подписку в любое время через личный кабинет. Доступ сохраняется
                до конца оплаченного периода.
              </p>
            </section>

            <section>
              <h2
                className="text-lg mb-3"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 500,
                  color: "var(--color-text)",
                }}
              >
                4. Ограничение ответственности
              </h2>
              <p>
                Материалы Платформы носят информационный и образовательный
                характер. Они не являются медицинскими рекомендациями и не
                заменяют очную консультацию специалиста.
              </p>
              <p className="mt-2">
                При кризисной ситуации рекомендуем обратиться на бесплатную
                горячую линию психологической помощи: 8-800-2000-122.
              </p>
            </section>

            <section>
              <h2
                className="text-lg mb-3"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 500,
                  color: "var(--color-text)",
                }}
              >
                5. Возврат средств
              </h2>
              <p>
                Возврат средств возможен в течение 14 дней с момента оплаты,
                если пользователь не воспользовался доступом к платному контенту.
                Для оформления возврата свяжитесь с нами по email:{" "}
                <a
                  href="mailto:support@blizko.app"
                  style={{ color: "var(--color-accent)" }}
                >
                  support@blizko.app
                </a>
              </p>
            </section>

            <section>
              <h2
                className="text-lg mb-3"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 500,
                  color: "var(--color-text)",
                }}
              >
                6. Контакты
              </h2>
              <p>
                По всем вопросам обращайтесь:{" "}
                <a
                  href="mailto:support@blizko.app"
                  style={{ color: "var(--color-accent)" }}
                >
                  support@blizko.app
                </a>
              </p>
            </section>

            <p
              className="text-xs pt-6 border-t"
              style={{ borderColor: "var(--color-border)" }}
            >
              Данный документ является плейсхолдером и подлежит доработке
              юристом перед запуском в продакшен.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
