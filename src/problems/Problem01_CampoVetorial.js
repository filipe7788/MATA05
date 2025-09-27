import React, { useState, useEffect, useRef, useCallback } from 'react';
import { BarChart3 } from 'lucide-react';
import { MathInline } from '../components/MathRenderer';

// Componente específico para o Campo Vetorial (problema 1)
const Problem01_CampoVetorial = ({ onBack }) => {
  const canvasRef = useRef(null);
  const [showingSpecific, setShowingSpecific] = useState(false);
  const [calculations, setCalculations] = useState('');

  const drawVectorField = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const scale = 30;

    // Limpar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Desenhar grade
    drawGrid(ctx, canvas, centerX, centerY, scale);

    if (showingSpecific) {
      drawSpecificPoints(ctx, centerX, centerY, scale);
    } else {
      drawCompleteField(ctx, centerX, centerY, scale);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showingSpecific]);

  useEffect(() => {
    drawVectorField();
  }, [drawVectorField]);

  const drawGrid = (ctx, canvas, centerX, centerY, scale) => {
    ctx.strokeStyle = '#f1f3f4';
    ctx.lineWidth = 1;

    // Linhas verticais e horizontais
    for (let x = centerX % scale; x < canvas.width; x += scale) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }

    for (let y = centerY % scale; y < canvas.height; y += scale) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // Eixos principais
    ctx.strokeStyle = '#495057';
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(canvas.width, centerY);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, canvas.height);
    ctx.stroke();

    // Labels
    ctx.fillStyle = '#495057';
    ctx.font = '14px Arial';
    ctx.fillText('x', canvas.width - 20, centerY - 10);
    ctx.fillText('y', centerX + 10, 20);
    ctx.fillText('0', centerX + 5, centerY - 5);
  };

  const drawCompleteField = (ctx, centerX, centerY, scale) => {
    for (let x = -10; x <= 10; x += 2) {
      for (let y = -8; y <= 8; y += 2) {
        if (x === 0 && y === 0) continue;

        const screenX = centerX + x * scale;
        const screenY = centerY - y * scale;
        const [vx, vy] = [-y, x]; // F(x,y) = -yi + xj

        drawVector(ctx, screenX, screenY, vx, vy, '#e74c3c', 0.3);
      }
    }
  };

  const drawSpecificPoints = (ctx, centerX, centerY, scale) => {
    const points = [
      { x: 1, y: 0, label: '(1,0)' },
      { x: 0, y: 1, label: '(0,1)' },
      { x: -1, y: 0, label: '(-1,0)' },
      { x: 0, y: -1, label: '(0,-1)' },
      { x: 2, y: 0, label: '(2,0)' },
      { x: 0, y: 2, label: '(0,2)' }
    ];

    let calcs = 'Cálculos passo a passo:\n\n';

    points.forEach(point => {
      const screenX = centerX + point.x * scale;
      const screenY = centerY - point.y * scale;
      const [vx, vy] = [-point.y, point.x];

      // Desenhar ponto
      ctx.fillStyle = '#2c3e50';
      ctx.beginPath();
      ctx.arc(screenX, screenY, 5, 0, 2 * Math.PI);
      ctx.fill();

      // Label do ponto
      ctx.fillStyle = '#2c3e50';
      ctx.font = '12px Arial';
      ctx.fillText(point.label, screenX + 8, screenY - 8);

      // Desenhar vetor
      drawVector(ctx, screenX, screenY, vx, vy, '#e74c3c', 0.5);

      calcs += `Ponto ${point.label}: F(${point.x}, ${point.y}) = (-${point.y}, ${point.x}) = (${vx}, ${vy})\n`;
    });

    setCalculations(calcs);
  };

  const drawVector = (ctx, startX, startY, vx, vy, color, scale) => {
    const endX = startX + vx * scale * 20;
    const endY = startY - vy * scale * 20;

    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 2;

    // Corpo da seta
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();

    // Ponta da seta
    const angle = Math.atan2(-(endY - startY), endX - startX);
    const arrowLength = 8;

    ctx.beginPath();
    ctx.moveTo(endX, endY);
    ctx.lineTo(endX - arrowLength * Math.cos(angle - Math.PI/6),
              endY + arrowLength * Math.sin(angle - Math.PI/6));
    ctx.moveTo(endX, endY);
    ctx.lineTo(endX - arrowLength * Math.cos(angle + Math.PI/6),
              endY + arrowLength * Math.sin(angle + Math.PI/6));
    ctx.stroke();
  };

  const toggleSpecific = () => {
    setShowingSpecific(!showingSpecific);
    if (!showingSpecific) {
      setCalculations('');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '16px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Botão de Voltar - Fixo no topo */}
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
            Campo Vetorial <MathInline>{"\\mathbf{F}(x,y) = -y\\mathbf{i} + x\\mathbf{j}"}</MathInline>
          </h1>
          <p style={{ opacity: 0.9 }}>Visualização interativa do campo vetorial rotacional</p>
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
              Análise do campo vetorial <MathInline>{"\\mathbf{F}(x,y) = -y\\mathbf{i} + x\\mathbf{j}"}</MathInline> no plano xy.
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
              <strong>Campo Vetorial:</strong> <MathInline>{"\\mathbf{F}(x,y) = -y\\mathbf{i} + x\\mathbf{j}"}</MathInline>
            </div>
            <div>
              <strong>Forma Componente:</strong> <MathInline>{"\\mathbf{F}(x,y) = (-y, x)"}</MathInline>
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
              onClick={toggleSpecific}
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
              <BarChart3 size={20} />
              {showingSpecific ? 'Campo Completo' : 'Pontos Específicos'}
            </button>
          </div>

          {/* Canvas */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
            <canvas
              ref={canvasRef}
              width={700}
              height={500}
              style={{
                border: '2px solid #d1d5db',
                borderRadius: '8px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                background: 'white'
              }}
            />
          </div>

          {/* Cálculos */}
          {showingSpecific && calculations && (
            <div style={{
              background: '#fef3c7',
              borderLeft: '4px solid #f59e0b',
              padding: '16px',
              marginBottom: '24px',
              borderRadius: '0 8px 8px 0'
            }}>
              <h3 style={{ fontWeight: 'bold', color: '#92400e', marginBottom: '12px' }}>
                🧮 Cálculos Passo-a-Passo:
              </h3>
              <pre style={{
                color: '#92400e',
                fontSize: '0.875rem',
                whiteSpace: 'pre-wrap',
                fontFamily: 'monospace'
              }}>
                {calculations}
              </pre>
            </div>
          )}

          {/* Explicação */}
          <div style={{
            background: '#d1fae5',
            borderLeft: '4px solid #10b981',
            padding: '16px',
            marginBottom: '24px',
            borderRadius: '0 8px 8px 0'
          }}>
            <h3 style={{ fontWeight: 'bold', color: '#065f46', marginBottom: '12px' }}>
              📖 Explicação do Conceito:
            </h3>
            <p style={{ color: '#065f46', marginBottom: '12px' }}>
              <strong>Campo Vetorial Rotacional:</strong> O campo <MathInline>{"\\mathbf{F}(x,y) = -y\\mathbf{i} + x\\mathbf{j}"}</MathInline>{' '}
              representa vetores que circulam ao redor da origem no sentido anti-horário.
            </p>
            <ul style={{ color: '#065f46', paddingLeft: '20px' }}>
              <li>🔄 Os vetores são sempre <strong>perpendiculares</strong> ao raio que vai da origem ao ponto</li>
              <li>📏 A <strong>magnitude</strong> do vetor aumenta conforme nos afastamos da origem</li>
              <li>🎯 Na origem (0,0), o vetor é <strong>nulo</strong>: <MathInline>{"\\mathbf{F}(0,0) = (0,0)"}</MathInline></li>
              <li>🌪️ Este padrão é característico de um <strong>campo de rotação</strong></li>
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
              ✅ Análise do Campo Vetorial
            </h3>
            <p style={{ fontSize: '1.125rem' }}>
              O campo vetorial <MathInline>{"\\mathbf{F}(x,y) = -y\\mathbf{i} + x\\mathbf{j}"}</MathInline> representa um{' '}
              <strong>CAMPO DE ROTAÇÃO ANTI-HORÁRIO</strong> ao redor da origem.
            </p>
            <p style={{ marginTop: '8px', opacity: 0.9 }}>
              Isso pode ser observado na visualização acima, onde todos os vetores formam um padrão circular.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Problem01_CampoVetorial;