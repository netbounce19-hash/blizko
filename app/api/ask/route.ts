import { NextRequest, NextResponse } from "next/server";

// API: Анонимный вопрос
// POST /api/ask

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { pseudonym, questionText, contactEmail } = body;

    // Валидация на сервере
    if (!pseudonym || !questionText || questionText.length < 20) {
      return NextResponse.json(
        { error: "Псевдоним и текст вопроса обязательны (мин. 20 символов)" },
        { status: 400 }
      );
    }

    // TODO: Сохранить в БД через Prisma
    // const question = await prisma.anonymousQuestion.create({
    //   data: {
    //     pseudonym,
    //     questionText,
    //     contactEmailOptional: contactEmail || null,
    //     status: "NEW",
    //   },
    // });

    console.log("[API] Анонимный вопрос сохранён:", {
      pseudonym,
      questionLength: questionText.length,
      hasEmail: !!contactEmail,
    });

    // TODO: Отправить email-уведомление специалисту
    // await sendEmail({
    //   to: "specialist@blizko.app",
    //   subject: `Новый анонимный вопрос от ${pseudonym}`,
    //   html: `<p>${questionText}</p>`,
    // });

    return NextResponse.json(
      { success: true, message: "Вопрос отправлен" },
      { status: 201 }
    );
  } catch (error) {
    console.error("[API] Ошибка при сохранении вопроса:", error);
    return NextResponse.json(
      { error: "Внутренняя ошибка сервера" },
      { status: 500 }
    );
  }
}
