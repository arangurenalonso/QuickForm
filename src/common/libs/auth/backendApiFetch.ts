import { SERVER_ENV } from '@/common/config/env.server';
import { NextRequest } from 'next/server';

function buildUrl(path: string) {
  return `${SERVER_ENV.AUTH_API_URL}${path}`;
}
export async function backendApiFetch(path: string, request: NextRequest) {
  const url = buildUrl(path);
  const body =
    request.method === 'GET' || request.method === 'HEAD'
      ? undefined
      : await request.text();

  return fetch(url, {
    method: request.method,
    headers: {
      'content-type': request.headers.get('content-type') ?? 'application/json',
    },
    body,
    cache: 'no-store',
  });
}
