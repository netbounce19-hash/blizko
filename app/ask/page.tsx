"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { MessageCircle, AlertTriangle, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  FormFieldWrapper,
  Input,
  Textarea,
  Checkbox,
  FormStatus,
} from "@/components/ui/FormField";

/* Схема валидации анонимного вопроса */
const askSchema = z.object({
  pseudonym: z
    .string()
    .min(1, "Укажите псевдоним")
    .max(50, "Максимум 50 символов"),
  questionText: z
    .string()
    .min(20, "Вопрос слишком короткий (минимум 20 символов)")
    .max(2000, "Максимум 2000 символов"),
  contactEmail: z
    .string()
    .email("Введите корректный email")
    .optional()
    .or(z.literal("")),
  privacyConsent: z.literal(true, {
    message: "Необходимо дать согласие",
  }),
});

type AskFormData = z.infer<typeof askSchema>;

export default function AskPage() {
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AskFormData>({
    resolver: zodResolver(askSchema),
    defaultValues: {
      pseudonym: "",
      questionText: "",
      contactEmail: "",
    },
  });

  const onSubmit = async (data: AskFormData) => {
    setSubmitStatus("loading");

    try {
      const res = await fetch("/api/ask", {
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
        <div className="max-w-xl mx-auto">
          {/* Заголовок */}
          <div className="text-center mb-8">
            <div
              className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center"
              style={{ backgroundColor: "rgba(217, 166, 121, 0.1)" }}
            >
              <MessageCircle
                className="w-5 h-5"
                style={{ color: "var(--color-accent-2)" }}
                strokeWidth={1.5}
              />
            </div>
            <h1
              className="text-3xl md:text-4xl mb-3"
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 400,
              }}
            >
              Задайте анонимный вопрос
            </h1>
            <p
              className="leading-relaxed max-w-md mx-auto"
              style={{
                color: "var(--color-text-secondary)",
                lineHeight: 1.7,
              }}
            >
              Вы можете задать вопрос специалисту анонимно. Укажите псевдоним
              вместо имени. Email нужен только если вы хотите получить
              уведомление о готовности ответа.
            </p>
          </div>

          {/* Дисклеймер — кризисная помощь */}
          <div
            className="rounded-xl p-4 mb-8 flex items-start gap-3"
            style={{
              backgroundColor: "rgba(199, 123, 88, 0.06)",
              border: "1px solid rgba(199, 123, 88, 0.15)",
              borderRadius: "var(--radius-md)",
            }}
            role="alert"
          >
            <AlertTriangle
              className="w-5 h-5 mt-0.5 flex-shrink-0"
              style={{ color: "var(--color-warning)" }}
              strokeWidth={1.5}
            />
            <div>
              <p
                className="text-sm font-medium mb-1"
                style={{ color: "var(--color-warning)" }}
              >
                Важно
              </p>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Это не экстренная помощь и не заменяет очную консультацию
                психолога. При кризисной ситуации, пожалуйста, обратитесь на
                бесплатную горячую линию психологической помощи:
              </p>
              <a
                href="tel:88002000122"
                className="inline-flex items-center gap-1.5 mt-2 text-sm font-medium"
                style={{ color: "var(--color-warning)" }}
              >
                <Phone className="w-4 h-4" strokeWidth={1.5} />
                8-800-2000-122 (бесплатно, круглосуточно)
              </a>
            </div>
          </div>

          {/* Форма */}
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
                <MessageCircle
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
                Вопрос отправлен
              </h2>
              <p
                className="text-sm mb-5"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Специалист подготовит персональный аудио-ответ. Если вы указали
                email, мы уведомим вас о готовности.
              </p>
              <Button
                variant="outline"
                onClick={() => setSubmitStatus("idle")}
              >
                Задать ещё вопрос
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
                <FormFieldWrapper
                  label="Псевдоним"
                  error={errors.pseudonym}
                  required
                  hint="Это имя будет видно только специалисту"
                >
                  <Input
                    placeholder="Например: Тревожный Ёж"
                    hasError={!!errors.pseudonym}
                    {...register("pseudonym")}
                  />
                </FormFieldWrapper>

                <FormFieldWrapper
                  label="Ваш вопрос"
                  error={errors.questionText}
                  required
                  hint="Опишите ситуацию подробно — это поможет дать развёрнутый ответ"
                >
                  <Textarea
                    placeholder="Что вас беспокоит? О чём вы хотели бы спросить?"
                    rows={6}
                    hasError={!!errors.questionText}
                    {...register("questionText")}
                  />
                </FormFieldWrapper>

                <FormFieldWrapper
                  label="Email для уведомления"
                  error={errors.contactEmail}
                  hint="Опционально. Мы напишем, когда ответ будет готов"
                >
                  <Input
                    type="email"
                    placeholder="mail@example.com"
                    hasError={!!errors.contactEmail}
                    {...register("contactEmail")}
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
                  variant="secondary"
                  size="lg"
                  fullWidth
                  isLoading={submitStatus === "loading"}
                >
                  Отправить вопрос
                </Button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
