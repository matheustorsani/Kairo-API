import { z } from 'zod';

export const createTaskSchema = z.object({
  title: z.string().min(1, "O titulo é obrigatório.").max(100, "O título deve ter no máximo 100 caracteres."),
  description: z.string().max(500, "A descrição deve ter no máximo 500 caracteres.").optional(),
  priority: z.string().max(6).optional().default('LOW'),
  dueDate: z.string().optional(),
});

export const updateTaskSchema = z.object({
  title: z.string().optional(),
  description: z.string().max(500, "A descrição deve ter no máximo 500 caracteres.").optional(),
  done: z.boolean().optional(),
  priority: z.string().max(6).optional(),
  dueDate: z.string().optional(),
});