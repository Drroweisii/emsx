import React from 'react';
import { WORKER_TYPES } from '../../utils/workerTypes';
import { WorkerType } from '../../types/workers';
import { Pickaxe, DollarSign, Bitcoin } from 'lucide-react';
import { GameState } from '../../types/game';

interface WorkerTypeSelectorProps {
  selectedType: WorkerType;
  onSelect: (type: WorkerType) => void;
  gameState: GameState;
}

const IconMap = {
  Pickaxe,
  DollarSign,
  Bitcoin
};

export function WorkerTypeSelector({ selectedType, onSelect, gameState }: WorkerTypeSelectorProps) {
  return (
    <div className="flex gap-1.5 p-2 bg-white rounded-lg shadow-md overflow-x-auto">
      {Object.entries(WORKER_TYPES).map(([type, config]) => {
        const Icon = IconMap[config.icon as keyof typeof IconMap];
        const canAfford = gameState.balances.emsx >= config.cost;
        const colorClass = `${config.color}-500`;
        
        return (
          <button
            key={type}
            onClick={() => canAfford && onSelect(type as WorkerType)}
            disabled={!canAfford}
            className={`
              relative flex-shrink-0 px-2 py-1.5 rounded-lg flex items-center gap-1.5
              transition-all duration-200 min-w-[80px]
              ${selectedType === type ? 'bg-indigo-50 ring-2 ring-indigo-500' : 'bg-gray-50'}
              ${canAfford ? 'hover:bg-gray-100 cursor-pointer active:scale-95' : 'opacity-50 cursor-not-allowed'}
              touch-manipulation
            `}
            title={config.description}
          >
            <Icon className={`w-4 h-4 text-${colorClass}`} />
            <div className="flex flex-col items-start">
              <span className="text-xs font-medium text-gray-700">{config.name}</span>
              <span className="text-[10px] text-gray-500">{config.cost} EMSX</span>
            </div>
            
            {selectedType === type && (
              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-indigo-500 rounded-full" />
            )}
          </button>
        );
      })}
    </div>
  );
}