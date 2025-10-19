// src/app/api/auth/route.ts
import { NextResponse } from 'next/server';
import { signIn } from '@/modules/auth/server/actions';

export async function POST(req: Request) {
  const body = await req.json();
  const result = await signIn(body); // server action del módulo
  if (!result.ok) return NextResponse.json(result, { status: 401 });
  return NextResponse.json(result);
}
