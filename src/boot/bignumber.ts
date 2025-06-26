import BigNumber from 'bignumber.js';

BigNumber.set({
  DECIMAL_PLACES: 5,
  ROUNDING_MODE: BigNumber.ROUND_HALF_UP,
  EXPONENTIAL_AT: [-1e9, 1e9],
});

export { BigNumber };
