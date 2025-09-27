import React from 'react';
import { CheckCircle, Lock, Play } from 'lucide-react';

// Componente para cada problema
const ProblemCard = ({ problem, isCompleted, onClick }) => {
  const getStatusIcon = () => {
    if (isCompleted) return <CheckCircle color="#22c55e" size={20} />;
    if (problem.status === 'locked') return <Lock color="#9ca3af" size={20} />;
    return <Play color="#3b82f6" size={20} />;
  };

  const getCardStyle = () => {
    if (isCompleted) return 'linear-gradient(135deg, #22c55e, #10b981)';
    if (problem.status === 'locked') return 'linear-gradient(135deg, #9ca3af, #6b7280)';
    return 'linear-gradient(135deg, #7c3aed, #ec4899)';
  };

  return (
    <div
      onClick={onClick}
      style={{
        background: getCardStyle(),
        color: 'white',
        borderRadius: '16px',
        padding: '24px',
        cursor: problem.status === 'locked' ? 'not-allowed' : 'pointer',
        transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'hidden',
        opacity: problem.status === 'locked' ? 0.75 : 1,
        minHeight: '240px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
        transform: 'translateY(0)',
        ':hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 12px 35px rgba(0,0,0,0.2)'
        }
      }}
      onMouseEnter={(e) => {
        if (problem.status !== 'locked') {
          e.target.style.transform = 'translateY(-5px)';
          e.target.style.boxShadow = '0 12px 35px rgba(0,0,0,0.2)';
        }
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = 'translateY(0)';
        e.target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
      }}
    >
      {/* Header do card */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '16px'
      }}>
        {/* Número do problema */}
        <div style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          opacity: 0.4,
          lineHeight: '1'
        }}>
          {problem.id}
        </div>

        {/* Ícone de status */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.2)',
          borderRadius: '50%',
          padding: '8px',
          backdropFilter: 'blur(4px)'
        }}>
          {getStatusIcon()}
        </div>
      </div>

      {/* Conteúdo principal */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{
          fontWeight: 'bold',
          fontSize: '1.25rem',
          marginBottom: '12px',
          lineHeight: '1.3',
          color: 'white'
        }}>
          {problem.title}
        </h3>

        <p style={{
          fontSize: '0.9rem',
          opacity: 0.95,
          marginBottom: '20px',
          lineHeight: '1.5',
          flex: 1,
          color: 'white'
        }}>
          {problem.description}
        </p>

        {/* Tags */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '6px',
          marginTop: 'auto'
        }}>
          {problem.tags.map((tag, index) => (
            <span
              key={index}
              style={{
                background: 'rgba(255, 255, 255, 0.25)',
                backdropFilter: 'blur(8px)',
                padding: '6px 12px',
                borderRadius: '20px',
                fontSize: '0.75rem',
                fontWeight: '500',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProblemCard;