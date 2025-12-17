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

  async getByFilter(userId: string, filter: { done?: string; search?: string; priority?: string; dueDate?: string; expired?: string }) {
    if (!Object.keys(filter).length) return this.getAll(userId);

    let where: any = { userId };

    if (filter.done !== undefined) where.done = filter.done === 'true';
    if (filter.search) where.title = { contains: filter.search, mode: 'insensitive' };
    if (filter.priority) where.priority = filter.priority;
    if (filter.dueDate) where.dueDate = new Date(filter.dueDate);
    if (filter.expired === 'true') {
      where.dueDate = { lt: new Date() };
      where.done = false;
    }

    return await prisma.task.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });
  }
}