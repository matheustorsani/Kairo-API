import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "O nome precisa ter no mínimo 2 caracteres!"),
  email: z.email("Email inválido!"),
  password: z.string().min(6, "A senha precisa ter no mínimo 6 caracteres!"),
});

export const loginSchema = z.object({
  email: z.email("Email inválido!"),
  password: z.string()
});
