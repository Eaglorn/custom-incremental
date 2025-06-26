import Decimal from 'decimal.js';

Decimal.set({
  precision: 4,
  rounding: Decimal.ROUND_HALF_UP,
});

export { Decimal };
