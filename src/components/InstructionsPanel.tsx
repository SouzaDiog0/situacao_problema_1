import { Button } from "@/components/ui/button";
import { Volume2, VolumeX, ChevronLeft, ChevronRight, HelpCircle, X } from "lucide-react";
import { Challenge } from "@/data/challenges";
import { useSpeech } from "@/hooks/useSpeech";
import { useState } from "react";

interface InstructionsPanelProps {
  challenge: Challenge;
  totalChallenges: number;
  onNavigate: (id: number) => void;
  progress: { completed: boolean; stars: number } | undefined;
  isNextUnlocked: boolean;
}

const InstructionsPanel = ({
  challenge,
  totalChallenges,
  onNavigate,
  progress,
  isNextUnlocked,
}: InstructionsPanelProps) => {
  const { speak, stop, isSupported } = useSpeech();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const handleSpeak = () => {
    if (isSpeaking) {
      stop();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      speak(challenge.voiceInstruction);
      const duration = challenge.voiceInstruction.length * 70;
      setTimeout(() => setIsSpeaking(false), duration);
    }
  };

  return (
    <div className="h-full flex flex-col gap-4">

      {/* Número + título */}
      <div className="bg-card rounded-2xl border-2 border-border p-5 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-black text-lg flex-shrink-0">
              {challenge.id}
            </div>
            <div>
              <h1 className="text-lg font-black leading-tight">{challenge.title}</h1>
              <p className="text-xs text-muted-foreground">Desafio {challenge.id} de {totalChallenges}</p>
            </div>
          </div>

          {isSupported && (
            <Button
              variant={isSpeaking ? "default" : "outline"}
              size="sm"
              onClick={handleSpeak}
              className="gap-1.5 h-8 flex-shrink-0"
              aria-label={isSpeaking ? "Parar narração" : "Ouvir instruções"}
            >
              {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              <span className="text-xs">{isSpeaking ? "Parar" : "Ouvir"}</span>
            </Button>
          )}
        </div>

        {/* Estrelas (se já completou) */}
        {progress?.completed && (
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-muted-foreground">Seu recorde:</span>
            {[1, 2, 3].map((s) => (
              <span key={s} className={`text-xl ${s <= (progress.stars ?? 0) ? "" : "opacity-20"}`}>
                ⭐
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Objetivo — visual e direto */}
      <div className="bg-card rounded-2xl border-2 border-border p-5 space-y-3 flex-1">
        <p className="text-base font-bold leading-snug">{challenge.description}</p>

        {/* Dica */}
        <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl p-3">
          <span className="text-xl flex-shrink-0">💡</span>
          <p className="text-sm text-amber-900 leading-snug">{challenge.hint}</p>
        </div>

        {challenge.availableBlocks.includes("if_obstacle") && (
          <div className="flex items-start gap-2 bg-rose-50 border border-rose-200 rounded-xl p-3">
            <span className="text-xl flex-shrink-0">🤔</span>
            <p className="text-sm text-rose-900 leading-snug">
              <strong>SE?</strong> só executa o bloco seguinte se houver uma pedra na frente.
            </p>
          </div>
        )}

        {/* Limit de blocos */}
        {challenge.maxBlocks && (
          <div className="flex items-center gap-2 bg-violet-50 border border-violet-200 rounded-xl p-3">
            <span className="text-xl">🎯</span>
            <p className="text-sm text-violet-900 font-bold">
              Use no máximo {challenge.maxBlocks} blocos!
            </p>
          </div>
        )}
      </div>

      {/* Botão de ajuda recolhível */}
      <div className="bg-card rounded-2xl border-2 border-border overflow-hidden">
        <button
          onClick={() => setShowHelp(!showHelp)}
          className="w-full flex items-center justify-between p-4 text-sm font-bold text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors"
        >
          <span className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4" />
            Como jogar?
          </span>
          <span className="text-lg">{showHelp ? "▲" : "▼"}</span>
        </button>

        {showHelp && (
          <div className="px-4 pb-4 space-y-2 text-sm text-muted-foreground border-t border-border pt-3">
            <p>👆 <strong>Clique</strong> nos blocos para adicionar ao programa</p>
            <p>🖱️ <strong>Arraste</strong> blocos para mudar a ordem</p>
            <p>❌ Clique no <strong>X</strong> para remover um bloco</p>
            <p>▶ Clique em <strong>Executar!</strong> para ver o foguete voar</p>
          </div>
        )}
      </div>

      {/* Navegação */}
      <div className="flex gap-3">
        <Button
          variant="outline"
          className="flex-1 gap-1 font-bold"
          disabled={challenge.id <= 1}
          onClick={() => onNavigate(challenge.id - 1)}
        >
          <ChevronLeft className="w-4 h-4" />
          Anterior
        </Button>
        <Button
          variant="outline"
          className="flex-1 gap-1 font-bold"
          disabled={challenge.id >= totalChallenges || !isNextUnlocked}
          onClick={() => onNavigate(challenge.id + 1)}
          title={!isNextUnlocked ? "Complete este desafio para desbloquear o próximo" : undefined}
        >
          Próximo
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

    </div>
  );
};

export default InstructionsPanel;
