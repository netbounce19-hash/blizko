import type { PaymentCurrency, PaymentProvider } from "./types";
import { YooKassaProvider } from "./yookassa";
import { StripeProvider } from "./stripe";

// Фабрика платёжных провайдеров
// Возвращает нужный провайдер в зависимости от валюты

const providers: Record<PaymentCurrency, PaymentProvider> = {
  RUB: new YooKassaProvider(),
  USD: new StripeProvider(),
};

/**
 * Получить платёжный провайдер по валюте
 * @param currency - "RUB" для YooKassa, "USD" для Stripe
 */
export function getPaymentProvider(currency: PaymentCurrency): PaymentProvider {
  return providers[currency];
}

export type { PaymentCurrency, PaymentProvider } from "./types";
