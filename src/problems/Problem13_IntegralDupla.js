import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Calculator, Eye } from 'lucide-react';
import { MathInline, MathSection, MathResult, MathDerivation } from '../components/MathRenderer';

const Problem13_IntegralDupla = ({ onBack }) => {
  const canvasRef = useRef(null);
  const [showingSteps, setShowingSteps] = useState(false);
  const [showingVisualization, setShowingVisualization] = useState(false);

  const drawRegion = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Limpar canvas
    ctx.clearRect(0, 0, width, height);

    // Configurar sistema de coordenadas
    const xMin = 0, xMax = 3, yMin = -0.5, yMax = 1.5;
    const scaleX = width / (xMax - xMin);
    const scaleY = height / (yMax - yMin);

    const toCanvasX = (x) => (x - xMin) * scaleX;
    const toCanvasY = (y) => height - (y - yMin) * scaleY;

    // Desenhar grade
    ctx.strokeStyle = '#f1f3f4';
    ctx.lineWidth = 1;

    // Linhas verticais
    for (let x = 0; x <= 3; x += 0.5) {
      ctx.beginPath();
      ctx.moveTo(toCanvasX(x), 0);
      ctx.lineTo(toCanvasX(x), height);
      ctx.stroke();
    }

    // Linhas horizontais
    for (let y = -0.5; y <= 1.5; y += 0.5) {
      ctx.beginPath();
      ctx.moveTo(0, toCanvasY(y));
      ctx.lineTo(width, toCanvasY(y));
      ctx.stroke();
    }

    // Eixos principais
    ctx.strokeStyle = '#495057';
    ctx.lineWidth = 2;

    // Eixo x
    ctx.beginPath();
    ctx.moveTo(0, toCanvasY(0));
    ctx.lineTo(width, toCanvasY(0));
    ctx.stroke();

    // Eixo y
    ctx.beginPath();
    ctx.moveTo(toCanvasX(0), 0);
    ctx.lineTo(toCanvasX(0), height);
    ctx.stroke();

    // Destacar o retângulo [1,2] × [0,1]
    ctx.fillStyle = 'rgba(59, 130, 246, 0.3)';
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 3;

    const rectX = toCanvasX(1);
    const rectY = toCanvasY(1);
    const rectWidth = toCanvasX(2) - toCanvasX(1);
    const rectHeight = toCanvasY(0) - toCanvasY(1);

    ctx.fillRect(rectX, rectY, rectWidth, rectHeight);
    ctx.strokeRect(rectX, rectY, rectWidth, rectHeight);

    // Labels dos eixos
    ctx.fillStyle = '#495057';
    ctx.font = '14px Arial';
    ctx.fillText('x', width - 20, toCanvasY(0) - 10);
    ctx.fillText('y', toCanvasX(0) + 10, 20);

    // Labels do retângulo
    ctx.fillStyle = '#1e40af';
    ctx.font = 'bold 12px Arial';
    ctx.fillText('1', toCanvasX(1) - 5, toCanvasY(0) + 15);
    ctx.fillText('2', toCanvasX(2) - 5, toCanvasY(0) + 15);
    ctx.fillText('0', toCanvasX(0) - 15, toCanvasY(0) + 5);
    ctx.fillText('1', toCanvasX(0) - 15, toCanvasY(1) + 5);

    // Título da região
    ctx.fillStyle = '#3b82f6';
    ctx.font = 'bold 14px Arial';
    ctx.fillText('R = [1,2] × [0,1]', toCanvasX(1.2), toCanvasY(0.5));

    if (showingVisualization) {
      // Desenhar algumas setas representando o campo (x + 2y)
      ctx.strokeStyle = '#dc2626';
      ctx.fillStyle = '#dc2626';
      ctx.lineWidth = 2;

      const points = [
        {x: 1.2, y: 0.2}, {x: 1.5, y: 0.2}, {x: 1.8, y: 0.2},
        {x: 1.2, y: 0.5}, {x: 1.5, y: 0.5}, {x: 1.8, y: 0.5},
        {x: 1.2, y: 0.8}, {x: 1.5, y: 0.8}, {x: 1.8, y: 0.8}
      ];

      points.forEach(p => {
        const value = p.x + 2 * p.y;
        const height = value * 20; // Escala para visualização

        // Desenhar barra vertical representando f(x,y) = x + 2y
        ctx.fillStyle = `rgba(220, 38, 38, ${Math.min(value / 4, 1)})`;
        ctx.fillRect(toCanvasX(p.x) - 3, toCanvasY(p.y), 6, -height);

        // Label do valor
        ctx.fillStyle = '#dc2626';
        ctx.font = '10px Arial';
        ctx.fillText(value.toFixed(1), toCanvasX(p.x) - 8, toCanvasY(p.y) - height - 5);
      });
    }

  }, [showingVisualization]);

  useEffect(() => {
    drawRegion();
  }, [drawRegion]);

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
            Questão 13: Integral Dupla ∬(x+2y)dxdy
          </h1>
          <p style={{ opacity: 0.9 }}>Cálculo da integral dupla sobre o retângulo [1,2] × [0,1]</p>
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
              Calcule a integral dupla <MathInline>{"\\iint_A (x + 2y) \\, dx \\, dy"}</MathInline>, onde <MathInline>A</MathInline> é o retângulo <MathInline>[1, 2] \\times [0, 1]</MathInline>.
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
              <strong>Integral:</strong> <MathInline>{"\\iint_A (x + 2y) \\, dx \\, dy"}</MathInline>
            </div>
            <div style={{ marginBottom: '12px' }}>
              <strong>Região:</strong> <MathInline>A = [1, 2] \\times [0, 1]</MathInline>
            </div>
            <div>
              <strong>Limites:</strong> <MathInline>1 \\leq x \\leq 2</MathInline> e <MathInline>0 \\leq y \\leq 1</MathInline>
            </div>
          </div>

          <div style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            marginBottom: '24px',
            flexWrap: 'wrap'
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
            <button
              onClick={() => setShowingVisualization(!showingVisualization)}
              style={{
                background: '#3b82f6',
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
              <Eye size={20} />
              {showingVisualization ? 'Ocultar Função' : 'Mostrar Função'}
            </button>
          </div>

          {/* Canvas com visualização */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
            <div style={{ textAlign: 'center' }}>
              <canvas
                ref={canvasRef}
                width={600}
                height={400}
                style={{
                  border: '2px solid #d1d5db',
                  borderRadius: '8px',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                  background: 'white'
                }}
              />
              <p style={{ color: '#6b7280', fontSize: '0.875rem', marginTop: '8px' }}>
                📊 Região de integração A = [1,2] × [0,1]
              </p>
            </div>
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
                    <MathInline>{"\\iint_A (x + 2y) \\, dx \\, dy = \\int_0^1 \\int_1^2 (x + 2y) \\, dx \\, dy"}</MathInline>
                  </div>
                </MathSection>

                <MathSection title="2. Integração em relação a x">
                  <MathDerivation steps={[
                    {
                      left: '\\int_1^2 (x + 2y) \\, dx',
                      right: '\\int_1^2 x \\, dx + \\int_1^2 2y \\, dx',
                      result: '\\int_1^2 x \\, dx + 2y \\int_1^2 dx'
                    },
                    {
                      left: '',
                      right: '\\left[\\frac{x^2}{2}\\right]_1^2 + 2y[x]_1^2',
                      result: '\\frac{4-1}{2} + 2y(2-1)'
                    },
                    {
                      left: '',
                      right: '\\frac{3}{2} + 2y',
                      result: '\\frac{3}{2} + 2y'
                    }
                  ]} />
                </MathSection>

                <MathSection title="3. Integração em relação a y">
                  <MathDerivation steps={[
                    {
                      left: '\\int_0^1 \\left(\\frac{3}{2} + 2y\\right) dy',
                      right: '\\int_0^1 \\frac{3}{2} \\, dy + \\int_0^1 2y \\, dy',
                      result: '\\frac{3}{2}[y]_0^1 + 2\\left[\\frac{y^2}{2}\\right]_0^1'
                    },
                    {
                      left: '',
                      right: '\\frac{3}{2}(1-0) + 2\\left(\\frac{1-0}{2}\\right)',
                      result: '\\frac{3}{2} + 1'
                    },
                    {
                      left: '',
                      right: '\\frac{3}{2} + \\frac{2}{2}',
                      result: '\\frac{5}{2}'
                    }
                  ]} />
                </MathSection>

                <MathSection title="4. Resultado final">
                  <MathResult>
                    {"\\iint_A (x + 2y) \\, dx \\, dy = \\frac{5}{2}"}
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
              📖 Conceitos da Integral Dupla:
            </h3>
            <ul style={{ color: '#065f46', paddingLeft: '20px', lineHeight: '1.8' }}>
              <li>🎯 <strong>Teorema de Fubini:</strong> permite calcular integrais duplas como integrais iteradas</li>
              <li>📏 Integramos primeiro em <strong>x</strong> (tratando <strong>y</strong> como constante)</li>
              <li>🔢 Depois integramos em <strong>y</strong> o resultado obtido</li>
              <li>📐 Para retângulos, os limites de integração são <strong>constantes</strong></li>
              <li>⚡ O resultado representa o <strong>volume</strong> sob a superfície z = x + 2y</li>
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
              ✅ Resposta: <MathInline>{"\\frac{5}{2}"}</MathInline>
            </h3>
            <p style={{ fontSize: '1.125rem' }}>
              A integral dupla <MathInline>{"\\iint_A (x + 2y) \\, dx \\, dy = \\frac{5}{2}"}</MathInline>
            </p>
            <p style={{ marginTop: '8px', opacity: 0.9 }}>
              Este valor representa o volume do sólido limitado pela superfície z = x + 2y sobre a região A.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Problem13_IntegralDupla;