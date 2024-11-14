import React from 'react';
import { ArrowsUpDownIcon } from 'lucide-react';

interface MergeIndicatorProps {
  isActive: boolean;
  direction?: 'horizontal' | 'vertical';
}

export function MergeIndicator({ isActive, direction = 'horizontal' }: MergeIndicatorProps) {
  if (!isActive) return null;

  return (
    <div
      className={`
        absolute z-10
        flex items-center justify-center
        ${direction === 'horizontal' ? 'w-8 h-4 -mx-4' : 'w-4 h-8 -my-4'}
      `}
      style={{
        left: direction === 'horizontal' ? '50%' : undefined,
        top: direction === 'vertical' ? '50%' : undefined
      }}
    >
      <ArrowsUpDownIcon
        className={`
          w-6 h-6 text-green-500 animate-pulse
          ${direction === 'vertical' ? 'transform rotate-90' : ''}
        `}
      />
    </div>
  );
}