import { useState, useCallback } from 'react';
import { Worker } from '../types/game';
import { MERGE_RULES } from '../utils/constants';

export function useWorkerMerge() {
  const [selectedWorkerId, setSelectedWorkerId] = useState<string | null>(null);

  const canMergeWorkers = useCallback((worker1: Worker, worker2: Worker): boolean => {
    if (worker1.type !== worker2.type) return false;
    if (worker1.level !== worker2.level) return false;
    if (worker1.level >= MERGE_RULES.MAX_LEVEL) return false;
    return true;
  }, []);

  const handleWorkerSelect = useCallback((
    workerId: string,
    workers: Worker[],
    onMerge: (worker1: Worker, worker2: Worker) => boolean,
    onMove?: (workerId: string, position: number) => void,
    targetPosition?: number
  ) => {
    if (!selectedWorkerId) {
      setSelectedWorkerId(workerId);
      return;
    }

    if (selectedWorkerId === workerId) {
      setSelectedWorkerId(null);
      return;
    }

    const worker1 = workers.find(w => w.id === selectedWorkerId);
    const worker2 = workers.find(w => w.id === workerId);

    if (worker1 && worker2 && canMergeWorkers(worker1, worker2)) {
      const success = onMerge(worker1, worker2);
      if (success) {
        setSelectedWorkerId(null);
      }
    } else if (worker1 && targetPosition !== undefined && onMove) {
      // Move worker to empty position
      onMove(worker1.id, targetPosition);
      setSelectedWorkerId(null);
    } else {
      setSelectedWorkerId(workerId);
    }
  }, [selectedWorkerId, canMergeWorkers]);

  return {
    selectedWorkerId,
    handleWorkerSelect,
    canMergeWorkers,
  };
}