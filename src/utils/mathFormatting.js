// Utilitários para formatação matemática - Preferência: SEMPRE usar markdown estruturado
// Esta configuração deve ser mantida para todos os problemas matemáticos do projeto

export const mathStyles = {
  // ESTILO LATEX - Container principal dos cálculos
  calculationsContainer: {
    color: '#2c3e50', 
    fontSize: '1rem', 
    lineHeight: '2'
  },

  // ESTILO LATEX - Card branco elegante
  contentCard: {
    background: 'white', 
    padding: '32px', 
    borderRadius: '12px', 
    border: '1px solid #e9ecef',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    fontFamily: 'Computer Modern, Times, serif'
  },

  // ESTILO LATEX - Títulos das seções
  sectionTitle: {
    color: '#2c3e50', 
    marginBottom: '20px',
    fontSize: '1.1rem',
    fontWeight: '600'
  },

  // ESTILO LATEX - Caixas de fórmulas elegantes
  formulaBox: {
    background: '#f8f9fa', 
    padding: '24px', 
    borderRadius: '8px',
    border: '1px solid #dee2e6',
    marginBottom: '16px'
  },

  // ESTILO LATEX - Linha de fórmula com alinhamento
  formulaLine: {
    display: 'flex', 
    alignItems: 'center', 
    fontSize: '1.05rem',
    padding: '8px 0'
  },

  // ESTILO LATEX - Destaque para resultados com bordas arredondadas
  highlightResult: (color) => ({
    background: color, 
    color: 'white', 
    padding: '4px 12px', 
    borderRadius: '20px',
    fontWeight: 'bold',
    fontSize: '1.1rem'
  }),

  // ESTILO LATEX - Resultado final com gradiente elegante
  finalResult: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
    color: 'white',
    padding: '28px', 
    borderRadius: '12px',
    textAlign: 'center',
    border: '2px solid #e9ecef'
  },

  // ESTILO LATEX - Função matemática centralizada
  functionDisplay: {
    fontSize: '1.1rem', 
    marginBottom: '16px',
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#495057'
  },

  // ESTILO LATEX - Símbolos matemáticos
  mathSymbol: {
    minWidth: '60px', 
    fontWeight: 'bold',
    fontSize: '1.1rem'
  },

  // ESTILO LATEX - Processo de derivação
  derivationProcess: {
    fontStyle: 'italic', 
    color: '#6c757d'
  },

  // ESTILO LATEX - Espaçamento entre operações
  mathSpacing: {
    margin: '0 8px'
  }
};

// Cores padrão para destacar componentes do gradiente
export const gradientColors = {
  x: '#dc3545', // Vermelho para componente x
  y: '#198754', // Verde para componente y  
  z: '#0d6efd', // Azul para componente z
  formula: '#d63384' // Rosa para fórmulas
};

// Template para cálculos de gradiente
export const GradientCalculationTemplate = ({ 
  functionLatex, 
  partialDerivatives, 
  point, 
  evaluations, 
  finalResult 
}) => {
  return (
    <div style={mathStyles.calculationsContainer}>
      <div style={mathStyles.contentCard}>
        <h4 style={{ ...mathStyles.sectionTitle, marginTop: '0' }}>
          1. Calculando as derivadas parciais:
        </h4>
        
        <div style={mathStyles.formulaBox}>
          {partialDerivatives.map((derivative, index) => (
            <div key={index} style={mathStyles.formulaLine}>
              <strong>{derivative.symbol}</strong> = {derivative.process} = 
              <span style={{ color: gradientColors.formula }}> {derivative.result}</span>
            </div>
          ))}
        </div>

        <h4 style={mathStyles.sectionTitle}>
          2. Avaliando no ponto P{point}:
        </h4>
        
        <div style={mathStyles.formulaBox}>
          {evaluations.map((evaluation, index) => (
            <div key={index} style={{ marginBottom: '12px' }}>
              <strong>{evaluation.symbol}</strong> = {evaluation.calculation} = 
              <span style={mathStyles.highlightResult(evaluation.color)}>
                {evaluation.result}
              </span>
            </div>
          ))}
        </div>

        <h4 style={mathStyles.sectionTitle}>
          3. Resultado final:
        </h4>
        
        <div style={mathStyles.finalResult}>
          {finalResult}
        </div>
      </div>
    </div>
  );
};

// Função helper para criar cálculos de gradiente formatados
export const createGradientCalculation = (func, point, components) => {
  return {
    functionLatex: func,
    partialDerivatives: [
      {
        symbol: '∂f/∂x',
        process: `∂(${func})/∂x`,
        result: components.fx_formula
      },
      {
        symbol: '∂f/∂y', 
        process: `∂(${func})/∂y`,
        result: components.fy_formula
      },
      {
        symbol: '∂f/∂z',
        process: `∂(${func})/∂z`, 
        result: components.fz_formula
      }
    ],
    point: `(${point.x}, ${point.y}, ${point.z})`,
    evaluations: [
      {
        symbol: '∂f/∂x',
        calculation: components.fx_calculation,
        result: components.fx_result,
        color: gradientColors.x
      },
      {
        symbol: '∂f/∂y',
        calculation: components.fy_calculation, 
        result: components.fy_result,
        color: gradientColors.y
      },
      {
        symbol: '∂f/∂z',
        calculation: components.fz_calculation,
        result: components.fz_result, 
        color: gradientColors.z
      }
    ],
    finalResult: components.finalResult
  };
};

// CONFIGURAÇÃO GLOBAL: Esta preferência deve ser usada em TODOS os problemas matemáticos
export const MATH_DISPLAY_PREFERENCE = {
  format: 'latex_style', // PREFERÊNCIA PERMANENTE: Visual similar ao LaTeX
  useColorCoding: true,
  useFormulaBoxes: true,
  highlightResults: true,
  showStepByStep: true,
  fontFamily: 'Computer Modern, Times, serif', // Fonte estilo LaTeX
  fontSize: '1rem',
  lineHeight: '2',
  spacing: 'generous', // Espaçamento generoso como no LaTeX
  backgroundColor: 'white',
  borderStyle: 'elegant', // Bordas elegantes
  
  // REGRAS IMPORTANTES:
  // 1. SEMPRE usar renderização KaTeX para fórmulas matemáticas
  // 2. NUNCA incluir seções de múltipla escolha
  // 3. Focar na explicação e visualização do conceito
  // 4. Usar notação matemática adequada: \mathbf{} para vetores, \nabla para gradiente, etc.
  removeMultipleChoice: true, // NUNCA adicionar opções A, B, C, D, E
  focusOnConcept: true // Sempre explicar o conceito ao invés de testar conhecimento
};

export default {
  mathStyles,
  gradientColors,
  GradientCalculationTemplate,
  createGradientCalculation,
  MATH_DISPLAY_PREFERENCE
};
