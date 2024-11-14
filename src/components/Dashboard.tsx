import React from 'react';
import { GameLayout } from './game/GameLayout';
import { GameState } from '../types/game';

interface DashboardProps {
  gameState: GameState;
}

export function Dashboard({ gameState }: DashboardProps) {
  return (
    <main>
      <GameLayout gameState={gameState} />
    </main>
  );
}