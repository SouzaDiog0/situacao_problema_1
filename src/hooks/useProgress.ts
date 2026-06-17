import { useState, useEffect } from "react";

export interface ChallengeProgress {
  completed: boolean;
  stars: number; // 1-3 stars based on efficiency
  bestBlockCount?: number;
}

export interface ProgressState {
  [challengeId: number]: ChallengeProgress;
}

const STORAGE_KEY = "blocos-para-todos-progress";

export const useProgress = () => {
  const [progress, setProgress] = useState<ProgressState>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // localStorage not available
    }
  }, [progress]);

  const completeChallenge = (
    challengeId: number,
    blockCount: number,
    solutionLength: number
  ) => {
    const ratio = blockCount / solutionLength;
    let stars = 1;
    if (ratio <= 1.0) stars = 3;
    else if (ratio <= 1.5) stars = 2;

    setProgress((prev) => {
      const existing = prev[challengeId];
      const newEntry: ChallengeProgress = {
        completed: true,
        stars: Math.max(existing?.stars ?? 0, stars),
        bestBlockCount: Math.min(existing?.bestBlockCount ?? Infinity, blockCount),
      };
      return { ...prev, [challengeId]: newEntry };
    });

    return stars;
  };

  const resetProgress = () => {
    setProgress({});
  };

  const totalCompleted = Object.values(progress).filter((p) => p.completed).length;
  const totalStars = Object.values(progress).reduce((sum, p) => sum + (p.stars ?? 0), 0);

  return { progress, completeChallenge, resetProgress, totalCompleted, totalStars };
};
