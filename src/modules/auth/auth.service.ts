import bcrypt from "bcrypt";
import { prisma } from "../../database/prisma";
import jwt from "jsonwebtoken";

interface Register {
  name: string;
  email: string;
  password: string;
}

interface Login {
  email: string;
  password: string;
}

export class AuthService {
  async register(data: Register) {
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (user) throw new Error("Esse email ja está em uso. Por favor, realize o login.");

    const hash = await bcrypt.hash(data.password, 10);

    const newUser = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hash,
      }
    })

    return {
      message: "Registro realizado com sucesso!",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        createdAt: newUser.createdAt,
      }
    }
  };

  async login(data: Login) {
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    const pass = await bcrypt.compare(data.password, user?.password || "");

    if (!user || !pass) throw new Error("Email ou senha inválidos.");

    const token = jwt.sign(
      { sub: user.id },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    )

    return {
      message: "Login realizado com sucesso!",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
    };
  };
};
