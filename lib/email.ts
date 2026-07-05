// Заглушка отправки email через Resend
// Документация: https://resend.com/docs

// TODO: Установить пакет resend
// TODO: Вставить реальный RESEND_API_KEY в .env

interface SendEmailInput {
  to: string;
  subject: string;
  html: string;
}

/**
 * Отправка email-уведомления
 * Заглушка — логирует в консоль вместо реальной отправки
 */
export async function sendEmail(input: SendEmailInput): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL || "noreply@blizko.app";

  if (!apiKey) {
    console.warn("⚠️ RESEND_API_KEY не задан. Email не отправлен.");
    console.log("[Email заглушка]", {
      from: fromEmail,
      to: input.to,
      subject: input.subject,
    });
    return true; // Возвращаем true чтобы не блокировать UX
  }

  try {
    // TODO: Реализовать реальную отправку
    // const resend = new Resend(apiKey);
    // await resend.emails.send({
    //   from: fromEmail,
    //   to: input.to,
    //   subject: input.subject,
    //   html: input.html,
    // });

    console.log("[Resend] Email отправлен:", input.to, input.subject);
    return true;
  } catch (error) {
    console.error("[Resend] Ошибка отправки:", error);
    return false;
  }
}

/* Шаблоны email-уведомлений */

/** Уведомление о готовности ответа на анонимный вопрос */
export function buildQuestionAnsweredEmail(pseudonym: string): string {
  return `
    <div style="font-family: 'Inter', sans-serif; max-width: 480px; margin: 0 auto; padding: 32px;">
      <h2 style="color: #2E2B28; font-size: 20px;">БЛИЗКО</h2>
      <p style="color: #8A8479; font-size: 14px; line-height: 1.6;">
        Здравствуйте, ${pseudonym}!
      </p>
      <p style="color: #8A8479; font-size: 14px; line-height: 1.6;">
        Специалист подготовил ответ на ваш вопрос. Ответ доступен в аудио-формате на платформе.
      </p>
      <a href="${process.env.NEXTAUTH_URL || "https://blizko.app"}" 
         style="display: inline-block; background-color: #7C9885; color: white; padding: 10px 24px; border-radius: 9999px; text-decoration: none; font-size: 14px; margin-top: 16px;">
        Прослушать ответ
      </a>
      <p style="color: #8A8479; font-size: 12px; margin-top: 24px;">
        С теплом, команда БЛИЗКО
      </p>
    </div>
  `;
}

/** Уведомление о новой записи на консультацию (для специалиста) */
export function buildBookingNotificationEmail(
  name: string,
  format: string,
  preferredTime: string
): string {
  return `
    <div style="font-family: 'Inter', sans-serif; max-width: 480px; margin: 0 auto; padding: 32px;">
      <h2 style="color: #2E2B28; font-size: 20px;">Новая запись на консультацию</h2>
      <p style="color: #8A8479; font-size: 14px; line-height: 1.6;">
        <strong>Имя:</strong> ${name}<br/>
        <strong>Формат:</strong> ${format === "online" ? "Онлайн" : "Очно"}<br/>
        <strong>Предпочтительное время:</strong> ${preferredTime}
      </p>
    </div>
  `;
}
