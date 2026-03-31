import { SERVER_ENV } from '@/common/config/env.server';
import { Agent } from 'undici';
import { isDev } from './auth.constants';

function buildUrl(path: string): string {
  return `${SERVER_ENV.AUTH_API_URL}${path}`;
}

type UndiciRequestInit = RequestInit & {
  dispatcher?: Agent;
  duplex?: 'half';
};

function getDevDispatcher(url: string): Agent | undefined {
  const isLocalHttps = url.startsWith('https://localhost');

  if (!isDev || !isLocalHttps) {
    return undefined;
  }

  return new Agent({
    connect: {
      rejectUnauthorized: false,
    },
  });
}

export async function backendApiFetch(
  path: string,
  request: RequestInit = {}
): Promise<Response> {
  const url = buildUrl(path);
  const method = request.method?.toUpperCase() ?? 'GET';
  const dispatcher = getDevDispatcher(url);

  const headers = new Headers(request.headers);
  headers.set('Accept', 'application/json');

  const hasBody = method !== 'GET' && method !== 'HEAD' && request.body != null;
  const isStreamBody =
    typeof ReadableStream !== 'undefined' &&
    request.body instanceof ReadableStream;

  const requestInit: UndiciRequestInit = {
    ...request,
    method,
    headers,
    cache: 'no-store',
    dispatcher,
    body: hasBody ? request.body : undefined,
    ...(isStreamBody ? { duplex: 'half' } : {}),
  };

  return fetch(url, requestInit);
}
