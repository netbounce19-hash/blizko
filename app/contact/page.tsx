"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { Send, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  FormFieldWrapper,
  Input,
  Textarea,
  Checkbox,
  FormStatus,
} from "@/components/ui/FormField";

/* Схема валидации обратной связи */
const contactSchema = z.object({
  name: z.string().min(2, "Укажите имя").max(100),
  contactInfo: z
    .string()
    .min(5, "Укажите контактные данные")
    .max(200),
  message: z
    .string()
    .min(10, "Сообщение слишком короткое (минимум 10 символов)")
    .max(2000, "Максимум 2000 символов"),
  privacyConsent: z.literal(true, {
    message: "Необходимо дать согласие",
  }),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      contactInfo: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setSubmitStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setSubmitStatus("success");
        reset();
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    }
  };

  return (
    <div className="py-12 md:py-20">
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 max-w-4xl mx-auto">
          {/* Левая колонка — контактная информация */}
          <div>
            <p
              className="text-sm font-medium mb-2 tracking-wide uppercase"
              style={{ color: "var(--color-accent)" }}
            >
              Контакты
            </p>
            <h1
              className="text-3xl md:text-4xl mb-4"
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 400,
              }}
            >
              Свяжитесь с нами
            </h1>
            <p
              className="mb-8 leading-relaxed"
              style={{
                color: "var(--color-text-secondary)",
                lineHeight: 1.7,
              }}
            >
              Есть вопрос о работе платформы, предложение о сотрудничестве
              или обратная связь? Напишите нам — мы ответим в течение рабочего
              дня.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: "var(--color-surface)" }}
                >
                  <Mail
                    className="w-4 h-4"
                    style={{ color: "var(--color-accent)" }}
                    strokeWidth={1.5}
                  />
                </div>
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <a
                    href="mailto:hello@blizko.app"
                    className="text-sm"
                    style={{ color: "var(--color-accent)" }}
                  >
                    hello@blizko.app
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: "var(--color-surface)" }}
                >
                  <Phone
                    className="w-4 h-4"
                    style={{ color: "var(--color-accent)" }}
                    strokeWidth={1.5}
                  />
                </div>
                <div>
                  <p className="text-sm font-medium">Горячая линия</p>
                  <a
                    href="tel:88002000122"
                    className="text-sm"
                    style={{ color: "var(--color-accent)" }}
                  >
                    8-800-2000-122
                  </a>
                  <p
                    className="text-xs"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    Кризисная помощь (бесплатно)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Правая колонка — форма */}
          <div>
            {submitStatus === "success" ? (
              <div
                className="rounded-2xl p-8 text-center"
                style={{
                  backgroundColor: "var(--color-white)",
                  boxShadow: "var(--shadow-card)",
                  borderRadius: "var(--radius-lg)",
                }}
              >
                <div
                  className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center"
                  style={{ backgroundColor: "rgba(124, 152, 133, 0.08)" }}
                >
                  <Send
                    className="w-6 h-6"
                    style={{ color: "var(--color-accent)" }}
                    strokeWidth={1.5}
                  />
                </div>
                <h2
                  className="text-xl mb-2"
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 500,
                  }}
                >
                  Сообщение отправлено
                </h2>
                <p
                  className="text-sm mb-5"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  Мы ответим вам в ближайшее время.
                </p>
                <Button
                  variant="outline"
                  onClick={() => setSubmitStatus("idle")}
                >
                  Написать ещё
                </Button>
              </div>
            ) : (
              <div
                className="rounded-2xl p-6 md:p-8"
                style={{
                  backgroundColor: "var(--color-white)",
                  boxShadow: "var(--shadow-card)",
                  borderRadius: "var(--radius-lg)",
                }}
              >
                <form onSubmit={handleSubmit(onSubmit)}>
                  <FormFieldWrapper label="Имя" error={errors.name} required>
                    <Input
                      placeholder="Как к вам обращаться"
                      hasError={!!errors.name}
                      {...register("name")}
                    />
                  </FormFieldWrapper>

                  <FormFieldWrapper
                    label="Контактные данные"
                    error={errors.contactInfo}
                    required
                    hint="Email, телефон или Telegram"
                  >
                    <Input
                      placeholder="Email, телефон или Telegram"
                      hasError={!!errors.contactInfo}
                      {...register("contactInfo")}
                    />
                  </FormFieldWrapper>

                  <FormFieldWrapper
                    label="Сообщение"
                    error={errors.message}
                    required
                  >
                    <Textarea
                      placeholder="Напишите ваш вопрос или предложение"
                      rows={5}
                      hasError={!!errors.message}
                      {...register("message")}
                    />
                  </FormFieldWrapper>

                  <Checkbox
                    label={
                      <>
                        Я даю согласие на обработку персональных данных в
                        соответствии с{" "}
                        <Link
                          href="/legal/privacy"
                          className="underline"
                          style={{ color: "var(--color-accent)" }}
                          target="_blank"
                        >
                          Политикой конфиденциальности
                        </Link>
                      </>
                    }
                    error={errors.privacyConsent}
                    {...register("privacyConsent")}
                  />

                  {submitStatus === "error" && (
                    <div className="mb-4">
                      <FormStatus
                        type="error"
                        message="Произошла ошибка. Пожалуйста, попробуйте позже."
                      />
                    </div>
                  )}

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    isLoading={submitStatus === "loading"}
                  >
                    <Send className="w-4 h-4" strokeWidth={1.5} />
                    Отправить
                  </Button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
