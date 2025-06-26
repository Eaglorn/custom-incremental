import { defineStore, acceptHMRUpdate } from 'pinia';

export const useGlobalStore = defineStore('globalStore', {
  state: () => ({
    app: {
      name: 'Custom Incremental',
      version: '0.0.1',
      environment: 'development',
    },
  }),
  getters: {},
  actions: {},
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGlobalStore, import.meta.hot));
}
