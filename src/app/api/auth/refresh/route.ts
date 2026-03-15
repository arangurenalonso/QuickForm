import { REFRESH_TOKEN_COOKIE } from '@/common/libs/auth/auth.constants';
import {
  clearAuthCookies,
  setAuthCookies,
} from '@/common/libs/auth/auth.cookies';
import { isBackendSessionResponse } from '@/common/libs/auth/auth.type';
import { backendAuthPost } from '@/common/libs/auth/backend-auth-api';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get(REFRESH_TOKEN_COOKIE)?.value;

  if (!refreshToken) {
    const response = NextResponse.json(
      { message: 'No refresh token found.' },
      { status: 401 }
    );
    clearAuthCookies(response);
    return response;
  }

  const backendResponse = await backendAuthPost('/auth/refresh', {
    refreshToken,
  });
  const text = await backendResponse.text();
  const contentType =
    backendResponse.headers.get('content-type') ?? 'application/json';

  if (!backendResponse.ok) {
    const response = new NextResponse(text, {
      status: backendResponse.status,
      headers: { 'content-type': contentType },
    });
    clearAuthCookies(response);
    return response;
  }

  const data: unknown = JSON.parse(text);

  if (!isBackendSessionResponse(data)) {
    const response = NextResponse.json(
      { message: 'Invalid refresh response from auth server.' },
      { status: 500 }
    );
    clearAuthCookies(response);
    return response;
  }

  const response = NextResponse.json(
    {
      isAuthenticated: true,
      user: data.user,
    },
    { status: 200 }
  );

  setAuthCookies(response, data);
  return response;
}
