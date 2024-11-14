import { useState, useEffect } from 'react';
import { GameState } from '../types/game';
import { formatNumber } from '../utils/calculations';

export function useGameStatement(gameState: GameState) {
  const [displayBalances, setDisplayBalances] = useState(gameState.balances);

  // Smooth balance animation
  useEffect(() => {
    const updateInterval = setInterval(() => {
      setDisplayBalances(prev => ({
        emsx: prev.emsx + (gameState.balances.emsx - prev.emsx) * 0.1,
        usdt: prev.usdt + (gameState.balances.usdt - prev.usdt) * 0.1,
        btc: prev.btc + (gameState.balances.btc - prev.btc) * 0.1
      }));
    }, 50);

    return () => clearInterval(updateInterval);
  }, [gameState.balances]);

  const formatRate = (rate: number): string => {
    if (rate === 0) return '0.0000';
    if (rate < 0.0001) return rate.toFixed(8);
    if (rate < 0.001) return rate.toFixed(6);
    if (rate < 0.01) return rate.toFixed(4);
    return rate.toFixed(2);
  };

  return {
    formattedBalances: {
      emsx: formatNumber(displayBalances.emsx),
      usdt: formatNumber(displayBalances.usdt),
      btc: formatNumber(displayBalances.btc)
    },
    formattedRates: {
      emsx: formatRate(gameState.miningRates.emsx),
      usdt: formatRate(gameState.miningRates.usdt),
      btc: formatRate(gameState.miningRates.btc)
    }
  };
}