import React from 'react';
import { GRID_SIZE } from '../../utils/constants';
import { GridCell as GridCellType, Worker as WorkerType } from '../../types/game';
import { Worker } from './Worker';

interface GameBoardProps {
  gridState: GridCellType[];
  workers: WorkerType[];
  onCellClick: (position: number) => void;
  balance: number;
  selectedWorkerId: string | null;
  canMergeWorkers: (worker1: WorkerType, worker2: WorkerType) => boolean;
}

export function GameBoard({ 
  gridState, 
  workers, 
  onCellClick, 
  balance,
  selectedWorkerId,
  canMergeWorkers,
}: GameBoardProps) {
  return (
    <div className="h-full flex flex-col bg-[#FFF3E0] p-2 sm:p-3">
      <div className="bg-[#FFB74D] rounded-xl p-2 mb-2 sm:mb-3 shadow-md">
        <div className="flex items-center gap-2">
          <div className="bg-white rounded-full w-6 h-6 flex items-center justify-center text-[#FFB74D] font-bold text-sm">
            {workers.length}
          </div>
          <span className="text-white font-bold text-sm">MINERS</span>
        </div>
      </div>

      <div className="flex-1 grid gap-1.5 sm:gap-2 h-full"
        style={{
          gridTemplateColumns: `repeat(${GRID_SIZE.COLS}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${GRID_SIZE.ROWS}, minmax(0, 1fr))`,
        }}
      >
        {gridState.map((cell) => {
          const worker = workers.find(w => w.id === cell.workerId);
          const selectedWorker = workers.find(w => w.id === selectedWorkerId);
          const canMerge = worker && selectedWorker && worker.id !== selectedWorker.id && 
                          canMergeWorkers(worker, selectedWorker);
          const isValidMove = selectedWorker && !worker;

          return (
            <GridCell
              key={cell.position}
              cell={cell}
              worker={worker}
              onClick={() => onCellClick(cell.position)}
              balance={balance}
              isSelected={worker?.id === selectedWorkerId}
              canMerge={canMerge}
              isValidMove={isValidMove}
            />
          );
        })}
      </div>
    </div>
  );
}

interface GridCellProps {
  cell: GridCellType;
  worker?: WorkerType;
  onClick: () => void;
  balance: number;
  isSelected?: boolean;
  canMerge?: boolean;
  isValidMove?: boolean;
}

function GridCell({ cell, worker, onClick, balance, isSelected, canMerge, isValidMove }: GridCellProps) {
  return (
    <div
      onClick={onClick}
      className={`
        relative w-full aspect-square rounded-lg
        transition-all duration-200
        ${cell.isOccupied 
          ? 'bg-white' 
          : isValidMove
            ? 'bg-blue-100 hover:bg-blue-200'
            : 'bg-[#FFE0B2] hover:bg-[#FFCC80]'
        }
        cursor-pointer border-2
        ${isSelected ? 'border-[#FFB74D]' : 'border-[#FFE0B2]'}
        ${canMerge ? 'border-[#4CAF50]' : ''}
        ${isValidMove ? 'border-blue-300' : ''}
        shadow-sm hover:shadow
        overflow-hidden
      `}
    >
      {worker ? (
        <Worker 
          worker={worker} 
          onClick={onClick} 
          balance={balance}
          isSelected={isSelected}
          canMerge={canMerge}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-[#FFB74D] font-medium">
          {isValidMove ? '⟶' : '+'}
        </div>
      )}
    </div>
  );
}