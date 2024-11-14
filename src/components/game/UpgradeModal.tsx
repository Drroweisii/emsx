import React from 'react';
import { Worker } from '../../types/game';
import { calculateUpgradeCost } from '../../utils/calculations';
import { ArrowUpCircle, X } from 'lucide-react';

interface UpgradeModalProps {
  worker: Worker;
  balance: number;
  onUpgrade: () => void;
  onClose: () => void;
}

export function UpgradeModal({ worker, balance, onUpgrade, onClose }: UpgradeModalProps) {
  const upgradeCost = calculateUpgradeCost(worker.level);
  const canAfford = balance >= upgradeCost;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-3 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-xs sm:max-w-sm">
        <div className="flex justify-between items-center p-3 border-b">
          <h3 className="font-semibold text-gray-900">Upgrade Worker</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        <div className="p-3 space-y-3">
          <div className="flex items-center justify-between bg-gray-50 rounded-lg p-2">
            <div className="text-sm">
              <span className="text-gray-500">Current Level</span>
              <div className="font-semibold text-gray-900 flex items-center gap-2">
                {worker.level}
                <ArrowUpCircle className="w-4 h-4 text-indigo-500" />
                <span className="text-indigo-600">{worker.level + 1}</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-2">
            <div className="text-sm text-gray-500">Mining Rate</div>
            <div className="flex items-center gap-2">
              <span className="text-gray-900">{worker.miningRate.toFixed(3)}/s</span>
              <ArrowUpCircle className="w-4 h-4 text-indigo-500" />
              <span className="text-indigo-600">{(worker.miningRate * 1.5).toFixed(3)}/s</span>
            </div>
          </div>

          <button
            onClick={onUpgrade}
            disabled={!canAfford}
            className={`
              w-full py-2 px-3 rounded-lg text-sm font-medium
              transition-all duration-200
              ${canAfford
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }
            `}
          >
            Upgrade ({upgradeCost.toFixed(0)} COINS)
          </button>
        </div>
      </div>
    </div>
  );
}