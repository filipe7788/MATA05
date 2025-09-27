import React, { useState } from 'react';
import { BookOpen, Github } from 'lucide-react';
import { weeksData, getProblemComponent } from './problems';
import WeekSection from './components/WeekSection';
import ProblemView from './components/ProblemView';

// Componente principal do App
const App = () => {
  const [currentView, setCurrentView] = useState('home');
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [completedProblems] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

  // Calcular estatísticas
  const totalProblems = weeksData.reduce((acc, week) => acc + week.problems.length, 0);
  const totalCompleted = completedProblems.length;
  const progressPercentage = (totalCompleted / totalProblems) * 100;

  const handleProblemClick = (problem) => {
    if (problem.status === 'locked') return;
    setSelectedProblem(problem);
    setCurrentView('problem');
  };

  const goHome = () => {
    setCurrentView('home');
    setSelectedProblem(null);
  };

  // Renderizar problema específico
  if (currentView === 'problem' && selectedProblem) {
    const ProblemComponent = getProblemComponent(selectedProblem.component);

    if (ProblemComponent) {
      return <ProblemComponent onBack={goHome} />;
    } else {
      return <ProblemView problem={selectedProblem} onBack={goHome} />;
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      {/* Navbar */}
      <nav style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        padding: '1rem'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <BookOpen color="white" size={24} />
            <span style={{ color: 'white', fontWeight: 'bold', fontSize: '1.25rem' }}>MATA05</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <a
              href="https://github.com/filipe7788/MATA05"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: 'rgba(255, 255, 255, 0.8)',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'color 0.3s ease'
              }}
            >
              <Github size={20} />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="app-header">
        <div style={{ textAlign: 'center', color: 'white', marginBottom: '2rem' }}>
          <h1 className="app-title">
            Cálculo D - Visualizações Interativas
          </h1>
          <p className="app-subtitle">
            Explore conceitos de Cálculo Diferencial e Integral através de visualizações dinâmicas
          </p>

          {/* Estatísticas */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '24px',
            marginBottom: '24px',
            flexWrap: 'wrap'
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '12px',
              padding: '16px',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{totalCompleted}</div>
              <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>Resolvidos</div>
            </div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '12px',
              padding: '16px',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{totalProblems}</div>
              <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>Total</div>
            </div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '12px',
              padding: '16px',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{Math.round(progressPercentage)}%</div>
              <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>Progresso</div>
            </div>
          </div>

          {/* Barra de Progresso */}
          <div style={{ maxWidth: '400px', margin: '0 auto' }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '12px',
              height: '12px',
              overflow: 'hidden'
            }}>
              <div
                style={{
                  background: 'linear-gradient(90deg, #22c55e, #10b981)',
                  height: '100%',
                  transition: 'width 0.5s ease',
                  width: `${progressPercentage}%`
                }}
              />
            </div>
          </div>
        </div>

        {/* Grid de Semanas */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {weeksData.map((week) => (
            <WeekSection
              key={week.id}
              week={week}
              completedProblems={completedProblems}
              onProblemClick={handleProblemClick}
            />
          ))}
        </div>

        {/* Seção para adicionar novos problemas */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
          padding: '24px',
          marginTop: '2rem',
          textAlign: 'center',
          color: 'white',
          border: '2px dashed rgba(255, 255, 255, 0.3)'
        }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '12px' }}>
            🚧 Área de Expansão
          </h3>
          <p style={{ opacity: 0.9, fontSize: '1.125rem' }}>
            Novos problemas serão adicionados aqui. A estrutura está organizada para facilitar a expansão!
          </p>
   
        </div>
      </div>
    </div>
  );
};

export default App;