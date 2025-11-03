import { StateCreator } from 'zustand';
import type { BoundState } from '.';

export type ImmerStateCreator<T> = StateCreator<
  BoundState,
  [
    ['zustand/immer', never],
    ['zustand/persist', unknown]
    // ['zustand/devtools', never]
  ],
  [],
  T
>;
