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
  backendApiFetchWithBearer,
  backendAuthPost,
} from '@/common/libs/auth/backend-auth-api';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

async function handleProxy(request: NextRequest, path: string[]) {
  console.log('Proxying request to backend:', path.join('/'));
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE)?.value;
  const refreshToken = cookieStore.get(REFRESH_TOKEN_COOKIE)?.value;

  const backendPath = `/${path.join('/')}${request.nextUrl.search}`;

  if (!accessToken && !refreshToken) {
    const response = NextResponse.json(
      { message: 'Unauthorized' },
      { status: 401 }
    );
    clearAuthCookies(response);
    return response;
  }

  if (accessToken) {
    const backendResponse = await backendApiFetchWithBearer(
      backendPath,
      accessToken,
      request
    );

    if (backendResponse.status !== 401) {
      const text = await backendResponse.text();
      return new NextResponse(text, {
        status: backendResponse.status,
        headers: {
          'content-type':
            backendResponse.headers.get('content-type') ?? 'application/json',
        },
      });
    }
  }

  if (!refreshToken) {
    const response = NextResponse.json(
      { message: 'Unauthorized' },
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
      { message: 'Unauthorized' },
      { status: 401 }
    );
    clearAuthCookies(response);
    return response;
  }

  const refreshData: unknown = await refreshResponse.json();

  if (!isBackendSessionResponse(refreshData)) {
    const response = NextResponse.json(
      { message: 'Invalid refresh response.' },
      { status: 500 }
    );
    clearAuthCookies(response);
    return response;
  }

  const retryResponse = await backendApiFetchWithBearer(
    backendPath,
    refreshData.accessToken,
    request
  );

  const text = await retryResponse.text();
  const response = new NextResponse(text, {
    status: retryResponse.status,
    headers: {
      'content-type':
        retryResponse.headers.get('content-type') ?? 'application/json',
    },
  });

  setAuthCookies(response, refreshData);
  return response;
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  const { path } = await context.params;
  return handleProxy(request, path);
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  const { path } = await context.params;
  return handleProxy(request, path);
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  const { path } = await context.params;
  return handleProxy(request, path);
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  const { path } = await context.params;
  return handleProxy(request, path);
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  const { path } = await context.params;
  return handleProxy(request, path);
}
