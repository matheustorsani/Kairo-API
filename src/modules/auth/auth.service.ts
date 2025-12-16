import bcrypt from "bcrypt";
import { prisma } from "../../database/prisma";
import jwt from "jsonwebtoken";
import { Login, Register } from "../../types/Auth";

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
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        createdAt: newUser.createdAt,
    }
  };

  async login(data: Login) {
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    const pass = await bcrypt.compare(data.password, user?.password || "");

    if (!user || !pass) throw new Error("Email ou senha inválidos.");

    const acessToken = jwt.sign({ sub: user.id }, process.env.JWT_SECRET!, { expiresIn: "15m" });
    const refreshToken = jwt.sign({ sub: user.id }, process.env.JWT_SECRET!, { expiresIn: "7d" });

    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      }
    });

    return {
      acessToken, refreshToken
    };
  };

  async refresh(token: string) {
    if (!token) throw new Error("Um token é necessário");

    const dbToken = await prisma.refreshToken.findUnique({
      where: { token }
    });

    if (!dbToken) throw new Error("Token inválido.");

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { sub: string };
      const accessToken = jwt.sign({ sub: decoded.sub }, process.env.JWT_SECRET!, { expiresIn: "15m" });

      return { accessToken };
    } catch (err: any) {
      throw new Error("Token expirado.");
    }
  }

  async logout(token: string) {
    if (!token) throw new Error("Um token é necessário");
    const db = await prisma.refreshToken.findUnique({
      where: { token }
    });
    if (!db) throw new Error("Token inválido.");

    await prisma.refreshToken.delete({
      where: { token }
    });

    return { message: "Logout realizado com sucesso, até logo!" };
  }
};
