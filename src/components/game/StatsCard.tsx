import React from 'react';
import { TrendingUp } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string | number;
  icon?: React.ReactNode;
}

export function StatsCard({ title, value, change, icon }: StatsCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-1 text-xl font-semibold text-gray-900">{value}</p>
        </div>
        <div className={`p-2 rounded-full ${icon ? 'bg-indigo-50' : ''}`}>
          {icon || <TrendingUp className="w-5 h-5 text-indigo-500" />}
        </div>
      </div>
      
      {change && (
        <div className="mt-2 flex items-center">
          <span className="text-sm text-green-600">
            +{change}
          </span>
          <span className="ml-1 text-xs text-gray-500">vs last hour</span>
        </div>
      )}
    </div>
  );
}