import React from 'react';
import { UserPlus } from 'lucide-react';
import { WorkerTypeConfig } from '../../types/workers';

interface HireButtonProps {
  onHire: () => void;
  disabled: boolean;
  workerType: WorkerTypeConfig;
}

export function HireButton({ onHire, disabled, workerType }: HireButtonProps) {
  return (
    <button
      onClick={onHire}
      disabled={disabled}
      className={`
        w-full py-2 px-4 rounded-lg
        flex items-center justify-center gap-2
        transition-all duration-200
        ${disabled
          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
          : 'bg-indigo-500 hover:bg-indigo-600 active:scale-[0.98] text-white shadow-md hover:shadow-lg'
        }
        font-bold text-sm
        touch-manipulation
      `}
    >
      <UserPlus className="w-4 h-4" />
      <span className="whitespace-nowrap">
        HIRE {workerType.name} MINER ({workerType.cost} EMSX)
      </span>
    </button>
  );
}