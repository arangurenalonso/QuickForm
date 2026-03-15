import 'server-only';
import { z } from 'zod';

const EnvSchema = z.object({
  AUTH_API_URL: z.string().url(),
});

export const SERVER_ENV = EnvSchema.parse({
  AUTH_API_URL: process.env.AUTH_API_URL ?? '',
});
