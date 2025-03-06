import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const { floorId, userId } = await readBody(event);

  if (!floorId || !userId) {
    return createError({
      statusCode: 500,
      message: "Invalid request",
    });
  }

  try {
    const favorite = await prisma.favorite.create({
      data: {
        userId,
        floorId,
      },
      include: {
        floor: true,
      },
    });

    return { success: true, favorite };
  } catch (error) {
    return createError({
      statusCode: 400,
      message: "Ошибка при добавлении в избранное",
    });
  }
});
