import { z } from 'zod';

export const userSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(60).optional(),
    email: z.email().optional(),
    password: z.string().min(6).optional(),
  })
});

export type UpdatedUser = z.infer<typeof userSchema>['body'];