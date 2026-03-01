// withGlobalLoading.ts
import { useBoundStore } from '@/store';

export async function withGlobalLoading<T>(
  fn: () => Promise<T>,
  message?: string
): Promise<T> {
  const { beginLoading, endLoading } = useBoundStore.getState();

  beginLoading({ message });
  try {
    console.log('withGlobalLoading: started');
    return await fn();
  } finally {
    endLoading();
    console.log('withGlobalLoading: ended');
  }
}
