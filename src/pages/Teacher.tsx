import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Play } from "lucide-react";
import { challenges, PILLAR_LABELS, PILLAR_COLORS, PILLAR_EMOJI, type Pillar } from "@/data/challenges";

const PILLARS: { id: Pillar; title: string; description: string; example: string }[] = [
  {
    id: "algoritmos",
    title: "Algoritmos",
    description: "Sequência ordenada de instruções para resolver um problema. O aluno aprende que o computador executa os comandos exatamente na ordem em que foram escritos.",
    example: "Desafios 1 a 4 — o aluno cria uma sequência de blocos para levar o foguete até a estrela.",
  },
  {
    id: "decomposicao",
    title: "Decomposição",
    description: "Dividir um problema complexo em partes menores e mais simples. O aluno percebe que um labirinto pode ser resolvido passo a passo.",
    example: "Desafios 3 a 5 — o aluno divide o trajeto em segmentos: andar, girar, andar.",
  },
  {
    id: "padroes",
    title: "Reconhecimento de Padrões",
    description: "Identificar repetições e regularidades para resolver problemas de forma mais eficiente. Diretamente ligado ao conceito de loop na programação.",
    example: "Desafios 6 e 8 — o aluno percebe que 'mover 4 vezes' pode ser substituído por 'Repetir ×4 + Mover'.",
  },
  {
    id: "abstracao",
    title: "Abstração",
    description: "Focar no que é essencial e ignorar detalhes irrelevantes. O aluno aprende a representar ações repetitivas com um único bloco de loop.",
    example: "Desafios 6, 8 e 10 — o limite de blocos força o aluno a pensar em soluções mais abstratas e compactas.",
  },
];

const HOW_TO_STEPS = [
  {
    num: "1",
    title: "Apresente a plataforma",
    desc: "Projete o site no datashow. Mostre a tela inicial e explique brevemente o objetivo: 'vamos programar um foguete usando blocos!'",
  },
  {
    num: "2",
    title: "Faça o Desafio 1 juntos",
    desc: "Resolva o primeiro desafio com a turma em tempo real. Clique nos blocos e pressione Executar! para que todos vejam o foguete se mover.",
  },
  {
    num: "3",
    title: "Deixe os alunos explorarem",
    desc: "A partir do Desafio 2, os alunos resolvem individualmente ou em duplas. Os desafios são desbloqueados progressivamente — não é possível pular etapas.",
  },
  {
    num: "4",
    title: "Discuta os conceitos em grupo",
    desc: "Após cada bloco de desafios, pause e pergunte: 'Por que precisamos girar antes de andar?' ou 'Como o bloco Repetir ajudou?'",
  },
];

