import { WorkerTypeConfig } from '../types/workers';

export const WORKER_TYPES: Record<string, WorkerTypeConfig> = {
  emsx: {
    name: 'EMSX',
    description: 'Basic EMSX mining capabilities',
    icon: 'Pickaxe',
    color: 'indigo',
    currency: 'emsx',
    stats: {
      baseRate: 1,
      speedMultiplier: 1,
      powerMultiplier: 1,
      comboBonus: 0,
      luckChance: 0.01
    },
    cost: 1
  },
  usdt: {
    name: 'USDT',
    description: 'USDT mining specialist',
    icon: 'DollarSign',
    color: 'green',
    currency: 'usdt',
    stats: {
      baseRate: 1.2,
      speedMultiplier: 1.2,
      powerMultiplier: 1.2,
      comboBonus: 0.1,
      luckChance: 0.02
    },
    cost: 100
  },
  btc: {
    name: 'BTC',
    description: 'Bitcoin mining powerhouse',
    icon: 'Bitcoin',
    color: 'orange',
    currency: 'btc',
    stats: {
      baseRate: 1.5,
      speedMultiplier: 1.5,
      powerMultiplier: 1.5,
      comboBonus: 0.2,
      luckChance: 0.03
    },
    cost: 1000
  }
};