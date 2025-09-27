import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { MathInline, MathSection, MathResult } from '../components/MathRenderer';

const Problem11_ConteudoNulo = ({ onBack }) => {
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
            Questão 11: Conteúdo Nulo em ℝ²
          </h1>
          <p style={{ opacity: 0.9 }}>Um subconjunto finito de ℝ² tem conteúdo nulo?</p>
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
              Um subconjunto de <MathInline>{"\\mathbb{R}^2"}</MathInline> com um número finito de pontos tem conteúdo nulo?
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
              <strong>Definição de Conteúdo Nulo:</strong> Um conjunto <MathInline>{"S \\subset \\mathbb{R}^2"}</MathInline> tem conteúdo nulo se para todo <MathInline>{"\\epsilon > 0"}</MathInline>, existe uma cobertura finita de retângulos cuja soma das áreas é menor que <MathInline>{"\\epsilon"}</MathInline>.
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
              {showingSteps ? 'Ocultar Demonstração' : 'Mostrar Demonstração'}
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
                🧮 Demonstração:
              </h3>
              <div className="math-container">

                <MathSection title="1. Caso particular: Um único ponto">
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <p style={{ marginBottom: '12px' }}>
                      Considere um ponto <MathInline>{"P = (a, b) \\in \\mathbb{R}^2"}</MathInline>
                    </p>
                    <MathInline>{"\\text{Para qualquer } \\epsilon > 0, \\text{ considere o retângulo } R = [a-\\frac{\\sqrt{\\epsilon}}{2}, a+\\frac{\\sqrt{\\epsilon}}{2}] \\times [b-\\frac{\\sqrt{\\epsilon}}{2}, b+\\frac{\\sqrt{\\epsilon}}{2}]"}</MathInline>
                  </div>
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <MathInline>{"\\text{Área}(R) = \\sqrt{\\epsilon} \\cdot \\sqrt{\\epsilon} = \\epsilon"}</MathInline>
                  </div>
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <p>Mas podemos escolher retângulos ainda menores! Use:</p>
                    <MathInline>{"R' = [a-\\frac{\\sqrt{\\epsilon/2}}{2}, a+\\frac{\\sqrt{\\epsilon/2}}{2}] \\times [b-\\frac{\\sqrt{\\epsilon/2}}{2}, b+\\frac{\\sqrt{\\epsilon/2}}{2}]"}</MathInline>
                  </div>
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <MathInline>{"\\text{Área}(R') = \\frac{\\epsilon}{2} < \\epsilon"}</MathInline>
                  </div>
                </MathSection>

                <MathSection title="2. Caso geral: n pontos finitos">
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <p style={{ marginBottom: '12px' }}>
                      Seja <MathInline>{"S = \\{P_1, P_2, \\ldots, P_n\\}"}</MathInline> onde <MathInline>{"P_i = (x_i, y_i)"}</MathInline>
                    </p>
                    <MathInline>{"\\text{Para cada ponto } P_i, \\text{ construa um retângulo } R_i \\text{ de área } \\frac{\\epsilon}{n}"}</MathInline>
                  </div>
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <MathInline>{"R_i = [x_i-\\frac{\\sqrt{\\epsilon/n}}{2}, x_i+\\frac{\\sqrt{\\epsilon/n}}{2}] \\times [y_i-\\frac{\\sqrt{\\epsilon/n}}{2}, y_i+\\frac{\\sqrt{\\epsilon/n}}{2}]"}</MathInline>
                  </div>
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <MathInline>{"\\sum_{i=1}^n \\text{Área}(R_i) = \\sum_{i=1}^n \\frac{\\epsilon}{n} = \\epsilon"}</MathInline>
                  </div>
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <p>Novamente, podemos tornar a soma arbitrariamente pequena:</p>
                    <MathInline>{"\\sum_{i=1}^n \\text{Área}(R_i) = n \\cdot \\frac{\\epsilon}{2n} = \\frac{\\epsilon}{2} < \\epsilon"}</MathInline>
                  </div>
                </MathSection>

                <MathSection title="3. Conclusão">
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <p style={{ marginBottom: '12px' }}>
                      Como podemos fazer a soma das áreas dos retângulos que cobrem <MathInline>S</MathInline> tão pequena quanto quisermos:
                    </p>
                    <MathResult>
                      {"\\forall \\epsilon > 0, \\exists \\text{ cobertura finita tal que soma das áreas } < \\epsilon"}
                    </MathResult>
                  </div>
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <p><strong>Portanto, qualquer conjunto finito de pontos em ℝ² tem conteúdo nulo.</strong></p>
                  </div>
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
              📖 Conceito de Conteúdo Nulo:
            </h3>
            <ul style={{ color: '#065f46', paddingLeft: '20px', lineHeight: '1.8' }}>
              <li>🎯 Um conjunto tem <strong>conteúdo nulo</strong> se pode ser coberto por retângulos de área total arbitrariamente pequena</li>
              <li>📏 Pontos isolados sempre têm <strong>conteúdo nulo</strong> pois têm "área zero"</li>
              <li>🔢 A união finita de conjuntos de conteúdo nulo também tem <strong>conteúdo nulo</strong></li>
              <li>📐 Curvas suaves em ℝ² também têm conteúdo nulo (como gráficos de funções)</li>
              <li>⚡ Conjuntos com conteúdo nulo <strong>não afetam</strong> o valor de integrais duplas</li>
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
              ✅ Resposta: <strong>SIM</strong>
            </h3>
            <p style={{ fontSize: '1.125rem' }}>
              Qualquer subconjunto finito de <MathInline>{"\\mathbb{R}^2"}</MathInline> tem <strong>conteúdo nulo</strong>.
            </p>
            <p style={{ marginTop: '8px', opacity: 0.9 }}>
              Pontos isolados podem ser cobertos por retângulos de área arbitrariamente pequena.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Problem11_ConteudoNulo;