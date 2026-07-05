import { PrismaClient } from "@prisma/client";

// Seed script — заполнение базы демо-данными
// Запуск: npx prisma db seed

const prisma = new PrismaClient();

const tracks = [
  {
    title: "Мягкое дыхание при тревоге",
    slug: "myagkoe-dyhanie-pri-trevoge",
    description:
      "Короткая практика дыхания для снижения тревожности. Подходит для моментов, когда тревога нарастает.",
    fullDescription:
      "Эта практика поможет вам замедлиться и вернуть контроль над дыханием в моменты тревоги. Мы будем работать с диафрагмальным дыханием и мягкой визуализацией. Практика подходит для выполнения в любом месте — дома, в транспорте, на работе.",
    audioUrl: "https://storage.example.com/blizko/tracks/dyhanie-trevoga.mp3",
    durationSeconds: 480,
    tags: ["тревога", "дыхание", "практика"],
    isFreePreview: true,
  },
  {
    title: "Границы в отношениях",
    slug: "granicy-v-otnosheniyah",
    description:
      "Как распознать нарушение личных границ и мягко заявить о своих потребностях.",
    fullDescription:
      "В этом ролике мы разберём, что такое личные границы и почему они важны для здоровых отношений. Вы узнаете, как распознать моменты, когда ваши границы нарушаются.",
    audioUrl: "https://storage.example.com/blizko/tracks/granicy.mp3",
    durationSeconds: 720,
    tags: ["отношения", "границы"],
    isFreePreview: false,
  },
  {
    title: "Практика самоподдержки",
    slug: "praktika-samopodderzhki",
    description:
      "Учимся относиться к себе с теплом и принятием вместо привычной самокритики.",
    fullDescription:
      "Самокритика — одна из самых распространённых стратегий, которая при этом приносит больше вреда, чем пользы. В этой практике мы будем тренировать навык самоподдержки.",
    audioUrl: "https://storage.example.com/blizko/tracks/samopodderzhka.mp3",
    durationSeconds: 600,
    tags: ["самооценка", "самосострадание"],
    isFreePreview: true,
  },
  {
    title: "Восстановление после выгорания",
    slug: "vosstanovlenie-posle-vygoraniya",
    description:
      "Пошаговый план возвращения к ресурсному состоянию после эмоционального истощения.",
    fullDescription:
      "Выгорание — это не лень и не слабость. Это сигнал о том, что ваши ресурсы исчерпаны. В этом ролике мы разберём три стадии выгорания.",
    audioUrl: "https://storage.example.com/blizko/tracks/vygoranie.mp3",
    durationSeconds: 900,
    tags: ["выгорание", "ресурс", "восстановление"],
    isFreePreview: false,
  },
  {
    title: "Вечерняя практика для сна",
    slug: "vechernyaya-praktika-dlya-sna",
    description:
      "Мягкая медитация перед сном с техникой прогрессивной мышечной релаксации.",
    fullDescription:
      "Эта практика создана для выполнения непосредственно перед сном. Мы будем последовательно расслаблять группы мышц, замедлять дыхание.",
    audioUrl: "https://storage.example.com/blizko/tracks/son.mp3",
    durationSeconds: 1200,
    tags: ["сон", "релаксация", "медитация"],
    isFreePreview: false,
  },
  {
    title: "Тело и эмоции: связь",
    slug: "telo-i-emocii-svyaz",
    description:
      "Как тело хранит и выражает эмоции. Практика телесного сканирования.",
    fullDescription:
      "Наше тело — это карта эмоционального опыта. Напряжение в плечах, ком в горле, тяжесть в груди — всё это сигналы непрожитых чувств.",
    audioUrl: "https://storage.example.com/blizko/tracks/telo-emocii.mp3",
    durationSeconds: 660,
    tags: ["психосоматика", "тело", "чувства"],
    isFreePreview: true,
  },
  {
    title: "Работа с чувством вины",
    slug: "rabota-s-chuvstvom-viny",
    description:
      "Разбираемся с чувством вины: когда оно полезно, а когда разрушает.",
    fullDescription:
      "Вина — это социальная эмоция, которая в здоровых дозах помогает нам быть чуткими к другим. Но хроническое чувство вины отравляет жизнь.",
    audioUrl: "https://storage.example.com/blizko/tracks/vina.mp3",
    durationSeconds: 780,
    tags: ["чувства", "вина", "когнитивная терапия"],
    isFreePreview: false,
  },
  {
    title: "Управление стрессом на работе",
    slug: "upravlenie-stressom-na-rabote",
    description:
      "Экспресс-техники для снижения стресса, которые можно применять прямо на рабочем месте.",
    fullDescription:
      "Стресс на работе — одна из главных причин обращения к психологу. В этом ролике собраны пять экспресс-техник.",
    audioUrl: "https://storage.example.com/blizko/tracks/stress-rabota.mp3",
    durationSeconds: 540,
    tags: ["стресс", "работа", "экспресс-техники"],
    isFreePreview: false,
  },
];

async function main() {
  console.log("🌱 Начинаем заполнение базы данных...");

  // Очистка существующих данных
  await prisma.listeningProgress.deleteMany();
  await prisma.subscription.deleteMany();
  await prisma.track.deleteMany();
  await prisma.anonymousQuestion.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.contactMessage.deleteMany();
  await prisma.user.deleteMany();

  // Создание треков
  for (const track of tracks) {
    await prisma.track.create({
      data: track,
    });
  }

  console.log(`✅ Создано ${tracks.length} аудио-роликов`);
  console.log("🌱 Заполнение завершено!");
}

main()
  .catch((e) => {
    console.error("❌ Ошибка при заполнении:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
