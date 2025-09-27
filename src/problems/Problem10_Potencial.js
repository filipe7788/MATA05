import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { MathInline, MathSection } from '../components/MathRenderer';

const Problem10_Potencial = ({ onBack }) => {
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
            Questão 10: Campo Conservativo e Potencial
          </h1>
          <p style={{ opacity: 0.9 }}>Relação geométrica entre campo conservativo e potencial</p>
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
              Seja <MathInline>{"V(x,y)"}</MathInline> um potencial e <MathInline>{"\\mathbf{F}(x,y)"}</MathInline> um campo vetorial. 
              Se as trajetórias <MathInline>{"\\gamma(t)"}</MathInline> tais que <MathInline>{"\\gamma'(t) = \\mathbf{F}(\\gamma(t))"}</MathInline> sempre levam a uma diminuição do potencial 
              (<MathInline>{"\\frac{d}{dt}V(\\gamma(t)) < 0"}</MathInline> onde <MathInline>{"\\nabla V \\neq \\mathbf{0}"}</MathInline>), 
              qual a relação geométrica entre <MathInline>{"\\mathbf{F}"}</MathInline> e <MathInline>{"\\nabla V"}</MathInline>?
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
              <strong>Condição:</strong> <MathInline>{"\\frac{d}{dt}V(\\gamma(t)) < 0"}</MathInline>
            </div>
            <div>
              <strong>Relação:</strong> <MathInline>{"\\frac{d}{dt}V(\\gamma(t)) = \\nabla V \\cdot \\gamma'(t) = \\nabla V \\cdot \\mathbf{F}"}</MathInline>
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
              {showingSteps ? 'Ocultar Análise' : 'Mostrar Análise'}
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
                🧮 Análise Geométrica:
              </h3>
              <div className="math-container">
                
                <MathSection title="1. Regra da cadeia">
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <MathInline>{"\\frac{d}{dt}V(\\gamma(t)) = \\nabla V \\cdot \\frac{d\\gamma}{dt} = \\nabla V \\cdot \\mathbf{F}"}</MathInline>
                  </div>
                </MathSection>

                <MathSection title="2. Condição dada">
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <MathInline>{"\\frac{d}{dt}V(\\gamma(t)) < 0 \\quad \\Rightarrow \\quad \\nabla V \\cdot \\mathbf{F} < 0"}</MathInline>
                  </div>
                </MathSection>

                <MathSection title="3. Interpretação geométrica">
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <MathInline>{"\\nabla V \\cdot \\mathbf{F} = |\\nabla V||\\mathbf{F}|\\cos\\theta < 0"}</MathInline>
                  </div>
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <MathInline>{"\\text{onde } \\theta \\text{ é o ângulo entre } \\nabla V \\text{ e } \\mathbf{F}"}</MathInline>
                  </div>
                </MathSection>

                <MathSection title="4. Conclusão sobre o ângulo">
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <MathInline>{"\\cos\\theta < 0 \\quad \\Rightarrow \\quad 90° < \\theta < 180°"}</MathInline>
                  </div>
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <MathInline>{"\\text{O ângulo entre eles é } \\textbf{obtuso}"}</MathInline>
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
              📖 Interpretação Física e Geométrica:
            </h3>
            <ul style={{ color: '#065f46', paddingLeft: '20px', lineHeight: '1.8' }}>
              <li>🎯 O campo <MathInline>{"\\mathbf{F}"}</MathInline> aponta numa direção que <strong>diminui o potencial</strong></li>
              <li>📐 <MathInline>{"\\nabla V"}</MathInline> aponta na direção de <strong>maior crescimento</strong> do potencial</li>
              <li>🔄 Como <MathInline>{"\\nabla V \\cdot \\mathbf{F} < 0"}</MathInline>, o ângulo é <strong>obtuso</strong> (90° &lt; θ &lt; 180°)</li>
              <li>⚡ Em física: campo elétrico aponta do maior para o menor potencial</li>
              <li>🌊 Campo de velocidade em fluido: do maior para o menor potencial gravitacional</li>
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
              <strong>O ângulo entre eles é obtuso (90° &lt; θ &lt; 180°)</strong>
            </p>
            <p style={{ marginTop: '8px', opacity: 0.9 }}>
              Se <MathInline>{"\\frac{d}{dt}V < 0"}</MathInline>, o produto escalar <MathInline>{"\\nabla V \\cdot \\mathbf{F} < 0"}</MathInline>, ou seja, o ângulo é obtuso.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Problem10_Potencial;
