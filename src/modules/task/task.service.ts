import { prisma } from "../../database/prisma";

export class TaskService {
  async create(userId: string, data: any) {
    return await prisma.task.create({
      data: { ...data, userId },
    });
  }

  async getPaginated(userId: string, options: {
    cursor?: string;
    limit?: number;
    filter?: {
      done?: string;
      priority?: string;
      search?: string;
      dueData?: string;
      expired?: string;
    }
  }) {
    const { cursor, limit = 10, filter = {} } = options;

    let where: any = { userId };

    if (filter.done !== undefined) where.done = filter.done === 'true';
    if (filter.priority) where.priority = filter.priority;
    if (filter.search) where.title = { contains: filter.search, mode: 'insensitive' };
    if (filter.dueData) where.dueDate = { lte: new Date(filter.dueData) };
    if (filter.expired === 'true') {
      where.dueDate = { lt: new Date() };
      where.done = false;
    }

    if (cursor) where.createdAt = {
      lt: new Date(cursor)
    }

    const tasks = await prisma.task.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: limit + 1
    })

    let nextCursor: string | null = null;

    if (tasks.length > limit) {
      const nextItem = tasks.pop();
      nextCursor = nextItem!.createdAt.toISOString();
    }

    return { tasks, nextCursor }
  }

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
}