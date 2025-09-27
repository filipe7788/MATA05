import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Calculator, Eye } from 'lucide-react';
import { MathInline, MathSection, MathResult, MathDerivation } from '../components/MathRenderer';

// Componente específico para o Divergente (problema 4)
const Problem04_Divergente = ({ onBack }) => {
  const canvasRef = useRef(null);
  const [showingSteps, setShowingSteps] = useState(false);
  const [showingVisualization, setShowingVisualization] = useState(false);
  const [rotationX, setRotationX] = useState(0);
  const [rotationY, setRotationY] = useState(0);

  // Componentes do campo vetorial F(x,y,z) = x²i + y²j + z²k
  const Fx = useCallback((x, y, z) => x * x, []);
  const Fy = useCallback((x, y, z) => y * y, []);
  const Fz = useCallback((x, y, z) => z * z, []);

  // Divergente: ∇ · F = ∂Fx/∂x + ∂Fy/∂y + ∂Fz/∂z
  const divergence = useCallback((x, y, z) => 2*x + 2*y + 2*z, []);

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
    const arrowLength = 8;

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

  const drawVectorField = useCallback((ctx, centerX, centerY, scale) => {
    const points = [
      [0.5, 0.5, 0.5], [1, 0.5, 0.5], [0.5, 1, 0.5], [0.5, 0.5, 1],
      [1, 1, 0.5], [1, 0.5, 1], [0.5, 1, 1], [1, 1, 1],
      [-0.5, -0.5, -0.5], [-1, -0.5, -0.5], [-0.5, -1, -0.5]
    ];

    points.forEach(point => {
      const [x, y, z] = point;
      const fx = Fx(x, y, z);
      const fy = Fy(x, y, z);
      const fz = Fz(x, y, z);

      const projectedPoint = project3DTo2D(point, rotationX, rotationY, centerX, centerY, scale);
      const projectedVector = project3DTo2D(
        [x + fx * 0.2, y + fy * 0.2, z + fz * 0.2],
        rotationX, rotationY, centerX, centerY, scale
      );

      // Cor baseada no divergente
      const div = divergence(x, y, z);
      const intensity = Math.min(Math.abs(div) / 6, 1);
      const color = div > 0 ? `rgba(231, 76, 60, ${intensity})` : `rgba(52, 152, 219, ${intensity})`;

      // Ponto
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(projectedPoint.x, projectedPoint.y, 4, 0, 2 * Math.PI);
      ctx.fill();

      // Vetor F
      drawArrow(ctx, projectedPoint.x, projectedPoint.y, projectedVector.x, projectedVector.y, color, 2);

      // Mostrar valor do divergente
      ctx.fillStyle = '#2c3e50';
      ctx.font = '10px Arial';
      ctx.fillText(div.toFixed(1), projectedPoint.x + 8, projectedPoint.y - 8);
    });
  }, [Fx, Fy, Fz, divergence, rotationX, rotationY]);

  const draw3DVisualization = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const scale = 50;

    // Limpar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Desenhar eixos
    draw3DAxes(ctx, centerX, centerY, scale);

    // Desenhar campo vetorial
    if (showingVisualization) {
      drawVectorField(ctx, centerX, centerY, scale);
    }

    // Ponto específico P(1,1,1) 
    const P = [1, 1, 1];
    const projectedP = project3DTo2D(P, rotationX, rotationY, centerX, centerY, scale);
    
    // Ponto P
    ctx.fillStyle = '#3b82f6';
    ctx.beginPath();
    ctx.arc(projectedP.x, projectedP.y, 6, 0, 2 * Math.PI);
    ctx.fill();

    // Label do ponto
    ctx.fillStyle = '#2c3e50';
    ctx.font = 'bold 14px Arial';
    ctx.fillText('P(1,1,1)', projectedP.x + 10, projectedP.y - 10);
    ctx.fillText(`div F = ${divergence(1, 1, 1)}`, projectedP.x + 10, projectedP.y + 5);

  }, [rotationX, rotationY, showingVisualization, draw3DAxes, drawVectorField, divergence]);

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
            Questão 4: Divergente de Campo Vetorial
          </h1>
          <p style={{ opacity: 0.9 }}>Cálculo do divergente div F do campo <MathInline>{"\\mathbf{F}(x,y,z) = x^2\\mathbf{i} + y^2\\mathbf{j} + z^2\\mathbf{k}"}</MathInline></p>
        </div>

        {/* Conteúdo principal */}
        <div style={{
          background: 'white',
          borderRadius: '0 0 16px 16px',
          padding: '24px'
        }}>
          {/* Questão */}
          <div className="question-section" style={{
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
              Calcule o divergente <MathInline>{"\\text{div }\\mathbf{F}"}</MathInline> do campo vetorial <MathInline>{"\\mathbf{F}(x,y,z) = x^2\\mathbf{i} + y^2\\mathbf{j} + z^2\\mathbf{k}"}</MathInline>.
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
              <strong>Campo Vetorial:</strong> <MathInline>{"\\mathbf{F}(x,y,z) = x^2\\mathbf{i} + y^2\\mathbf{j} + z^2\\mathbf{k}"}</MathInline>
            </div>
            <div>
              <strong>Divergente:</strong> <MathInline>{"\\text{div }\\mathbf{F} = \\nabla \\cdot \\mathbf{F} = \\frac{\\partial F_x}{\\partial x} + \\frac{\\partial F_y}{\\partial y} + \\frac{\\partial F_z}{\\partial z}"}</MathInline>
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
                🖱️ Clique e arraste para rotacionar • 🔴 Divergente positivo • 🔵 Divergente negativo
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
                
                {/* Seção 1: Componentes do Campo */}
                <MathSection title="1. Identificação das componentes">
                  <div style={{ 
                    textAlign: 'center',
                    marginBottom: '16px',
                    fontSize: '1rem',
                    color: '#495057'
                  }}>
                    <MathInline>{"\\mathbf{F}(x,y,z) = x^2\\mathbf{i} + y^2\\mathbf{j} + z^2\\mathbf{k}"}</MathInline>
                  </div>
                  
                  <div style={{ 
                    fontSize: '1rem',
                    color: '#495057'
                  }}>
                    <MathInline>{"F_x = x^2, \\quad F_y = y^2, \\quad F_z = z^2"}</MathInline>
                  </div>
                </MathSection>

                {/* Seção 2: Cálculo das Derivadas */}
                <MathSection title="2. Cálculo das derivadas parciais">
                  <MathDerivation steps={[
                    {
                      left: '\\frac{\\partial F_x}{\\partial x}',
                      right: '\\frac{\\partial}{\\partial x}(x^2)',
                      result: '2x',
                      color: '#dc3545'
                    },
                    {
                      left: '\\frac{\\partial F_y}{\\partial y}',
                      right: '\\frac{\\partial}{\\partial y}(y^2)',
                      result: '2y',
                      color: '#198754'
                    },
                    {
                      left: '\\frac{\\partial F_z}{\\partial z}',
                      right: '\\frac{\\partial}{\\partial z}(z^2)',
                      result: '2z',
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
                    3. Divergente do campo
                  </h4>
                  
                  <MathResult>
                    {"\\text{div }\\mathbf{F} = \\frac{\\partial F_x}{\\partial x} + \\frac{\\partial F_y}{\\partial y} + \\frac{\\partial F_z}{\\partial z} = 2x + 2y + 2z"}
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
              📖 Conceito do Divergente:
            </h3>
            <ul style={{ color: '#065f46', paddingLeft: '20px', lineHeight: '1.8' }}>
              <li>💨 O <strong>divergente</strong> <MathInline>{"\\nabla \\cdot \\mathbf{F}"}</MathInline> mede a tendência do campo de se expandir ou contrair</li>
              <li>🔴 <strong>Divergente positivo:</strong> campo se expande (fonte)</li>
              <li>🔵 <strong>Divergente negativo:</strong> campo se contrai (sumidouro)</li>
              <li>⚡ <strong>Divergente zero:</strong> campo incompressível</li>
              <li>📊 Neste caso: <MathInline>{"\\text{div }\\mathbf{F} = 2(x + y + z)"}</MathInline> - cresce com a distância da origem</li>
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
              <strong>Divergente: <MathInline>{"2x + 2y + 2z"}</MathInline></strong>
            </p>
            <p style={{ marginTop: '8px', opacity: 0.9 }}>
              O campo tem <strong>fontes</strong> no primeiro octante e <strong>sumidouros</strong> no octante oposto.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Problem04_Divergente;
