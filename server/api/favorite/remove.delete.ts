import { prisma } from "~/server/db";

export default defineEventHandler(async (event) => {
  const { favoriteId, floorId, userId } = await readBody(event);

  if (!floorId || !userId || !favoriteId) {
    return createError({
      statusCode: 500,
      message: "Invalid request",
    });
  }

  try {
    const favorite = await prisma.favorite.deleteMany({
      where: {
        id: favoriteId,
      },
    });

    return { success: true, favorite };
  } catch (error) {
    return createError({
      statusCode: 400,
      message: "Ошибка при удалении из избранного",
    });
  }
});
