import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Calculator, Eye } from 'lucide-react';
import { MathInline, MathSection, MathResult, MathDerivation } from '../components/MathRenderer';

const Problem18_IntegralTriangulo = ({ onBack }) => {
  const canvasRef = useRef(null);
  const [showingSteps, setShowingSteps] = useState(false);
  const [showingVisualization, setShowingVisualization] = useState(false);

  const drawTriangle = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    const xMin = -0.5, xMax = 2.5, yMin = -0.5, yMax = 1.5;
    const scaleX = width / (xMax - xMin);
    const scaleY = height / (yMax - yMin);

    const toCanvasX = (x) => (x - xMin) * scaleX;
    const toCanvasY = (y) => height - (y - yMin) * scaleY;

    // Grade
    ctx.strokeStyle = '#f1f3f4';
    ctx.lineWidth = 1;
    for (let x = -0.5; x <= 2.5; x += 0.5) {
      ctx.beginPath();
      ctx.moveTo(toCanvasX(x), 0);
      ctx.lineTo(toCanvasX(x), height);
      ctx.stroke();
    }
    for (let y = -0.5; y <= 1.5; y += 0.5) {
      ctx.beginPath();
      ctx.moveTo(0, toCanvasY(y));
      ctx.lineTo(width, toCanvasY(y));
      ctx.stroke();
    }

    // Eixos
    ctx.strokeStyle = '#495057';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, toCanvasY(0));
    ctx.lineTo(width, toCanvasY(0));
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(toCanvasX(0), 0);
    ctx.lineTo(toCanvasX(0), height);
    ctx.stroke();

    // Triângulo com vértices (0,0), (1,0), (2,1)
    const vertices = [[0, 0], [1, 0], [2, 1]];
    ctx.fillStyle = 'rgba(59, 130, 246, 0.3)';
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 3;

    ctx.beginPath();
    ctx.moveTo(toCanvasX(vertices[0][0]), toCanvasY(vertices[0][1]));
    vertices.slice(1).forEach(v => {
      ctx.lineTo(toCanvasX(v[0]), toCanvasY(v[1]));
    });
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Labels dos vértices
    ctx.fillStyle = '#1e40af';
    ctx.font = 'bold 14px Arial';
    ctx.fillText('(0,0)', toCanvasX(0) + 5, toCanvasY(0) - 10);
    ctx.fillText('(1,0)', toCanvasX(1) + 5, toCanvasY(0) - 10);
    ctx.fillText('(2,1)', toCanvasX(2) + 5, toCanvasY(1) + 20);

    ctx.fillStyle = '#495057';
    ctx.font = '14px Arial';
    ctx.fillText('x', width - 20, toCanvasY(0) - 10);
    ctx.fillText('y', toCanvasX(0) + 10, 20);

    if (showingVisualization) {
      // Mostrar a função y sendo integrada
      ctx.fillStyle = '#dc2626';
      ctx.font = '12px Arial';

      // Desenhar algumas linhas verticais mostrando a função y
      for (let x = 0.2; x <= 1.8; x += 0.4) {
        const yMax = x <= 1 ? 0 : (x - 1) / 1; // y = (x-1) para x > 1
        const yMin = 0;

        if (yMax > yMin) {
          const midY = (yMax + yMin) / 2;
          ctx.fillStyle = `rgba(220, 38, 38, 0.6)`;
          ctx.fillRect(toCanvasX(x) - 2, toCanvasY(yMax), 4, toCanvasY(yMin) - toCanvasY(yMax));

          ctx.fillStyle = '#dc2626';
          ctx.fillText(`y=${midY.toFixed(1)}`, toCanvasX(x) - 15, toCanvasY(midY) - 10);
        }
      }
    }

  }, [showingVisualization]);

  useEffect(() => {
    drawTriangle();
  }, [drawTriangle]);

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
            Questão 18: Integral sobre Triângulo
          </h1>
          <p style={{ opacity: 0.9 }}>Calcule ∬ydxdy onde B é o triângulo de vértices (0,0), (1,0) e (2,1)</p>
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
              Calcule <MathInline>{"\\iint_B y \\, dx \\, dy"}</MathInline>, onde <MathInline>B</MathInline> é o triângulo de vértices <MathInline>(0,0)</MathInline>, <MathInline>(1,0)</MathInline> e <MathInline>(2,1)</MathInline>.
            </p>
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

          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
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

                <MathSection title="1. Determinando os limites de integração">
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <p style={{ marginBottom: '12px' }}>Vértices: (0,0), (1,0), (2,1)</p>
                    <p style={{ marginBottom: '12px' }}>Equação da reta de (1,0) a (2,1): <MathInline>{"y = x - 1"}</MathInline></p>
                    <p style={{ marginBottom: '12px' }}>Equação da reta de (0,0) a (2,1): <MathInline>{"y = \\frac{x}{2}"}</MathInline></p>
                  </div>
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <p style={{ marginBottom: '12px' }}>Para <MathInline>{"0 \\leq x \\leq 1"}</MathInline>: <MathInline>{"0 \\leq y \\leq \\frac{x}{2}"}</MathInline></p>
                    <p style={{ marginBottom: '12px' }}>Para <MathInline>{"1 \\leq x \\leq 2"}</MathInline>: <MathInline>{"0 \\leq y \\leq x - 1"}</MathInline></p>
                  </div>
                </MathSection>

                <MathSection title="2. Configuração da integral">
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <MathInline>{"\\iint_B y \\, dx \\, dy = \\int_0^1 \\int_0^{x/2} y \\, dy \\, dx + \\int_1^2 \\int_0^{x-1} y \\, dy \\, dx"}</MathInline>
                  </div>
                </MathSection>

                <MathSection title="3. Primeira integral (0 ≤ x ≤ 1)">
                  <MathDerivation steps={[
                    {
                      left: '\\int_0^{x/2} y \\, dy',
                      right: '\\left[\\frac{y^2}{2}\\right]_0^{x/2}',
                      result: '\\frac{(x/2)^2}{2} = \\frac{x^2}{8}'
                    },
                    {
                      left: '\\int_0^1 \\frac{x^2}{8} \\, dx',
                      right: '\\frac{1}{8}\\left[\\frac{x^3}{3}\\right]_0^1',
                      result: '\\frac{1}{8} \\cdot \\frac{1}{3} = \\frac{1}{24}'
                    }
                  ]} />
                </MathSection>

                <MathSection title="4. Segunda integral (1 ≤ x ≤ 2)">
                  <MathDerivation steps={[
                    {
                      left: '\\int_0^{x-1} y \\, dy',
                      right: '\\left[\\frac{y^2}{2}\\right]_0^{x-1}',
                      result: '\\frac{(x-1)^2}{2}'
                    },
                    {
                      left: '\\int_1^2 \\frac{(x-1)^2}{2} \\, dx',
                      right: '\\frac{1}{2}\\int_1^2 (x-1)^2 \\, dx',
                      result: '\\frac{1}{2}\\left[\\frac{(x-1)^3}{3}\\right]_1^2'
                    },
                    {
                      left: '',
                      right: '\\frac{1}{2} \\cdot \\frac{1^3}{3}',
                      result: '\\frac{1}{6}'
                    }
                  ]} />
                </MathSection>

                <MathSection title="5. Resultado final">
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <p style={{ marginBottom: '12px' }}>
                      Somando os resultados das duas integrais:
                    </p>
                    <MathInline>{"\\text{Primeira integral: } \\frac{1}{24}"}</MathInline>
                  </div>
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <MathInline>{"\\text{Segunda integral: } \\frac{1}{8}"}</MathInline>
                  </div>
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <MathInline>{"\\frac{1}{24} + \\frac{1}{8} = \\frac{1}{24} + \\frac{3}{24} = \\frac{4}{24} = \\frac{1}{6}"}</MathInline>
                  </div>
                  <MathResult>
                    {"\\iint_B y \\, dx \\, dy = \\frac{1}{6}"}
                  </MathResult>
                </MathSection>
              </div>
            </div>
          )}

          <div style={{
            background: 'linear-gradient(135deg, #10b981, #059669)',
            color: 'white',
            padding: '24px',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '12px' }}>
              ✅ Resposta: <MathInline>{"\\frac{1}{6}"}</MathInline>
            </h3>
            <p style={{ fontSize: '1.125rem' }}>
              A integral dupla sobre o triângulo é <MathInline>{"\\frac{1}{6}"}</MathInline>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Problem18_IntegralTriangulo;