export type Direction = 0 | 90 | 180 | 270; // right, down, left, up

export interface Position {
  x: number;
  y: number;
}

export type Pillar = "algoritmos" | "decomposicao" | "padroes" | "abstracao";

export const PILLAR_LABELS: Record<Pillar, string> = {
  algoritmos:   "Algoritmos",
  decomposicao: "Decomposição",
  padroes:      "Padrões",
  abstracao:    "Abstração",
};

export const PILLAR_COLORS: Record<Pillar, string> = {
  algoritmos:   "bg-blue-100 text-blue-800 border border-blue-200",
  decomposicao: "bg-emerald-100 text-emerald-800 border border-emerald-200",
  padroes:      "bg-orange-100 text-orange-800 border border-orange-200",
  abstracao:    "bg-violet-100 text-violet-800 border border-violet-200",
};

export const PILLAR_EMOJI: Record<Pillar, string> = {
  algoritmos:   "⚙️",
  decomposicao: "🧩",
  padroes:      "🔁",
  abstracao:    "💡",
};

export interface Challenge {
  id: number;
  title: string;
  description: string;
  hint: string;
  gridSize: number; // e.g. 5 for 5x5
  startPosition: Position;
  startDirection: Direction;
  goalPosition: Position;
  obstacles: Position[];
  availableBlocks: BlockType[];
  maxBlocks?: number; // optional limit
  solution: BlockType[]; // one valid solution
  voiceInstruction: string;
  pillars: Pillar[];
}

export type BlockType = "move" | "turn_right" | "turn_left" | "wait" | "loop2" | "loop3" | "loop4" | "if_obstacle";

export const BLOCK_LABELS: Record<BlockType, string> = {
  move: "Mover para Frente",
  turn_right: "Girar à Direita",
  turn_left: "Girar à Esquerda",
  wait: "Esperar 1s",
  loop2: "Repetir 2x",
  loop3: "Repetir 3x",
  loop4: "Repetir 4x",
  if_obstacle: "Se Obstáculo",
};

