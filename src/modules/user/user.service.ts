import { prisma } from "../../database/prisma";
import bcrypt from "bcrypt";

export class UserService {
  async getProfile(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true
      }
    });

    return user;
  }

  async updateProfile(userId: string, data: any) {
    const updated: any = {};

    if (data.name) updated.name = data.name;
    if (data.email) updated.email = data.email;
    if (data.password) updated.password = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.update({
      where: { id: userId },
      data: updated,
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true
      }
    });

    return user;
  }
}