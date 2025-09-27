import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Calculator, Eye } from 'lucide-react';
import { MathInline, MathSection, MathResult } from '../components/MathRenderer';

const Problem14_AreaGeometrica = ({ onBack }) => {
  const canvasRef = useRef(null);
  const [showingSteps, setShowingSteps] = useState(false);
  const [showingVisualization, setShowingVisualization] = useState(false);

  const drawAreaVisualization = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Limpar canvas
    ctx.clearRect(0, 0, width, height);

    // Configurar sistema de coordenadas
    const xMin = -0.5, xMax = 3.5, yMin = -0.5, yMax = 2.5;
    const scaleX = width / (xMax - xMin);
    const scaleY = height / (yMax - yMin);

    const toCanvasX = (x) => (x - xMin) * scaleX;
    const toCanvasY = (y) => height - (y - yMin) * scaleY;

    // Desenhar grade
    ctx.strokeStyle = '#f1f3f4';
    ctx.lineWidth = 1;

    for (let x = -0.5; x <= 3.5; x += 0.5) {
      ctx.beginPath();
      ctx.moveTo(toCanvasX(x), 0);
      ctx.lineTo(toCanvasX(x), height);
      ctx.stroke();
    }

    for (let y = -0.5; y <= 2.5; y += 0.5) {
      ctx.beginPath();
      ctx.moveTo(0, toCanvasY(y));
      ctx.lineTo(width, toCanvasY(y));
      ctx.stroke();
    }

    // Eixos principais
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

    // Desenhar diferentes regiões como exemplos
    const regions = [
      {
        type: 'rectangle',
        x1: 0.5, y1: 0.5, x2: 1.5, y2: 1.2,
        color: 'rgba(59, 130, 246, 0.4)',
        stroke: '#3b82f6',
        label: 'Retângulo\nÁrea = 0.7',
        area: (1.5 - 0.5) * (1.2 - 0.5)
      },
      {
        type: 'circle',
        cx: 2.5, cy: 1, r: 0.4,
        color: 'rgba(16, 185, 129, 0.4)',
        stroke: '#10b981',
        label: 'Círculo\nÁrea ≈ 0.50',
        area: Math.PI * 0.4 * 0.4
      },
      {
        type: 'triangle',
        points: [[0.2, 1.8], [1, 1.8], [0.6, 2.3]],
        color: 'rgba(245, 158, 11, 0.4)',
        stroke: '#f59e0b',
        label: 'Triângulo\nÁrea = 0.2',
        area: 0.5 * 0.8 * 0.5
      }
    ];

    regions.forEach((region, index) => {
      ctx.fillStyle = region.color;
      ctx.strokeStyle = region.stroke;
      ctx.lineWidth = 2;

      if (region.type === 'rectangle') {
        const x = toCanvasX(region.x1);
        const y = toCanvasY(region.y2);
        const w = toCanvasX(region.x2) - toCanvasX(region.x1);
        const h = toCanvasY(region.y1) - toCanvasY(region.y2);

        ctx.fillRect(x, y, w, h);
        ctx.strokeRect(x, y, w, h);

        // Label
        ctx.fillStyle = region.stroke;
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'center';
        const lines = region.label.split('\n');
        lines.forEach((line, i) => {
          ctx.fillText(line, x + w/2, y + h/2 + i * 15 - 10);
        });
      }

      else if (region.type === 'circle') {
        ctx.beginPath();
        ctx.arc(toCanvasX(region.cx), toCanvasY(region.cy), region.r * scaleX, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();

        // Label
        ctx.fillStyle = region.stroke;
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'center';
        const lines = region.label.split('\n');
        lines.forEach((line, i) => {
          ctx.fillText(line, toCanvasX(region.cx), toCanvasY(region.cy) + i * 15 - 10);
        });
      }

      else if (region.type === 'triangle') {
        ctx.beginPath();
        ctx.moveTo(toCanvasX(region.points[0][0]), toCanvasY(region.points[0][1]));
        region.points.slice(1).forEach(point => {
          ctx.lineTo(toCanvasX(point[0]), toCanvasY(point[1]));
        });
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Label
        const centerX = region.points.reduce((sum, p) => sum + p[0], 0) / 3;
        const centerY = region.points.reduce((sum, p) => sum + p[1], 0) / 3;
        ctx.fillStyle = region.stroke;
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'center';
        const lines = region.label.split('\n');
        lines.forEach((line, i) => {
          ctx.fillText(line, toCanvasX(centerX), toCanvasY(centerY) + i * 15 - 10);
        });
      }
    });

    // Labels dos eixos
    ctx.fillStyle = '#495057';
    ctx.font = '14px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('x', width - 20, toCanvasY(0) - 10);
    ctx.fillText('y', toCanvasX(0) + 10, 20);

    if (showingVisualization) {
      // Mostrar grid mais fino para demonstrar discretização
      ctx.strokeStyle = 'rgba(220, 38, 38, 0.3)';
      ctx.lineWidth = 1;

      // Desenhar pequenos retângulos para mostrar a soma de Riemann
      const dx = 0.1;
      const dy = 0.1;

      // Sobre o retângulo
      for (let x = 0.5; x < 1.5; x += dx) {
        for (let y = 0.5; y < 1.2; y += dy) {
          ctx.strokeRect(toCanvasX(x), toCanvasY(y + dy), dx * scaleX, dy * scaleY);
        }
      }

      // Adicionar texto explicativo
      ctx.fillStyle = '#dc2626';
      ctx.font = 'bold 14px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('∬ 1 dxdy = Soma de', width/2, 30);
      ctx.fillText('pequenos retângulos', width/2, 50);
    }

  }, [showingVisualization]);

  useEffect(() => {
    drawAreaVisualization();
  }, [drawAreaVisualization]);

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
            Questão 14: Significado Geométrico de ∬1dxdy
          </h1>
          <p style={{ opacity: 0.9 }}>Qual o significado geométrico da integral ∬1dxdy?</p>
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
              Calcule <MathInline>{"\\iint_A 1 \\, dx \\, dy"}</MathInline>, onde <MathInline>A</MathInline> é o retângulo <MathInline>[1, 2] \\times [0, 1]</MathInline>.
              Qual o significado geométrico do resultado?
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
              <strong>Integral:</strong> <MathInline>{"\\iint_A 1 \\, dx \\, dy"}</MathInline>
            </div>
            <div style={{ marginBottom: '12px' }}>
              <strong>Região:</strong> <MathInline>A = [1, 2] \\times [0, 1]</MathInline>
            </div>
            <div>
              <strong>Pergunta:</strong> O que este resultado representa geometricamente?
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
              {showingVisualization ? 'Ocultar Discretização' : 'Mostrar Discretização'}
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
                📊 Exemplos de regiões e suas áreas calculadas por ∬1dxdy
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
                🧮 Resolução e Interpretação:
              </h3>
              <div className="math-container">

                <MathSection title="1. Cálculo da integral">
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <MathInline>{"\\iint_A 1 \\, dx \\, dy = \\int_0^1 \\int_1^2 1 \\, dx \\, dy"}</MathInline>
                  </div>
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <MathInline>{"= \\int_0^1 [x]_1^2 \\, dy = \\int_0^1 (2-1) \\, dy"}</MathInline>
                  </div>
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <MathInline>{"= \\int_0^1 1 \\, dy = [y]_0^1 = 1"}</MathInline>
                  </div>
                </MathSection>

                <MathSection title="2. Interpretação geométrica">
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <p style={{ marginBottom: '12px' }}>
                      A integral <MathInline>{"\\iint_A 1 \\, dx \\, dy"}</MathInline> representa a <strong>ÁREA</strong> da região <MathInline>A</MathInline>
                    </p>
                  </div>
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <MathInline>{"\\text{Área}(A) = \\text{base} \\times \\text{altura} = (2-1) \\times (1-0) = 1"}</MathInline>
                  </div>
                </MathSection>

                <MathSection title="3. Justificativa matemática">
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <p style={{ marginBottom: '12px' }}>
                      Quando integramos a função constante <MathInline>f(x,y) = 1</MathInline>:
                    </p>
                    <MathInline>{"\\iint_A f(x,y) \\, dx \\, dy = \\iint_A 1 \\, dx \\, dy = \\text{Volume do cilindro}"}</MathInline>
                  </div>
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <p style={{ marginBottom: '12px' }}>
                      Como a altura é constante = 1:
                    </p>
                    <MathInline>{"\\text{Volume} = \\text{Área da base} \\times \\text{altura} = \\text{Área}(A) \\times 1 = \\text{Área}(A)"}</MathInline>
                  </div>
                </MathSection>

                <MathSection title="4. Generalização">
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <MathResult>
                      {"\\iint_R 1 \\, dx \\, dy = \\text{Área}(R)"}
                    </MathResult>
                  </div>
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <p>Para qualquer região <MathInline>R</MathInline> em <MathInline>{"\\mathbb{R}^2"}</MathInline></p>
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
              📖 Significado Geométrico:
            </h3>
            <ul style={{ color: '#065f46', paddingLeft: '20px', lineHeight: '1.8' }}>
              <li>📏 <MathInline>{"\\iint_R 1 \\, dx \\, dy"}</MathInline> calcula a <strong>ÁREA</strong> da região <MathInline>R</MathInline></li>
              <li>🎯 É equivalente a <strong>somar infinitos retângulos</strong> infinitesimais de área <MathInline>dx \, dy</MathInline></li>
              <li>📐 Para retângulos: <strong>Área = base × altura</strong></li>
              <li>⭕ Para círculos: <strong>Área = πr²</strong></li>
              <li>🔺 Para triângulos: <strong>Área = ½ × base × altura</strong></li>
              <li>⚡ É o método mais geral para calcular <strong>áreas de regiões complexas</strong></li>
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
              🎓 Conexão com Soma de Riemann:
            </h3>
            <ul style={{ color: '#15803d', paddingLeft: '20px', lineHeight: '1.8' }}>
              <li>🔢 <MathInline>{"\\iint_R 1 \\, dx \\, dy = \\lim_{\\Delta x, \\Delta y \\to 0} \\sum_{i,j} 1 \\cdot \\Delta x \\cdot \\Delta y"}</MathInline></li>
              <li>📊 Cada termo <MathInline>{"\\Delta x \\cdot \\Delta y"}</MathInline> é a área de um pequeno retângulo</li>
              <li>🔄 A soma de todas essas pequenas áreas nos dá a área total da região</li>
              <li>♾️ No limite, obtemos a área exata da região</li>
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
              ✅ Resposta: <strong>ÁREA da região</strong>
            </h3>
            <p style={{ fontSize: '1.125rem' }}>
              <MathInline>{"\\iint_A 1 \\, dx \\, dy = 1"}</MathInline> representa a <strong>área</strong> da região <MathInline>{"A"}</MathInline>
            </p>
            <p style={{ marginTop: '8px', opacity: 0.9 }}>
              A integral dupla da função constante 1 sempre calcula a área da região de integração.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Problem14_AreaGeometrica;