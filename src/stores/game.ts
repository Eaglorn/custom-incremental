import { defineStore, acceptHMRUpdate } from 'pinia';
import Decimal from 'break_eternity.js';

export const useStoreGame = defineStore('storeGame', {
  state: () => ({
    epicNumber: new Decimal(0),
    capacity: new Decimal(100),
    shop: {
      cpu: {
        value: new Decimal(1),
        multiply: new Decimal(1),
        cost: {
          main: new Decimal(50),
          multiply: new Decimal(10),
        },
      },
      ram: {
        value: new Decimal(0),
        multiply: new Decimal(1),
        cost: {
          main: new Decimal(100000),
          multiply: new Decimal(50),
        },
      },
      hard: {
        value: new Decimal(0),
        multiply: new Decimal(1),
        cost: {
          main: new Decimal(100),
          multiply: new Decimal(20),
        },
      },
    },
  }),
  getters: {},
  actions: {},
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStoreGame, import.meta.hot));
}
