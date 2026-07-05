"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LogIn, Mail, Lock, ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { FormFieldWrapper, Input, FormStatus } from "@/components/ui/FormField";

/* Схема валидации формы входа */
const signInSchema = z.object({
  email: z.string().email("Введите корректный email"),
  password: z.string().min(1, "Введите пароль"),
});

type SignInFormData = z.infer<typeof signInSchema>;

export default function SignInPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      // Используем NextAuth signIn через fetch
      const res = await fetch("/api/auth/callback/credentials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          redirect: false,
        }),
      });

      if (res.ok) {
        router.push("/account");
        router.refresh();
      } else {
        setError("Неверный email или пароль. Попробуйте demo@blizko.app / demo123");
      }
    } catch {
      setError("Произошла ошибка. Попробуйте позже.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-16 md:py-24">
      <div className="container-site">
        <div className="max-w-md mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm mb-8"
            style={{ color: "var(--color-text-secondary)" }}
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
            На главную
          </Link>

          <div
            className="rounded-2xl p-6 md:p-8"
            style={{
              backgroundColor: "var(--color-white)",
              boxShadow: "var(--shadow-card)",
              borderRadius: "var(--radius-lg)",
            }}
          >
            <div className="text-center mb-6">
              <div
                className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{ backgroundColor: "rgba(124, 152, 133, 0.08)" }}
              >
                <LogIn
                  className="w-5 h-5"
                  style={{ color: "var(--color-accent)" }}
                  strokeWidth={1.5}
                />
              </div>
              <h1
                className="text-2xl mb-2"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 400,
                }}
              >
                Вход в кабинет
              </h1>
              <p
                className="text-sm"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Войдите для доступа к подписке и истории прослушивания
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <FormFieldWrapper label="Email" error={errors.email} required>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                    style={{ color: "var(--color-text-secondary)" }}
                    strokeWidth={1.5}
                  />
                  <Input
                    type="email"
                    placeholder="mail@example.com"
                    hasError={!!errors.email}
                    style={{ paddingLeft: "2.5rem" }}
                    {...register("email")}
                  />
                </div>
              </FormFieldWrapper>

              <FormFieldWrapper label="Пароль" error={errors.password} required>
                <div className="relative">
                  <Lock
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                    style={{ color: "var(--color-text-secondary)" }}
                    strokeWidth={1.5}
                  />
                  <Input
                    type="password"
                    placeholder="••••••••"
                    hasError={!!errors.password}
                    style={{ paddingLeft: "2.5rem" }}
                    {...register("password")}
                  />
                </div>
              </FormFieldWrapper>

              {error && <FormStatus type="error" message={error} />}

              <div className="mt-5">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  isLoading={isLoading}
                >
                  Войти
                </Button>
              </div>
            </form>

            {/* Демо-подсказка */}
            <div
              className="mt-5 rounded-xl p-3 text-center"
              style={{
                backgroundColor: "var(--color-surface)",
              }}
            >
              <p
                className="text-xs"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Демо-доступ: <strong>demo@blizko.app</strong> / <strong>demo123</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
