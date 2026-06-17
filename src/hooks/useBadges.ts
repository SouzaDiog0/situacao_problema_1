import { ProgressState } from "./useProgress";

export interface Badge {
  id: string;
  emoji: string;
  title: string;
  description: string;
  unlocked: boolean;
}

const BADGE_DEFS: { id: string; emoji: string; title: string; description: string; check: (p: ProgressState) => boolean }[] = [
  {
    id: "first_launch",
    emoji: "🚀",
    title: "Primeiro Lançamento",
    description: "Complete o primeiro desafio",
    check: (p) => !!p[1]?.completed,
  },
  {
    id: "three_stars",
    emoji: "⭐",
    title: "Três Estrelas!",
    description: "Ganhe 3 estrelas em qualquer desafio",
    check: (p) => Object.values(p).some((c) => c.stars === 3),
  },
  {
    id: "obstacle_pilot",
    emoji: "🛸",
    title: "Piloto Habilidoso",
    description: "Complete o Desafio 4 desviando dos obstáculos",
    check: (p) => !!p[4]?.completed,
  },
  {
    id: "explorer",
    emoji: "🌌",
    title: "Explorador Galáctico",
    description: "Complete 5 desafios",
    check: (p) => Object.values(p).filter((c) => c.completed).length >= 5,
  },
  {
    id: "loop_master",
    emoji: "🔁",
    title: "Mestre dos Loops",
    description: "Complete o Desafio 6 usando Repetição",
    check: (p) => !!p[6]?.completed,
  },
  {
    id: "perfectionist",
    emoji: "💎",
    title: "Perfeccionista",
    description: "Ganhe 3 estrelas em 5 desafios diferentes",
    check: (p) => Object.values(p).filter((c) => c.stars === 3).length >= 5,
  },
  {
    id: "champion",
    emoji: "🏆",
    title: "Mestre do Espaço",
    description: "Complete todos os 10 desafios",
    check: (p) => Object.values(p).filter((c) => c.completed).length >= 10,
  },
  {
    id: "legend",
    emoji: "👑",
    title: "Lenda Galáctica",
    description: "Ganhe 3 estrelas em todos os 10 desafios",
    check: (p) => Object.values(p).filter((c) => c.stars === 3).length >= 10,
  },
];

export const computeBadges = (progress: ProgressState): Badge[] =>
  BADGE_DEFS.map(({ check, ...badge }) => ({ ...badge, unlocked: check(progress) }));
