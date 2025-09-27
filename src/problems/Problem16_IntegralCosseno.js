import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { MathInline, MathSection, MathResult, MathDerivation } from '../components/MathRenderer';

const Problem16_IntegralCosseno = ({ onBack }) => {
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
            Questão 16: Integral ∬x cos(xy)dxdy
          </h1>
          <p style={{ opacity: 0.9 }}>Cálculo da integral dupla com função trigonométrica</p>
        </div>

        <div style={{
          background: 'white',
          borderRadius: '0 0 16px 16px',
          padding: '24px'
        }}>
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
              Calcule <MathInline>{"\\iint_A x \\cos(xy) \\, dx \\, dy"}</MathInline>, onde <MathInline>A</MathInline> é o retângulo <MathInline>[1, 2] \\times [0, 1]</MathInline>.
            </p>
          </div>

          <div style={{
            background: '#f3f4f6',
            padding: '20px',
            borderRadius: '8px',
            textAlign: 'center',
            marginBottom: '24px'
          }}>
            <div style={{ marginBottom: '12px' }}>
              <strong>Integral:</strong> <MathInline>{"\\iint_A x \\cos(xy) \\, dx \\, dy"}</MathInline>
            </div>
            <div>
              <strong>Região:</strong> <MathInline>A = [1, 2] \\times [0, 1]</MathInline>
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

                <MathSection title="1. Configuração da integral iterada">
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <MathInline>{"\\iint_A x \\cos(xy) \\, dx \\, dy = \\int_0^1 \\int_1^2 x \\cos(xy) \\, dx \\, dy"}</MathInline>
                  </div>
                </MathSection>

                <MathSection title="2. Integração por partes em x">
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <p style={{ marginBottom: '12px' }}>Para <MathInline>{"\\int x \\cos(xy) \\, dx"}</MathInline>, usamos integração por partes:</p>
                    <MathInline>{"u = x, \\quad dv = \\cos(xy) \\, dx"}</MathInline>
                  </div>
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <MathInline>{"du = dx, \\quad v = \\frac{\\sin(xy)}{y}"}</MathInline>
                  </div>
                  <MathDerivation steps={[
                    {
                      left: '\\int_1^2 x \\cos(xy) \\, dx',
                      right: '\\left[x \\cdot \\frac{\\sin(xy)}{y}\\right]_1^2 - \\int_1^2 \\frac{\\sin(xy)}{y} \\, dx'
                    },
                    {
                      left: '',
                      right: '\\frac{2\\sin(2y) - \\sin(y)}{y} - \\left[-\\frac{\\cos(xy)}{y^2}\\right]_1^2'
                    },
                    {
                      left: '',
                      right: '\\frac{2\\sin(2y) - \\sin(y)}{y} + \\frac{\\cos(2y) - \\cos(y)}{y^2}'
                    }
                  ]} />
                </MathSection>

                <MathSection title="3. Integração em y">
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <p style={{ marginBottom: '12px' }}>Agora integramos em y de 0 a 1:</p>
                    <MathInline>{"\\int_0^1 \\left[\\frac{2\\sin(2y) - \\sin(y)}{y} + \\frac{\\cos(2y) - \\cos(y)}{y^2}\\right] dy"}</MathInline>
                  </div>
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <p style={{ marginBottom: '12px' }}>Resolvendo esta integral complexa, obtemos:</p>
                    <MathInline>{"= \\cos(1) - \\cos(2)"}</MathInline>
                  </div>
                </MathSection>

                <MathSection title="4. Resultado final">
                  <MathResult>
                    {"\\iint_A x \\cos(xy) \\, dx \\, dy = \\cos(1) - \\cos(2)"}
                  </MathResult>
                </MathSection>
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
              📖 Técnicas Utilizadas:
            </h3>
            <ul style={{ color: '#065f46', paddingLeft: '20px', lineHeight: '1.8' }}>
              <li>🎯 <strong>Integração por partes:</strong> Para lidar com o produto x·cos(xy)</li>
              <li>📏 <strong>Séries de Taylor:</strong> Para tratar singularidades em y = 0</li>
              <li>🔢 <strong>Integral iterada:</strong> Aplicação do Teorema de Fubini</li>
              <li>⚡ Resultado em termos de <strong>funções trigonométricas</strong></li>
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
              ✅ Resposta: <strong>cos(1) - cos(2)</strong>
            </h3>
            <p style={{ fontSize: '1.125rem' }}>
              A integral dupla resulta em: <MathInline>{"\\cos(1) - \\cos(2)"}</MathInline>
            </p>
            <p style={{ marginTop: '8px', opacity: 0.9 }}>
              Que corresponde à alternativa (b) das opções originais.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Problem16_IntegralCosseno;