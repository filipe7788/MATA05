import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';
import { MathInline, MathSection, MathResult } from '../components/MathRenderer';

const Problem17_TeoremaFubini = ({ onBack }) => {
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
            Questão 17: Teorema de Fubini
          </h1>
          <p style={{ opacity: 0.9 }}>Qual teorema permite separar integrais duplas em produto de integrais?</p>
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
              Qual propriedade ou teorema garante que, sob condições adequadas (funções contínuas, domínio retangular
              <MathInline>A = [a,b] \\times [c,d]</MathInline>), a integral dupla{' '}
              <MathInline>{"\\iint_A f(x)g(y) \\, dx \\, dy"}</MathInline> pode ser calculada como{' '}
              <MathInline>{"\\left(\\int_a^b f(x) \\, dx\\right) \\left(\\int_c^d g(y) \\, dy\\right)"}</MathInline>?
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
              <strong>Integral:</strong> <MathInline>{"\\iint_A f(x)g(y) \\, dx \\, dy"}</MathInline>
            </div>
            <div style={{ marginBottom: '12px' }}>
              <strong>Separação:</strong> <MathInline>{"\\left(\\int_a^b f(x) \\, dx\\right) \\left(\\int_c^d g(y) \\, dy\\right)"}</MathInline>
            </div>
            <div>
              <strong>Condições:</strong> Funções contínuas, domínio retangular
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
              <BookOpen size={20} />
              {showingSteps ? 'Ocultar Explicação' : 'Mostrar Explicação'}
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
                🧮 Explicação Detalhada:
              </h3>
              <div className="math-container">

                <MathSection title="1. Teorema de Fubini">
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <p style={{ marginBottom: '12px' }}>
                      <strong>Teorema de Fubini:</strong> Se f é contínua em um retângulo R = [a,b] × [c,d], então:
                    </p>
                    <MathInline>{"\\iint_R f(x,y) \\, dx \\, dy = \\int_a^b \\int_c^d f(x,y) \\, dy \\, dx = \\int_c^d \\int_a^b f(x,y) \\, dx \\, dy"}</MathInline>
                  </div>
                </MathSection>

                <MathSection title="2. Caso especial: Funções separáveis">
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <p style={{ marginBottom: '12px' }}>
                      Quando <MathInline>{"f(x,y) = f_1(x) \\cdot f_2(y)"}</MathInline> (função separável):
                    </p>
                    <MathInline>{"\\iint_R f_1(x)f_2(y) \\, dx \\, dy = \\int_a^b \\int_c^d f_1(x)f_2(y) \\, dy \\, dx"}</MathInline>
                  </div>
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <MathInline>{"= \\int_a^b f_1(x) \\left(\\int_c^d f_2(y) \\, dy\\right) dx"}</MathInline>
                  </div>
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <MathInline>{"= \\left(\\int_c^d f_2(y) \\, dy\\right) \\int_a^b f_1(x) \\, dx"}</MathInline>
                  </div>
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <MathResult>
                      {"= \\left(\\int_a^b f_1(x) \\, dx\\right) \\left(\\int_c^d f_2(y) \\, dy\\right)"}
                    </MathResult>
                  </div>
                </MathSection>

                <MathSection title="3. Propriedades importantes">
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <p style={{ marginBottom: '12px' }}>
                      <strong>Linearidade da integral:</strong>
                    </p>
                    <MathInline>{"\\int_c^d f_1(x)f_2(y) \\, dy = f_1(x) \\int_c^d f_2(y) \\, dy"}</MathInline>
                  </div>
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <p style={{ marginBottom: '12px' }}>
                      Como <MathInline>{"f_1(x)"}</MathInline> é constante em relação a y, pode sair da integral.
                    </p>
                  </div>
                </MathSection>

                <MathSection title="4. Condições de aplicação">
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <p style={{ marginBottom: '12px' }}>
                      ✅ <strong>Função contínua</strong> em domínio retangular
                    </p>
                    <p style={{ marginBottom: '12px' }}>
                      ✅ <strong>Função separável:</strong> <MathInline>{"f(x,y) = f_1(x) \\cdot f_2(y)"}</MathInline>
                    </p>
                    <p style={{ marginBottom: '12px' }}>
                      ✅ <strong>Domínio retangular:</strong> <MathInline>{"[a,b] \\times [c,d]"}</MathInline>
                    </p>
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
              📖 Exemplos de Aplicação:
            </h3>
            <ul style={{ color: '#065f46', paddingLeft: '20px', lineHeight: '1.8' }}>
              <li>🎯 <MathInline>{"\\iint_R x \\cdot y \\, dx \\, dy = \\left(\\int_a^b x \\, dx\\right) \\left(\\int_c^d y \\, dy\\right)"}</MathInline></li>
              <li>📏 <MathInline>{"\\iint_R e^x \\sin(y) \\, dx \\, dy = \\left(\\int_a^b e^x \\, dx\\right) \\left(\\int_c^d \\sin(y) \\, dy\\right)"}</MathInline></li>
              <li>🔢 <MathInline>{"\\iint_R \\cos(x) \\cdot y^2 \\, dx \\, dy = \\left(\\int_a^b \\cos(x) \\, dx\\right) \\left(\\int_c^d y^2 \\, dy\\right)"}</MathInline></li>
              <li>⚡ Simplifica enormemente o cálculo de integrais duplas!</li>
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
              ⚠️ Quando NÃO se aplica:
            </h3>
            <ul style={{ color: '#15803d', paddingLeft: '20px', lineHeight: '1.8' }}>
              <li>❌ <MathInline>{"f(x,y) = x + y"}</MathInline> (não é separável)</li>
              <li>❌ <MathInline>{"f(x,y) = xy + x^2"}</MathInline> (não é separável)</li>
              <li>❌ Domínios não retangulares (círculos, triângulos, etc.)</li>
              <li>❌ Funções descontínuas</li>
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
              ✅ Resposta: <strong>Teorema de Fubini</strong>
            </h3>
            <p style={{ fontSize: '1.125rem' }}>
              O <strong>Teorema de Fubini</strong> garante que integrais duplas podem ser calculadas como integrais iteradas.
            </p>
            <p style={{ marginTop: '8px', opacity: 0.9 }}>
              Para funções separáveis f(x)g(y), a integral dupla se torna o produto de duas integrais simples.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Problem17_TeoremaFubini;