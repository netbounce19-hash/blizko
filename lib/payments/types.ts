// Интерфейсы платёжного адаптера «БЛИЗКО»
// Модульная архитектура: YooKassa (RUB) и Stripe (USD)

export type PaymentCurrency = "RUB" | "USD";

export interface CreatePaymentInput {
  /** ID пользователя в системе */
  userId: string;
  /** Email пользователя для чека */
  email: string;
  /** Валюта платежа */
  currency: PaymentCurrency;
  /** Сумма в минимальных единицах (копейки / центы) */
  amount: number;
  /** Описание платежа */
  description: string;
  /** URL возврата после оплаты */
  returnUrl: string;
}

export interface PaymentResult {
  /** Успешность создания платежа */
  success: boolean;
  /** URL для перенаправления пользователя на страницу оплаты */
  paymentUrl?: string;
  /** ID платежа в платёжной системе */
  externalPaymentId?: string;
  /** Сообщение об ошибке */
  error?: string;
}

export interface WebhookEvent {
  /** Тип события */
  type: "payment.succeeded" | "payment.canceled" | "subscription.renewed" | "subscription.canceled";
  /** ID платежа в платёжной системе */
  externalPaymentId: string;
  /** Метаданные */
  metadata: Record<string, string>;
}

/** Абстрактный интерфейс платёжного провайдера */
export interface PaymentProvider {
  /** Название провайдера */
  name: string;
  /** Поддерживаемая валюта */
  currency: PaymentCurrency;
  /** Создать платёж и получить URL для оплаты */
  createPayment(input: CreatePaymentInput): Promise<PaymentResult>;
  /** Обработать входящий вебхук от платёжной системы */
  handleWebhook(body: unknown, signature: string): Promise<WebhookEvent | null>;
  /** Отменить подписку */
  cancelSubscription(externalSubscriptionId: string): Promise<boolean>;
}
