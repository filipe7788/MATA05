import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { MathInline, MathSection, MathResult, MathDerivation } from '../components/MathRenderer';

// Componente específico para Função Harmônica (problema 5)
const Problem05_Harmonica = ({ onBack }) => {
  const [showingSteps, setShowingSteps] = useState(false);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '16px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Botão de Voltar */}
        <div style={{
          position: 'sticky',
          top: '16px',
          zIndex: 1000,
          marginBottom: '16px'
        }}>
          <button
            onClick={onBack}
            style={{
              background: 'linear-gradient(135deg, #22c55e, #10b981)',
              padding: '12px 24px',
              borderRadius: '50px',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontSize: '1rem',
              fontWeight: '600',
              boxShadow: '0 8px 25px rgba(34, 197, 94, 0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backdropFilter: 'blur(10px)'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 12px 35px rgba(34, 197, 94, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 8px 25px rgba(34, 197, 94, 0.3)';
            }}
          >
            <span style={{ fontSize: '1.2rem' }}>←</span>
            Voltar ao Dashboard
          </button>
        </div>

        {/* Header */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px 16px 0 0',
          padding: '24px',
          color: 'white'
        }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '8px' }}>
            Questão 5: Função Harmônica
          </h1>
          <p style={{ opacity: 0.9 }}>Verificação se <MathInline>{"\\varphi(x,y) = \\ln(x^2 + y^2)"}</MathInline> é harmônica</p>
        </div>

        {/* Conteúdo principal */}
        <div style={{
          background: 'white',
          borderRadius: '0 0 16px 16px',
          padding: '24px'
        }}>
          {/* Questão */}
          <div style={{
            background: '#dbeafe',
            borderLeft: '4px solid #3b82f6',
            padding: '16px',
            marginBottom: '24px',
            borderRadius: '0 8px 8px 0'
          }}>
            <h3 style={{ fontWeight: 'bold', color: '#1e40af', marginBottom: '8px' }}>
              📋 Questão:
            </h3>
            <p style={{ color: '#1e40af' }}>
              A função <MathInline>{"\\varphi(x,y) = \\ln(x^2 + y^2)"}</MathInline> é harmônica em seu domínio <MathInline>{"\\mathbb{R}^2 \\setminus \\{(0,0)\\}"}</MathInline>?
            </p>
          </div>

          {/* Definição */}
          <div style={{
            background: '#f3f4f6',
            padding: '20px',
            borderRadius: '8px',
            textAlign: 'center',
            marginBottom: '24px'
          }}>
            <div style={{ marginBottom: '12px' }}>
              <strong>Função:</strong> <MathInline>{"\\varphi(x,y) = \\ln(x^2 + y^2)"}</MathInline>
            </div>
            <div>
              <strong>Condição Harmônica:</strong> <MathInline>{"\\Delta\\varphi = \\nabla^2\\varphi = \\frac{\\partial^2\\varphi}{\\partial x^2} + \\frac{\\partial^2\\varphi}{\\partial y^2} = 0"}</MathInline>
            </div>
          </div>

          {/* Controles */}
          <div style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            marginBottom: '24px',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={() => setShowingSteps(!showingSteps)}
              style={{
                background: '#f59e0b',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'background 0.3s ease'
              }}
            >
              <Calculator size={20} />
              {showingSteps ? 'Ocultar Cálculos' : 'Mostrar Cálculos'}
            </button>
          </div>

          {/* Cálculos passo-a-passo */}
          {showingSteps && (
            <div style={{
              background: '#fef3c7',
              borderLeft: '4px solid #f59e0b',
              padding: '16px',
              marginBottom: '24px',
              borderRadius: '0 8px 8px 0'
            }}>
              <h3 style={{ fontWeight: 'bold', color: '#92400e', marginBottom: '12px' }}>
                🧮 Resolução Passo-a-Passo:
              </h3>
              <div className="math-container">
                
                {/* Seção 1: Primeiras Derivadas */}
                <MathSection title="1. Cálculo das primeiras derivadas">
                  <div style={{ 
                    textAlign: 'center',
                    marginBottom: '16px',
                    fontSize: '1rem',
                    color: '#495057'
                  }}>
                    <MathInline>{"\\varphi(x,y) = \\ln(x^2 + y^2)"}</MathInline>
                  </div>
                  
                  <MathDerivation steps={[
                    {
                      left: '\\frac{\\partial \\varphi}{\\partial x}',
                      right: '\\frac{\\partial}{\\partial x}[\\ln(x^2 + y^2)] = \\frac{1}{x^2 + y^2} \\cdot 2x',
                      result: '\\frac{2x}{x^2 + y^2}',
                      color: '#dc3545'
                    },
                    {
                      left: '\\frac{\\partial \\varphi}{\\partial y}',
                      right: '\\frac{\\partial}{\\partial y}[\\ln(x^2 + y^2)] = \\frac{1}{x^2 + y^2} \\cdot 2y',
                      result: '\\frac{2y}{x^2 + y^2}',
                      color: '#198754'
                    }
                  ]} />
                </MathSection>

                {/* Seção 2: Segundas Derivadas */}
                <MathSection title="2. Cálculo das segundas derivadas">
                  <MathDerivation steps={[
                    {
                      left: '\\frac{\\partial^2 \\varphi}{\\partial x^2}',
                      right: '\\frac{\\partial}{\\partial x}\\left[\\frac{2x}{x^2 + y^2}\\right]',
                      result: '\\frac{2(y^2 - x^2)}{(x^2 + y^2)^2}',
                      color: '#dc3545'
                    },
                    {
                      left: '\\frac{\\partial^2 \\varphi}{\\partial y^2}',
                      right: '\\frac{\\partial}{\\partial y}\\left[\\frac{2y}{x^2 + y^2}\\right]',
                      result: '\\frac{2(x^2 - y^2)}{(x^2 + y^2)^2}',
                      color: '#198754'
                    }
                  ]} />
                </MathSection>

                {/* Seção 3: Laplaciano */}
                <MathSection title="3. Cálculo do Laplaciano">
                  <div style={{ 
                    textAlign: 'center',
                    marginBottom: '16px',
                    fontSize: '1.1rem',
                    color: '#495057'
                  }}>
                    <MathInline>{"\\Delta\\varphi = \\frac{\\partial^2 \\varphi}{\\partial x^2} + \\frac{\\partial^2 \\varphi}{\\partial y^2}"}</MathInline>
                  </div>
                  
                  <div style={{ 
                    textAlign: 'center',
                    marginBottom: '16px',
                    fontSize: '1rem',
                    color: '#495057'
                  }}>
                    <MathInline>{"= \\frac{2(y^2 - x^2)}{(x^2 + y^2)^2} + \\frac{2(x^2 - y^2)}{(x^2 + y^2)^2}"}</MathInline>
                  </div>

                  <div style={{ 
                    textAlign: 'center',
                    fontSize: '1rem',
                    color: '#495057'
                  }}>
                    <MathInline>{"= \\frac{2(y^2 - x^2) + 2(x^2 - y^2)}{(x^2 + y^2)^2} = \\frac{0}{(x^2 + y^2)^2} = 0"}</MathInline>
                  </div>
                </MathSection>

                {/* Seção 4: Resultado Final */}
                <div style={{ marginBottom: '20px' }}>
                  <h4 style={{ 
                    color: '#2c3e50', 
                    marginBottom: '20px',
                    fontSize: '1.1rem',
                    fontWeight: '600'
                  }}>
                    4. Conclusão
                  </h4>
                  
                  <MathResult>
                    {"\\Delta\\varphi = 0 \\quad \\Rightarrow \\quad \\text{A função é harmônica}"}
                  </MathResult>
                </div>
              </div>
            </div>
          )}

          {/* Explicação do Conceito */}
          <div style={{
            background: '#d1fae5',
            borderLeft: '4px solid #10b981',
            padding: '16px',
            marginBottom: '24px',
            borderRadius: '0 8px 8px 0'
          }}>
            <h3 style={{ fontWeight: 'bold', color: '#065f46', marginBottom: '12px' }}>
              📖 Conceito de Função Harmônica:
            </h3>
            <ul style={{ color: '#065f46', paddingLeft: '20px', lineHeight: '1.8' }}>
              <li>🎯 Uma função é <strong>harmônica</strong> se <MathInline>{"\\Delta\\varphi = \\nabla^2\\varphi = 0"}</MathInline></li>
              <li>📏 O <strong>Laplaciano</strong> mede a "curvatura média" da função</li>
              <li>⚖️ Funções harmônicas satisfazem o <strong>princípio do valor médio</strong></li>
              <li>🌊 Aparecem em física: potencial elétrico, temperatura em equilíbrio</li>
              <li>🎨 <MathInline>{"\\ln(x^2 + y^2)"}</MathInline> é o potencial logarítmico em 2D</li>
            </ul>
          </div>

          {/* Resposta */}
          <div style={{
            background: 'linear-gradient(135deg, #10b981, #059669)',
            color: 'white',
            padding: '24px',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '12px' }}>
              ✅ Resultado Final
            </h3>
            <p style={{ fontSize: '1.125rem' }}>
              <strong>Sim, a função é harmônica!</strong>
            </p>
            <p style={{ marginTop: '8px', opacity: 0.9 }}>
              <MathInline>{"\\Delta\\varphi = 0"}</MathInline> em todo o domínio <MathInline>{"\\mathbb{R}^2 \\setminus \\{(0,0)\\}"}</MathInline>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Problem05_Harmonica;
