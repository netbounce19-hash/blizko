import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Политика конфиденциальности",
  description: "Политика обработки персональных данных платформы БЛИЗКО",
};

export default function PrivacyPage() {
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
            Политика конфиденциальности
          </h1>

          <div
            className="space-y-6"
            style={{
              color: "var(--color-text-secondary)",
              lineHeight: 1.7,
            }}
          >
            <p>
              Дата вступления в силу: 1 января 2025 года.
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
                1. Общие положения
              </h2>
              <p>
                Настоящая Политика конфиденциальности (далее — «Политика»)
                определяет порядок обработки и защиты персональных данных
                пользователей платформы «БЛИЗКО» (далее — «Платформа»).
              </p>
              <p className="mt-2">
                Используя Платформу, вы соглашаетесь с условиями настоящей
                Политики. Если вы не согласны с какими-либо положениями,
                пожалуйста, воздержитесь от использования Платформы.
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
                2. Какие данные мы собираем
              </h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>Email-адрес (при регистрации)</li>
                <li>Имя или псевдоним (при отправке вопроса или заявки)</li>
                <li>Контактные данные (телефон, мессенджер — при записи на консультацию)</li>
                <li>Данные об использовании (история прослушивания, прогресс)</li>
                <li>Платёжные данные обрабатываются платёжными системами (YooKassa, Stripe) и не хранятся на Платформе</li>
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
                3. Цели обработки данных
              </h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>Предоставление доступа к контенту Платформы</li>
                <li>Обработка подписок и платежей</li>
                <li>Ответы на вопросы пользователей</li>
                <li>Запись на консультации</li>
                <li>Улучшение качества сервиса</li>
                <li>Отправка уведомлений (с согласия пользователя)</li>
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
                4. Защита данных
              </h2>
              <p>
                Мы применяем технические и организационные меры для защиты
                ваших персональных данных от несанкционированного доступа,
                изменения, раскрытия или уничтожения. Данные хранятся на
                защищённых серверах с шифрованием.
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
                5. Ваши права
              </h2>
              <p>
                Вы имеете право запросить доступ к вашим данным, их исправление
                или удаление. Для этого свяжитесь с нами по email:{" "}
                <a
                  href="mailto:privacy@blizko.app"
                  style={{ color: "var(--color-accent)" }}
                >
                  privacy@blizko.app
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
                По вопросам, связанным с обработкой персональных данных,
                обращайтесь:{" "}
                <a
                  href="mailto:privacy@blizko.app"
                  style={{ color: "var(--color-accent)" }}
                >
                  privacy@blizko.app
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
