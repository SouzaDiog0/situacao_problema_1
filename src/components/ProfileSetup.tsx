import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AVATARS } from "@/hooks/useProfile";

interface ProfileSetupProps {
  onSave: (name: string, avatar: string) => void;
}

const ProfileSetup = ({ onSave }: ProfileSetupProps) => {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(AVATARS[0]);

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-3xl p-8 max-w-sm w-full shadow-2xl border-2 border-border space-y-6 animate-slide-up">

        {/* Preview */}
        <div className="text-center space-y-2">
          <div className="text-6xl animate-bounce">{avatar}</div>
          <h2 className="text-2xl font-black">Missão Galáctica!</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Escolha seu avatar e o nome do seu Comandante Espacial para começar a aventura!
          </p>
        </div>

        {/* Avatar picker */}
        <div>
          <p className="text-sm font-bold mb-2">Escolha seu avatar:</p>
          <div className="grid grid-cols-3 gap-2">
            {AVATARS.map((a) => (
              <button
                key={a}
                onClick={() => setAvatar(a)}
                className={`text-4xl py-3 rounded-2xl transition-all border-2 ${
                  avatar === a
                    ? "border-primary bg-primary/10 scale-110 shadow-lg"
                    : "border-border hover:border-primary/50 hover:bg-muted/50"
                }`}
              >
                {a}
              </button>
            ))}
          </div>
        </div>

        {/* Name input */}
        <div className="space-y-2">
          <label className="text-sm font-bold">Nome do Comandante:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSave(name, avatar)}
            placeholder="Ex: Ana, João, Astronauta..."
            maxLength={20}
            autoFocus
            className="w-full border-2 border-border rounded-xl px-4 py-3 text-base font-semibold
              focus:outline-none focus:border-primary bg-background transition-colors"
          />
        </div>

        <Button
          className="w-full text-base font-bold py-6 bg-green-500 hover:bg-green-400 border-b-4 border-green-700 gap-2"
          onClick={() => onSave(name, avatar)}
        >
          🚀 Iniciar Missão!
        </Button>
      </div>
    </div>
  );
};

export default ProfileSetup;
