import { backendAuthPost } from '@/common/libs/auth/backend-auth-api';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const payload = await request.json();
  const backendResponse = await backendAuthPost('/auth/register', payload);

  const text = await backendResponse.text();
  const contentType =
    backendResponse.headers.get('content-type') ?? 'application/json';

  return new NextResponse(text, {
    status: backendResponse.status,
    headers: { 'content-type': contentType },
  });
}
