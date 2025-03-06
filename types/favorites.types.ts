import { Prisma } from "@prisma/client";

const FavoriteValidator = Prisma.validator<Prisma.FavoriteDefaultArgs>()({
  select: { id: true, userId: true, floorId: true },
  include: {
    floor: true,
  },
});

export type FavoriteWithIncludes = Prisma.FavoriteGetPayload<
  typeof FavoriteValidator
>;