export const challenges: Challenge[] = [
  {
    id: 1,
    title: "Primeiro Passo",
    description: "Mova o foguete 🚀 até a estrela ⭐. O foguete precisa andar 2 casas para a direita.",
    hint: "Use 2 blocos 'Mover para Frente' em sequência.",
    gridSize: 5,
    startPosition: { x: 0, y: 2 },
    startDirection: 0,
    goalPosition: { x: 2, y: 2 },
    obstacles: [],
    availableBlocks: ["move"],
    solution: ["move", "move"],
    voiceInstruction: "Desafio 1: Primeiro Passo. Mova o foguete até a estrela usando o bloco Mover para Frente. O foguete está no lado esquerdo e a estrela está 2 casas para a direita.",
    pillars: ["algoritmos"],
  },
  {
    id: 2,
    title: "Jornada Completa",
    description: "O foguete precisa chegar ao outro lado do mapa! Atravesse todo o caminho.",
    hint: "Conte quantas casas há entre o foguete e a estrela.",
    gridSize: 5,
    startPosition: { x: 0, y: 2 },
    startDirection: 0,
    goalPosition: { x: 4, y: 2 },
    obstacles: [],
    availableBlocks: ["move"],
    solution: ["move", "move", "move", "move"],
    voiceInstruction: "Desafio 2: Jornada Completa. Mova o foguete 4 casas para a direita até chegar à estrela.",
    pillars: ["algoritmos", "decomposicao"],
  },
  {
    id: 3,
    title: "Primeira Curva",
    description: "A estrela não está na mesma linha! Você vai precisar girar o foguete.",
    hint: "Mova 2 casas, gire à direita, depois mova mais 2 casas.",
    gridSize: 5,
    startPosition: { x: 0, y: 0 },
    startDirection: 0,
    goalPosition: { x: 2, y: 2 },
    obstacles: [],
    availableBlocks: ["move", "turn_right"],
    solution: ["move", "move", "turn_right", "move", "move"],
    voiceInstruction: "Desafio 3: Primeira Curva. O foguete precisa girar para chegar à estrela. Use os blocos Mover para Frente e Girar à Direita.",
    pillars: ["algoritmos", "decomposicao"],
  },
  {
    id: 4,
    title: "Desvio Necessário",
    description: "Há um obstáculo no caminho! Você precisa desviar para chegar à estrela.",
    hint: "Suba primeiro, depois vá para a direita, depois desça.",
    gridSize: 5,
    startPosition: { x: 0, y: 2 },
    startDirection: 0,
    goalPosition: { x: 4, y: 2 },
    obstacles: [{ x: 2, y: 2 }, { x: 2, y: 3 }],
    availableBlocks: ["move", "turn_right", "turn_left", "if_obstacle"],
    solution: ["turn_left", "move", "move", "turn_right", "move", "move", "move", "move", "turn_right", "move", "move"],
    voiceInstruction: "Desafio 4: Desvio Necessário. Há obstáculos no caminho! Use os blocos de movimento e giro para desviar dos asteroides. O bloco Se Obstáculo executa o próximo bloco apenas quando há um obstáculo à frente.",
    pillars: ["algoritmos", "decomposicao"],
  },
  {
    id: 5,
    title: "Labirinto Simples",
    description: "Um labirinto com várias curvas! Planeje o caminho antes de executar.",
    hint: "Pense no caminho completo antes de adicionar os blocos.",
    gridSize: 6,
    startPosition: { x: 0, y: 0 },
    startDirection: 0,
    goalPosition: { x: 5, y: 5 },
    obstacles: [
      { x: 2, y: 0 }, { x: 2, y: 1 }, { x: 2, y: 2 },
      { x: 4, y: 2 }, { x: 4, y: 3 }, { x: 4, y: 4 },
    ],
    availableBlocks: ["move", "turn_right", "turn_left"],
    solution: ["move", "move", "turn_right", "move", "move", "move", "turn_left", "move", "move", "turn_right", "move", "move", "move", "turn_left", "move", "move", "turn_right", "move"],
    voiceInstruction: "Desafio 5: Labirinto Simples. Navegue pelo labirinto usando os blocos de movimento e giro para chegar à estrela.",
    pillars: ["algoritmos", "decomposicao", "padroes"],
  },
  {
    id: 6,
    title: "Poder da Repetição",
    description: "Use os blocos de repetição para economizar blocos! A estrela está longe.",
    hint: "O bloco 'Repetir 4x' repete o próximo bloco 4 vezes.",
    gridSize: 6,
    startPosition: { x: 0, y: 3 },
    startDirection: 0,
    goalPosition: { x: 4, y: 3 },
    obstacles: [],
    availableBlocks: ["move", "turn_right", "turn_left", "loop2", "loop4"],
    maxBlocks: 4,
    solution: ["loop4", "move"],
    voiceInstruction: "Desafio 6: Poder da Repetição. Use o bloco Repetir para mover o foguete várias vezes com poucos blocos. Você tem no máximo 4 blocos!",
    pillars: ["padroes", "abstracao"],
  },
  {
    id: 7,
    title: "Espiral",
    description: "O foguete precisa fazer um caminho em L. Pense bem nas direções!",
    hint: "Você vai precisar de ambos os giros: esquerda e direita.",
    gridSize: 6,
    startPosition: { x: 0, y: 0 },
    startDirection: 0,
    goalPosition: { x: 5, y: 0 },
    obstacles: [
      { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 },
      { x: 3, y: 2 }, { x: 3, y: 3 }, { x: 3, y: 4 },
      { x: 4, y: 4 }, { x: 5, y: 4 }, { x: 5, y: 3 }, { x: 5, y: 2 }, { x: 5, y: 1 },
    ],
    availableBlocks: ["move", "turn_right", "turn_left"],
    solution: ["move", "move", "move", "turn_right", "move", "move", "move", "move", "turn_right", "move", "move", "turn_left", "move", "move", "turn_left", "move", "move", "move", "turn_right", "move", "move", "move", "move", "turn_left"],
    voiceInstruction: "Desafio 7: Espiral. Navegue pelo caminho em espiral usando os blocos de movimento e giro.",
    pillars: ["algoritmos", "padroes"],
  },
  {
    id: 8,
    title: "Eficiência Máxima",
    description: "Chegue à estrela usando o mínimo de blocos possível com loops!",
    hint: "Combine os blocos de repetição com movimento e giro.",
    gridSize: 6,
    startPosition: { x: 0, y: 0 },
    startDirection: 0,
    goalPosition: { x: 3, y: 3 },
    obstacles: [],
    availableBlocks: ["move", "turn_right", "turn_left", "loop2", "loop3", "loop4"],
    maxBlocks: 6,
    solution: ["loop3", "move", "turn_right", "loop3", "move"],
    voiceInstruction: "Desafio 8: Eficiência Máxima. Use repetições para resolver o desafio com no máximo 6 blocos!",
    pillars: ["padroes", "abstracao"],
  },
  {
    id: 9,
    title: "Grande Labirinto",
    description: "O labirinto mais complexo até agora! Você vai precisar de toda sua habilidade.",
    hint: "Explore o caminho passo a passo. Não tem pressa!",
    gridSize: 7,
    startPosition: { x: 0, y: 0 },
    startDirection: 0,
    goalPosition: { x: 6, y: 6 },
    obstacles: [
      { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 },
      { x: 3, y: 1 }, { x: 3, y: 2 }, { x: 3, y: 3 }, { x: 3, y: 4 },
      { x: 5, y: 2 }, { x: 5, y: 3 }, { x: 5, y: 4 }, { x: 5, y: 5 },
      { x: 2, y: 5 }, { x: 3, y: 5 }, { x: 4, y: 6 },
    ],
    availableBlocks: ["move", "turn_right", "turn_left", "loop2", "loop3", "if_obstacle"],
    solution: ["move", "turn_right", "move", "move", "move", "turn_left", "move", "move", "turn_left", "move", "turn_right", "move", "move", "turn_right", "move", "move", "move", "move", "turn_left", "move", "move", "turn_right", "move", "move"],
    voiceInstruction: "Desafio 9: Grande Labirinto. O maior labirinto da jornada! Planeje bem cada passo para chegar à estrela. Use Se Obstáculo para tomar decisões condicionais.",
    pillars: ["algoritmos", "decomposicao", "padroes"],
  },
  {
    id: 10,
    title: "Mestre dos Blocos",
    description: "O desafio final! Prove que você é um mestre da programação em blocos.",
    hint: "Use todos os tipos de blocos disponíveis. Você consegue!",
    gridSize: 7,
    startPosition: { x: 0, y: 3 },
    startDirection: 0,
    goalPosition: { x: 6, y: 3 },
    obstacles: [
      { x: 2, y: 2 }, { x: 2, y: 3 }, { x: 2, y: 4 },
      { x: 4, y: 1 }, { x: 4, y: 2 }, { x: 4, y: 3 }, { x: 4, y: 4 }, { x: 4, y: 5 },
    ],
    availableBlocks: ["move", "turn_right", "turn_left", "loop2", "loop3", "loop4"],
    maxBlocks: 14,
    solution: ["turn_left", "loop3", "move", "turn_right", "loop4", "move", "loop2", "move", "turn_right", "loop3", "move"],
    voiceInstruction: "Desafio 10: Mestre dos Blocos! O desafio final! Use todo o seu conhecimento de blocos para completar este percurso épico.",
    pillars: ["algoritmos", "decomposicao", "padroes", "abstracao"],
  },
];
