import { REFRESH_TOKEN_COOKIE } from '@/common/libs/auth/auth.constants';
import { clearAuthCookies } from '@/common/libs/auth/auth.cookies';
import { backendAuthPost } from '@/common/libs/auth/backend-auth-api';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get(REFRESH_TOKEN_COOKIE)?.value;

  if (refreshToken) {
    try {
      await backendAuthPost('/auth/logout', { refreshToken });
    } catch {
      // Best effort. We still clear cookies below.
    }
  }

  const response = NextResponse.json({ ok: true }, { status: 200 });
  clearAuthCookies(response);
  return response;
}
