import { NextRequest, NextResponse } from "next/server";

// API: Запись на консультацию
// POST /api/booking

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, contactInfo, format, preferredTime, message } = body;

    // Валидация на сервере
    if (!name || !contactInfo || !format || !preferredTime) {
      return NextResponse.json(
        { error: "Имя, контакт, формат и время обязательны" },
        { status: 400 }
      );
    }

    if (!["online", "offline"].includes(format)) {
      return NextResponse.json(
        { error: "Некорректный формат консультации" },
        { status: 400 }
      );
    }

    // TODO: Сохранить в БД через Prisma
    // const booking = await prisma.booking.create({
    //   data: {
    //     name,
    //     contactInfo,
    //     format: format === "online" ? "ONLINE" : "OFFLINE",
    //     preferredTime,
    //     message: message || null,
    //     status: "NEW",
    //   },
    // });

    console.log("[API] Запись на консультацию:", {
      name,
      format,
      preferredTime,
    });

    // TODO: Отправить email-уведомление специалисту
    // await sendEmail({
    //   to: "specialist@blizko.app",
    //   subject: `Новая запись на консультацию: ${name}`,
    //   html: buildBookingNotificationEmail(name, format, preferredTime),
    // });

    return NextResponse.json(
      { success: true, message: "Заявка отправлена" },
      { status: 201 }
    );
  } catch (error) {
    console.error("[API] Ошибка при сохранении записи:", error);
    return NextResponse.json(
      { error: "Внутренняя ошибка сервера" },
      { status: 500 }
    );
  }
}
