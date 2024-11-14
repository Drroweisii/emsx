import React from 'react';
import { Coins, DollarSign, Bitcoin } from 'lucide-react';
import { useGameStatement } from '../../hooks/useGameStatement';
import { GameState } from '../../types/game';

interface GameStatementProps {
  gameState: GameState;
}

export function GameStatement({ gameState }: GameStatementProps) {
  const { formattedBalances, formattedRates } = useGameStatement(gameState);

  return (
    <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl p-3 shadow-lg">
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
          <div className="flex items-center gap-2">
            <div className="bg-white/20 p-2 rounded-full">
              <Coins className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-white/80 text-xs font-medium">EMSX</p>
              <p className="text-white text-lg font-bold tracking-tight">
                {formattedBalances.emsx}
              </p>
              <p className="text-white/80 text-xs">+{formattedRates.emsx}/s</p>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
          <div className="flex items-center gap-2">
            <div className="bg-white/20 p-2 rounded-full">
              <DollarSign className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-white/80 text-xs font-medium">USDT</p>
              <p className="text-white text-lg font-bold tracking-tight">
                {formattedBalances.usdt}
              </p>
              <p className="text-white/80 text-xs">+{formattedRates.usdt}/s</p>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
          <div className="flex items-center gap-2">
            <div className="bg-white/20 p-2 rounded-full">
              <Bitcoin className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-white/80 text-xs font-medium">BTC</p>
              <p className="text-white text-lg font-bold tracking-tight">
                {formattedBalances.btc}
              </p>
              <p className="text-white/80 text-xs">+{formattedRates.btc}/s</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}