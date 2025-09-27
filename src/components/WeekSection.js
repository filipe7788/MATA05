import React from 'react';
import { Calendar } from 'lucide-react';
import ProblemCard from './ProblemCard';

// Componente para cada semana
const WeekSection = ({ week, completedProblems, onProblemClick }) => {
  const weekProgress = week.problems.filter(p => completedProblems.includes(p.id)).length;
  const weekTotal = week.problems.length;
  const weekPercentage = (weekProgress / weekTotal) * 100;

  return (
    <div style={{
      background: 'white',
      borderRadius: '16px',
      padding: '24px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
      transition: 'transform 0.3s ease',
    }}>
      {/* Header da Semana */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px',
        paddingBottom: '16px',
        borderBottom: '2px solid #f1f5f9'
      }}>
        <div>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#1e293b',
            marginBottom: '8px'
          }}>
            Semana {week.id}: {week.title}
          </h2>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#7c3aed',
            marginBottom: '8px'
          }}>
            <Calendar size={16} />
            <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>{week.period}</span>
          </div>
        </div>
        <div style={{
          background: 'linear-gradient(135deg, #7c3aed, #ec4899)',
          color: 'white',
          padding: '8px 16px',
          borderRadius: '20px',
          fontSize: '0.875rem',
          fontWeight: '500'
        }}>
          {weekProgress}/{weekTotal} completos
        </div>
      </div>

      {/* Tópicos */}
      <p style={{
        color: '#64748b',
        marginBottom: '24px',
        fontStyle: 'italic',
        lineHeight: '1.6'
      }}>
        {week.topics}
      </p>

      {/* Barra de progresso da semana */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{
          background: '#e2e8f0',
          borderRadius: '8px',
          height: '8px',
          overflow: 'hidden'
        }}>
          <div
            style={{
              background: 'linear-gradient(90deg, #7c3aed, #ec4899)',
              height: '100%',
              transition: 'width 0.5s ease',
              width: `${weekPercentage}%`
            }}
          />
        </div>
      </div>

      {/* Grid de Problemas */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '20px'
      }}>
        {week.problems.map((problem) => (
          <ProblemCard
            key={problem.id}
            problem={problem}
            isCompleted={completedProblems.includes(problem.id)}
            onClick={() => onProblemClick(problem)}
          />
        ))}
      </div>
    </div>
  );
};

export default WeekSection;