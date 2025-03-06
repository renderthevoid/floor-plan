import { prisma } from "~/server/db";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const filters = {
    rooms: query.rooms ? Number(query.rooms) : undefined,
    minPrice: query.minPrice ? Number(query.minPrice) : undefined,
    maxPrice: query.maxPrice ? Number(query.maxPrice) : undefined,
    project: query.project ? String(query.project) : undefined,
  };


  const where = {
    ...(filters.rooms !== undefined && { rooms: filters.rooms }),
    ...(filters.minPrice !== undefined && { price: { gte: filters.minPrice } }),
    ...(filters.maxPrice !== undefined && { price: { lte: filters.maxPrice } }),
    ...(filters.project && { project: filters.project }),
  };

  const floors = await prisma.floor.findMany({
    where,
    take: query.limit ? Number(query.limit) : undefined, 
    skip: query.offset ? Number(query.offset) : undefined, 
  });

  const totalItems = await prisma.floor.count({ where });

  return {
    data: floors,
    meta: {
      totalItems,
    },
  };
});
