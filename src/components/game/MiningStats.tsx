import React from 'react';
import { Users, TrendingUp, Award } from 'lucide-react';
import { MiningStats as MiningStatsType } from '../../types/game';

interface MiningStatsProps {
  stats: MiningStatsType;
}

export function MiningStats({ stats }: MiningStatsProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-semibold text-gray-700 mb-3">Mining Stats</h2>
      <div className="grid grid-cols-3 gap-4">
        <StatItem
          icon={<Users className="w-5 h-5 text-blue-500" />}
          label="Workers"
          value={stats.workerCount}
        />
        <StatItem
          icon={<TrendingUp className="w-5 h-5 text-green-500" />}
          label="Total Rate"
          value={`${stats.totalRate.toFixed(4)}/s`}
        />
        <StatItem
          icon={<Award className="w-5 h-5 text-purple-500" />}
          label="Best Level"
          value={stats.highestLevel}
        />
      </div>
    </div>
  );
}

interface StatItemProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}

function StatItem({ icon, label, value }: StatItemProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="mb-1">{icon}</div>
      <div className="text-xs text-gray-500">{label}</div>
      <div className="font-semibold text-gray-700">{value}</div>
    </div>
  );
}