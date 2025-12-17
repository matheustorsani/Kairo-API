import { prisma } from "../../database/prisma";

export class TaskService {
  async create(userId: string, data: any) {
    return await prisma.task.create({
      data: { ...data, userId },
    });
  }

  async getAll(userId: string) {
    return await prisma.task.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });
  };

  async getById(userId: string, taskId: string) {
    return await prisma.task.findFirst({
      where: { id: taskId, userId }
    });
  };

  async update(taskId: string, data: any) {
    return prisma.task.update({
      where: { id: taskId },
      data,
    });
  };

  async delete(taskId: string) {
    return prisma.task.delete({
      where: { id: taskId },
    });
  };

  async getByFilter(userId: string, filter: any) {
    if (Object.keys(filter).length === 0) return this.getAll(userId);

    let filters: any = {};
    if (filter.done) filters = { ...filters, done: filter.done === 'true' };
    if (filter.search) filters = { ...filters, title: { contains: filter.search, mode: 'insensitive' } };

    return await prisma.task.findMany({
      where: { userId, ...filters },
      orderBy: { createdAt: 'desc' }
    })
  }
}