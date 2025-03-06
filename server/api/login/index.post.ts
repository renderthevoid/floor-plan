import { compare } from "bcrypt";
import { prisma } from "~/server/db";
interface IAuthData {
  username: string;
  password: string;
}

export default defineEventHandler(async (event) => {
  const body: IAuthData = await readBody(event);

  const findUser = await prisma.user.findFirst({
    where: {
      username: body.username,
    },
  });

  if (!findUser) {
    return createError({
      statusCode: 401,
      message: "Имя пользователя или пароль введены не верно",
    });
  }

  const comparePasswords = await compare(body.password, findUser.password);

  if (!comparePasswords) {
    return createError({
      statusCode: 401,
      message: "Имя пользователя или пароль введены не верно",
    });
  }

  const { password, ...result } = findUser;

  const session = await setUserSession(event, {
    user: {
      ...result,
    },
    createdAt: Date.now(),
  });

  return session;
});
