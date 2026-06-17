# 🚀 Blocos para Todos

Plataforma inclusiva e gratuita para ensinar **pensamento computacional** a crianças através de desafios visuais com programação em blocos. O aluno monta um programa arrastando blocos coloridos e vê um foguete executar os comandos em tempo real num grid animado.

> Feita para escolas públicas. Sem cadastro, sem anúncios, 100% gratuita.

---

## ✨ Funcionalidades

- 🎮 **10 desafios progressivos** — do básico (mover) até loops e condicionais
- 🧱 **Editor drag-and-drop** — arraste, reordene e remova blocos com mouse ou teclado
- 🚀 **Visualização animada** — foguete se move no grid passo a passo
- 🔁 **Blocos de repetição** — `×2`, `×3`, `×4` ensinam o conceito de loop
- 🤔 **Bloco condicional** — `SE?` executa o próximo bloco só se houver obstáculo à frente
- 🔊 **Narração por voz** — instruções em português via Web Speech API
- ⭐ **Sistema de estrelas** — 1 a 3 estrelas por eficiência na solução
- 💾 **Progresso salvo** — localStorage persiste estrelas e desafios completados
- ♿ **Acessibilidade** — alto contraste, atalhos de teclado, aria-labels

---

## 🖥️ Pré-requisitos

