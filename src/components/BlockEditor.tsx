import { useRef, useState } from "react";
import { MoveRight, RotateCw, RotateCcw, Timer, X, RefreshCw, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BlockType, BLOCK_LABELS } from "@/data/challenges";

interface BlockEditorProps {
  blocks: BlockType[];
  setBlocks: (blocks: BlockType[]) => void;
  availableBlocks: BlockType[];
  maxBlocks?: number;
  isRunning: boolean;
  errorBlockIndex: number | null;
}

const BLOCK_CONFIG: Record<BlockType, {
  paletteIcon: React.ReactNode;
  programIcon: React.ReactNode;
  palette: string;
  program: string;
  shortLabel: string;
}> = {
  move: {
    paletteIcon: <MoveRight className="w-9 h-9" />,
    programIcon: <MoveRight className="w-4 h-4" />,
    palette: "bg-blue-500 hover:bg-blue-400 active:scale-95 text-white border-b-4 border-blue-700 shadow-lg shadow-blue-200",
    program: "bg-blue-500 text-white shadow-md shadow-blue-200",
    shortLabel: "Mover",
  },
  turn_right: {
    paletteIcon: <RotateCw className="w-9 h-9" />,
    programIcon: <RotateCw className="w-4 h-4" />,
    palette: "bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-white border-b-4 border-emerald-700 shadow-lg shadow-emerald-200",
    program: "bg-emerald-500 text-white shadow-md shadow-emerald-200",
    shortLabel: "Dir.",
  },
  turn_left: {
    paletteIcon: <RotateCcw className="w-9 h-9" />,
    programIcon: <RotateCcw className="w-4 h-4" />,
    palette: "bg-violet-500 hover:bg-violet-400 active:scale-95 text-white border-b-4 border-violet-700 shadow-lg shadow-violet-200",
    program: "bg-violet-500 text-white shadow-md shadow-violet-200",
    shortLabel: "Esq.",
  },
  wait: {
    paletteIcon: <Timer className="w-9 h-9" />,
    programIcon: <Timer className="w-4 h-4" />,
    palette: "bg-amber-400 hover:bg-amber-300 active:scale-95 text-amber-900 border-b-4 border-amber-600 shadow-lg shadow-amber-200",
    program: "bg-amber-400 text-amber-900 shadow-md shadow-amber-200",
    shortLabel: "Pausa",
  },
  loop2: {
    paletteIcon: <span className="font-black text-4xl leading-none">×2</span>,
    programIcon: <span className="font-black text-sm leading-none">×2</span>,
    palette: "bg-orange-500 hover:bg-orange-400 active:scale-95 text-white border-b-4 border-orange-700 shadow-lg shadow-orange-200",
    program: "bg-orange-500 text-white shadow-md shadow-orange-200",
    shortLabel: "Repete",
  },
  loop3: {
    paletteIcon: <span className="font-black text-4xl leading-none">×3</span>,
    programIcon: <span className="font-black text-sm leading-none">×3</span>,
    palette: "bg-orange-500 hover:bg-orange-400 active:scale-95 text-white border-b-4 border-orange-700 shadow-lg shadow-orange-200",
    program: "bg-orange-500 text-white shadow-md shadow-orange-200",
    shortLabel: "Repete",
  },
  loop4: {
    paletteIcon: <span className="font-black text-4xl leading-none">×4</span>,
    programIcon: <span className="font-black text-sm leading-none">×4</span>,
    palette: "bg-orange-500 hover:bg-orange-400 active:scale-95 text-white border-b-4 border-orange-700 shadow-lg shadow-orange-200",
    program: "bg-orange-500 text-white shadow-md shadow-orange-200",
    shortLabel: "Repete",
  },
  if_obstacle: {
    paletteIcon: <span className="font-black text-3xl leading-none">SE?</span>,
    programIcon: <span className="font-black text-xs leading-none">SE?</span>,
    palette: "bg-rose-500 hover:bg-rose-400 active:scale-95 text-white border-b-4 border-rose-700 shadow-lg shadow-rose-200",
    program: "bg-rose-500 text-white shadow-md shadow-rose-200",
    shortLabel: "Se Pedra",
  },
};

