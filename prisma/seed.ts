import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  const apartments = [
    {
      rooms: 1,
      area: 35,
      price: 5000000,
      discount: true,
      oldPrice: 5500000,
      project: "ЖК Солнечный",
      floor: 5,
      totalFloors: 10,
      completionDate: new Date("2025-06-30"),
      imageSrc: "https://kornei.ru/storage/property/3019.jpg",
    },
    {
      rooms: 2,
      area: 55,
      price: 7500000,
      discount: false,
      oldPrice: null,
      project: "ЖК Зеленый Берег",
      floor: 3,
      totalFloors: 12,
      completionDate: new Date("2023-12-31"),
      imageSrc: "https://kornei.ru/storage/property/3019.jpg",
    },
    {
      rooms: 3,
      area: 75,
      price: 10000000,
      discount: true,
      oldPrice: 11000000,
      project: "ЖК Северный Ветер",
      floor: 7,
      totalFloors: 15,
      completionDate: new Date("2025-03-31"),
      imageSrc: "https://kornei.ru/storage/property/3019.jpg",
    },
    {
      rooms: 1,
      area: 40,
      price: 6000000,
      discount: false,
      oldPrice: null,
      project: "ЖК Центральный",
      floor: 2,
      totalFloors: 9,
      completionDate: new Date("2024-09-30"),
      imageSrc: "https://kornei.ru/storage/property/3019.jpg",
    },
    {
      rooms: 2,
      area: 60,
      price: 8000000,
      discount: true,
      oldPrice: 8500000,
      project: "ЖК Лесная Поляна",
      floor: 4,
      totalFloors: 8,
      completionDate: new Date("2024-06-30"),
      imageSrc: "https://kornei.ru/storage/property/3019.jpg",
    },
    {
      rooms: 3,
      area: 80,
      price: 12000000,
      discount: false,
      oldPrice: null,
      project: "ЖК Речной Порт",
      floor: 10,
      totalFloors: 18,
      completionDate: new Date("2025-09-30"),
      imageSrc: "https://kornei.ru/storage/property/3019.jpg",
    },
    {
      rooms: 1,
      area: 30,
      price: 4500000,
      discount: true,
      oldPrice: 5000000,
      project: "ЖК Уютный",
      floor: 1,
      totalFloors: 5,
      completionDate: new Date("2023-12-31"),
      imageSrc: "https://kornei.ru/storage/property/3019.jpg",
    },
    {
      rooms: 2,
      area: 50,
      price: 7000000,
      discount: false,
      oldPrice: null,
      project: "ЖК Горный Воздух",
      floor: 6,
      totalFloors: 14,
      completionDate: new Date("2024-03-31"),
      imageSrc: "https://kornei.ru/storage/property/3019.jpg",
    },
    {
      rooms: 3,
      area: 85,
      price: 13000000,
      discount: true,
      oldPrice: 14000000,
      project: "ЖК Золотые Пески",
      floor: 8,
      totalFloors: 16,
      completionDate: new Date("2025-06-30"),
      imageSrc: "https://kornei.ru/storage/property/3019.jpg",
    },
    {
      rooms: 0,
      area: 28,
      price: 4000000,
      discount: false,
      oldPrice: null,
      project: "ЖК Тихий Дом",
      floor: 3,
      totalFloors: 7,
      completionDate: new Date("2024-03-31"),
      imageSrc: "https://kornei.ru/storage/property/3019.jpg",
    },
  ];


  for (const apartment of apartments) {
    await prisma.floor.create({
      data: apartment,
    });
  }

  console.log("Database seeding completed.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
