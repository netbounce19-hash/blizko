"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { Calendar, MapPin, Video } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  FormFieldWrapper,
  Input,
  Textarea,
  Select,
  Checkbox,
  FormStatus,
} from "@/components/ui/FormField";

/* Схема валидации записи на консультацию */
const bookingSchema = z.object({
  name: z.string().min(2, "Укажите имя").max(100),
  contactInfo: z
    .string()
    .min(5, "Укажите контактные данные")
    .max(200, "Максимум 200 символов"),
  format: z.enum(["online", "offline"], {
    message: "Выберите формат",
  }),
  preferredTime: z.string().min(1, "Укажите предпочтительное время"),
  message: z.string().max(1000).optional(),
  privacyConsent: z.literal(true, {
    message: "Необходимо дать согласие",
  }),
});

type BookingFormData = z.infer<typeof bookingSchema>;

export default function BookingPage() {
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: "",
      contactInfo: "",
      format: undefined,
      preferredTime: "",
      message: "",
    },
  });

  const selectedFormat = watch("format");

  const onSubmit = async (data: BookingFormData) => {
    setSubmitStatus("loading");

    try {
      const res = await fetch("/api/booking", {
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
              style={{ backgroundColor: "rgba(124, 152, 133, 0.08)" }}
            >
              <Calendar
                className="w-5 h-5"
                style={{ color: "var(--color-accent)" }}
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
              Запись на консультацию
            </h1>
            <p
              className="leading-relaxed max-w-md mx-auto"
              style={{
                color: "var(--color-text-secondary)",
                lineHeight: 1.7,
              }}
            >
              Индивидуальная работа с клиническим психологом — онлайн или очно.
              Выберите удобный формат и время.
            </p>
          </div>

          {/* Карточки форматов */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <label
              className="relative rounded-xl p-5 cursor-pointer text-center"
              style={{
                backgroundColor:
                  selectedFormat === "online"
                    ? "rgba(124, 152, 133, 0.06)"
                    : "var(--color-white)",
                border: `1px solid ${
                  selectedFormat === "online"
                    ? "var(--color-accent)"
                    : "var(--color-border)"
                }`,
                borderRadius: "var(--radius-card)",
                transition: "all var(--transition-base)",
              }}
            >
              <input
                type="radio"
                value="online"
                className="sr-only"
                {...register("format")}
              />
              <Video
                className="w-6 h-6 mx-auto mb-2"
                style={{
                  color:
                    selectedFormat === "online"
                      ? "var(--color-accent)"
                      : "var(--color-text-secondary)",
                }}
                strokeWidth={1.5}
              />
              <p className="text-sm font-medium">Онлайн</p>
              <p
                className="text-xs mt-1"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Видеозвонок
              </p>
            </label>

            <label
              className="relative rounded-xl p-5 cursor-pointer text-center"
              style={{
                backgroundColor:
                  selectedFormat === "offline"
                    ? "rgba(124, 152, 133, 0.06)"
                    : "var(--color-white)",
                border: `1px solid ${
                  selectedFormat === "offline"
                    ? "var(--color-accent)"
                    : "var(--color-border)"
                }`,
                borderRadius: "var(--radius-card)",
                transition: "all var(--transition-base)",
              }}
            >
              <input
                type="radio"
                value="offline"
                className="sr-only"
                {...register("format")}
              />
              <MapPin
                className="w-6 h-6 mx-auto mb-2"
                style={{
                  color:
                    selectedFormat === "offline"
                      ? "var(--color-accent)"
                      : "var(--color-text-secondary)",
                }}
                strokeWidth={1.5}
              />
              <p className="text-sm font-medium">Очно</p>
              <p
                className="text-xs mt-1"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Личная встреча
              </p>
            </label>
          </div>
          {errors.format && (
            <p
              className="text-xs -mt-6 mb-4"
              style={{ color: "var(--color-warning)" }}
              role="alert"
            >
              {errors.format.message}
            </p>
          )}

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
                <Calendar
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
                Заявка отправлена
              </h2>
              <p
                className="text-sm mb-5"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Мы свяжемся с вами для подтверждения времени консультации.
              </p>
              <Button
                variant="outline"
                onClick={() => setSubmitStatus("idle")}
              >
                Записаться ещё раз
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
                  hint="Телефон, Telegram или email — удобный для вас способ связи"
                >
                  <Input
                    placeholder="Телефон, Telegram или email"
                    hasError={!!errors.contactInfo}
                    {...register("contactInfo")}
                  />
                </FormFieldWrapper>

                <FormFieldWrapper
                  label="Предпочтительное время"
                  error={errors.preferredTime}
                  required
                >
                  <Input
                    placeholder="Например: будни после 18:00, выходные утром"
                    hasError={!!errors.preferredTime}
                    {...register("preferredTime")}
                  />
                </FormFieldWrapper>

                <FormFieldWrapper
                  label="Дополнительно"
                  error={errors.message}
                  hint="Опционально. Можете кратко описать, с чем хотите поработать"
                >
                  <Textarea
                    placeholder="О чём бы вы хотели поговорить на консультации?"
                    rows={4}
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
                  Отправить заявку
                </Button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
