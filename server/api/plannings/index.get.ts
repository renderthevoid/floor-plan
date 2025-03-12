import { prisma } from "~/server/db";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  
  const toNumber = (value: any) =>
    isNaN(Number(value)) ? undefined : Number(value);

  const filters = {
    rooms: toNumber(query.rooms),
    minPrice: toNumber(query.minPrice),
    maxPrice: toNumber(query.maxPrice),
    minSquare: toNumber(query.minSquare),
    maxSquare: toNumber(query.maxSquare),
    project: query.project ? String(query.project) : undefined,
  };

  const where: any = {
    ...(filters.rooms !== undefined && { rooms: filters.rooms }),
    ...(filters.project && { project: filters.project }),
  };

  if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
    where.price = {
      ...(filters.minPrice !== undefined && { gte: filters.minPrice }),
      ...(filters.maxPrice !== undefined && { lte: filters.maxPrice }),
    };
  }

  if (filters.minSquare !== undefined || filters.maxSquare !== undefined) {
    where.area = {
      ...(filters.minSquare !== undefined && { gte: filters.minSquare }),
      ...(filters.maxSquare !== undefined && { lte: filters.maxSquare }),
    };
  }

  try {
    const floors = await prisma.floor.findMany({
      where,
      take: toNumber(query.limit),
      skip: toNumber(query.offset),
    });

    const totalItems = await prisma.floor.count({ where });

    return {
      data: floors,
      meta: { totalItems },
    };
  } catch (error) {
    return createError({
      statusCode: 400,
    });
  }
});