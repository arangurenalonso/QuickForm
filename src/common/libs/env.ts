import { z } from 'zod';

const EnvSchema = z.object({
  NEXT_PUBLIC_API_URL_AUTH: z.string().url(),
});

const parsed = EnvSchema.parse({
  NEXT_PUBLIC_API_URL_AUTH: process.env.NEXT_PUBLIC_API_URL_AUTH ?? '',
});

export const ENV = {
  authApi: parsed.NEXT_PUBLIC_API_URL_AUTH,
} as const;
