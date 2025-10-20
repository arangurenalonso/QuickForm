export type BackendErrorItem = {
  propertyName: string;
  description: string;
};

export type BackendErrorPayload = {
  message: string;
  errors: BackendErrorItem[];
};

function isBackendErrorItem(x: unknown): x is BackendErrorItem {
  if (typeof x !== 'object' || x === null) return false;
  const o = x as Record<string, unknown>;
  return (
    typeof o.propertyName === 'string' && typeof o.description === 'string'
  );
}
export function isBackendErrorPayload(x: unknown): x is BackendErrorPayload {
  if (typeof x !== 'object' || x === null) return false;
  const o = x as Record<string, unknown>;

  if (typeof o.message !== 'string') return false;

  if (!Array.isArray(o.errors)) return false;
  if (!o.errors.every(isBackendErrorItem)) return false;
  return true;
}