- [Node.js](https://nodejs.org/) 18 ou superior
- npm (já vem com o Node.js)

---

## 🚀 Como rodar localmente

```sh
# 1. Clone o repositório
git clone https://github.com/SouzaDiog0/situacao_problema_1.git
cd situacao_problema_1

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev
```

Acesse **http://localhost:5173** no navegador.

### Scripts disponíveis

| Comando | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento com hot-reload |
| `npm run build` | Gera a build de produção em `/dist` |
| `npm run preview` | Visualiza a build de produção localmente |
| `npm run lint` | Verifica erros de código com ESLint |

---

## 📁 Estrutura do projeto

```
blocos-projeto/
├── public/                  # Arquivos estáticos
├── src/
│   ├── components/
│   │   ├── BlockEditor.tsx  # Editor de blocos (paleta + programa)
│   │   ├── Canvas.tsx       # Grid animado com o foguete
│   │   ├── InstructionsPanel.tsx  # Painel lateral de instruções
│   │   └── ui/              # Componentes base (shadcn/ui)
│   ├── data/
│   │   └── challenges.ts    # Definição dos 10 desafios e tipos
│   ├── hooks/
│   │   ├── useProgress.ts   # Progresso salvo no localStorage
│   │   └── useSpeech.ts     # Narração via Web Speech API
│   ├── pages/
│   │   ├── Index.tsx        # Landing page
│   │   ├── ChallengeSelect.tsx  # Tela de seleção de desafios
│   │   ├── Challenge.tsx    # Tela do desafio (jogo)
│   │   └── NotFound.tsx     # Página 404
│   ├── App.tsx              # Roteamento principal
│   └── index.css            # Tema global e variáveis CSS
├── tailwind.config.ts       # Configuração do Tailwind
└── vite.config.ts           # Configuração do Vite
```

---

## 🧱 Blocos disponíveis

| Bloco | ID | Cor | Descrição |
|---|---|---|---|
| Mover para Frente | `move` | 🔵 Azul | Move o foguete uma casa na direção atual |
| Girar à Direita | `turn_right` | 🟢 Verde | Gira 90° para a direita |
| Girar à Esquerda | `turn_left` | 🟣 Roxo | Gira 90° para a esquerda |
| Esperar 1s | `wait` | 🟡 Amarelo | Pausa a execução por 1 segundo |
| Repetir 2× | `loop2` | 🟠 Laranja | Executa o próximo bloco 2 vezes |
| Repetir 3× | `loop3` | 🟠 Laranja | Executa o próximo bloco 3 vezes |
| Repetir 4× | `loop4` | 🟠 Laranja | Executa o próximo bloco 4 vezes |
| Se Obstáculo | `if_obstacle` | 🔴 Vermelho | Executa o próximo bloco **somente** se houver obstáculo à frente |

> **Loop e Se Obstáculo** sempre se aplicam ao bloco imediatamente seguinte na sequência.

---

## 🗺️ Os 10 desafios

| # | Nome | Grid | Novidade introduzida |
|---|---|---|---|
| 1 | Primeiro Passo | 5×5 | Bloco mover |
| 2 | Jornada Completa | 5×5 | Sequência de movimentos |
| 3 | Primeira Curva | 5×5 | Girar à direita |
| 4 | Desvio Necessário | 5×5 | Girar à esquerda + obstáculos |
| 5 | Labirinto Simples | 6×6 | Planejamento de rotas |
| 6 | Poder da Repetição | 6×6 | Loop (limite de 4 blocos) |
| 7 | Espiral | 6×6 | Combinação de giros |
| 8 | Eficiência Máxima | 6×6 | Loops + limite de 6 blocos |
| 9 | Grande Labirinto | 7×7 | Labirinto complexo |
| 10 | Mestre dos Blocos | 7×7 | Todos os blocos (limite de 10) |

---

## ➕ Como adicionar um novo desafio

Edite o arquivo `src/data/challenges.ts` e adicione um objeto ao array `challenges`:

```ts
{
  id: 11,                          // ID único (sequencial)
  title: "Nome do Desafio",
  description: "Descrição curta do objetivo para a criança.",
  hint: "Dica de como resolver.",
  gridSize: 6,                     // Tamanho do grid (ex: 6 = grid 6×6)
  startPosition: { x: 0, y: 0 },  // Posição inicial do foguete
  startDirection: 0,               // 0=direita, 90=baixo, 180=esquerda, 270=cima
  goalPosition: { x: 5, y: 5 },   // Onde a estrela fica
  obstacles: [                     // Lista de posições bloqueadas
    { x: 2, y: 2 },
  ],
  availableBlocks: ["move", "turn_right", "turn_left"],  // Blocos liberados
  maxBlocks: 8,                    // Opcional: limite de blocos
  solution: ["move", "turn_right", "move"],  // Uma solução válida (usada para calcular estrelas)
  voiceInstruction: "Texto narrado quando o aluno clica em Ouvir.",
}
```

> O sistema de estrelas compara `blocks.length / solution.length`:
> - ≤ 1,0× → ⭐⭐⭐
> - ≤ 1,5× → ⭐⭐
> - \> 1,5× → ⭐

---

## ⌨️ Atalhos de teclado

| Tecla | Ação |
|---|---|
| `Espaço` ou `Enter` | Executar / Parar |
| `R` ou `Escape` | Reiniciar |
| `Tab` | Navegar entre blocos da paleta |
| `← →` | Navegar entre blocos do programa |
| `Ctrl + ← →` | Mover bloco para a esquerda/direita |
| `Delete` / `Backspace` | Remover bloco selecionado |

---

## 🛠️ Stack tecnológica

| Tecnologia | Uso |
|---|---|
| [React 18](https://react.dev/) | Interface |
| [TypeScript](https://www.typescriptlang.org/) | Tipagem estática |
| [Vite](https://vitejs.dev/) | Build e dev server |
| [Tailwind CSS](https://tailwindcss.com/) | Estilização |
| [shadcn/ui](https://ui.shadcn.com/) | Componentes base (Radix UI) |
| [React Router v6](https://reactrouter.com/) | Roteamento |
| [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) | Narração de voz |
| [Nunito](https://fonts.google.com/specimen/Nunito) | Fonte arredondada e legível |

---

## ♿ Acessibilidade

- **Narração por voz** em português (pt-BR) via Web Speech API
- **Alto contraste** ativável pelo botão 👁 no cabeçalho
- **Navegação por teclado** em todos os elementos interativos
- **aria-labels** em blocos e botões para leitores de tela
- **Fonte Nunito** — alta legibilidade para crianças e pessoas com dislexia

---

## 🤝 Como contribuir

1. Faça um fork do repositório
2. Crie uma branch: `git checkout -b minha-melhoria`
3. Faça suas alterações e commit: `git commit -m "Descrição da mudança"`
4. Envie para o fork: `git push origin minha-melhoria`
5. Abra um Pull Request

---

## 📄 Licença

Projeto de código aberto para fins educacionais.
