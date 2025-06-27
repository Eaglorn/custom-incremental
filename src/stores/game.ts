import { defineStore, acceptHMRUpdate } from 'pinia';
import Decimal from 'break_eternity.js';

export const useStoreGame = defineStore('storeGame', {
  state: () => ({
    epicNumber: new Decimal(0),
    capacity: new Decimal(1000),
    timer: 1000,
    research: {
      researchingKey: '',
      list: {
        cpuPow: {
          cost: new Decimal(3000),
          currentTime: new Decimal(10),
          time: new Decimal(60),
          bonus: 0.01,
          level: 0,
          costMultiply: 100,
          timeMultiply: 5,
          maxLevel: 100,
        },
        ramPow: {
          cost: new Decimal('1e6'),
          currentTime: new Decimal(10),
          time: new Decimal(240),
          bonus: 0.01,
          level: 0,
          costMultiply: 150,
          timeMultiply: 10,
          maxLevel: 100,
        },
        costDescrease: {
          cost: new Decimal(1000),
          currentTime: new Decimal(10),
          time: new Decimal(100),
          bonus: new Decimal(2),
          level: 0,
          costMultiply: 150,
          timeMultiply: 10,
          maxLevel: 100,
        },
      },
    },

    shop: {
      cpu: {
        value: new Decimal(1),
        multiply: new Decimal(1),
        cost: {
          main: new Decimal(100),
          multiply: new Decimal(10),
        },
      },
      hard: {
        value: new Decimal(0),
        multiply: new Decimal(1),
        cost: {
          main: new Decimal(1000),
          multiply: new Decimal(30),
        },
      },
      ram: {
        value: new Decimal(0),
        multiply: new Decimal(1),
        cost: {
          main: new Decimal(10000000),
          multiply: new Decimal(500),
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
