import { prisma } from "~/server/db";

export default defineEventHandler(async (event) => {
  try {
    const projects = await prisma.floor.findMany({
      select: {
        project: true,
      },
      distinct: ["project"],
    });

    return { data: projects.map((item) => item.project) };
  } catch (error) {
    return createError({
      statusCode: 500,
      statusMessage: "Не удалось получить список проектов",
    });
  }
});
