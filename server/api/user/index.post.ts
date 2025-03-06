import { compare, genSalt, hash } from "bcrypt";
import { prisma } from "~/server/db";
interface ICreateUser {
  username: string;
  password: string;
}

export default defineEventHandler(async (event) => {
  const body: ICreateUser = await readBody(event);

  if (!body.username || !body.password) {
    return createError({
      statusCode: 400,
      statusMessage: "Имя пользователя и пароль обязательны",
    });
  }

  const existingUser = await prisma.user.findFirst({
    where: {
      username: body.username,
    },
  });

  if (existingUser) {
    const isPasswordValid = await compare(body.password, existingUser.password);
    if (isPasswordValid) {
      return createError({
        statusCode: 400,
        statusMessage: "Пользователь с таким именем уже существует",
      });
    }
  }

  const salt = await genSalt(10);
  const hashedPassword = await hash(body.password, salt);

  try {
    const newUser = await prisma.user.create({
      data: {
        username: body.username,
        password: hashedPassword,
      },
    });

    return newUser;
  } catch (error) {
    return createError({
      statusCode: 500,
      statusMessage: `${error} - Ошибка при создании пользователя`,
    });
  }
});
