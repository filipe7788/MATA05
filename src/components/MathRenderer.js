import React from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

// Componente para renderizar matemática inline
export const MathInline = ({ children }) => {
  try {
    return <InlineMath math={children} />;
  } catch (error) {
    return <span style={{ color: 'red' }}>Erro: {children}</span>;
  }
};

// Componente para renderizar matemática em bloco
export const MathBlock = ({ children }) => {
  try {
    return <BlockMath math={children} />;
  } catch (error) {
    return <div style={{ color: 'red' }}>Erro: {children}</div>;
  }
};

// Componente para seção de cálculos matemáticos
export const MathSection = ({ title, children }) => {
  return (
    <div style={{ marginBottom: '32px' }}>
      <h4 style={{ 
        color: '#2c3e50', 
        marginBottom: '20px',
        fontSize: '1.1rem',
        fontWeight: '600'
      }}>
        {title}
      </h4>
      <div style={{ 
        background: '#f8f9fa', 
        padding: '24px', 
        borderRadius: '8px',
        border: '1px solid #dee2e6',
        marginBottom: '16px'
      }}>
        {children}
      </div>
    </div>
  );
};

// Componente para resultado destacado
export const MathResult = ({ children, color = '#667eea' }) => {
  return (
    <div style={{ 
      background: `linear-gradient(135deg, ${color} 0%, #764ba2 100%)`, 
      color: 'white',
      padding: '28px', 
      borderRadius: '12px',
      textAlign: 'center',
      border: '2px solid #e9ecef',
      fontSize: '1.2rem'
    }}>
      <MathBlock>{children}</MathBlock>
    </div>
  );
};

// Componente para linha de derivação matemática
export const MathDerivation = ({ steps }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {steps.map((step, index) => (
        <div key={index} style={{ 
          display: 'flex', 
          alignItems: 'center', 
          fontSize: '1.1rem',
          padding: '8px 0'
        }}>
          <div style={{ minWidth: '80px', textAlign: 'right', marginRight: '16px' }}>
            <MathInline>{step.left}</MathInline>
          </div>
          <div style={{ margin: '0 16px', fontSize: '1.2rem' }}>=</div>
          <div style={{ flex: 1 }}>
            <MathInline>{step.right}</MathInline>
          </div>
          {step.result && (
            <>
              <div style={{ margin: '0 16px', fontSize: '1.2rem' }}>=</div>
              <div style={{ 
                background: step.color || '#dc3545', 
                color: 'white', 
                padding: '6px 16px', 
                borderRadius: '20px',
                fontWeight: 'bold'
              }}>
                <MathInline>{step.result}</MathInline>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default { MathInline, MathBlock, MathSection, MathResult, MathDerivation };
