export interface GameState {
  balances: {
    emsx: number;
    usdt: number;
    btc: number;
  };
  workers: Worker[];
  miningRates: {
    emsx: number;
    usdt: number;
    btc: number;
  };
  gridState: GridCell[];
  lastUpdate?: number;
}

export interface Worker {
  id: string;
  type: string;
  level: number;
  position: number;
  miningRate: number;
  stats: WorkerStats;
  lastCollected?: number;
}

export interface GridCell {
  position: number;
  workerId: string | null;
  isOccupied: boolean;
  isHighlighted?: boolean;
}

export interface MiningStats {
  totalRates: {
    emsx: number;
    usdt: number;
    btc: number;
  };
  workerCount: number;
  highestLevel: number;
}

export interface WorkerStats {
  baseRate: number;
  speedMultiplier: number;
  powerMultiplier: number;
  comboBonus: number;
  luckChance: number;
}