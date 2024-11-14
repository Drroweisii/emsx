import React from 'react';
import { Coins, Users, TrendingUp, Award } from 'lucide-react';

interface BalanceDisplayProps {
  balance: number;
  miningRate: number;
  workerCount: number;
  highestLevel: number;
}

export function BalanceDisplay({ balance, miningRate, workerCount, highestLevel }: BalanceDisplayProps) {
  return (
    <div className="bg-[#FFF3E0] rounded-xl p-3 sm:p-4 shadow-md border-4 border-[#FFE0B2]">
      <div className="grid grid-cols-2 gap-2 sm:gap-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="bg-[#FFB74D] p-1.5 sm:p-2 rounded-full">
            <Coins className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <div>
            <p className="text-[#FFB74D] font-bold text-xs sm:text-sm">BALANCE</p>
            <p className="text-lg sm:text-xl font-bold text-[#F57C00]">
              {Math.floor(balance).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="bg-[#81C784] p-1.5 sm:p-2 rounded-full">
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <div>
            <p className="text-[#81C784] font-bold text-xs sm:text-sm">MINING</p>
            <p className="text-lg sm:text-xl font-bold text-[#2E7D32]">
              +{miningRate.toFixed(1)}/s
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="bg-[#64B5F6] p-1.5 sm:p-2 rounded-full">
            <Users className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <div>
            <p className="text-[#64B5F6] font-bold text-xs sm:text-sm">WORKERS</p>
            <p className="text-lg sm:text-xl font-bold text-[#1976D2]">
              {workerCount}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="bg-[#BA68C8] p-1.5 sm:p-2 rounded-full">
            <Award className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <div>
            <p className="text-[#BA68C8] font-bold text-xs sm:text-sm">BEST LVL</p>
            <p className="text-lg sm:text-xl font-bold text-[#7B1FA2]">
              {highestLevel}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}