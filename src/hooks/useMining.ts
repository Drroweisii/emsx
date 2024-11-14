import { useEffect, useState, useCallback } from 'react';
import { Worker } from '../types/game';
import { GAME_CONFIG } from '../utils/constants';
import { WORKER_TYPES } from '../utils/workerTypes';
import { CurrencyType } from '../types/workers';

export function useMining(workers: Worker[]) {
  const [miningRates, setMiningRates] = useState<Record<CurrencyType, number>>({
    emsx: 0,
    usdt: 0,
    btc: 0
  });

  const calculateWorkerRate = useCallback((worker: Worker) => {
    const workerConfig = WORKER_TYPES[worker.type];
    if (!workerConfig) return 0;

    const baseRate = GAME_CONFIG.BASE_MINING_RATES[workerConfig.currency] * 
                    worker.stats.baseRate * 
                    Math.pow(GAME_CONFIG.LEVEL_MULTIPLIER, worker.level - 1);
    
    const speedMultiplier = worker.stats.speedMultiplier;
    const powerMultiplier = worker.stats.powerMultiplier;
    
    return baseRate * speedMultiplier * powerMultiplier;
  }, []);

  const calculateComboBonus = useCallback((worker: Worker, workers: Worker[]) => {
    if (!worker.stats.comboBonus) return 1;

    const adjacentWorkers = workers.filter(w => 
      w.id !== worker.id && 
      w.type === worker.type &&
      Math.abs(w.position - worker.position) === 1
    );

    return 1 + (adjacentWorkers.length * worker.stats.comboBonus);
  }, []);

  useEffect(() => {
    const rates: Record<CurrencyType, number> = {
      emsx: 0,
      usdt: 0,
      btc: 0
    };

    workers.forEach(worker => {
      const workerConfig = WORKER_TYPES[worker.type];
      if (!workerConfig) return;

      const baseRate = calculateWorkerRate(worker);
      const comboMultiplier = calculateComboBonus(worker, workers);
      rates[workerConfig.currency] += baseRate * comboMultiplier;
    });

    setMiningRates(rates);
  }, [workers, calculateWorkerRate, calculateComboBonus]);

  return { miningRates };
}