import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MessageSquare } from 'lucide-react';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Não mostrar navegação na página inicial
  if (location.pathname === '/') {
    return null;
  }

  return (
    <nav className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
            <MessageSquare size={20} fill="currentColor" />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900">
            SilentFeed
          </span>
        </button>

        <div className="flex items-center gap-4">
          {location.pathname === '/feedback' && (
            <button
              onClick={() => navigate('/dashboard')}
              className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
            >
              Ver Dashboard
            </button>
          )}
          
          {location.pathname === '/dashboard' && (
            <button
              onClick={() => navigate('/feedback')}
              className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
            >
              Novo Feedback
            </button>
          )}

          <button
            onClick={() => navigate('/')}
            className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
          >
            Home
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;