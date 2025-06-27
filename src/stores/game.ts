import { defineStore, acceptHMRUpdate } from 'pinia';
import Decimal from 'break_eternity.js';

export const useStoreGame = defineStore('storeGame', {
  state: () => ({
    epicNumber: new Decimal(0),
    capacity: new Decimal(1000),
    timer: 1000,
    shop: {
      cpu: {
        value: new Decimal(1),
        multiply: new Decimal(1),
        cost: {
          main: new Decimal(50),
          multiply: new Decimal(5),
        },
      },
      hard: {
        value: new Decimal(0),
        multiply: new Decimal(1),
        cost: {
          main: new Decimal(150),
          multiply: new Decimal(12),
        },
      },
      ram: {
        value: new Decimal(1),
        multiply: new Decimal(1),
        cost: {
          main: new Decimal('1e7'),
          multiply: new Decimal(80),
        },
      },
    },
    research: {
      researchingKey: '',
      list: {
        cpuPow: {
          cost: new Decimal(3000),
          currentTime: new Decimal(0),
          time: new Decimal(6),
          bonus: new Decimal(0.01),
          level: new Decimal(0),
          costMultiply: new Decimal(100),
          timeMultiply: new Decimal(2),
          maxLevel: new Decimal(100),
        },
        hardPow: {
          cost: new Decimal(5000),
          currentTime: new Decimal(0),
          time: new Decimal(8),
          bonus: new Decimal(0.01),
          level: new Decimal(0),
          costMultiply: new Decimal(100),
          timeMultiply: new Decimal(2),
          maxLevel: new Decimal(100),
        },
        ramPow: {
          cost: new Decimal('1e6'),
          currentTime: new Decimal(0),
          time: new Decimal(24),
          bonus: new Decimal(0.01),
          level: new Decimal(0),
          costMultiply: new Decimal(150),
          timeMultiply: new Decimal(3),
          maxLevel: new Decimal(100),
        },
        costDecrease: {
          cost: new Decimal(1000),
          currentTime: new Decimal(0),
          time: new Decimal(10),
          bonus: new Decimal(2),
          level: new Decimal(0),
          costMultiply: new Decimal(150),
          timeMultiply: new Decimal(5),
          maxLevel: new Decimal(100),
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
