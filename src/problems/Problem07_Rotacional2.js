import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { MathInline, MathSection, MathResult, MathDerivation } from '../components/MathRenderer';

const Problem07_Rotacional2 = ({ onBack }) => {
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
            Questão 7: Rotacional com Componente Z
          </h1>
          <p style={{ opacity: 0.9 }}>Cálculo do rotacional de <MathInline>{"\\mathbf{F}(x,y,z) = x\\mathbf{i} + y\\mathbf{j} + xz\\mathbf{k}"}</MathInline></p>
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
              Calcule o rotacional <MathInline>{"\\text{rot }\\mathbf{F}"}</MathInline> do campo vetorial <MathInline>{"\\mathbf{F}(x,y,z) = x\\mathbf{i} + y\\mathbf{j} + xz\\mathbf{k}"}</MathInline>.
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
              <strong>Campo:</strong> <MathInline>{"\\mathbf{F} = x\\mathbf{i} + y\\mathbf{j} + xz\\mathbf{k}"}</MathInline>
            </div>
            <div>
              <strong>Componentes:</strong> <MathInline>{"F_x = x, \\quad F_y = y, \\quad F_z = xz"}</MathInline>
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
                
                <MathSection title="1. Fórmula do rotacional">
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <MathInline>{"\\text{rot }\\mathbf{F} = \\begin{vmatrix} \\mathbf{i} & \\mathbf{j} & \\mathbf{k} \\\\ \\frac{\\partial}{\\partial x} & \\frac{\\partial}{\\partial y} & \\frac{\\partial}{\\partial z} \\\\ x & y & xz \\end{vmatrix}"}</MathInline>
                  </div>
                </MathSection>

                <MathSection title="2. Cálculo das componentes">
                  <MathDerivation steps={[
                    {
                      left: '\\text{rot}_x \\mathbf{F}',
                      right: '\\frac{\\partial F_z}{\\partial y} - \\frac{\\partial F_y}{\\partial z} = \\frac{\\partial}{\\partial y}(xz) - \\frac{\\partial}{\\partial z}(y)',
                      result: '0 - 0 = 0',
                      color: '#dc3545'
                    },
                    {
                      left: '\\text{rot}_y \\mathbf{F}',
                      right: '\\frac{\\partial F_x}{\\partial z} - \\frac{\\partial F_z}{\\partial x} = \\frac{\\partial}{\\partial z}(x) - \\frac{\\partial}{\\partial x}(xz)',
                      result: '0 - z = -z',
                      color: '#198754'
                    },
                    {
                      left: '\\text{rot}_z \\mathbf{F}',
                      right: '\\frac{\\partial F_y}{\\partial x} - \\frac{\\partial F_x}{\\partial y} = \\frac{\\partial}{\\partial x}(y) - \\frac{\\partial}{\\partial y}(x)',
                      result: '0 - 0 = 0',
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
                    3. Resultado final
                  </h4>
                  
                  <MathResult>
                    {"\\text{rot }\\mathbf{F} = 0\\mathbf{i} + (-z)\\mathbf{j} + 0\\mathbf{k} = -z\\mathbf{j}"}
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
              📖 Análise do Resultado:
            </h3>
            <ul style={{ color: '#065f46', paddingLeft: '20px', lineHeight: '1.8' }}>
              <li>🎯 O rotacional tem apenas <strong>componente y</strong>: <MathInline>{"-z\\mathbf{j}"}</MathInline></li>
              <li>📐 A rotação varia <strong>linearmente com z</strong></li>
              <li>🌪️ Campo <strong>não é irrotacional</strong> devido ao termo <MathInline>{"xz"}</MathInline></li>
              <li>⚖️ Rotação ocorre no plano <strong>xz</strong> ao redor do eixo y</li>
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
              <strong>Rotacional: <MathInline>{"-z\\mathbf{j}"}</MathInline></strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Problem07_Rotacional2;
