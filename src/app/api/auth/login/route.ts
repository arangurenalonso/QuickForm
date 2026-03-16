import { setAuthCookies } from '@/common/libs/auth/auth.cookies';
import { isBackendSessionResponse } from '@/common/libs/auth/auth.type';
import { backendAuthPost } from '@/common/libs/auth/backend-auth-api';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const payload = await request.json();

  const backendResponse = await backendAuthPost('/auth/login', payload);
  const text = await backendResponse.text();
  const contentType =
    backendResponse.headers.get('content-type') ?? 'application/json';

  if (!backendResponse.ok) {
    return new NextResponse(text, {
      status: backendResponse.status,
      headers: { 'content-type': contentType },
    });
  }

  const data: unknown = JSON.parse(text);

  if (!isBackendSessionResponse(data)) {
    return NextResponse.json(
      { message: 'Invalid login response from auth server.' },
      { status: 500 }
    );
  }

  const response = NextResponse.json(
    {
      isAuthenticated: true,
      user: data.user,
    },
    { status: 200 }
  );

  console.log('Login successful, setting auth cookies...');
  setAuthCookies(response, data);
  return response;
}
