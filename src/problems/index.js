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
import Problem11_ConteudoNulo from './Problem11_ConteudoNulo';
import Problem12_Fronteira from './Problem12_Fronteira';
import Problem13_IntegralDupla from './Problem13_IntegralDupla';
import Problem14_AreaGeometrica from './Problem14_AreaGeometrica';
import Problem15_VolumeConjunto from './Problem15_VolumeConjunto';
import Problem16_IntegralCosseno from './Problem16_IntegralCosseno';
import Problem17_TeoremaFubini from './Problem17_TeoremaFubini';
import Problem18_IntegralTriangulo from './Problem18_IntegralTriangulo';
import Problem19_InversaoOrdem from './Problem19_InversaoOrdem';
import Problem20_VolumeExponencial from './Problem20_VolumeExponencial';

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
        status: "available",
        component: "Problem01_CampoVetorial"
      },
      {
        id: 2,
        title: "Gradiente de Função Escalar",
        description: "Calcule o gradiente ∇f da função f(x,y,z) = x²y³ - 2xz no ponto P = (1, -1, 2).",
        tags: ["Gradiente", "Função Escalar", "Derivadas Parciais"],
        status: "available",
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
        status: "available",
        component: "Problem03_Rotacional"
      },
      {
        id: 4,
        title: "Divergente de Campo Vetorial",
        description: "Calcule o divergente div F do campo vetorial F(x,y,z) = x²i + y²j + z²k.",
        tags: ["Divergente", "Campo Vetorial", "Operadores"],
        status: "available",
        component: "Problem04_Divergente"
      },
      {
        id: 5,
        title: "Função Harmônica",
        description: "Verifique se a função φ(x,y) = ln(x² + y²) é harmônica em seu domínio.",
        tags: ["Função Harmônica", "Laplaciano", "Análise"],
        status: "available",
        component: "Problem05_Harmonica"
      },
      {
        id: 6,
        title: "Identidade Vetorial",
        description: "Identidade vetorial para div(φF) onde φ é escalar e F é vetorial.",
        tags: ["Identidades", "Divergente", "Produto"],
        status: "available",
        component: "Problem06_Identidade"
      },
      {
        id: 7,
        title: "Rotacional com Componente Z",
        description: "Calcule o rotacional do campo vetorial F(x,y,z) = xi + yj + xzk.",
        tags: ["Rotacional", "Campo Vetorial", "Componente Z"],
        status: "available",
        component: "Problem07_Rotacional2"
      },
      {
        id: 8,
        title: "Laplaciano de Função",
        description: "Calcule o Laplaciano Δφ = ∇²φ para a função φ(x,y) = arctan(x/y).",
        tags: ["Laplaciano", "Função Escalar", "Derivadas"],
        status: "available",
        component: "Problem08_Laplaciano"
      },
      {
        id: 9,
        title: "Campo Irrotacional",
        description: "Para qual valor de a o campo F(x,y,z) = (ay²)i + (2xy + z²)j + (2yz)k é irrotacional?",
        tags: ["Irrotacional", "Parâmetro", "Condição"],
        status: "available",
        component: "Problem09_Irrotacional"
      },
      {
        id: 10,
        title: "Campo Conservativo e Potencial",
        description: "Relação geométrica entre campo conservativo F e potencial V quando ∇V ≠ 0.",
        tags: ["Conservativo", "Potencial", "Geometria"],
        status: "available",
        component: "Problem10_Potencial"
      }
    ]
  },
  {
    id: 3,
    title: "Integrais Duplas e Triplas",
    period: "15/09 - 19/09",
    topics: "Integrais Duplas; Teorema de Fubini; Mudança de Variáveis; Integrais Triplas; Aplicações Geométricas",
    problems: [
      {
        id: 1,
        title: "Conteúdo Nulo em ℝ²",
        description: "Um subconjunto de ℝ² com um número finito de pontos tem conteúdo nulo?",
        tags: ["Conteúdo Nulo", "Teoria", "ℝ²"],
        status: "available",
        component: "Problem11_ConteudoNulo"
      },
      {
        id: 2,
        title: "Integração com Fronteira",
        description: "Condições para integração quando a fronteira tem conteúdo nulo.",
        tags: ["Fronteira", "Conteúdo Nulo", "Integração"],
        status: "available",
        component: "Problem12_Fronteira"
      },
      {
        id: 3,
        title: "Integral Dupla ∬(x+2y)dxdy",
        description: "Calcule a integral dupla ∬(x+2y)dxdy sobre o retângulo [1,2] × [0,1].",
        tags: ["Integral Dupla", "Retângulo", "Cálculo"],
        status: "available",
        component: "Problem13_IntegralDupla"
      },
      {
        id: 4,
        title: "Significado Geométrico de ∬1dxdy",
        description: "Qual o significado geométrico da integral ∬1dxdy sobre uma região?",
        tags: ["Área", "Geometria", "Integral Dupla"],
        status: "available",
        component: "Problem14_AreaGeometrica"
      },
      {
        id: 5,
        title: "Volume com z ≤ x + 2y",
        description: "Calcule o volume do conjunto em ℝ³ definido por 0 ≤ x ≤ 1, 0 ≤ y ≤ 1, 0 ≤ z ≤ x + 2y.",
        tags: ["Volume", "Integral Tripla", "ℝ³"],
        status: "available",
        component: "Problem15_VolumeConjunto"
      },
      {
        id: 6,
        title: "Integral ∬x cos(xy)dxdy",
        description: "Calcule ∬x cos(xy)dxdy sobre o retângulo [1,2] × [0,1].",
        tags: ["Integral Dupla", "Trigonometria", "Cosseno"],
        status: "available",
        component: "Problem16_IntegralCosseno"
      },
      {
        id: 7,
        title: "Teorema de Fubini",
        description: "Qual teorema garante que ∬f(x)g(y)dxdy pode ser calculado como produto de integrais?",
        tags: ["Fubini", "Teorema", "Separação"],
        status: "available",
        component: "Problem17_TeoremaFubini"
      },
      {
        id: 8,
        title: "Integral sobre Triângulo",
        description: "Calcule ∬ydxdy onde B é o triângulo de vértices (0,0), (1,0) e (2,1).",
        tags: ["Triângulo", "Integral Dupla", "Região"],
        status: "available",
        component: "Problem18_IntegralTriangulo"
      },
      {
        id: 9,
        title: "Inversão de Ordem",
        description: "Inverta a ordem de integração para ∫₀¹∫ₓˣ f(x,y)dydx.",
        tags: ["Inversão", "Ordem", "Limites"],
        status: "available",
        component: "Problem19_InversaoOrdem"
      },
      {
        id: 10,
        title: "Volume com z ≤ eʸ",
        description: "Volume do conjunto x ≥ 0, x ≤ y ≤ 1 e 0 ≤ z ≤ eʸ.",
        tags: ["Volume", "Exponencial", "Integral Tripla"],
        status: "available",
        component: "Problem20_VolumeExponencial"
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
  Problem11_ConteudoNulo: Problem11_ConteudoNulo,
  Problem12_Fronteira: Problem12_Fronteira,
  Problem13_IntegralDupla: Problem13_IntegralDupla,
  Problem14_AreaGeometrica: Problem14_AreaGeometrica,
  Problem15_VolumeConjunto: Problem15_VolumeConjunto,
  Problem16_IntegralCosseno: Problem16_IntegralCosseno,
  Problem17_TeoremaFubini: Problem17_TeoremaFubini,
  Problem18_IntegralTriangulo: Problem18_IntegralTriangulo,
  Problem19_InversaoOrdem: Problem19_InversaoOrdem,
  Problem20_VolumeExponencial: Problem20_VolumeExponencial,
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