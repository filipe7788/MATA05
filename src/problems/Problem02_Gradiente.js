import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Calculator, Eye } from 'lucide-react';
import { MathInline, MathSection, MathResult, MathDerivation } from '../components/MathRenderer';

// Componente específico para o Gradiente (problema 2)
const Problem02_Gradiente = ({ onBack }) => {
  const canvasRef = useRef(null);
  const [showingSteps, setShowingSteps] = useState(false);
  const [showingVisualization, setShowingVisualization] = useState(false);
  const [rotationX, setRotationX] = useState(0);
  const [rotationY, setRotationY] = useState(0);

  // Função escalar f(x,y,z) = x²y³ - 2xz (comentada pois não é usada diretamente)
  // const f = (x, y, z) => x * x * y * y * y - 2 * x * z;

  // Derivadas parciais
  const fx = useCallback((x, y, z) => 2 * x * y * y * y - 2 * z, []);
  const fy = useCallback((x, y, z) => 3 * x * x * y * y, []);
  const fz = useCallback((x, y, z) => -2 * x, []);

  // Gradiente no ponto
  const gradient = useCallback((x, y, z) => [fx(x, y, z), fy(x, y, z), fz(x, y, z)], [fx, fy, fz]);

  const project3DTo2D = (point, rotX, rotY, centerX, centerY, scale) => {
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
    // const z2 = -x * sinY + z1 * cosY; // não usado na projeção 2D

    // Projeção ortogonal
    return {
      x: centerX + x1 * scale,
      y: centerY - y1 * scale
    };
  };

  const drawArrow = (ctx, x1, y1, x2, y2, color, lineWidth) => {
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = lineWidth;

    // Linha principal
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    // Ponta da seta
    const angle = Math.atan2(y2 - y1, x2 - x1);
    const arrowLength = 10;

    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - arrowLength * Math.cos(angle - Math.PI/6),
              y2 - arrowLength * Math.sin(angle - Math.PI/6));
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - arrowLength * Math.cos(angle + Math.PI/6),
              y2 - arrowLength * Math.sin(angle + Math.PI/6));
    ctx.stroke();
  };

  const draw3DAxes = useCallback((ctx, centerX, centerY, scale) => {
    const axisLength = 3;
    
    // Eixo X (vermelho)
    const xEnd = project3DTo2D([axisLength, 0, 0], rotationX, rotationY, centerX, centerY, scale);
    ctx.strokeStyle = '#e74c3c';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(xEnd.x, xEnd.y);
    ctx.stroke();
    ctx.fillStyle = '#e74c3c';
    ctx.font = 'bold 16px Arial';
    ctx.fillText('X', xEnd.x + 5, xEnd.y + 5);

    // Eixo Y (verde)
    const yEnd = project3DTo2D([0, axisLength, 0], rotationX, rotationY, centerX, centerY, scale);
    ctx.strokeStyle = '#22c55e';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(yEnd.x, yEnd.y);
    ctx.stroke();
    ctx.fillStyle = '#22c55e';
    ctx.fillText('Y', yEnd.x + 5, yEnd.y + 5);

    // Eixo Z (azul)
    const zEnd = project3DTo2D([0, 0, axisLength], rotationX, rotationY, centerX, centerY, scale);
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(zEnd.x, zEnd.y);
    ctx.stroke();
    ctx.fillStyle = '#3b82f6';
    ctx.fillText('Z', zEnd.x + 5, zEnd.y + 5);

    // Origem
    ctx.fillStyle = '#6b7280';
    ctx.beginPath();
    ctx.arc(centerX, centerY, 4, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillText('O', centerX + 8, centerY - 8);
  }, [rotationX, rotationY]);

  const drawGradientField = useCallback((ctx, centerX, centerY, scale) => {
    const points = [
      [0.5, -0.5, 1], [1.5, -0.5, 1], [0.5, -1.5, 1],
      [1, 0, 2], [2, -1, 1], [0, -1, 2]
    ];

    points.forEach(point => {
      const grad = gradient(point[0], point[1], point[2]);
      const projectedPoint = project3DTo2D(point, rotationX, rotationY, centerX, centerY, scale);
      const projectedGrad = project3DTo2D(
        [point[0] + grad[0] * 0.05, point[1] + grad[1] * 0.05, point[2] + grad[2] * 0.05],
        rotationX, rotationY, centerX, centerY, scale
      );

      // Ponto menor
      ctx.fillStyle = '#94a3b8';
      ctx.beginPath();
      ctx.arc(projectedPoint.x, projectedPoint.y, 3, 0, 2 * Math.PI);
      ctx.fill();

      // Vetor gradiente menor
      drawArrow(ctx, projectedPoint.x, projectedPoint.y, projectedGrad.x, projectedGrad.y, '#94a3b8', 1.5);
    });
  }, [gradient, rotationX, rotationY]);

  const draw3DVisualization = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const scale = 50;

    // Limpar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Desenhar sistema de coordenadas 3D
    draw3DAxes(ctx, centerX, centerY, scale);

    // Ponto P(1, -1, 2)
    const P = [1, -1, 2];
    const grad = gradient(P[0], P[1], P[2]);

    // Projetar ponto 3D para 2D
    const projectedP = project3DTo2D(P, rotationX, rotationY, centerX, centerY, scale);
    const projectedGrad = project3DTo2D(
      [P[0] + grad[0] * 0.1, P[1] + grad[1] * 0.1, P[2] + grad[2] * 0.1],
      rotationX, rotationY, centerX, centerY, scale
    );

    // Desenhar ponto P
    ctx.fillStyle = '#e74c3c';
    ctx.beginPath();
    ctx.arc(projectedP.x, projectedP.y, 8, 0, 2 * Math.PI);
    ctx.fill();

    // Label do ponto
    ctx.fillStyle = '#2c3e50';
    ctx.font = 'bold 14px Arial';
    ctx.fillText('P(1, -1, 2)', projectedP.x + 15, projectedP.y - 10);

    // Desenhar vetor gradiente
    drawArrow(ctx, projectedP.x, projectedP.y, projectedGrad.x, projectedGrad.y, '#3b82f6', 3);

    // Label do gradiente
    ctx.fillStyle = '#3b82f6';
    ctx.font = 'bold 12px Arial';
    ctx.fillText('∇f = (-6, 3, -2)', projectedGrad.x + 10, projectedGrad.y - 10);

    // Desenhar alguns vetores do campo gradiente em outros pontos
    if (showingVisualization) {
      drawGradientField(ctx, centerX, centerY, scale);
    }

  }, [rotationX, rotationY, showingVisualization, gradient, draw3DAxes, drawGradientField]);

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
        {/* Botão de Voltar */}
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
              gap: '8px',
              backdropFilter: 'blur(10px)'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 12px 35px rgba(34, 197, 94, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 8px 25px rgba(34, 197, 94, 0.3)';
            }}
          >
            <span style={{ fontSize: '1.2rem' }}>←</span>
            Voltar ao Dashboard
          </button>
        </div>

        {/* Header */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px 16px 0 0',
          padding: '24px',
          color: 'white'
        }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '8px' }}>
            Questão 2: Gradiente de Função Escalar
          </h1>
          <p style={{ opacity: 0.9 }}>Cálculo do vetor gradiente ∇f no ponto P = (1, -1, 2)</p>
        </div>

        {/* Conteúdo principal */}
        <div style={{
          background: 'white',
          borderRadius: '0 0 16px 16px',
          padding: '24px'
        }}>
          {/* Questão */}
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
              Cálculo do vetor gradiente da função escalar <MathInline>f(x, y, z) = x^2y^3 - 2xz</MathInline> no ponto <MathInline>P = (1, -1, 2)</MathInline>.
            </p>
          </div>

          {/* Fórmula */}
          <div style={{
            background: '#f3f4f6',
            padding: '20px',
            borderRadius: '8px',
            textAlign: 'center',
            marginBottom: '24px'
          }}>
            <div style={{ marginBottom: '12px' }}>
              <strong>Função:</strong> <MathInline>f(x, y, z) = x^2y^3 - 2xz</MathInline>
            </div>
            <div style={{ marginBottom: '12px' }}>
              <strong>Ponto:</strong> <MathInline>P = (1, -1, 2)</MathInline>
            </div>
            <div>
              <strong>Gradiente:</strong> <MathInline>{"\\nabla f = \\left(\\frac{\\partial f}{\\partial x}, \\frac{\\partial f}{\\partial y}, \\frac{\\partial f}{\\partial z}\\right)"}</MathInline>
            </div>
          </div>

          {/* Controles */}
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
                gap: '8px',
                transition: 'background 0.3s ease'
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
                gap: '8px',
                transition: 'background 0.3s ease'
              }}
            >
              <Eye size={20} />
              {showingVisualization ? 'Ocultar Campo' : 'Mostrar Campo'}
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

          {/* Cálculos passo-a-passo */}
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
                
                {/* Seção 1: Derivadas Parciais */}
                <MathSection title="1. Cálculo das derivadas parciais">
                  <div style={{ 
                    textAlign: 'center',
                    marginBottom: '24px',
                    fontSize: '1.1rem',
                    color: '#495057'
                  }}>
                    Dada: <MathInline>f(x, y, z) = x^2y^3 - 2xz</MathInline>
                  </div>
                  
                  <MathDerivation steps={[
                    {
                      left: '\\frac{\\partial f}{\\partial x}',
                      right: '\\frac{\\partial}{\\partial x}(x^2y^3 - 2xz) = 2xy^3 - 2z',
                      result: '2xy^3 - 2z',
                      color: '#dc3545'
                    },
                    {
                      left: '\\frac{\\partial f}{\\partial y}',
                      right: '\\frac{\\partial}{\\partial y}(x^2y^3 - 2xz) = 3x^2y^2',
                      result: '3x^2y^2',
                      color: '#198754'
                    },
                    {
                      left: '\\frac{\\partial f}{\\partial z}',
                      right: '\\frac{\\partial}{\\partial z}(x^2y^3 - 2xz) = -2x',
                      result: '-2x',
                      color: '#0d6efd'
                    }
                  ]} />
                </MathSection>

                {/* Seção 2: Avaliação no Ponto */}
                <MathSection title="2. Avaliação no ponto P(1, -1, 2)">
                  <MathDerivation steps={[
                    {
                      left: '\\frac{\\partial f}{\\partial x}',
                      right: '2(1)(-1)^3 - 2(2) = 2(1)(-1) - 4 = -2 - 4',
                      result: '-6',
                      color: '#dc3545'
                    },
                    {
                      left: '\\frac{\\partial f}{\\partial y}',
                      right: '3(1)^2(-1)^2 = 3(1)(1)',
                      result: '3',
                      color: '#198754'
                    },
                    {
                      left: '\\frac{\\partial f}{\\partial z}',
                      right: '-2(1)',
                      result: '-2',
                      color: '#0d6efd'
                    }
                  ]} />
                </MathSection>

                {/* Seção 3: Resultado Final */}
                <div style={{ marginBottom: '20px' }}>
                  <h4 style={{ 
                    color: '#2c3e50', 
                    marginBottom: '20px',
                    fontSize: '1.1rem',
                    fontWeight: '600'
                  }}>
                    3. Vetor gradiente
                  </h4>
                  
                  <MathResult>
                    {"\\nabla f(P) = (-6, 3, -2) = -6\\mathbf{i} + 3\\mathbf{j} - 2\\mathbf{k}"}
                  </MathResult>
                </div>
              </div>
            </div>
          )}

          {/* Explicação do Conceito */}
          <div style={{
            background: '#d1fae5',
            borderLeft: '4px solid #10b981',
            padding: '16px',
            marginBottom: '24px',
            borderRadius: '0 8px 8px 0'
          }}>
            <h3 style={{ fontWeight: 'bold', color: '#065f46', marginBottom: '12px' }}>
              📖 Conceito do Gradiente:
            </h3>
            <ul style={{ color: '#065f46', paddingLeft: '20px', lineHeight: '1.8' }}>
              <li>🎯 O <strong>gradiente <MathInline>{"\\nabla f"}</MathInline></strong> é um vetor que aponta na direção de maior crescimento da função</li>
              <li>📏 Sua <strong>magnitude</strong> <MathInline>{"|\\nabla f|"}</MathInline> indica a taxa de variação máxima naquele ponto</li>
              <li>🧮 É calculado como <MathInline>{"\\nabla f = \\left(\\frac{\\partial f}{\\partial x}, \\frac{\\partial f}{\\partial y}, \\frac{\\partial f}{\\partial z}\\right)"}</MathInline></li>
              <li>⊥ É sempre <strong>perpendicular</strong> às curvas de nível da função</li>
              <li>🔄 Na visualização 3D, você pode ver como o gradiente se comporta em diferentes pontos</li>
            </ul>
          </div>

          {/* Resposta */}
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
              <strong>Gradiente: <MathInline>{"-6\\mathbf{i} + 3\\mathbf{j} - 2\\mathbf{k}"}</MathInline></strong>
            </p>
            <p style={{ marginTop: '8px', opacity: 0.9 }}>
              O gradiente no ponto <MathInline>P(1, -1, 2)</MathInline> é o vetor <MathInline>(-6, 3, -2)</MathInline>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Problem02_Gradiente;
