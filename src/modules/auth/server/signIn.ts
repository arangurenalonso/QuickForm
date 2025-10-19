// src/modules/auth/server/actions.ts
'use server';
import { cookies } from 'next/headers';
// import prisma from "@/common/libs/prisma"; // si usas Prisma

export async function signIn({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  // Validate credentials, query DB, set cookie, etc.
  // Return a typed result
  return { ok: true };
}
