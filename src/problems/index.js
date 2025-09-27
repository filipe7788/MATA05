// Importações dos componentes de problemas
import Problem01_CampoVetorial from './Problem01_CampoVetorial';
import Problem02_Gradiente from './Problem02_Gradiente';
import Problem03_Rotacional from './Problem03_Rotacional';
import Problem04_Divergente from './Problem04_Divergente';
import Problem05_Harmonica from './Problem05_Harmonica';
import Problem06_Identidade from './Problem06_Identidade';
import Problem07_Rotacional2 from './Problem07_Rotacional2';
import Problem08_Laplaciano from './Problem08_Laplaciano';
import Problem09_Irrotacional from './Problem09_Irrotacional';
import Problem10_Potencial from './Problem10_Potencial';

// Dados dos problemas organizados por semana
export const weeksData = [
  {
    id: 1,
    title: "Funções Vetoriais e Campos",
    period: "01/09 - 05/09",
    topics: "Funções Vetoriais; Campos Escalares e Vetoriais (Def., Exemplos); Operadores: Gradiente, Rotacional, Divergente",
    problems: [
      {
        id: 1,
        title: "Campo Vetorial Rotacional",
        description: "Qual descrição geométrica melhor representa o campo vetorial F(x,y) = -yi + xj no plano xy?",
        tags: ["Campo Vetorial", "Rotação", "Visualização"],
        status: "completed",
        component: "Problem01_CampoVetorial"
      },
      {
        id: 2,
        title: "Gradiente de Função Escalar",
        description: "Calcule o gradiente ∇f da função f(x,y,z) = x²y³ - 2xz no ponto P = (1, -1, 2).",
        tags: ["Gradiente", "Função Escalar", "Derivadas Parciais"],
        status: "completed",
        component: "Problem02_Gradiente"
      }
    ]
  },
  {
    id: 2,
    title: "Operadores Vetoriais",
    period: "08/09 - 12/09",
    topics: "Rotacional, Divergente, Laplaciano; Funções Harmônicas; Identidades Vetoriais; Campos Conservativos",
    problems: [
      {
        id: 3,
        title: "Rotacional de Campo Vetorial",
        description: "Calcule o rotacional rot F do campo vetorial F(x,y,z) = yzi + xzj + xyk.",
        tags: ["Rotacional", "Campo Vetorial", "Operadores"],
        status: "completed",
        component: "Problem03_Rotacional"
      },
      {
        id: 4,
        title: "Divergente de Campo Vetorial",
        description: "Calcule o divergente div F do campo vetorial F(x,y,z) = x²i + y²j + z²k.",
        tags: ["Divergente", "Campo Vetorial", "Operadores"],
        status: "completed",
        component: "Problem04_Divergente"
      },
      {
        id: 5,
        title: "Função Harmônica",
        description: "Verifique se a função φ(x,y) = ln(x² + y²) é harmônica em seu domínio.",
        tags: ["Função Harmônica", "Laplaciano", "Análise"],
        status: "completed",
        component: "Problem05_Harmonica"
      },
      {
        id: 6,
        title: "Identidade Vetorial",
        description: "Identidade vetorial para div(φF) onde φ é escalar e F é vetorial.",
        tags: ["Identidades", "Divergente", "Produto"],
        status: "completed",
        component: "Problem06_Identidade"
      },
      {
        id: 7,
        title: "Rotacional com Componente Z",
        description: "Calcule o rotacional do campo vetorial F(x,y,z) = xi + yj + xzk.",
        tags: ["Rotacional", "Campo Vetorial", "Componente Z"],
        status: "completed",
        component: "Problem07_Rotacional2"
      },
      {
        id: 8,
        title: "Laplaciano de Função",
        description: "Calcule o Laplaciano Δφ = ∇²φ para a função φ(x,y) = arctan(x/y).",
        tags: ["Laplaciano", "Função Escalar", "Derivadas"],
        status: "completed",
        component: "Problem08_Laplaciano"
      },
      {
        id: 9,
        title: "Campo Irrotacional",
        description: "Para qual valor de a o campo F(x,y,z) = (ay²)i + (2xy + z²)j + (2yz)k é irrotacional?",
        tags: ["Irrotacional", "Parâmetro", "Condição"],
        status: "completed",
        component: "Problem09_Irrotacional"
      },
      {
        id: 10,
        title: "Campo Conservativo e Potencial",
        description: "Relação geométrica entre campo conservativo F e potencial V quando ∇V ≠ 0.",
        tags: ["Conservativo", "Potencial", "Geometria"],
        status: "completed",
        component: "Problem10_Potencial"
      }
    ]
  }
];

// Mapeamento dos componentes de problemas
export const problemComponents = {
  Problem01_CampoVetorial: Problem01_CampoVetorial,
  Problem02_Gradiente: Problem02_Gradiente,
  Problem03_Rotacional: Problem03_Rotacional,
  Problem04_Divergente: Problem04_Divergente,
  Problem05_Harmonica: Problem05_Harmonica,
  Problem06_Identidade: Problem06_Identidade,
  Problem07_Rotacional2: Problem07_Rotacional2,
  Problem08_Laplaciano: Problem08_Laplaciano,
  Problem09_Irrotacional: Problem09_Irrotacional,
  Problem10_Potencial: Problem10_Potencial,
  // Adicione novos componentes aqui conforme forem criados
};

// Função helper para obter o componente de um problema
export const getProblemComponent = (componentName) => {
  return problemComponents[componentName] || null;
};

// Função helper para adicionar novos problemas
export const addProblem = (weekId, problemData) => {
  const week = weeksData.find(w => w.id === weekId);
  if (week) {
    const newId = Math.max(...weeksData.flatMap(w => w.problems.map(p => p.id))) + 1;
    week.problems.push({
      id: newId,
      ...problemData
    });
  }
};

// Função helper para marcar problema como completo
export const markProblemCompleted = (problemId) => {
  for (const week of weeksData) {
    const problem = week.problems.find(p => p.id === problemId);
    if (problem) {
      problem.status = 'completed';
      break;
    }
  }
};

// Função helper para desbloquear problema
export const unlockProblem = (problemId) => {
  for (const week of weeksData) {
    const problem = week.problems.find(p => p.id === problemId);
    if (problem) {
      problem.status = 'available';
      break;
    }
  }
};