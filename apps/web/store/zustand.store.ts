import { create, StateCreator, StoreApi, UseBoundStore } from 'zustand';
import { ICreateStoreOptions } from '../interfaces';
import { devtools, persist } from 'zustand/middleware';

export function zustandStore<T extends object>(
  createState: StateCreator<T>,
  options: ICreateStoreOptions<T, unknown>
): UseBoundStore<StoreApi<T>> {
  let store: any;

  if (options.persistOptions && options.devtoolsEnabled) {
    store = create(devtools(persist(createState, options.persistOptions as any)));
  } else if (options.persistOptions) {
    store = create(persist(createState, options.persistOptions as any));
  } else if (options.devtoolsEnabled) {
    store = create(devtools(createState));
  } else {
    store = create(createState);
  }

  return store;
}
