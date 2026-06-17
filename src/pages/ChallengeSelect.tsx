import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { challenges } from "@/data/challenges";
import { useProgress } from "@/hooks/useProgress";
import { useProfile } from "@/hooks/useProfile";
import { computeBadges } from "@/hooks/useBadges";
import ProfileSetup from "@/components/ProfileSetup";
import { ArrowLeft, Star, Lock, Trophy, RotateCcw } from "lucide-react";

const ChallengeSelect = () => {
  const navigate = useNavigate();
  const { progress, totalCompleted, totalStars, resetProgress } = useProgress();
  const { profile, saveProfile } = useProfile();
  const badges = computeBadges(progress);
  const unlockedBadges = badges.filter((b) => b.unlocked);

  const isUnlocked = (id: number) => {
    if (id === 1) return true;
    return !!progress[id - 1]?.completed;
  };

  const handleReset = () => {
    if (window.confirm("Tem certeza que deseja apagar todo o progresso?")) {
      resetProgress();
    }
  };

  return (
    <div className="min-h-screen bg-background">

      {/* Setup modal no primeiro acesso */}
      {!profile && <ProfileSetup onSave={saveProfile} />}

      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Início
            </Button>
            {profile && (
              <div className="flex items-center gap-2">
                <span className="text-2xl">{profile.avatar}</span>
                <div>
                  <p className="text-sm font-black leading-none">Comandante {profile.name}</p>
                  <p className="text-xs text-muted-foreground">Missão Galáctica</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm font-bold">
              <Trophy className="w-4 h-4 text-accent" />
              <span>{totalCompleted}/{challenges.length}</span>
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 ml-2" />
              <span>{totalStars}/{challenges.length * 3}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="gap-2 text-muted-foreground hover:text-destructive"
            >
              <RotateCcw className="w-3 h-3" />
              Resetar
            </Button>
          </div>
        </div>
      </header>

      {/* Narrativa + progresso */}
      <div className="bg-gradient-to-r from-primary/10 via-secondary/5 to-accent/10 border-b border-border">
        <div className="container mx-auto px-4 py-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-base font-black">
                🌌 Missão: resgatar as estrelas perdidas da galáxia!
              </p>
              <p className="text-sm text-muted-foreground">
                {totalCompleted === 0
                  ? "Comece pelo Desafio 1 e desbloqueie os próximos!"
                  : totalCompleted === challenges.length
                  ? "🎉 Missão cumprida! Você resgatou todas as estrelas!"
                  : `${challenges.length - totalCompleted} desafio${challenges.length - totalCompleted > 1 ? "s" : ""} restante${challenges.length - totalCompleted > 1 ? "s" : ""} para completar a missão.`}
              </p>
            </div>

            <div className="flex items-center gap-3 min-w-[200px]">
              <div className="flex-1 bg-muted rounded-full h-3">
                <div
                  className="bg-primary rounded-full h-3 transition-all duration-500"
                  style={{ width: `${(totalCompleted / challenges.length) * 100}%` }}
                />
              </div>
              <span className="text-sm font-bold whitespace-nowrap">
                {Math.round((totalCompleted / challenges.length) * 100)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-10 max-w-6xl space-y-10">

        {/* Grid de desafios */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {challenges.map((challenge) => {
            const unlocked = isUnlocked(challenge.id);
            const prog = progress[challenge.id];
            const completed = prog?.completed;
            const stars = prog?.stars ?? 0;

            return (
              <Card
                key={challenge.id}
                className={`relative transition-all duration-200 cursor-pointer group ${
                  unlocked
                    ? completed
                      ? "border-2 border-yellow-400 hover:border-yellow-500 hover:shadow-xl hover:-translate-y-1"
                      : "border-2 border-border hover:border-primary hover:shadow-xl hover:-translate-y-1"
                    : "opacity-50 cursor-not-allowed border-2 border-dashed"
                }`}
                onClick={() => unlocked && navigate(`/desafio/${challenge.id}`)}
              >
                {/* Badge de número */}
                <div
                  className={`absolute -top-3 -left-3 w-9 h-9 rounded-full flex items-center justify-center text-sm font-black shadow-md z-10 ${
                    completed
                      ? "bg-yellow-400 text-yellow-900"
                      : unlocked
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {challenge.id}
                </div>

                <CardContent className="p-5 space-y-3">
                  <div className="flex items-start justify-between gap-2 mt-2">
                    <h3 className="font-bold text-base leading-tight">{challenge.title}</h3>
                    {!unlocked && <Lock className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />}
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                    {challenge.description}
                  </p>

                  {/* Estrelas */}
                  <div className="flex gap-1 pt-1">
                    {[1, 2, 3].map((s) => (
                      <Star
                        key={s}
                        className={`w-5 h-5 transition-all ${
                          s <= stars ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground/30"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Mini preview do grid */}
                  <MiniPreview challenge={challenge} />

                  {/* Blocos disponíveis */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {challenge.availableBlocks.slice(0, 4).map((b) => (
                      <span
                        key={b}
                        className="text-xs bg-muted px-2 py-0.5 rounded-full text-muted-foreground"
                      >
                        {b === "move" ? "→" : b === "turn_right" ? "↻" : b === "turn_left" ? "↺" : b === "loop2" ? "×2" : b === "loop3" ? "×3" : b === "loop4" ? "×4" : b === "if_obstacle" ? "SE?" : "?"}
                      </span>
                    ))}
                    {challenge.maxBlocks && (
                      <span className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full font-bold">
                        máx {challenge.maxBlocks}
                      </span>
                    )}
                  </div>

                  {unlocked && (
                    <Button
                      className={`w-full mt-2 font-bold ${
                        completed
                          ? "border-yellow-400 text-yellow-700 hover:bg-yellow-50"
                          : "bg-primary hover:bg-primary/90 shadow-md shadow-primary/30"
                      }`}
                      size="sm"
                      variant={completed ? "outline" : "default"}
                    >
                      {completed ? "⭐ Jogar Novamente" : "▶ Iniciar Desafio"}
                    </Button>
                  )}
                  {!unlocked && (
                    <p className="text-xs text-center text-muted-foreground pt-1">
                      Complete o desafio {challenge.id - 1} para desbloquear
                    </p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Conquistas */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black">
              🏅 Conquistas
            </h2>
            <span className="text-sm text-muted-foreground font-bold">
              {unlockedBadges.length}/{badges.length} desbloqueadas
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {badges.map((badge) => (
              <div
                key={badge.id}
                className={`rounded-2xl border-2 p-4 text-center space-y-2 transition-all ${
                  badge.unlocked
                    ? "border-yellow-400 bg-yellow-50 shadow-md"
                    : "border-border bg-muted/30 opacity-50"
                }`}
              >
                <div className={`text-4xl ${badge.unlocked ? "" : "grayscale"}`}>
                  {badge.emoji}
                </div>
                <p className="text-xs font-black leading-tight">{badge.title}</p>
                <p className="text-xs text-muted-foreground leading-tight">{badge.description}</p>
                {badge.unlocked && (
                  <span className="inline-block text-[10px] bg-yellow-400 text-yellow-900 font-black px-2 py-0.5 rounded-full">
                    DESBLOQUEADA
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
};

const MiniPreview = ({ challenge }: { challenge: (typeof challenges)[0] }) => {
  const size = challenge.gridSize;
  const cellSize = Math.min(32, Math.floor(160 / size));

  return (
    <div
      className="rounded-lg overflow-hidden bg-muted/40 p-1 mx-auto"
      style={{ width: size * (cellSize + 2) + 8, height: size * (cellSize + 2) + 8 }}
    >
      <div
        className="grid gap-0.5"
        style={{ gridTemplateColumns: `repeat(${size}, ${cellSize}px)` }}
      >
        {Array.from({ length: size * size }).map((_, idx) => {
          const x = idx % size;
          const y = Math.floor(idx / size);
          const isStart = x === challenge.startPosition.x && y === challenge.startPosition.y;
          const isGoal = x === challenge.goalPosition.x && y === challenge.goalPosition.y;
          const isObstacle = challenge.obstacles.some((o) => o.x === x && o.y === y);

          return (
            <div
              key={idx}
              style={{ width: cellSize, height: cellSize }}
              className={`rounded-sm flex items-center justify-center text-[8px] ${
                isStart ? "bg-primary" : isGoal ? "bg-yellow-400/80" : isObstacle ? "bg-destructive/50" : "bg-card"
              }`}
            >
              {isStart && "🚀"}
              {isGoal && "⭐"}
              {isObstacle && "🪨"}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChallengeSelect;
