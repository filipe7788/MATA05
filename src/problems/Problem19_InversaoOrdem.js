import React, { useState } from 'react';
import { Calculator, RotateCcw } from 'lucide-react';
import { MathInline, MathSection, MathResult } from '../components/MathRenderer';

const Problem19_InversaoOrdem = ({ onBack }) => {
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
            Questão 19: Inversão da Ordem de Integração
          </h1>
          <p style={{ opacity: 0.9 }}>Inverta a ordem de integração para ∫₀¹∫ₓˣ f(x,y)dydx</p>
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
              Inverta a ordem de integração para a integral iterada{' '}
              <MathInline>{"\\int_0^1 \\int_x^{\\sqrt{x}} f(x,y) \\, dy \\, dx"}</MathInline>.
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
              <strong>Integral Original:</strong> <MathInline>{"\\int_0^1 \\int_x^{\\sqrt{x}} f(x,y) \\, dy \\, dx"}</MathInline>
            </div>
            <div style={{ marginBottom: '12px' }}>
              <strong>Ordem Original:</strong> dy dx (primeiro em y, depois em x)
            </div>
            <div>
              <strong>Nova Ordem:</strong> dx dy (primeiro em x, depois em y)
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
              <RotateCcw size={20} />
              {showingSteps ? 'Ocultar Processo' : 'Mostrar Processo'}
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
                🧮 Processo de Inversão:
              </h3>
              <div className="math-container">

                <MathSection title="1. Análise da região de integração">
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <p style={{ marginBottom: '12px' }}>
                      Da integral original: <MathInline>{"\\int_0^1 \\int_x^{\\sqrt{x}} f(x,y) \\, dy \\, dx"}</MathInline>
                    </p>
                    <p style={{ marginBottom: '12px' }}>
                      Limites: <MathInline>{"0 \\leq x \\leq 1"}</MathInline> e <MathInline>{"x \\leq y \\leq \\sqrt{x}"}</MathInline>
                    </p>
                  </div>
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <p style={{ marginBottom: '12px' }}>
                      A região D é limitada por:
                    </p>
                    <p style={{ marginBottom: '8px' }}>• <MathInline>{"y = x"}</MathInline> (limite inferior)</p>
                    <p style={{ marginBottom: '8px' }}>• <MathInline>{"y = \\sqrt{x}"}</MathInline> (limite superior)</p>
                    <p style={{ marginBottom: '8px' }}>• <MathInline>{"x = 0"}</MathInline> e <MathInline>{"x = 1"}</MathInline> (limites laterais)</p>
                  </div>
                </MathSection>

                <MathSection title="2. Encontrando os novos limites">
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <p style={{ marginBottom: '12px' }}>
                      Para inverter, precisamos expressar x em função de y:
                    </p>
                    <p style={{ marginBottom: '8px' }}>• De <MathInline>{"y = x"}</MathInline>: <MathInline>{"x = y"}</MathInline></p>
                    <p style={{ marginBottom: '8px' }}>• De <MathInline>{"y = \\sqrt{x}"}</MathInline>: <MathInline>{"x = y^2"}</MathInline></p>
                  </div>
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <p style={{ marginBottom: '12px' }}>
                      Análise por casos:
                    </p>
                    <p style={{ marginBottom: '8px' }}>Para <MathInline>{"0 \\leq y \\leq 1"}</MathInline>: <MathInline>{"y \\leq x \\leq \\sqrt{y}"}</MathInline></p>
                    <p style={{ marginBottom: '8px' }}>(porque <MathInline>{"y \\leq \\sqrt{y}"}</MathInline> quando <MathInline>{"0 \\leq y \\leq 1"}</MathInline>)</p>
                  </div>
                </MathSection>

                <MathSection title="3. Verificação dos pontos críticos">
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <p style={{ marginBottom: '12px' }}>
                      Interseção das curvas <MathInline>{"y = x"}</MathInline> e <MathInline>{"y = \\sqrt{x}"}</MathInline>:
                    </p>
                    <MathInline>{"x = \\sqrt{x} \\Rightarrow x^2 = x \\Rightarrow x(x-1) = 0"}</MathInline>
                  </div>
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <p style={{ marginBottom: '12px' }}>
                      Soluções: <MathInline>{"x = 0"}</MathInline> e <MathInline>{"x = 1"}</MathInline>
                    </p>
                    <p style={{ marginBottom: '12px' }}>
                      Pontos de interseção: (0,0) e (1,1)
                    </p>
                  </div>
                </MathSection>

                <MathSection title="4. Integral com ordem invertida">
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <MathResult>
                      {"\\int_0^1 \\int_y^{\\sqrt{y}} f(x,y) \\, dx \\, dy"}
                    </MathResult>
                  </div>
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <p style={{ marginBottom: '12px' }}>
                      Limites finais:
                    </p>
                    <p style={{ marginBottom: '8px' }}>• <MathInline>{"0 \\leq y \\leq 1"}</MathInline></p>
                    <p style={{ marginBottom: '8px' }}>• <MathInline>{"y \\leq x \\leq \\sqrt{y}"}</MathInline></p>
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
              📖 Passos para Inversão:
            </h3>
            <ul style={{ color: '#065f46', paddingLeft: '20px', lineHeight: '1.8' }}>
              <li>🎯 <strong>Identificar a região:</strong> Analisar os limites de integração</li>
              <li>📏 <strong>Desenhar a região:</strong> Visualizar as curvas limitantes</li>
              <li>🔄 <strong>Inverter as relações:</strong> Expressar x em função de y</li>
              <li>📐 <strong>Determinar novos limites:</strong> Encontrar intervalos para y e x</li>
              <li>✅ <strong>Verificar:</strong> Confirmar que a região é a mesma</li>
            </ul>
          </div>

          <div style={{
            background: '#dcfce7',
            borderLeft: '4px solid #16a34a',
            padding: '16px',
            marginBottom: '24px',
            borderRadius: '0 8px 8px 0'
          }}>
            <h3 style={{ fontWeight: 'bold', color: '#15803d', marginBottom: '12px' }}>
              🎓 Por que Inverter?
            </h3>
            <ul style={{ color: '#15803d', paddingLeft: '20px', lineHeight: '1.8' }}>
              <li>⚡ <strong>Simplificar cálculos:</strong> Uma ordem pode ser mais fácil que a outra</li>
              <li>🔍 <strong>Evitar singularidades:</strong> Contornar pontos problemáticos</li>
              <li>📊 <strong>Aproveitear simetrias:</strong> Explorar propriedades da função</li>
              <li>🎯 <strong>Aplicar técnicas específicas:</strong> Usar métodos mais adequados</li>
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
              ✅ Resposta: <MathInline>{"\\int_0^1 \\int_y^{\\sqrt{y}} f(x,y) \\, dx \\, dy"}</MathInline>
            </h3>
            <p style={{ fontSize: '1.125rem' }}>
              A integral com ordem invertida é <MathInline>{"\\int_0^1 \\int_y^{\\sqrt{y}} f(x,y) \\, dx \\, dy"}</MathInline>
            </p>
            <p style={{ marginTop: '8px', opacity: 0.9 }}>
              Agora integramos primeiro em x, depois em y.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Problem19_InversaoOrdem;