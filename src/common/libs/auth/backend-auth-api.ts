import 'server-only';
import { SERVER_ENV } from '@/common/config/env.server';

function buildUrl(path: string) {
  return `${SERVER_ENV.AUTH_API_URL}${path}`;
}

export async function backendAuthFetch(
  path: string,
  init: RequestInit = {}
): Promise<Response> {
  return fetch(buildUrl(path), {
    ...init,
    cache: 'no-store',
    headers: {
      Accept: 'application/json',
      ...(init.headers ?? {}),
    },
  });
}

export async function backendAuthPost(
  path: string,
  payload: unknown
): Promise<Response> {
  return backendAuthFetch(path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
}

export async function backendAuthGetWithBearer(
  path: string,
  accessToken: string
): Promise<Response> {
  return backendAuthFetch(path, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

export async function backendApiFetchWithBearer(
  backendPath: string,
  accessToken: string,
  request: Request
): Promise<Response> {
  const body =
    request.method === 'GET' || request.method === 'HEAD'
      ? undefined
      : await request.text();

  const headers = new Headers();
  const contentType = request.headers.get('content-type');
  const accept = request.headers.get('accept');

  if (contentType) headers.set('content-type', contentType);
  if (accept) headers.set('accept', accept);

  headers.set('authorization', `Bearer ${accessToken}`);

  return fetch(buildUrl(backendPath), {
    method: request.method,
    headers,
    body,
    cache: 'no-store',
  });
}
