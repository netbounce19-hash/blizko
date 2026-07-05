import type {
  PaymentProvider,
  CreatePaymentInput,
  PaymentResult,
  WebhookEvent,
} from "./types";

// Stripe — платёжный провайдер для USD
// Документация: https://stripe.com/docs

// TODO: Установить пакет stripe и реализовать реальные вызовы API
// TODO: Вставить реальные STRIPE_SECRET_KEY и STRIPE_WEBHOOK_SECRET в .env

export class StripeProvider implements PaymentProvider {
  name = "Stripe";
  currency = "USD" as const;

  private secretKey: string;
  private webhookSecret: string;

  constructor() {
    this.secretKey = process.env.STRIPE_SECRET_KEY || "";
    this.webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

    if (!this.secretKey) {
      console.warn(
        "⚠️ Stripe: STRIPE_SECRET_KEY не задан. Платежи не будут работать."
      );
    }
  }

  async createPayment(input: CreatePaymentInput): Promise<PaymentResult> {
    // TODO: Реализовать реальный вызов Stripe Checkout Session
    // const stripe = new Stripe(this.secretKey);
    // const session = await stripe.checkout.sessions.create({
    //   mode: "subscription",
    //   payment_method_types: ["card"],
    //   customer_email: input.email,
    //   line_items: [{
    //     price: process.env.STRIPE_PRICE_ID, // ID цены из Stripe Dashboard
    //     quantity: 1,
    //   }],
    //   success_url: `${input.returnUrl}?success=true`,
    //   cancel_url: `${input.returnUrl}?canceled=true`,
    //   metadata: { userId: input.userId },
    // });

    console.log("[Stripe] Создание платежа (заглушка):", {
      userId: input.userId,
      amount: input.amount,
      currency: input.currency,
    });

    // Заглушка — возвращаем фейковый URL
    return {
      success: true,
      paymentUrl: `https://checkout.stripe.com/mock?amount=${input.amount}`,
      externalPaymentId: `stripe_mock_${Date.now()}`,
    };
  }

  async handleWebhook(
    body: unknown,
    signature: string
  ): Promise<WebhookEvent | null> {
    // TODO: Верифицировать подпись вебхука через stripe.webhooks.constructEvent
    // const event = stripe.webhooks.constructEvent(body, signature, this.webhookSecret);
    // Обработать event.type: checkout.session.completed, invoice.paid и т.д.

    console.log("[Stripe] Обработка вебхука (заглушка)");
    return null;
  }

  async cancelSubscription(externalSubscriptionId: string): Promise<boolean> {
    // TODO: Реализовать отмену через stripe.subscriptions.cancel
    // await stripe.subscriptions.cancel(externalSubscriptionId);
    console.log("[Stripe] Отмена подписки (заглушка):", externalSubscriptionId);
    return true;
  }
}
