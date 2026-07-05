import { NextRequest, NextResponse } from "next/server";

// API: Обратная связь
// POST /api/contact

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, contactInfo, message } = body;

    // Валидация на сервере
    if (!name || !contactInfo || !message || message.length < 10) {
      return NextResponse.json(
        { error: "Имя, контакт и сообщение обязательны (мин. 10 символов)" },
        { status: 400 }
      );
    }

    // TODO: Сохранить в БД через Prisma
    // const contactMessage = await prisma.contactMessage.create({
    //   data: {
    //     name,
    //     contactInfo,
    //     message,
    //   },
    // });

    console.log("[API] Сообщение обратной связи:", {
      name,
      contactInfo,
      messageLength: message.length,
    });

    // TODO: Отправить email-уведомление администратору
    // await sendEmail({
    //   to: "admin@blizko.app",
    //   subject: `Обратная связь от ${name}`,
    //   html: `<p><strong>Контакт:</strong> ${contactInfo}</p><p>${message}</p>`,
    // });

    return NextResponse.json(
      { success: true, message: "Сообщение отправлено" },
      { status: 201 }
    );
  } catch (error) {
    console.error("[API] Ошибка при сохранении сообщения:", error);
    return NextResponse.json(
      { error: "Внутренняя ошибка сервера" },
      { status: 500 }
    );
  }
}
