import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { MathInline, MathSection, MathResult, MathDerivation } from '../components/MathRenderer';

const Problem09_Irrotacional = ({ onBack }) => {
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
            Questão 9: Campo Irrotacional
          </h1>
          <p style={{ opacity: 0.9 }}>Determinação do parâmetro <MathInline>{"a"}</MathInline> para campo irrotacional</p>
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
              Para qual(is) valor(es) da constante <MathInline>{"a"}</MathInline> o campo vetorial 
              <MathInline>{"\\mathbf{F}(x,y,z) = (ay^2)\\mathbf{i} + (2xy + z^2)\\mathbf{j} + (2yz)\\mathbf{k}"}</MathInline> é irrotacional (ou seja, <MathInline>{"\\text{rot }\\mathbf{F} = \\mathbf{0}"}</MathInline>)?
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
              <strong>Campo:</strong> <MathInline>{"\\mathbf{F} = (ay^2)\\mathbf{i} + (2xy + z^2)\\mathbf{j} + (2yz)\\mathbf{k}"}</MathInline>
            </div>
            <div>
              <strong>Condição:</strong> <MathInline>{"\\text{rot }\\mathbf{F} = \\mathbf{0}"}</MathInline>
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
                
                <MathSection title="1. Componentes do campo">
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <MathInline>{"F_x = ay^2, \\quad F_y = 2xy + z^2, \\quad F_z = 2yz"}</MathInline>
                  </div>
                </MathSection>

                <MathSection title="2. Cálculo do rotacional">
                  <MathDerivation steps={[
                    {
                      left: '\\text{rot}_x \\mathbf{F}',
                      right: '\\frac{\\partial F_z}{\\partial y} - \\frac{\\partial F_y}{\\partial z} = \\frac{\\partial}{\\partial y}(2yz) - \\frac{\\partial}{\\partial z}(2xy + z^2)',
                      result: '2z - 2z = 0',
                      color: '#dc3545'
                    },
                    {
                      left: '\\text{rot}_y \\mathbf{F}',
                      right: '\\frac{\\partial F_x}{\\partial z} - \\frac{\\partial F_z}{\\partial x} = \\frac{\\partial}{\\partial z}(ay^2) - \\frac{\\partial}{\\partial x}(2yz)',
                      result: '0 - 0 = 0',
                      color: '#198754'
                    },
                    {
                      left: '\\text{rot}_z \\mathbf{F}',
                      right: '\\frac{\\partial F_y}{\\partial x} - \\frac{\\partial F_x}{\\partial y} = \\frac{\\partial}{\\partial x}(2xy + z^2) - \\frac{\\partial}{\\partial y}(ay^2)',
                      result: '2y - 2ay',
                      color: '#0d6efd'
                    }
                  ]} />
                </MathSection>

                <MathSection title="3. Condição para irrotacional">
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <MathInline>{"\\text{Para ser irrotacional: } \\text{rot}_z \\mathbf{F} = 0"}</MathInline>
                  </div>
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <MathInline>{"2y - 2ay = 0"}</MathInline>
                  </div>
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <MathInline>{"2y(1 - a) = 0"}</MathInline>
                  </div>
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <MathInline>{"\\text{Para todo } y: \\quad 1 - a = 0 \\quad \\Rightarrow \\quad a = 1"}</MathInline>
                  </div>
                </MathSection>

                <div style={{ marginBottom: '20px' }}>
                  <h4 style={{ 
                    color: '#2c3e50', 
                    marginBottom: '20px',
                    fontSize: '1.1rem',
                    fontWeight: '600'
                  }}>
                    4. Verificação
                  </h4>
                  
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <MathInline>{"\\text{Para } a = 1: \\quad \\text{rot }\\mathbf{F} = 0\\mathbf{i} + 0\\mathbf{j} + 0\\mathbf{k} = \\mathbf{0}"}</MathInline>
                  </div>
                  
                  <MathResult>
                    {"a = 1"}
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
              <li>🎯 Para <MathInline>{"a = 1"}</MathInline>, o campo é <strong>irrotacional</strong></li>
              <li>⚡ Campo irrotacional é <strong>conservativo</strong></li>
              <li>🔄 Existe função potencial <MathInline>{"V"}</MathInline> tal que <MathInline>{"\\mathbf{F} = -\\nabla V"}</MathInline></li>
              <li>🌊 A circulação do campo é <strong>zero</strong> em qualquer curva fechada</li>
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
              <strong>Parâmetro: <MathInline>{"a = 1"}</MathInline></strong>
            </p>
            <p style={{ marginTop: '8px', opacity: 0.9 }}>
              Para este valor, o campo é irrotacional (conservativo).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Problem09_Irrotacional;
