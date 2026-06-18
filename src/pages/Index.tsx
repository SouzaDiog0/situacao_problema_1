import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Accessibility, Blocks, Sparkles, Volume2, Eye, Keyboard } from "lucide-react";
import { useState } from "react";

const Index = () => {
  const navigate = useNavigate();
  const [highContrast, setHighContrast] = useState(false);

  const toggleHighContrast = () => {
    setHighContrast(!highContrast);
    document.body.classList.toggle("high-contrast");
  };

  return (
    <div className="min-h-screen">
      {/* Accessibility Bar */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <span className="font-black text-xl tracking-tight select-none">
            <span className="text-primary">Edu</span><span className="text-secondary">Blox</span>
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleHighContrast}
            className="gap-2"
            aria-label="Alternar alto contraste"
          >
            <Eye className="w-4 h-4" />
            Alto Contraste
          </Button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary font-medium text-sm animate-fade-in">
              <Sparkles className="w-4 h-4" />
              100% Gratuito e Inclusivo
            </div>

            <div className="text-6xl md:text-8xl font-black tracking-tight animate-fade-in">
              <span className="text-primary">Edu</span><span className="text-secondary">Blox</span>
            </div>

            <h1 className="text-2xl md:text-4xl font-bold leading-tight animate-slide-up">
              Aprenda lógica{" "}
              <span className="text-primary">brincando</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Plataforma inclusiva para ensinar pensamento computacional através de desafios 
              visuais e divertidos. Feita para todos aprenderem.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button
                size="lg"
                className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all"
                onClick={() => navigate("/desafios")}
              >
                Iniciar Agora
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 gap-2"
                onClick={() => navigate("/professor")}
              >
                👩‍🏫 Sou Professor
              </Button>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-3xl animate-bounce-gentle" />
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-secondary/20 rounded-full blur-3xl animate-bounce-gentle" style={{ animationDelay: "1s" }} />
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Recursos Inclusivos
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Pensados para que todos possam aprender, sem barreiras
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="border-2 hover:border-primary transition-all hover:shadow-lg">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Blocks className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Blocos Visuais</h3>
                <p className="text-muted-foreground">
                  Aprenda programação usando blocos coloridos e intuitivos. 
                  Arraste, solte e veja o resultado na hora!
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-secondary transition-all hover:shadow-lg">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
                  <Volume2 className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-xl font-bold">Narração de Voz</h3>
                <p className="text-muted-foreground">
                  Todas as instruções podem ser ouvidas. Perfeito para quem 
                  prefere aprender ouvindo ou tem dificuldade de leitura.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-accent transition-all hover:shadow-lg">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                  <Keyboard className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-bold">Navegação por Teclado</h3>
                <p className="text-muted-foreground">
                  Use apenas o teclado para navegar e programar. 
                  Totalmente acessível para todos.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Accessibility Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1 space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary font-medium text-sm">
                  <Accessibility className="w-4 h-4" />
                  Acessibilidade Universal
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold">
                  Feito para <span className="text-primary">todos</span> aprenderem
                </h2>
                
                <p className="text-muted-foreground text-lg">
                  Nossa plataforma foi desenvolvida pensando em alunos com diferentes 
                  necessidades. Seja deficiência visual, auditiva ou cognitiva, todos 
                  podem aprender pensamento computacional.
                </p>

                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-success/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-success rounded-full" />
                    </div>
                    <span>Alto contraste e fontes ajustáveis para baixa visão</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-success/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-success rounded-full" />
                    </div>
                    <span>Legendas e feedback visual para deficiência auditiva</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-success/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-success rounded-full" />
                    </div>
                    <span>Interface simplificada e instruções claras</span>
                  </li>
                </ul>
              </div>

              <div className="flex-1">
                <div className="bg-card rounded-2xl p-8 shadow-lg border-2 border-border">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-lg">
                      <Volume2 className="w-8 h-8 text-primary" />
                      <span className="font-medium">Leitura de Tela</span>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-secondary/5 rounded-lg">
                      <Eye className="w-8 h-8 text-secondary" />
                      <span className="font-medium">Alto Contraste</span>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-accent/5 rounded-lg">
                      <Keyboard className="w-8 h-8 text-accent" />
                      <span className="font-medium">Atalhos de Teclado</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary via-primary/90 to-info text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold">
              Comece sua jornada agora!
            </h2>
            <p className="text-xl opacity-90">
              Totalmente gratuito, sem necessidade de cadastro. 
              Perfeito para escolas públicas.
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              className="text-lg px-8 py-6 shadow-xl hover:shadow-2xl"
              onClick={() => navigate("/desafios")}
            >
              Ir para os Desafios
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p className="font-black text-lg">
            <span className="text-primary">Edu</span><span className="text-secondary">Blox</span>
          </p>
          <p className="text-sm mt-1">Plataforma inclusiva de pensamento computacional · 2025</p>
          <p className="text-xs mt-1 opacity-60">Democratizando o ensino de lógica para todos</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
