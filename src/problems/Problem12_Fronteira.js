import React, { useState } from 'react';
import { Calculator, CheckCircle } from 'lucide-react';
import { MathInline, MathSection, MathResult } from '../components/MathRenderer';

const Problem12_Fronteira = ({ onBack }) => {
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
            Questão 12: Integração com Fronteira
          </h1>
          <p style={{ opacity: 0.9 }}>Condições para integração quando a fronteira tem conteúdo nulo</p>
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
              Seja <MathInline>{"B \\subset \\mathbb{R}^2"}</MathInline> um conjunto limitado e <MathInline>{"f: B \\to \\mathbb{R}"}</MathInline> uma função contínua e limitada.
              Se a fronteira de <MathInline>{"B"}</MathInline> tiver conteúdo nulo, podemos garantir que <MathInline>{"f"}</MathInline> é integrável em <MathInline>{"B"}</MathInline>?
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
              <strong>Condições:</strong>
            </div>
            <div style={{ marginBottom: '8px' }}>
              • <MathInline>{"B \\subset \\mathbb{R}^2"}</MathInline> é limitado
            </div>
            <div style={{ marginBottom: '8px' }}>
              • <MathInline>{"f: B \\to \\mathbb{R}"}</MathInline> é contínua e limitada
            </div>
            <div>
              • <MathInline>{"\\partial B"}</MathInline> (fronteira de <MathInline>{"B"}</MathInline>) tem conteúdo nulo
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
                🧮 Análise Teórica:
              </h3>
              <div className="math-container">

                <MathSection title="1. Teorema de integrabilidade">
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <p style={{ marginBottom: '12px' }}>
                      <strong>Teorema:</strong> Uma função limitada <MathInline>f</MathInline> é integrável se e somente se o conjunto de descontinuidades de <MathInline>f</MathInline> tem conteúdo nulo.
                    </p>
                  </div>
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <MathInline>{"f \\text{ integrável} \\Leftrightarrow \\{x \\in B : f \\text{ é descontínua em } x\\} \\text{ tem conteúdo nulo}"}</MathInline>
                  </div>
                </MathSection>

                <MathSection title="2. Análise do problema">
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <p style={{ marginBottom: '12px' }}>
                      Se <MathInline>f</MathInline> é contínua em <MathInline>B</MathInline>, onde podem ocorrer descontinuidades?
                    </p>
                    <p style={{ marginBottom: '12px' }}>
                      • <MathInline>f</MathInline> é contínua no <strong>interior</strong> de <MathInline>B</MathInline>
                    </p>
                    <p style={{ marginBottom: '12px' }}>
                      • Possíveis descontinuidades podem ocorrer apenas na <strong>fronteira</strong> <MathInline>\partial B</MathInline>
                    </p>
                  </div>
                </MathSection>

                <MathSection title="3. Aplicação das condições">
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <p style={{ marginBottom: '12px' }}>
                      Como <MathInline>\partial B</MathInline> tem conteúdo nulo por hipótese:
                    </p>
                    <MathInline>{"\\{x \\in B : f \\text{ é descontínua em } x\\} \\subseteq \\partial B"}</MathInline>
                  </div>
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <p style={{ marginBottom: '12px' }}>
                      E como subconjunto de um conjunto de conteúdo nulo também tem conteúdo nulo:
                    </p>
                    <MathInline>{"\\{x \\in B : f \\text{ é descontínua em } x\\} \\text{ tem conteúdo nulo}"}</MathInline>
                  </div>
                </MathSection>

                <MathSection title="4. Conclusão">
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <p style={{ marginBottom: '12px' }}>
                      Pelo teorema de integrabilidade:
                    </p>
                    <MathResult>
                      {"f \\text{ é integrável em } B"}
                    </MathResult>
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
              📖 Conceitos Importantes:
            </h3>
            <ul style={{ color: '#065f46', paddingLeft: '20px', lineHeight: '1.8' }}>
              <li>🎯 <strong>Integrabilidade</strong> depende do conjunto de descontinuidades ter conteúdo nulo</li>
              <li>📏 Se a <strong>fronteira</strong> tem conteúdo nulo, ela não impede a integrabilidade</li>
              <li>🔢 Funções contínuas no interior + fronteira de conteúdo nulo = <strong>integrável</strong></li>
              <li>📐 Este é um resultado fundamental para garantir existência de integrais duplas</li>
              <li>⚡ Aplica-se a muitas regiões práticas: retângulos, discos, regiões limitadas por curvas suaves</li>
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
              ✅ Exemplos de Aplicação:
            </h3>
            <ul style={{ color: '#15803d', paddingLeft: '20px', lineHeight: '1.8' }}>
              <li>🟦 <strong>Retângulos:</strong> fronteira são 4 segmentos de reta (conteúdo nulo)</li>
              <li>⭕ <strong>Discos:</strong> fronteira é uma circunferência (conteúdo nulo)</li>
              <li>📐 <strong>Triângulos:</strong> fronteira são 3 segmentos de reta (conteúdo nulo)</li>
              <li>🌊 <strong>Regiões limitadas por curvas suaves:</strong> fronteira tem conteúdo nulo</li>
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
              Se <MathInline>f</MathInline> é contínua e limitada em <MathInline>B</MathInline>, e <MathInline>\partial B</MathInline> tem conteúdo nulo, então <MathInline>f</MathInline> é <strong>integrável</strong> em <MathInline>B</MathInline>.
            </p>
            <p style={{ marginTop: '8px', opacity: 0.9 }}>
              O conjunto de descontinuidades está contido na fronteira, que tem conteúdo nulo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Problem12_Fronteira;