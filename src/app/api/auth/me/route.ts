import {
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
} from '@/common/libs/auth/auth.constants';
import {
  clearAuthCookies,
  setAuthCookies,
} from '@/common/libs/auth/auth.cookies';
import { isBackendSessionResponse } from '@/common/libs/auth/auth.type';
import {
  backendAuthGetWithBearer,
  backendAuthPost,
} from '@/common/libs/auth/backend-auth-api';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE)?.value;
  const refreshToken = cookieStore.get(REFRESH_TOKEN_COOKIE)?.value;

  if (!accessToken && !refreshToken) {
    const response = NextResponse.json(
      { isAuthenticated: false, user: null },
      { status: 401 }
    );
    clearAuthCookies(response);
    return response;
  }

  if (accessToken) {
    const meResponse = await backendAuthGetWithBearer('/auth/me', accessToken);

    if (meResponse.ok) {
      const user = await meResponse.json();
      return NextResponse.json(
        { isAuthenticated: true, user },
        { status: 200 }
      );
    }
  }

  if (!refreshToken) {
    const response = NextResponse.json(
      { isAuthenticated: false, user: null },
      { status: 401 }
    );
    clearAuthCookies(response);
    return response;
  }

  const refreshResponse = await backendAuthPost('/auth/refresh', {
    refreshToken,
  });

  if (!refreshResponse.ok) {
    const response = NextResponse.json(
      { isAuthenticated: false, user: null },
      { status: 401 }
    );
    clearAuthCookies(response);
    return response;
  }

  const refreshData: unknown = await refreshResponse.json();

  if (!isBackendSessionResponse(refreshData)) {
    const response = NextResponse.json(
      { isAuthenticated: false, user: null },
      { status: 500 }
    );
    clearAuthCookies(response);
    return response;
  }

  const retryMeResponse = await backendAuthGetWithBearer(
    '/auth/me',
    refreshData.accessToken
  );

  if (!retryMeResponse.ok) {
    const response = NextResponse.json(
      { isAuthenticated: false, user: null },
      { status: 401 }
    );
    clearAuthCookies(response);
    return response;
  }

  const user = await retryMeResponse.json();

  const response = NextResponse.json(
    { isAuthenticated: true, user },
    { status: 200 }
  );

  setAuthCookies(response, refreshData);
  return response;
}
