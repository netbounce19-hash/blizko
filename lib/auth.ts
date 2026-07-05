import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

// Конфигурация NextAuth для платформы «БЛИЗКО»
// TODO: Подключить Prisma Adapter после настройки DATABASE_URL
// TODO: Заменить заглушку проверки пароля на реальную (bcrypt)

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    // Email/password аутентификация
    Credentials({
      name: "Вход по email",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "mail@example.com" },
        password: { label: "Пароль", type: "password" },
      },
      async authorize(credentials) {
        // TODO: Реальная проверка через Prisma + bcrypt
        // const user = await prisma.user.findUnique({ where: { email } });
        // const isValid = await bcrypt.compare(password, user.passwordHash);

        // Заглушка для разработки
        if (
          credentials?.email === "demo@blizko.app" &&
          credentials?.password === "demo123"
        ) {
          return {
            id: "demo-user-1",
            email: "demo@blizko.app",
            name: "Демо пользователь",
          };
        }
        return null;
      },
    }),

    // Google OAuth (опционально)
    // Активируется при наличии GOOGLE_CLIENT_ID и GOOGLE_CLIENT_SECRET
    ...(process.env.GOOGLE_CLIENT_ID
      ? [
          Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
          }),
        ]
      : []),
  ],

  // JWT-стратегия (не требует БД для сессий)
  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});
