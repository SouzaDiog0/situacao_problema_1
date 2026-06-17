import { useEffect, useState, useRef } from "react";
import { BlockType, Position, Direction, Challenge } from "@/data/challenges";

interface CanvasProps {
  isRunning: boolean;
  blocks: BlockType[];
  challenge: Challenge;
  onVictory: (blockCount: number) => void;
  onCollision: (errorBlockIndex: number) => void;
  onFinish: () => void;
}

const PAIRER_BLOCKS: BlockType[] = ["loop2", "loop3", "loop4", "if_obstacle"];

const Canvas = ({ isRunning, blocks, challenge, onVictory, onCollision, onFinish }: CanvasProps) => {
  const [position, setPosition] = useState<Position>(challenge.startPosition);
  const [direction, setDirection] = useState<Direction>(challenge.startDirection);
  const [activeBlockIdx, setActiveBlockIdx] = useState<number | null>(null);
  const [collided, setCollided] = useState(false);
  const [won, setWon] = useState(false);
  const executingRef = useRef(false);

  useEffect(() => {
    if (!isRunning) {
      setPosition(challenge.startPosition);
      setDirection(challenge.startDirection);
      setActiveBlockIdx(null);
      setCollided(false);
      setWon(false);
      executingRef.current = false;
    }
  }, [isRunning, challenge]);

  useEffect(() => {
    if (!isRunning || executingRef.current) return;
    executingRef.current = true;

    let pos = { ...challenge.startPosition };
    let dir: Direction = challenge.startDirection;

    const delay = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

    const isObstacleAhead = (): boolean => {
      let nx = pos.x, ny = pos.y;
      if (dir === 0) nx++;
      else if (dir === 90) ny++;
      else if (dir === 180) nx--;
      else ny--;
      return (
        nx < 0 || nx >= challenge.gridSize ||
        ny < 0 || ny >= challenge.gridSize ||
        challenge.obstacles.some((o) => o.x === nx && o.y === ny)
      );
    };

    const triggerCollision = async (origIdx: number) => {
      setCollided(true);
      setActiveBlockIdx(null);
      executingRef.current = false;
      await delay(1200);
      setCollided(false);
      setPosition({ ...challenge.startPosition });
      setDirection(challenge.startDirection);
      onCollision(origIdx);
    };

    // Returns 'ok' | 'collision' | 'victory'
    const execBlock = async (block: BlockType, origIdx: number): Promise<string> => {
      setActiveBlockIdx(origIdx);
      await delay(450);

      if (block === "move") {
        let nx = pos.x, ny = pos.y;
        if (dir === 0) nx++;
        else if (dir === 90) ny++;
        else if (dir === 180) nx--;
        else ny--;

        if (nx < 0 || nx >= challenge.gridSize || ny < 0 || ny >= challenge.gridSize) {
          await triggerCollision(origIdx);
          return "collision";
        }
        if (challenge.obstacles.some((o) => o.x === nx && o.y === ny)) {
          await triggerCollision(origIdx);
          return "collision";
        }

        pos = { x: nx, y: ny };
        setPosition({ ...pos });

        if (pos.x === challenge.goalPosition.x && pos.y === challenge.goalPosition.y) {
          setWon(true);
          setActiveBlockIdx(null);
          executingRef.current = false;
          onVictory(blocks.length);
          return "victory";
        }
      } else if (block === "turn_right") {
        dir = ((dir + 90) % 360) as Direction;
        setDirection(dir);
      } else if (block === "turn_left") {
        dir = (((dir - 90) + 360) % 360) as Direction;
        setDirection(dir);
      } else if (block === "wait") {
        await delay(800);
      }

      return "ok";
    };

    const run = async () => {
      let i = 0;
      while (i < blocks.length) {
        const block = blocks[i];

        if (block === "loop2" || block === "loop3" || block === "loop4") {
          const times = block === "loop2" ? 2 : block === "loop3" ? 3 : 4;
          const next = blocks[i + 1];
          if (next && !PAIRER_BLOCKS.includes(next)) {
            for (let t = 0; t < times; t++) {
              const result = await execBlock(next, i + 1);
              if (result !== "ok") return;
            }
            i += 2;
          } else {
            i++;
          }
        } else if (block === "if_obstacle") {
          setActiveBlockIdx(i);
          await delay(450);
          const next = blocks[i + 1];
          if (next && !PAIRER_BLOCKS.includes(next) && isObstacleAhead()) {
            const result = await execBlock(next, i + 1);
            if (result !== "ok") return;
          }
          i += 2;
        } else {
          const result = await execBlock(block, i);
          if (result !== "ok") return;
          i++;
        }
      }

      executingRef.current = false;
      setActiveBlockIdx(null);
      onFinish();
    };

    run();
  }, [isRunning]); // eslint-disable-line react-hooks/exhaustive-deps

  const size = challenge.gridSize;
  const cellSize = Math.min(72, Math.floor(480 / size));

  const getRocketEmoji = () => {
    if (collided) return "💥";
    if (won) return "🎉";
    return "🚀";
  };

  return (
    <div className="bg-muted/30 rounded-xl p-4 flex flex-col items-center justify-center gap-4 min-h-[320px]">
      {/* Status */}
      {isRunning && !won && !collided && (
        <div className="flex items-center gap-2 text-sm text-primary font-medium animate-pulse">
          <span className="w-2 h-2 bg-primary rounded-full" />
          Executando...
        </div>
      )}
      {won && (
        <div className="text-sm font-bold text-secondary animate-bounce">
          🌟 Parabéns! Você chegou à estrela! 🌟
        </div>
      )}
      {collided && (
        <div className="text-sm font-bold text-destructive animate-pulse">
          💥 Colisão! Voltando ao início...
        </div>
      )}

      {/* Grid */}
      <div
        className="grid gap-1"
        style={{ gridTemplateColumns: `repeat(${size}, ${cellSize}px)` }}
      >
        {Array.from({ length: size * size }).map((_, idx) => {
          const x = idx % size;
          const y = Math.floor(idx / size);
          const isCharacter = x === position.x && y === position.y;
          const isGoal = x === challenge.goalPosition.x && y === challenge.goalPosition.y;
          const isObstacle = challenge.obstacles.some((o) => o.x === x && o.y === y);
          const isStart =
            x === challenge.startPosition.x &&
            y === challenge.startPosition.y &&
            !isCharacter;

          return (
            <div
              key={idx}
              style={{ width: cellSize, height: cellSize }}
              className={`rounded-lg flex items-center justify-center transition-all duration-300 border ${
                isCharacter
                  ? won
                    ? "bg-secondary/30 border-secondary scale-110"
                    : collided
                    ? "bg-destructive/20 border-destructive scale-125"
                    : "bg-primary/20 border-primary scale-110"
                  : isGoal
                  ? "bg-yellow-400/20 border-yellow-400/60"
                  : isObstacle
                  ? "bg-destructive/20 border-destructive/40"
                  : isStart
                  ? "bg-muted/50 border-dashed border-muted-foreground/20"
                  : "bg-card border-border"
              }`}
            >
              {isCharacter && (
                <div
                  className="transition-transform duration-300 select-none"
                  style={{
                    transform: `rotate(${direction}deg)`,
                    fontSize: cellSize * 0.45,
                  }}
                >
                  {getRocketEmoji()}
                </div>
              )}
              {isGoal && !isCharacter && (
                <div className="select-none" style={{ fontSize: cellSize * 0.45 }}>
                  ⭐
                </div>
              )}
              {isObstacle && (
                <div className="select-none" style={{ fontSize: cellSize * 0.4 }}>
                  🪨
                </div>
              )}
            </div>
          );
        })}
      </div>

      {isRunning && activeBlockIdx !== null && !won && !collided && (
        <div className="text-xs text-muted-foreground">
          Executando bloco {activeBlockIdx + 1}
        </div>
      )}
    </div>
  );
};

export default Canvas;
