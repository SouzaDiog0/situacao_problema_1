import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Play, RotateCcw, Eye, Star, Trophy, ChevronRight } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import BlockEditor from "@/components/BlockEditor";
import Canvas from "@/components/Canvas";
import InstructionsPanel from "@/components/InstructionsPanel";
import { useToast } from "@/hooks/use-toast";
import { challenges, BlockType } from "@/data/challenges";
import { useProgress } from "@/hooks/useProgress";
import { useSpeech } from "@/hooks/useSpeech";

const Challenge = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const { progress, completeChallenge } = useProgress();
  const { speak } = useSpeech();

  const challengeId = Number(id) || 1;
  const challenge = challenges.find((c) => c.id === challengeId) ?? challenges[0];
  const challengeProgress = progress[challengeId];

  const [blocks, setBlocks] = useState<BlockType[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [showVictory, setShowVictory] = useState(false);
  const [earnedStars, setEarnedStars] = useState(0);
  const [highContrast, setHighContrast] = useState(false);
  const [errorBlockIndex, setErrorBlockIndex] = useState<number | null>(null);

  const isNextUnlocked = challengeProgress?.completed ?? false;

  // Reset blocks when challenge changes
  useEffect(() => {
    setBlocks([]);
    setIsRunning(false);
    setShowVictory(false);
    setErrorBlockIndex(null);
  }, [challengeId]);

  const toggleHighContrast = () => {
    setHighContrast(!highContrast);
    document.body.classList.toggle("high-contrast");
  };

  const handleRun = useCallback(() => {
    if (blocks.length === 0) {
      toast({
        title: "Atenção!",
        description: "Adicione alguns blocos antes de executar.",
      });
      speak("Adicione pelo menos um bloco antes de executar.");
      return;
    }
    setErrorBlockIndex(null);
    setIsRunning(true);
  }, [blocks.length, speak, toast]);

  const handleReset = useCallback(() => {
    setIsRunning(false);
    setShowVictory(false);
    setErrorBlockIndex(null);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      if (e.code === "Space" || e.code === "Enter") {
        e.preventDefault();
        if (isRunning) {
          handleReset();
        } else if (blocks.length > 0) {
          handleRun();
        }
      }

      if (e.code === "KeyR" || e.code === "Escape") {
        e.preventDefault();
        handleReset();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isRunning, blocks.length, handleRun, handleReset]);

  const handleVictory = useCallback(
    (blockCount: number) => {
      const stars = completeChallenge(challengeId, blockCount, challenge.solution.length);
      setEarnedStars(stars);
      setIsRunning(false);
      setShowVictory(true);

      const starMsg = stars === 3 ? "Três estrelas! Perfeito!" : stars === 2 ? "Duas estrelas! Muito bem!" : "Uma estrela! Você completou o desafio!";
      speak(`Parabéns! Você chegou à estrela! ${starMsg}`);
    },
    [challengeId, challenge.solution.length, completeChallenge, speak]
  );

  const handleCollision = useCallback((errorIdx: number) => {
    setIsRunning(false);
    setErrorBlockIndex(errorIdx);
    toast({
      title: "Colisão! 💥",
      description: `O bloco #${errorIdx + 1} causou uma colisão. Ajuste ou remova-o e tente de novo!`,
      variant: "destructive",
    });
    speak(`O bloco número ${errorIdx + 1} causou uma colisão. Ajuste seu programa e tente de novo.`);
  }, [toast, speak]);

  const handleFinish = useCallback(() => {
    setIsRunning(false);
    toast({
      title: "Não chegou lá ainda! 🚀",
      description: "Os blocos acabaram antes de chegar à estrela. Adicione mais blocos!",
    });
    speak("Os blocos acabaram antes de chegar à estrela. Tente adicionar mais blocos.");
  }, [toast, speak]);

  const handleNavigate = (newId: number) => {
    navigate(`/desafio/${newId}`);
  };

  const nextChallenge = challenges.find((c) => c.id === challengeId + 1);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-20">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={() => navigate("/desafios")} className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Desafios
              </Button>
              <div className="h-4 w-px bg-border" />
              <div>
                <h1 className="text-sm font-bold leading-none">{challenge.title}</h1>
                <p className="text-xs text-muted-foreground">Desafio {challengeId} de {challenges.length}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {challengeProgress?.completed && (
                <div className="flex gap-0.5">
                  {[1, 2, 3].map((s) => (
                    <Star
                      key={s}
                      className={`w-5 h-5 ${s <= (challengeProgress.stars ?? 0) ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground/20"}`}
                    />
                  ))}
                </div>
              )}
              <Button variant="ghost" size="sm" onClick={toggleHighContrast} aria-label="Alternar alto contraste">
                <Eye className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <div className="flex-1 container mx-auto px-4 py-5">
        <div className="grid lg:grid-cols-3 gap-5 h-full">
          {/* Instructions */}
          <div className="lg:col-span-1">
            <InstructionsPanel
              challenge={challenge}
              totalChallenges={challenges.length}
              onNavigate={handleNavigate}
              progress={challengeProgress}
              isNextUnlocked={isNextUnlocked}
            />
          </div>

          {/* Editor + Canvas */}
          <div className="lg:col-span-2 space-y-5">
            {/* Block Editor */}
            <Card className="p-5">
              <div className="flex justify-end mb-4">
                <div className="flex gap-2">
                  <Button
                    onClick={handleReset}
                    variant="outline"
                    size="sm"
                    className="gap-1.5 font-bold"
                    disabled={isRunning}
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Reiniciar
                  </Button>
                  <Button
                    onClick={handleRun}
                    size="default"
                    className="gap-2 font-bold text-base px-5 bg-green-500 hover:bg-green-400 border-b-4 border-green-700 shadow-lg shadow-green-200"
                    disabled={isRunning || blocks.length === 0}
                  >
                    <Play className="w-4 h-4" />
                    Executar!
                  </Button>
                </div>
              </div>
              <BlockEditor
                blocks={blocks}
                setBlocks={(b) => { setBlocks(b); setErrorBlockIndex(null); }}
                availableBlocks={challenge.availableBlocks}
                maxBlocks={challenge.maxBlocks}
                isRunning={isRunning}
                errorBlockIndex={errorBlockIndex}
              />
            </Card>

            {/* Canvas */}
            <Card className="p-5">
              <Canvas
                isRunning={isRunning}
                blocks={blocks}
                challenge={challenge}
                onVictory={handleVictory}
                onCollision={handleCollision}
                onFinish={handleFinish}
              />
            </Card>
          </div>
        </div>
      </div>

      {/* Victory Modal */}
      {showVictory && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="max-w-md w-full shadow-2xl border-2 border-secondary/40 animate-slide-up">
            <div className="p-8 text-center space-y-5">
              <div className="text-6xl animate-bounce">🎉</div>
              <div>
                <h2 className="text-2xl font-bold">Parabéns!</h2>
                <p className="text-muted-foreground mt-1">
                  Você completou o Desafio {challengeId}: {challenge.title}
                </p>
              </div>

              {/* Stars */}
              <div className="flex justify-center gap-3">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex flex-col items-center gap-1">
                    <Star
                      className={`w-10 h-10 transition-all duration-500 ${
                        s <= earnedStars
                          ? "text-yellow-400 fill-yellow-400 scale-110"
                          : "text-muted-foreground/20"
                      }`}
                      style={{ transitionDelay: `${s * 150}ms` }}
                    />
                  </div>
                ))}
              </div>

              {/* Star message */}
              <p className="text-sm text-muted-foreground">
                {earnedStars === 3
                  ? "🏆 Solução perfeita! Você usou o mínimo de blocos!"
                  : earnedStars === 2
                  ? "👍 Muito bem! Tente usar menos blocos para 3 estrelas."
                  : "✅ Desafio completo! Tente de novo com menos blocos para mais estrelas."}
              </p>

              <div className="flex flex-col gap-2 pt-2">
                {nextChallenge ? (
                  <Button
                    className="gap-2"
                    onClick={() => navigate(`/desafio/${challengeId + 1}`)}
                  >
                    Próximo Desafio
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button className="gap-2" onClick={() => navigate("/desafios")}>
                    <Trophy className="w-4 h-4" />
                    Ver Todos os Desafios
                  </Button>
                )}
                <Button
                  variant="outline"
                  onClick={() => { setShowVictory(false); setBlocks([]); setIsRunning(false); }}
                >
                  Tentar Novamente
                </Button>
                <Button variant="ghost" size="sm" onClick={() => navigate("/desafios")}>
                  Voltar para Seleção
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Challenge;
