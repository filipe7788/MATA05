import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { MathInline, MathSection, MathResult, MathDerivation } from '../components/MathRenderer';

const Problem08_Laplaciano = ({ onBack }) => {
  const [showingSteps, setShowingSteps] = useState(false);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '16px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
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
              fontSize: '1rem',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <span style={{ fontSize: '1.2rem' }}>←</span>
            Voltar ao Dashboard
          </button>
        </div>

        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px 16px 0 0',
          padding: '24px',
          color: 'white'
        }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '8px' }}>
            Questão 8: Laplaciano de Função
          </h1>
          <p style={{ opacity: 0.9 }}>Cálculo de <MathInline>{"\\Delta\\varphi = \\nabla^2\\varphi"}</MathInline> para <MathInline>{"\\varphi(x,y) = \\arctan(x/y)"}</MathInline></p>
        </div>

        <div style={{
          background: 'white',
          borderRadius: '0 0 16px 16px',
          padding: '24px'
        }}>
          <div className="question-section" style={{
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
              Calcule o Laplaciano <MathInline>{"\\Delta\\varphi = \\nabla^2\\varphi"}</MathInline> para a função <MathInline>{"\\varphi(x,y) = \\arctan(x/y)"}</MathInline>, para <MathInline>{"y \\neq 0"}</MathInline>.
            </p>
          </div>

          <div className="formula-section" style={{
            background: '#f3f4f6',
            padding: '20px',
            borderRadius: '8px',
            textAlign: 'center',
            marginBottom: '24px'
          }}>
            <div style={{ marginBottom: '12px' }}>
              <strong>Função:</strong> <MathInline>{"\\varphi(x,y) = \\arctan\\left(\\frac{x}{y}\\right)"}</MathInline>
            </div>
            <div>
              <strong>Laplaciano:</strong> <MathInline>{"\\Delta\\varphi = \\frac{\\partial^2\\varphi}{\\partial x^2} + \\frac{\\partial^2\\varphi}{\\partial y^2}"}</MathInline>
            </div>
          </div>

          <div style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            marginBottom: '24px'
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
                gap: '8px'
              }}
            >
              <Calculator size={20} />
              {showingSteps ? 'Ocultar Cálculos' : 'Mostrar Cálculos'}
            </button>
          </div>

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
                
                <MathSection title="1. Lembrando a derivada da função arctan">
                  <div style={{ textAlign: 'center', marginBottom: '16px', fontSize: '1rem', color: '#495057' }}>
                    <MathInline>{"\\text{Propriedade fundamental: } \\frac{d}{du}[\\arctan(u)] = \\frac{1}{1 + u^2}"}</MathInline>
                  </div>
                  <div style={{ textAlign: 'center', marginBottom: '16px', fontSize: '0.9rem', color: '#6c757d' }}>
                    <MathInline>{"\\text{Esta fórmula será essencial para aplicar a regra da cadeia}"}</MathInline>
                  </div>
                </MathSection>

                <MathSection title="2. Aplicação da regra da cadeia para ∂φ/∂x">
                  <div style={{ textAlign: 'center', marginBottom: '16px', fontSize: '1rem', color: '#495057' }}>
                    <MathInline>{"\\text{Seja } u = \\frac{x}{y}, \\text{ então } \\varphi = \\arctan(u)"}</MathInline>
                  </div>
                  
                  <MathDerivation steps={[
                    {
                      left: '\\frac{\\partial \\varphi}{\\partial x}',
                      right: '\\frac{d\\varphi}{du} \\cdot \\frac{\\partial u}{\\partial x} = \\frac{1}{1 + u^2} \\cdot \\frac{\\partial}{\\partial x}\\left(\\frac{x}{y}\\right)',
                      result: '\\frac{1}{1 + (x/y)^2} \\cdot \\frac{1}{y}',
                      color: '#dc3545'
                    },
                    {
                      left: '',
                      right: '\\frac{1}{1 + \\frac{x^2}{y^2}} \\cdot \\frac{1}{y} = \\frac{1}{\\frac{y^2 + x^2}{y^2}} \\cdot \\frac{1}{y}',
                      result: '\\frac{y^2}{x^2 + y^2} \\cdot \\frac{1}{y} = \\frac{y}{x^2 + y^2}',
                      color: '#dc3545'
                    }
                  ]} />
                </MathSection>

                <MathSection title="3. Aplicação da regra da cadeia para ∂φ/∂y">
                  <MathDerivation steps={[
                    {
                      left: '\\frac{\\partial \\varphi}{\\partial y}',
                      right: '\\frac{d\\varphi}{du} \\cdot \\frac{\\partial u}{\\partial y} = \\frac{1}{1 + u^2} \\cdot \\frac{\\partial}{\\partial y}\\left(\\frac{x}{y}\\right)',
                      result: '\\frac{1}{1 + (x/y)^2} \\cdot \\left(-\\frac{x}{y^2}\\right)',
                      color: '#198754'
                    },
                    {
                      left: '',
                      right: '\\frac{1}{1 + \\frac{x^2}{y^2}} \\cdot \\left(-\\frac{x}{y^2}\\right) = \\frac{y^2}{x^2 + y^2} \\cdot \\left(-\\frac{x}{y^2}\\right)',
                      result: '\\frac{-x}{x^2 + y^2}',
                      color: '#198754'
                    }
                  ]} />
                </MathSection>

                <MathSection title="4. Cálculo detalhado de ∂²φ/∂x²">
                  <div style={{ textAlign: 'center', marginBottom: '16px', fontSize: '1rem', color: '#495057' }}>
                    <MathInline>{"\\text{Derivamos } \\frac{\\partial \\varphi}{\\partial x} = \\frac{y}{x^2 + y^2} \\text{ em relação a } x"}</MathInline>
                  </div>
                  
                  <MathDerivation steps={[
                    {
                      left: '\\frac{\\partial^2 \\varphi}{\\partial x^2}',
                      right: '\\frac{\\partial}{\\partial x}\\left[\\frac{y}{x^2 + y^2}\\right] = y \\cdot \\frac{\\partial}{\\partial x}\\left[(x^2 + y^2)^{-1}\\right]',
                      result: 'y \\cdot (-1)(x^2 + y^2)^{-2} \\cdot 2x',
                      color: '#dc3545'
                    },
                    {
                      left: '',
                      right: 'y \\cdot \\frac{-2x}{(x^2 + y^2)^2}',
                      result: '\\frac{-2xy}{(x^2 + y^2)^2}',
                      color: '#dc3545'
                    }
                  ]} />
                </MathSection>

                <MathSection title="5. Cálculo detalhado de ∂²φ/∂y²">
                  <div style={{ textAlign: 'center', marginBottom: '16px', fontSize: '1rem', color: '#495057' }}>
                    <MathInline>{"\\text{Derivamos } \\frac{\\partial \\varphi}{\\partial y} = \\frac{-x}{x^2 + y^2} \\text{ em relação a } y"}</MathInline>
                  </div>
                  
                  <MathDerivation steps={[
                    {
                      left: '\\frac{\\partial^2 \\varphi}{\\partial y^2}',
                      right: '\\frac{\\partial}{\\partial y}\\left[\\frac{-x}{x^2 + y^2}\\right] = -x \\cdot \\frac{\\partial}{\\partial y}\\left[(x^2 + y^2)^{-1}\\right]',
                      result: '-x \\cdot (-1)(x^2 + y^2)^{-2} \\cdot 2y',
                      color: '#198754'
                    },
                    {
                      left: '',
                      right: '-x \\cdot \\frac{-2y}{(x^2 + y^2)^2}',
                      result: '\\frac{2xy}{(x^2 + y^2)^2}',
                      color: '#198754'
                    }
                  ]} />
                </MathSection>

                <MathSection title="6. Soma das segundas derivadas parciais">
                  <div style={{ textAlign: 'center', marginBottom: '16px', fontSize: '1rem', color: '#495057' }}>
                    <MathInline>{"\\text{Laplaciano: } \\Delta\\varphi = \\frac{\\partial^2 \\varphi}{\\partial x^2} + \\frac{\\partial^2 \\varphi}{\\partial y^2}"}</MathInline>
                  </div>
                  
                  <MathDerivation steps={[
                    {
                      left: '\\Delta\\varphi',
                      right: '\\frac{\\partial^2 \\varphi}{\\partial x^2} + \\frac{\\partial^2 \\varphi}{\\partial y^2}',
                      result: '\\frac{-2xy}{(x^2 + y^2)^2} + \\frac{2xy}{(x^2 + y^2)^2}',
                      color: '#0d6efd'
                    },
                    {
                      left: '',
                      right: '\\frac{-2xy + 2xy}{(x^2 + y^2)^2}',
                      result: '\\frac{0}{(x^2 + y^2)^2} = 0',
                      color: '#0d6efd'
                    }
                  ]} />
                </MathSection>

                <div style={{ marginBottom: '20px' }}>
                  <h4 style={{ 
                    color: '#2c3e50', 
                    marginBottom: '20px',
                    fontSize: '1.1rem',
                    fontWeight: '600'
                  }}>
                    7. Verificação e conclusão
                  </h4>
                  
                  <div style={{ 
                    textAlign: 'center',
                    marginBottom: '16px',
                    fontSize: '1rem',
                    color: '#495057'
                  }}>
                    <MathInline>{"\\text{Como } \\Delta\\varphi = 0 \\text{ para todo } (x,y) \\text{ com } y \\neq 0"}</MathInline>
                  </div>
                  
                  <MathResult>
                    {"\\Delta\\varphi = 0 \\quad \\Rightarrow \\quad \\varphi(x,y) = \\arctan\\left(\\frac{x}{y}\\right) \\text{ é harmônica}"}
                  </MathResult>
                </div>
              </div>
            </div>
          )}

          <div style={{
            background: '#d1fae5',
            borderLeft: '4px solid #10b981',
            padding: '16px',
            marginBottom: '24px',
            borderRadius: '0 8px 8px 0'
          }}>
            <h3 style={{ fontWeight: 'bold', color: '#065f46', marginBottom: '12px' }}>
              📖 Interpretação do Resultado:
            </h3>
            <ul style={{ color: '#065f46', paddingLeft: '20px', lineHeight: '1.8' }}>
              <li>🎯 <MathInline>{"\\arctan(x/y)"}</MathInline> é uma <strong>função harmônica</strong></li>
              <li>📐 Representa o <strong>ângulo polar</strong> em coordenadas polares</li>
              <li>🌊 Satisfaz a <strong>equação de Laplace</strong>: <MathInline>{"\\Delta\\varphi = 0"}</MathInline></li>
              <li>⚡ Função <strong>harmônica</strong> exceto na origem e eixo y</li>
            </ul>
          </div>

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
              <strong>Laplaciano: <MathInline>{"0"}</MathInline></strong>
            </p>
            <p style={{ marginTop: '8px', opacity: 0.9 }}>
              A função é harmônica em seu domínio.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Problem08_Laplaciano;
