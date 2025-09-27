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

// Componente para seção de cálculos matemáticos responsivo
export const MathSection = ({ title, children }) => {
  return (
    <div className="math-section">
      <h4 className="math-section-title">
        {title}
      </h4>
      <div className="math-formula-box">
        {children}
      </div>
    </div>
  );
};

// Componente para resultado destacado responsivo
export const MathResult = ({ children, color = '#667eea' }) => {
  return (
    <div className="final-result">
      <MathBlock>{children}</MathBlock>
    </div>
  );
};

// Componente para linha de derivação matemática responsivo
export const MathDerivation = ({ steps }) => {
  return (
    <div className="math-derivation">
      {steps.map((step, index) => (
        <div key={index} className="math-step">
          <div className="math-left">
            <MathInline>{step.left}</MathInline>
          </div>
          <div className="math-equals">=</div>
          <div className="math-right">
            <MathInline>{step.right}</MathInline>
          </div>
          {step.result && (
            <>
              <div className="math-equals">=</div>
              <div className={`math-result ${step.color === '#198754' ? 'green' : step.color === '#0d6efd' ? 'blue' : ''}`}>
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
