import { z } from 'zod';

export const userType = z.object({
  user: z.object({
    _id: z.string(),
    role: z.string(),
    token: z.string(),
    fullName: z.string(),
    email: z.string(),
    password: z.string(),
    fotoProfile: z.string().nullable().optional(),
  }),
});

export type userSchema = z.infer<typeof userType>;
