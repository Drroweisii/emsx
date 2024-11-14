import { Worker, GameState } from '../types/game';
import { GAME_CONFIG, MINING_MULTIPLIER, GRID_SIZE, WORKER_RARITY } from './constants';

export function calculateMiningRate(worker: Worker, gameState: GameState): number {
  const baseRate = GAME_CONFIG.BASE_MINING_RATE * 
                  worker.stats.baseRate * 
                  Math.pow(MINING_MULTIPLIER, worker.level - 1);
  
  const adjacentBonus = calculateAdjacentBonus(worker, gameState.workers);
  const rarityMultiplier = calculateRarityMultiplier(worker);
  const comboMultiplier = calculateComboMultiplier(worker, gameState.workers);
  
  return baseRate * adjacentBonus * rarityMultiplier * comboMultiplier;
}

export function calculateUpgradeCost(level: number): number {
  return GAME_CONFIG.WORKER_COST * Math.pow(GAME_CONFIG.UPGRADE_COST_MULTIPLIER, level - 1);
}

export function isAdjacent(pos1: number, pos2: number, cols: number = GRID_SIZE.COLS): boolean {
  const row1 = Math.floor(pos1 / cols);
  const col1 = pos1 % cols;
  const row2 = Math.floor(pos2 / cols);
  const col2 = pos2 % cols;

  return (
    (Math.abs(row1 - row2) === 1 && col1 === col2) ||
    (Math.abs(col1 - col2) === 1 && row1 === row2)
  );
}

export function calculateAdjacentBonus(worker: Worker, allWorkers: Worker[]): number {
  const adjacentWorkers = allWorkers.filter(w => 
    w.id !== worker.id && isAdjacent(w.position, worker.position)
  );

  return 1 + (adjacentWorkers.length * 0.1);
}

export function calculateRarityMultiplier(worker: Worker): number {
  const rarity = Object.entries(WORKER_RARITY).find(([_, config]) => 
    Math.random() < config.chance
  );
  
  return rarity ? rarity[1].multiplier : 1;
}

export function calculateComboMultiplier(worker: Worker, allWorkers: Worker[]): number {
  if (!worker.stats.comboBonus) return 1;

  const sameTypeWorkers = allWorkers.filter(w => 
    w.id !== worker.id && 
    w.type === worker.type &&
    isAdjacent(w.position, worker.position)
  );

  return 1 + (sameTypeWorkers.length * worker.stats.comboBonus);
}

export function calculateOfflineMining(lastUpdate: number): number {
  const now = Date.now();
  const timeDiff = Math.min(now - lastUpdate, GAME_CONFIG.MAX_OFFLINE_TIME);
  return (timeDiff / 1000) * GAME_CONFIG.OFFLINE_MINING_RATE;
}

export function formatNumber(num: number): string {
  if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`;
  if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`;
  if (num >= 1e3) return `${(num / 1e3).toFixed(2)}K`;
  return num.toFixed(2);
}