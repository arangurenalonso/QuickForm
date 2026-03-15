import { NextResponse } from 'next/server';
import {
  ACCESS_TOKEN_COOKIE,
  ACCESS_TOKEN_MAX_AGE_SECONDS,
  REFRESH_TOKEN_COOKIE,
  REFRESH_TOKEN_MAX_AGE_SECONDS,
} from './auth.constants';

type SessionPayload = {
  accessToken: string;
  refreshToken: string;
};

const isProd = process.env.NODE_ENV === 'production';

const baseCookieOptions = {
  httpOnly: true,
  secure: isProd,
  sameSite: 'lax' as const,
  path: '/',
};

export function setAuthCookies(
  response: NextResponse,
  payload: SessionPayload
) {
  response.cookies.set(ACCESS_TOKEN_COOKIE, payload.accessToken, {
    ...baseCookieOptions,
    maxAge: ACCESS_TOKEN_MAX_AGE_SECONDS,
  });

  response.cookies.set(REFRESH_TOKEN_COOKIE, payload.refreshToken, {
    ...baseCookieOptions,
    maxAge: REFRESH_TOKEN_MAX_AGE_SECONDS,
  });
}

export function clearAuthCookies(response: NextResponse) {
  response.cookies.set(ACCESS_TOKEN_COOKIE, '', {
    ...baseCookieOptions,
    maxAge: 0,
  });

  response.cookies.set(REFRESH_TOKEN_COOKIE, '', {
    ...baseCookieOptions,
    maxAge: 0,
  });
}
