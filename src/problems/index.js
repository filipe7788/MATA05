// Importações dos componentes de problemas
import Problem01_CampoVetorial from './Problem01_CampoVetorial';
import Problem02_Gradiente from './Problem02_Gradiente';

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
  }
];

// Mapeamento dos componentes de problemas
export const problemComponents = {
  Problem01_CampoVetorial: Problem01_CampoVetorial,
  Problem02_Gradiente: Problem02_Gradiente,
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