const Teacher = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">

      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Início
          </Button>
          <div>
            <h1 className="text-lg font-black">👩‍🏫 Área do Professor</h1>
            <p className="text-xs text-muted-foreground">Guia pedagógico para uso em sala de aula</p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-10 max-w-4xl space-y-12">

        {/* Hero */}
        <section className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl p-8 space-y-4">
          <h2 className="text-2xl font-black">O que é esta plataforma?</h2>
          <p className="text-base text-muted-foreground leading-relaxed max-w-2xl">
            Uma ferramenta <strong>gratuita, sem cadastro e sem instalação</strong> para ensinar os
            quatro pilares do Pensamento Computacional previstos na BNCC — por meio de desafios
            visuais com programação em blocos. Indicada para alunos do 6º ao 9º ano.
          </p>
          <ul className="space-y-2 text-sm">
            {[
              "Não exige conhecimento prévio em programação — nem do aluno, nem do professor",
              "Funciona em qualquer navegador com acesso à internet",
              "Progresso salvo automaticamente no dispositivo",
              "Recursos de acessibilidade: narração por voz, legendas, alto contraste e teclado",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-secondary font-bold mt-0.5">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <Button
            size="lg"
            className="gap-2 mt-2 bg-green-500 hover:bg-green-400 border-b-4 border-green-700 font-bold"
            onClick={() => navigate("/desafios")}
          >
            <Play className="w-4 h-4" />
            Ir para os Desafios
          </Button>
        </section>

        {/* Como usar */}
        <section className="space-y-5">
          <h2 className="text-xl font-black">📋 Como usar em sala de aula</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {HOW_TO_STEPS.map((step) => (
              <Card key={step.num} className="border-2">
                <CardContent className="p-5 flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-black text-lg flex-shrink-0">
                    {step.num}
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* 4 pilares */}
        <section className="space-y-5">
          <div>
            <h2 className="text-xl font-black">🧠 Os 4 pilares do Pensamento Computacional</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Cada desafio foi mapeado para os pilares da BNCC. Os badges aparecem na tela do desafio.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {PILLARS.map((p) => (
              <Card key={p.id} className="border-2">
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{PILLAR_EMOJI[p.id]}</span>
                    <span className={`text-sm font-bold px-3 py-1 rounded-full ${PILLAR_COLORS[p.id]}`}>
                      {PILLAR_LABELS[p.id]}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed">{p.description}</p>
                  <p className="text-xs text-muted-foreground bg-muted/50 rounded-lg p-2">
                    <strong>Na plataforma:</strong> {p.example}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Mapa desafios × pilares */}
        <section className="space-y-5">
          <h2 className="text-xl font-black">🗺️ Mapa de desafios e pilares</h2>
          <div className="overflow-x-auto rounded-2xl border-2 border-border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-3 font-bold">Desafio</th>
                  <th className="text-center p-3 font-bold">⚙️ Alg.</th>
                  <th className="text-center p-3 font-bold">🧩 Decomp.</th>
                  <th className="text-center p-3 font-bold">🔁 Padrões</th>
                  <th className="text-center p-3 font-bold">💡 Abstr.</th>
                </tr>
              </thead>
              <tbody>
                {challenges.map((c, i) => (
                  <tr key={c.id} className={i % 2 === 0 ? "bg-card" : "bg-muted/20"}>
                    <td className="p-3 font-medium">
                      {c.id}. {c.title}
                    </td>
                    {(["algoritmos", "decomposicao", "padroes", "abstracao"] as Pillar[]).map((p) => (
                      <td key={p} className="text-center p-3">
                        {c.pillars.includes(p) ? (
                          <span className="text-base">{PILLAR_EMOJI[p]}</span>
                        ) : (
                          <span className="text-muted-foreground/30">—</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Acessibilidade */}
        <section className="space-y-5">
          <h2 className="text-xl font-black">♿ Recursos de acessibilidade</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                emoji: "🔊",
                title: "Narração por voz",
                desc: "Todas as instruções podem ser ouvidas em português. Ideal para alunos com dificuldade de leitura ou dislexia. Clique em 'Ouvir' no painel de instruções.",
              },
              {
                emoji: "💬",
                title: "Legendas visuais",
                desc: "O texto narrado aparece em legenda na tela. Útil para alunos com deficiência auditiva ou em ambientes sem som.",
              },
              {
                emoji: "👁️",
                title: "Alto contraste",
                desc: "Ative pelo ícone 👁 no cabeçalho. Aumenta o contraste de cores para alunos com baixa visão.",
              },
              {
                emoji: "⌨️",
                title: "Navegação por teclado",
                desc: "A plataforma funciona inteiramente com teclado. Espaço executa, R reinicia, setas navegam entre blocos.",
              },
            ].map((item) => (
              <Card key={item.title} className="border-2">
                <CardContent className="p-5 flex gap-4">
                  <span className="text-3xl flex-shrink-0">{item.emoji}</span>
                  <div className="space-y-1">
                    <h3 className="font-bold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Dicas pedagógicas */}
        <section className="space-y-5">
          <h2 className="text-xl font-black">💡 Dicas pedagógicas</h2>
          <div className="space-y-3">
            {[
              { titulo: "Desafio 6 — introduza o conceito de loop", dica: "Antes de abrir o desafio, pergunte: 'Se você precisasse bater palmas 10 vezes, escreveria 10 instruções diferentes ou diria apenas uma vez: bata palmas 10 vezes?' Isso prepara o raciocínio para o bloco Repetir." },
              { titulo: "Trabalhe em duplas", dica: "Um aluno pensa em voz alta ('vou virar à direita e andar 2 casas') enquanto o outro monta os blocos. Isso reforça a decomposição verbal do problema." },
              { titulo: "Errar faz parte", dica: "O foguete explode quando bate em obstáculo e mostra qual bloco errou. Use esse momento para perguntar: 'O que aconteceu? Que bloco precisamos mudar?'" },
              { titulo: "Perguntas para discussão", dica: "'Existe mais de uma solução para esse desafio?' 'Qual usa menos blocos?' 'O que mudaria se a estrela estivesse em outro lugar?'" },
            ].map((item) => (
              <div key={item.titulo} className="bg-amber-50 border border-amber-200 rounded-2xl p-4 space-y-1">
                <p className="font-bold text-amber-900 text-sm">💡 {item.titulo}</p>
                <p className="text-sm text-amber-800 leading-relaxed">{item.dica}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA final */}
        <section className="text-center py-6 space-y-4">
          <p className="text-lg font-bold">Pronto para começar?</p>
          <Button
            size="lg"
            className="gap-2 bg-green-500 hover:bg-green-400 border-b-4 border-green-700 font-bold text-base px-8"
            onClick={() => navigate("/desafios")}
          >
            <Play className="w-5 h-5" />
            Abrir os Desafios
          </Button>
        </section>

      </div>
    </div>
  );
};

export default Teacher;
