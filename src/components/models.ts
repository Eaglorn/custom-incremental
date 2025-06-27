import type Decimal from 'break_eternity.js';

export interface Research {
  cost: Decimal;
  currentTime: Decimal;
  time: Decimal;
  bonus: Decimal | number;
  level: number;
  costMultiply: number;
  timeMultiply: number;
  maxLevel: number;
}
