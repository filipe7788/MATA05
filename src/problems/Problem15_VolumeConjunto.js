import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Calculator, Box } from 'lucide-react';
import { MathInline, MathSection, MathResult, MathDerivation } from '../components/MathRenderer';

const Problem15_VolumeConjunto = ({ onBack }) => {
  const canvasRef = useRef(null);
  const [showingSteps, setShowingSteps] = useState(false);
  const [showingVisualization, setShowingVisualization] = useState(false);
  const [rotationX, setRotationX] = useState(0.3);
  const [rotationY, setRotationY] = useState(0.5);

  const project3DTo2D = useCallback((point, rotX, rotY, centerX, centerY, scale) => {
    const [x, y, z] = point;

    // Rotações
    const cosX = Math.cos(rotX);
    const sinX = Math.sin(rotX);
    const cosY = Math.cos(rotY);
    const sinY = Math.sin(rotY);

    // Aplicar rotações
    const y1 = y * cosX - z * sinX;
    const z1 = y * sinX + z * cosX;
    const x1 = x * cosY + z1 * sinY;

    // Projeção ortogonal
    return {
      x: centerX + x1 * scale,
      y: centerY - y1 * scale
    };
  }, []);

  const draw3DVisualization = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const scale = 80;

    // Limpar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Desenhar eixos 3D
    const axisLength = 1.5;

    // Eixo X (vermelho)
    const xEnd = project3DTo2D([axisLength, 0, 0], rotationX, rotationY, centerX, centerY, scale);
    ctx.strokeStyle = '#dc2626';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(xEnd.x, xEnd.y);
    ctx.stroke();
    ctx.fillStyle = '#dc2626';
    ctx.font = 'bold 16px Arial';
    ctx.fillText('X', xEnd.x + 5, xEnd.y + 5);

    // Eixo Y (verde)
    const yEnd = project3DTo2D([0, axisLength, 0], rotationX, rotationY, centerX, centerY, scale);
    ctx.strokeStyle = '#16a34a';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(yEnd.x, yEnd.y);
    ctx.stroke();
    ctx.fillStyle = '#16a34a';
    ctx.fillText('Y', yEnd.x + 5, yEnd.y + 5);

    // Eixo Z (azul)
    const zEnd = project3DTo2D([0, 0, axisLength], rotationX, rotationY, centerX, centerY, scale);
    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(zEnd.x, zEnd.y);
    ctx.stroke();
    ctx.fillStyle = '#2563eb';
    ctx.fillText('Z', zEnd.x + 5, zEnd.y + 5);

    // Desenhar o cubo unitário [0,1]³
    const vertices = [
      [0, 0, 0], [1, 0, 0], [1, 1, 0], [0, 1, 0], // base inferior
      [0, 0, 1], [1, 0, 1], [1, 1, 1], [0, 1, 1]  // base superior
    ];

    const edges = [
      [0, 1], [1, 2], [2, 3], [3, 0], // base inferior
      [4, 5], [5, 6], [6, 7], [7, 4], // base superior
      [0, 4], [1, 5], [2, 6], [3, 7]  // arestas verticais
    ];

    // Projetar vértices
    const projectedVertices = vertices.map(v =>
      project3DTo2D(v, rotationX, rotationY, centerX, centerY, scale)
    );

    // Desenhar arestas do cubo
    ctx.strokeStyle = '#6b7280';
    ctx.lineWidth = 1;
    edges.forEach(edge => {
      const [i, j] = edge;
      ctx.beginPath();
      ctx.moveTo(projectedVertices[i].x, projectedVertices[i].y);
      ctx.lineTo(projectedVertices[j].x, projectedVertices[j].y);
      ctx.stroke();
    });

    if (showingVisualization) {
      // Desenhar a superfície z = x + 2y como uma malha
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2;

      // Malha da superfície
      const steps = 5;
      for (let i = 0; i <= steps; i++) {
        for (let j = 0; j <= steps; j++) {
          const x1 = i / steps;
          const y1 = j / steps;
          const z1 = x1 + 2 * y1;

          if (z1 <= 3) { // Limitar a altura para visualização
            const p1 = project3DTo2D([x1, y1, z1], rotationX, rotationY, centerX, centerY, scale);

            if (i < steps) {
              const x2 = (i + 1) / steps;
              const z2 = x2 + 2 * y1;
              if (z2 <= 3) {
                const p2 = project3DTo2D([x2, y1, z2], rotationX, rotationY, centerX, centerY, scale);
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
              }
            }

            if (j < steps) {
              const y2 = (j + 1) / steps;
              const z2 = x1 + 2 * y2;
              if (z2 <= 3) {
                const p2 = project3DTo2D([x1, y2, z2], rotationX, rotationY, centerX, centerY, scale);
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
              }
            }
          }
        }
      }

      // Sombrear a região do volume
      ctx.fillStyle = 'rgba(245, 158, 11, 0.3)';
      const regionPoints = [
        [0, 0, 0], [1, 0, 0], [1, 0, 1], [0, 0, 0], // face x=0
        [0, 1, 0], [1, 1, 0], [1, 1, 3], [0, 1, 2] // face y=1
      ];

      // Desenhar algumas faces do sólido
      const faces = [
        [[0, 0, 0], [1, 0, 0], [1, 0, 1], [0, 0, 0]], // base y=0
        [[0, 1, 0], [1, 1, 0], [1, 1, 3], [0, 1, 2]]  // topo y=1 (limitado)
      ];

      faces.forEach(face => {
        ctx.beginPath();
        const firstPoint = project3DTo2D(face[0], rotationX, rotationY, centerX, centerY, scale);
        ctx.moveTo(firstPoint.x, firstPoint.y);

        face.slice(1).forEach(point => {
          const projPoint = project3DTo2D(point, rotationX, rotationY, centerX, centerY, scale);
          ctx.lineTo(projPoint.x, projPoint.y);
        });

        ctx.closePath();
        ctx.fill();
      });
    }

    // Labels dos vértices do cubo
    ctx.fillStyle = '#374151';
    ctx.font = '10px Arial';
    [[0, 0, 0], [1, 0, 0], [1, 1, 0], [0, 1, 0],
     [0, 0, 1], [1, 0, 1], [1, 1, 1], [0, 1, 1]].forEach((vertex, i) => {
      const projected = project3DTo2D(vertex, rotationX, rotationY, centerX, centerY, scale);
      ctx.fillText(`(${vertex[0]},${vertex[1]},${vertex[2]})`, projected.x + 5, projected.y - 5);
    });

  }, [rotationX, rotationY, showingVisualization, project3DTo2D]);

  useEffect(() => {
    draw3DVisualization();
  }, [draw3DVisualization]);

  const handleMouseMove = (e) => {
    if (e.buttons === 1) { // Botão esquerdo pressionado
      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setRotationY((x / rect.width - 0.5) * Math.PI);
      setRotationX((y / rect.height - 0.5) * Math.PI);
    }
  };

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
            Questão 15: Volume do Conjunto
          </h1>
          <p style={{ opacity: 0.9 }}>Volume do conjunto (x,y,z) ∈ ℝ³ com 0 ≤ x ≤ 1, 0 ≤ y ≤ 1, 0 ≤ z ≤ x + 2y</p>
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
              Calcule o volume do conjunto <MathInline>{"(x,y,z) \\in \\mathbb{R}^3"}</MathInline> tal que{' '}
              <MathInline>{"0 \\leq x \\leq 1"}</MathInline>, <MathInline>{"0 \\leq y \\leq 1"}</MathInline> e <MathInline>{"0 \\leq z \\leq x + 2y"}</MathInline>.
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
              <strong>Região:</strong> <MathInline>{"0 \\leq x \\leq 1, \\; 0 \\leq y \\leq 1, \\; 0 \\leq z \\leq x + 2y"}</MathInline>
            </div>
            <div style={{ marginBottom: '12px' }}>
              <strong>Volume:</strong> <MathInline>{"V = \\iiint_E 1 \\, dx \\, dy \\, dz"}</MathInline>
            </div>
            <div>
              <strong>Método:</strong> Integral tripla sobre a região E
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
              <Box size={20} />
              {showingVisualization ? 'Ocultar Superfície' : 'Mostrar Superfície'}
            </button>
          </div>

          {/* Canvas 3D */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
            <div style={{ textAlign: 'center' }}>
              <canvas
                ref={canvasRef}
                width={700}
                height={500}
                onMouseMove={handleMouseMove}
                style={{
                  border: '2px solid #d1d5db',
                  borderRadius: '8px',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                  background: 'white',
                  cursor: 'grab'
                }}
              />
              <p style={{ color: '#6b7280', fontSize: '0.875rem', marginTop: '8px' }}>
                🖱️ Clique e arraste para rotacionar a visualização 3D
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

                <MathSection title="1. Configuração da integral tripla">
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <MathInline>{"V = \\iiint_E 1 \\, dx \\, dy \\, dz"}</MathInline>
                  </div>
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <p style={{ marginBottom: '12px' }}>Como <MathInline>{"0 \\leq z \\leq x + 2y"}</MathInline>, temos:</p>
                    <MathInline>{"V = \\int_0^1 \\int_0^1 \\int_0^{x+2y} 1 \\, dz \\, dx \\, dy"}</MathInline>
                  </div>
                </MathSection>

                <MathSection title="2. Integração em relação a z">
                  <MathDerivation steps={[
                    {
                      left: '\\int_0^{x+2y} 1 \\, dz',
                      right: '[z]_0^{x+2y}',
                      result: 'x + 2y'
                    }
                  ]} />
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <p>Agora temos:</p>
                    <MathInline>{"V = \\int_0^1 \\int_0^1 (x + 2y) \\, dx \\, dy"}</MathInline>
                  </div>
                </MathSection>

                <MathSection title="3. Integração em relação a x">
                  <MathDerivation steps={[
                    {
                      left: '\\int_0^1 (x + 2y) \\, dx',
                      right: '\\int_0^1 x \\, dx + \\int_0^1 2y \\, dx',
                      result: '\\left[\\frac{x^2}{2}\\right]_0^1 + 2y[x]_0^1'
                    },
                    {
                      left: '',
                      right: '\\frac{1}{2} + 2y(1)',
                      result: '\\frac{1}{2} + 2y'
                    }
                  ]} />
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <p>Agora temos:</p>
                    <MathInline>{"V = \\int_0^1 \\left(\\frac{1}{2} + 2y\\right) dy"}</MathInline>
                  </div>
                </MathSection>

                <MathSection title="4. Integração em relação a y">
                  <MathDerivation steps={[
                    {
                      left: '\\int_0^1 \\left(\\frac{1}{2} + 2y\\right) dy',
                      right: '\\frac{1}{2}[y]_0^1 + 2\\left[\\frac{y^2}{2}\\right]_0^1',
                      result: '\\frac{1}{2}(1) + 2\\left(\\frac{1}{2}\\right)'
                    },
                    {
                      left: '',
                      right: '\\frac{1}{2} + 1',
                      result: '\\frac{3}{2}'
                    }
                  ]} />
                </MathSection>

                <MathSection title="5. Resultado final">
                  <MathResult>
                    {"V = \\frac{3}{2}"}
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
              📖 Interpretação Geométrica:
            </h3>
            <ul style={{ color: '#065f46', paddingLeft: '20px', lineHeight: '1.8' }}>
              <li>🎯 O sólido está <strong>limitado superiormente</strong> pela superfície <MathInline>z = x + 2y</MathInline></li>
              <li>📦 A <strong>base</strong> é o quadrado unitário <MathInline>[0,1] \times [0,1]</MathInline> no plano xy</li>
              <li>📏 A <strong>altura</strong> em cada ponto (x,y) é <MathInline>z = x + 2y</MathInline></li>
              <li>🔢 O volume é a integral da função altura sobre a base</li>
              <li>⚡ Como a superfície é um <strong>plano inclinado</strong>, o sólido é um prisma oblíquo</li>
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
              🎓 Verificação Alternativa:
            </h3>
            <ul style={{ color: '#15803d', paddingLeft: '20px', lineHeight: '1.8' }}>
              <li>📊 Podemos ver este resultado como <MathInline>{"V = \\iint_D (x + 2y) \\, dx \\, dy"}</MathInline></li>
              <li>📐 Onde D = [0,1] × [0,1] é a projeção no plano xy</li>
              <li>🔍 Isso confirma que o volume sob uma superfície z = f(x,y) é <MathInline>{"\\iint_D f(x,y) \\, dx \\, dy"}</MathInline></li>
              <li>✅ Resultado: Volume = 3/2 unidades cúbicas</li>
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
              ✅ Resposta: <MathInline>{"V = \\frac{3}{2}"}</MathInline>
            </h3>
            <p style={{ fontSize: '1.125rem' }}>
              O volume do conjunto é <MathInline>{"\\frac{3}{2}"}</MathInline> unidades cúbicas.
            </p>
            <p style={{ marginTop: '8px', opacity: 0.9 }}>
              Este sólido está limitado superiormente pela superfície z = x + 2y sobre o quadrado unitário.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Problem15_VolumeConjunto;