import { prisma } from "~/server/db";
import type { FavoriteWithIncludes } from "~/types/favorites.types";

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);
  const userId = Number(id);

  if (isNaN(userId)) {
    return createError({
      statusCode: 400,
      message: "Invalid user ID",
    });
  }

  try {
    const favorites: FavoriteWithIncludes[] = await prisma.favorite.findMany({
      where: { userId },
      include: {
        floor: true,
      },
    });

    return { data: favorites };
  } catch (error) {
    return createError({
      statusCode: 500,
      message: "Ошибка при получении избранных элементов",
    });
  }
});