const BlockEditor = ({
  blocks,
  setBlocks,
  availableBlocks,
  maxBlocks,
  isRunning,
  errorBlockIndex,
}: BlockEditorProps) => {
  const dragItem = useRef<number | null>(null);
  const dragOver = useRef<number | null>(null);
  const [draggingIdx, setDraggingIdx] = useState<number | null>(null);
  const [dropTarget, setDropTarget] = useState<number | null>(null);
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);

  const addBlock = (blockId: BlockType) => {
    if (maxBlocks && blocks.length >= maxBlocks) return;
    const next = [...blocks, blockId];
    setBlocks(next);
    // Auto-foca o bloco recém-adicionado para que as setas funcionem imediatamente
    setTimeout(() => blockRefs.current[next.length - 1]?.focus(), 50);
  };

  const removeBlock = (index: number) => {
    const next = blocks.filter((_, i) => i !== index);
    setBlocks(next);
    setTimeout(() => {
      const focusIdx = Math.min(index, next.length - 1);
      if (focusIdx >= 0) blockRefs.current[focusIdx]?.focus();
    }, 0);
  };

  const moveBlock = (from: number, to: number) => {
    if (to < 0 || to >= blocks.length) return;
    const next = [...blocks];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    setBlocks(next);
    setTimeout(() => blockRefs.current[to]?.focus(), 0);
  };

  const handleProgramKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (isRunning) return;
    switch (e.key) {
      case "Delete":
      case "Backspace":
        e.preventDefault();
        e.stopPropagation();
        removeBlock(index);
        break;
      case "ArrowLeft":
        e.preventDefault();
        e.stopPropagation();
        if (e.ctrlKey || e.metaKey) moveBlock(index, index - 1);
        else blockRefs.current[index - 1]?.focus();
        break;
      case "ArrowRight":
        e.preventDefault();
        e.stopPropagation();
        if (e.ctrlKey || e.metaKey) moveBlock(index, index + 1);
        else blockRefs.current[index + 1]?.focus();
        break;
      // Evita que Space/Enter disparem o "Executar" global quando um bloco está em foco
      case " ":
      case "Enter":
        e.stopPropagation();
        break;
    }
  };

  const handlePaletteDragStart = (e: React.DragEvent, blockId: BlockType) => {
    e.dataTransfer.setData("palette-block", blockId);
    e.dataTransfer.effectAllowed = "copy";
  };

  const handleProgramDragStart = (e: React.DragEvent, index: number) => {
    dragItem.current = index;
    setDraggingIdx(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleProgramDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    dragOver.current = index;
    setDropTarget(index);
  };

  const handleProgramDrop = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    const paletteBlock = e.dataTransfer.getData("palette-block") as BlockType;
    if (paletteBlock) {
      if (maxBlocks && blocks.length >= maxBlocks) return;
      const newBlocks = [...blocks];
      newBlocks.splice(index, 0, paletteBlock);
      setBlocks(newBlocks);
    } else if (dragItem.current !== null) {
      const newBlocks = [...blocks];
      const dragged = newBlocks.splice(dragItem.current, 1)[0];
      const targetIdx = dragItem.current < index ? index - 1 : index;
      newBlocks.splice(targetIdx, 0, dragged);
      setBlocks(newBlocks);
    }
    dragItem.current = null;
    setDraggingIdx(null);
    setDropTarget(null);
  };

  const handleDropEnd = () => {
    setDraggingIdx(null);
    setDropTarget(null);
  };

  const handleAreaDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const paletteBlock = e.dataTransfer.getData("palette-block") as BlockType;
    if (paletteBlock) {
      if (maxBlocks && blocks.length >= maxBlocks) return;
      setBlocks([...blocks, paletteBlock]);
    } else if (dragItem.current !== null) {
      const newBlocks = [...blocks];
      const dragged = newBlocks.splice(dragItem.current, 1)[0];
      newBlocks.push(dragged);
      setBlocks(newBlocks);
    }
    dragItem.current = null;
    setDraggingIdx(null);
    setDropTarget(null);
  };

  const handleAreaDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  };

  const atLimit = maxBlocks !== undefined && blocks.length >= maxBlocks;

  return (
    <div className="space-y-6">

      {/* ── Paleta ── */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="font-bold text-base">
            🎮 Escolha os blocos
          </p>
          {maxBlocks && (
            <span className={`text-sm font-bold px-3 py-1 rounded-full ${
              atLimit ? "bg-red-100 text-red-600" : "bg-muted text-muted-foreground"
            }`}>
              {blocks.length}/{maxBlocks} blocos
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {availableBlocks.map((blockId) => {
            const cfg = BLOCK_CONFIG[blockId];
            return (
              <button
                key={blockId}
                draggable
                onDragStart={(e) => handlePaletteDragStart(e, blockId)}
                onClick={() => !isRunning && addBlock(blockId)}
                disabled={isRunning || atLimit}
                aria-label={`Adicionar bloco ${BLOCK_LABELS[blockId]}`}
                className={`flex flex-col items-center justify-center gap-2 py-4 px-3 rounded-2xl
                  border-2 border-transparent transition-all select-none
                  ${cfg.palette}
                  disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100
                  cursor-pointer
                  focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white focus-visible:ring-offset-2`}
              >
                <div className="flex items-center justify-center h-10">
                  {cfg.paletteIcon}
                </div>
                <span className="text-sm font-bold text-center leading-tight">
                  {BLOCK_LABELS[blockId]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Programa ── */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="font-bold text-base">🚀 Meu programa</p>
          {blocks.length > 0 && !isRunning && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setBlocks([])}
              className="text-muted-foreground hover:text-red-500 gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Limpar tudo
            </Button>
          )}
        </div>

        <div
          className={`min-h-[160px] rounded-2xl border-3 border-dashed p-4 transition-all ${
            atLimit
              ? "border-red-400 bg-red-50"
              : blocks.length === 0
              ? "border-primary/40 bg-primary/5 hover:border-primary hover:bg-primary/10"
              : "border-border bg-muted/20"
          }`}
          style={{ borderWidth: "3px" }}
          onDrop={handleAreaDrop}
          onDragOver={handleAreaDragOver}
        >
          {blocks.length === 0 ? (
            <div className="h-full min-h-[120px] flex flex-col items-center justify-center gap-3 text-primary/60">
              <span className="text-5xl">👆</span>
              <p className="text-base font-bold">Clique nos blocos acima!</p>
              <p className="text-sm opacity-70">ou arraste eles para cá</p>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2 items-center">
              {blocks.map((blockId, index) => {
                const cfg = BLOCK_CONFIG[blockId];
                const isDragging = draggingIdx === index;
                const isDropTarget = dropTarget === index;
                const isError = errorBlockIndex === index;

                return (
                  <div
                    key={index}
                    ref={(el) => { blockRefs.current[index] = el; }}
                    tabIndex={isRunning ? -1 : 0}
                    role="button"
                    aria-label={`Bloco ${index + 1}: ${BLOCK_LABELS[blockId]}. Setas para navegar, Ctrl+Seta para mover, Delete para remover.`}
                    draggable={!isRunning}
                    onDragStart={(e) => handleProgramDragStart(e, index)}
                    onDragOver={(e) => handleProgramDragOver(e, index)}
                    onDrop={(e) => handleProgramDrop(e, index)}
                    onDragEnd={handleDropEnd}
                    onKeyDown={(e) => handleProgramKeyDown(e, index)}
                    className={`relative flex items-center gap-1.5 pl-2 pr-1 py-2 rounded-xl transition-all
                      ${isError
                        ? "bg-red-500 text-white shadow-lg shadow-red-200 animate-[shake_0.4s_ease-in-out]"
                        : cfg.program
                      }
                      ${isDragging ? "opacity-30 scale-95" : ""}
                      ${isDropTarget ? "ring-4 ring-primary ring-offset-2 scale-105" : ""}
                      ${!isRunning ? "cursor-grab active:cursor-grabbing" : "cursor-default"}
                      focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white focus-visible:ring-offset-2
                      select-none`}
                  >
                    {/* Número do bloco */}
                    <span className="text-[10px] font-black opacity-60 bg-white/20 rounded-full w-4 h-4 flex items-center justify-center flex-shrink-0">
                      {index + 1}
                    </span>

                    {/* Ícone */}
                    <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
                      {isError ? "⚠️" : cfg.programIcon}
                    </div>

                    {/* Label */}
                    <span className="text-xs font-bold whitespace-nowrap">
                      {cfg.shortLabel}
                    </span>

                    {/* Botão remover — sempre visível */}
                    {!isRunning && (
                      <button
                        tabIndex={-1}
                        onClick={(e) => { e.stopPropagation(); removeBlock(index); }}
                        aria-label={`Remover bloco ${index + 1}`}
                        className="ml-1 w-5 h-5 flex items-center justify-center rounded-full bg-white/25 hover:bg-white/50 transition-colors flex-shrink-0"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}

                    {/* Badge de erro */}
                    {isError && (
                      <span className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 text-[9px] font-black px-1.5 py-0.5 rounded-full leading-none z-10">
                        erro!
                      </span>
                    )}
                  </div>
                );
              })}

              {/* Indicador de que dá pra adicionar mais */}
              {!atLimit && !isRunning && (
                <div className="w-10 h-10 rounded-xl border-2 border-dashed border-primary/30 flex items-center justify-center text-primary/30 text-xl font-bold">
                  +
                </div>
              )}
            </div>
          )}
        </div>

        {blocks.length > 0 && !isRunning && (
          <p className="text-xs text-muted-foreground mt-2 text-right">
            <kbd className="bg-muted px-1 rounded">← →</kbd> navegar ·{" "}
            <kbd className="bg-muted px-1 rounded">Ctrl+← →</kbd> mover ·{" "}
            <kbd className="bg-muted px-1 rounded">Delete</kbd> remover
          </p>
        )}
      </div>
    </div>
  );
};

export default BlockEditor;
