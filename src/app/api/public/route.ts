import { backendApiFetch } from '@/common/libs/auth/backendApiFetch';
import { NextRequest, NextResponse } from 'next/server';

async function handlePublicProxy(request: NextRequest, path: string[]) {
  const backendPath = `/${path.join('/')}${request.nextUrl.search}`;

  const backendResponse = await backendApiFetch(backendPath, request);

  const text = await backendResponse.text();

  return new NextResponse(text, {
    status: backendResponse.status,
    headers: {
      'content-type':
        backendResponse.headers.get('content-type') ?? 'application/json',
    },
  });
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  const { path } = await context.params;
  return handlePublicProxy(request, path);
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  const { path } = await context.params;
  return handlePublicProxy(request, path);
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  const { path } = await context.params;
  return handlePublicProxy(request, path);
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  const { path } = await context.params;
  return handlePublicProxy(request, path);
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  const { path } = await context.params;
  return handlePublicProxy(request, path);
}
