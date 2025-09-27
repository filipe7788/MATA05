import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { MathInline, MathSection, MathResult } from '../components/MathRenderer';

const Problem06_Identidade = ({ onBack }) => {
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
              transition: 'all 0.3s ease',
              fontSize: '1rem',
              fontWeight: '600',
              boxShadow: '0 8px 25px rgba(34, 197, 94, 0.3)',
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
            Questão 6: Identidade Vetorial
          </h1>
          <p style={{ opacity: 0.9 }}>Identidade para <MathInline>{"\\text{div}(\\varphi\\mathbf{F})"}</MathInline></p>
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
              Seja <MathInline>{"\\varphi(x,y,z)"}</MathInline> um campo escalar e <MathInline>{"\\mathbf{F}(x,y,z)"}</MathInline> um campo vetorial, ambos diferenciáveis. 
              Qual identidade vetorial representa corretamente <MathInline>{"\\text{div}(\\varphi\\mathbf{F})"}</MathInline>?
            </p>
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
                🧮 Demonstração da Identidade:
              </h3>
              <div className="math-container">
                
                <MathSection title="1. Definição do produto escalar-vetorial">
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <MathInline>{"\\varphi\\mathbf{F} = \\varphi(F_x\\mathbf{i} + F_y\\mathbf{j} + F_z\\mathbf{k}) = \\varphi F_x\\mathbf{i} + \\varphi F_y\\mathbf{j} + \\varphi F_z\\mathbf{k}"}</MathInline>
                  </div>
                </MathSection>

                <MathSection title="2. Aplicação do divergente">
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <MathInline>{"\\text{div}(\\varphi\\mathbf{F}) = \\frac{\\partial(\\varphi F_x)}{\\partial x} + \\frac{\\partial(\\varphi F_y)}{\\partial y} + \\frac{\\partial(\\varphi F_z)}{\\partial z}"}</MathInline>
                  </div>
                </MathSection>

                <MathSection title="3. Regra do produto">
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <MathInline>{"\\frac{\\partial(\\varphi F_x)}{\\partial x} = \\frac{\\partial\\varphi}{\\partial x}F_x + \\varphi\\frac{\\partial F_x}{\\partial x}"}</MathInline>
                  </div>
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <MathInline>{"\\frac{\\partial(\\varphi F_y)}{\\partial y} = \\frac{\\partial\\varphi}{\\partial y}F_y + \\varphi\\frac{\\partial F_y}{\\partial y}"}</MathInline>
                  </div>
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <MathInline>{"\\frac{\\partial(\\varphi F_z)}{\\partial z} = \\frac{\\partial\\varphi}{\\partial z}F_z + \\varphi\\frac{\\partial F_z}{\\partial z}"}</MathInline>
                  </div>
                </MathSection>

                <MathSection title="4. Reagrupamento">
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <MathInline>{"\\text{div}(\\varphi\\mathbf{F}) = \\left(\\frac{\\partial\\varphi}{\\partial x}F_x + \\frac{\\partial\\varphi}{\\partial y}F_y + \\frac{\\partial\\varphi}{\\partial z}F_z\\right) + \\varphi\\left(\\frac{\\partial F_x}{\\partial x} + \\frac{\\partial F_y}{\\partial y} + \\frac{\\partial F_z}{\\partial z}\\right)"}</MathInline>
                  </div>
                </MathSection>

                <div style={{ marginBottom: '20px' }}>
                  <h4 style={{ 
                    color: '#2c3e50', 
                    marginBottom: '20px',
                    fontSize: '1.1rem',
                    fontWeight: '600'
                  }}>
                    5. Identidade vetorial
                  </h4>
                  
                  <MathResult>
                    {"\\text{div}(\\varphi\\mathbf{F}) = (\\nabla\\varphi) \\cdot \\mathbf{F} + \\varphi(\\text{div}\\mathbf{F})"}
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
              📖 Interpretação da Identidade:
            </h3>
            <ul style={{ color: '#065f46', paddingLeft: '20px', lineHeight: '1.8' }}>
              <li>🎯 Esta é a <strong>regra do produto para o divergente</strong></li>
              <li>📊 <MathInline>{"(\\nabla\\varphi) \\cdot \\mathbf{F}"}</MathInline>: contribuição da variação do escalar</li>
              <li>💨 <MathInline>{"\\varphi(\\text{div}\\mathbf{F})"}</MathInline>: contribuição da divergência do campo</li>
              <li>⚖️ Generaliza a regra do produto para operadores vetoriais</li>
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
              ✅ Identidade Vetorial
            </h3>
            <p style={{ fontSize: '1.125rem' }}>
              <MathInline>{"\\text{div}(\\varphi\\mathbf{F}) = (\\nabla\\varphi) \\cdot \\mathbf{F} + \\varphi(\\text{div}\\mathbf{F})"}</MathInline>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Problem06_Identidade;
