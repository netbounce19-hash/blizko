import type {
  PaymentProvider,
  CreatePaymentInput,
  PaymentResult,
  WebhookEvent,
} from "./types";

// YooKassa (ЮKassa) — платёжный провайдер для RUB
// Документация: https://yookassa.ru/developers

// TODO: Установить пакет @yookassa/sdk и реализовать реальные вызовы API
// TODO: Вставить реальные YOOKASSA_SHOP_ID и YOOKASSA_SECRET_KEY в .env

export class YooKassaProvider implements PaymentProvider {
  name = "YooKassa";
  currency = "RUB" as const;

  private shopId: string;
  private secretKey: string;

  constructor() {
    this.shopId = process.env.YOOKASSA_SHOP_ID || "";
    this.secretKey = process.env.YOOKASSA_SECRET_KEY || "";

    if (!this.shopId || !this.secretKey) {
      console.warn(
        "⚠️ YooKassa: YOOKASSA_SHOP_ID и/или YOOKASSA_SECRET_KEY не заданы. Платежи не будут работать."
      );
    }
  }

  async createPayment(input: CreatePaymentInput): Promise<PaymentResult> {
    // TODO: Реализовать реальный вызов API YooKassa
    // const payment = await yookassa.createPayment({
    //   amount: { value: (input.amount / 100).toFixed(2), currency: "RUB" },
    //   confirmation: { type: "redirect", return_url: input.returnUrl },
    //   capture: true,
    //   description: input.description,
    //   metadata: { userId: input.userId },
    //   receipt: {
    //     customer: { email: input.email },
    //     items: [{
    //       description: "Подписка БЛИЗКО (месяц)",
    //       quantity: "1",
    //       amount: { value: (input.amount / 100).toFixed(2), currency: "RUB" },
    //       vat_code: 1,
    //     }],
    //   },
    // });

    console.log("[YooKassa] Создание платежа (заглушка):", {
      userId: input.userId,
      amount: input.amount,
      currency: input.currency,
    });

    // Заглушка — возвращаем фейковый URL
    return {
      success: true,
      paymentUrl: `https://yookassa.ru/checkout/mock?amount=${input.amount}`,
      externalPaymentId: `yk_mock_${Date.now()}`,
    };
  }

  async handleWebhook(
    body: unknown,
    signature: string
  ): Promise<WebhookEvent | null> {
    // TODO: Верифицировать подпись вебхука
    // TODO: Парсить тело вебхука и вернуть WebhookEvent

    console.log("[YooKassa] Обработка вебхука (заглушка)");
    return null;
  }

  async cancelSubscription(externalSubscriptionId: string): Promise<boolean> {
    // TODO: Реализовать отмену через API YooKassa
    console.log("[YooKassa] Отмена подписки (заглушка):", externalSubscriptionId);
    return true;
  }
}
