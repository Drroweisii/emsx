import { useCallback, useEffect } from 'react';
import { GameState, Worker } from '../types/game';
import { GAME_CONFIG, GRID_SIZE } from '../utils/constants';
import { useMining } from './useMining';
import { useLocalStorage } from './useLocalStorage';
import { useWorkerMerge } from './useWorkerMerge';
import { WorkerType } from '../types/workers';
import { WORKER_TYPES } from '../utils/workerTypes';

const initialGridState = Array.from(
  { length: GRID_SIZE.TOTAL_CELLS },
  (_, i) => ({
    position: i,
    workerId: null,
    isOccupied: false,
  })
);

const initialState: GameState = {
  balances: GAME_CONFIG.INITIAL_BALANCES,
  workers: [],
  miningRates: {
    emsx: 0,
    usdt: 0,
    btc: 0
  },
  gridState: initialGridState,
  lastUpdate: Date.now(),
};

export function useGameState() {
  const [gameState, setGameState] = useLocalStorage<GameState>('miningGame', initialState);
  const { miningRates } = useMining(gameState.workers);
  const { selectedWorkerId, handleWorkerSelect, canMergeWorkers } = useWorkerMerge();

  useEffect(() => {
    const updateInterval = setInterval(() => {
      const now = Date.now();
      setGameState(prev => {
        const timeDiff = (now - (prev.lastUpdate || now)) / 1000;

        return {
          ...prev,
          balances: {
            emsx: prev.balances.emsx + (miningRates.emsx * timeDiff),
            usdt: prev.balances.usdt + (miningRates.usdt * timeDiff),
            btc: prev.balances.btc + (miningRates.btc * timeDiff)
          },
          miningRates,
          lastUpdate: now,
        };
      });
    }, GAME_CONFIG.UPDATE_INTERVAL);

    return () => clearInterval(updateInterval);
  }, [miningRates, setGameState]);

  const moveWorker = useCallback((workerId: string, newPosition: number) => {
    setGameState(prev => {
      const worker = prev.workers.find(w => w.id === workerId);
      if (!worker) return prev;

      const oldPosition = worker.position;
      const targetCell = prev.gridState[newPosition];
      
      if (targetCell.isOccupied) return prev;

      return {
        ...prev,
        workers: prev.workers.map(w =>
          w.id === workerId ? { ...w, position: newPosition } : w
        ),
        gridState: prev.gridState.map(cell => {
          if (cell.position === oldPosition) {
            return { ...cell, workerId: null, isOccupied: false };
          }
          if (cell.position === newPosition) {
            return { ...cell, workerId, isOccupied: true };
          }
          return cell;
        }),
      };
    });
  }, [setGameState]);

  const handleWorkerClick = useCallback((workerId: string, targetPosition?: number) => {
    handleWorkerSelect(
      workerId,
      gameState.workers,
      (worker1, worker2) => {
        const workerConfig = WORKER_TYPES[worker1.type];
        if (!workerConfig) return false;

        const newLevel = worker1.level + 1;
        const newWorker: Worker = {
          id: `w${Date.now()}`,
          type: worker1.type,
          level: newLevel,
          position: worker1.position,
          miningRate: GAME_CONFIG.BASE_MINING_RATES[workerConfig.currency] * 
                     workerConfig.stats.baseRate * 
                     Math.pow(GAME_CONFIG.LEVEL_MULTIPLIER, newLevel - 1),
          stats: { ...workerConfig.stats },
        };

        setGameState(prev => ({
          ...prev,
          workers: [
            ...prev.workers.filter(w => w.id !== worker1.id && w.id !== worker2.id),
            newWorker,
          ],
          gridState: prev.gridState.map(cell => {
            if (cell.position === worker2.position) {
              return { ...cell, workerId: null, isOccupied: false };
            }
            if (cell.position === worker1.position) {
              return { ...cell, workerId: newWorker.id };
            }
            return cell;
          }),
        }));

        return true;
      },
      moveWorker,
      targetPosition
    );
  }, [gameState.workers, handleWorkerSelect, moveWorker, setGameState]);

  const hireWorker = useCallback((type: WorkerType = 'emsx') => {
    const workerConfig = WORKER_TYPES[type];
    if (!workerConfig || gameState.balances.emsx < workerConfig.cost) return false;

    const emptyCell = gameState.gridState.find(cell => !cell.isOccupied);
    if (!emptyCell) return false;

    const newWorker: Worker = {
      id: `w${Date.now()}`,
      type,
      level: 1,
      position: emptyCell.position,
      miningRate: GAME_CONFIG.BASE_MINING_RATES[workerConfig.currency] * workerConfig.stats.baseRate,
      stats: { ...workerConfig.stats },
    };

    setGameState(prev => ({
      ...prev,
      balances: {
        ...prev.balances,
        emsx: prev.balances.emsx - workerConfig.cost
      },
      workers: [...prev.workers, newWorker],
      gridState: prev.gridState.map(cell =>
        cell.position === emptyCell.position
          ? { ...cell, workerId: newWorker.id, isOccupied: true }
          : cell
      ),
    }));

    return true;
  }, [gameState.balances.emsx, gameState.gridState, setGameState]);

  return {
    gameState,
    hireWorker,
    handleWorkerClick,
    selectedWorkerId,
    canMergeWorkers,
    canHireWorker: (type: WorkerType) => {
      const workerConfig = WORKER_TYPES[type];
      return workerConfig && 
             gameState.balances.emsx >= workerConfig.cost && 
             gameState.gridState.some(cell => !cell.isOccupied);
    },
  };
}