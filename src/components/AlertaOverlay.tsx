import { Bell, X } from 'lucide-react';
import type { Atividade } from '../types';

interface AlertaOverlayProps {
  alertas: Atividade[];
  onDismiss: (id: string) => void;
  onDismissAll: () => void;
}

export function AlertaOverlay({ alertas, onDismiss, onDismissAll }: AlertaOverlayProps) {
  if (alertas.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm">
      {alertas.map(alerta => (
        <div
          key={alerta.id}
          className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 animate-slide-in shadow-2xl backdrop-blur-md"
        >
          <div className="flex items-start gap-3">
            <Bell className="w-5 h-5 text-yellow-400 mt-0.5 animate-pulse" />
            <div className="flex-1">
              <p className="text-white font-medium text-sm">{alerta.titulo}</p>
              <p className="text-gray-400 text-xs mt-1">
                {new Date(alerta.data_inicio + 'T12:00:00').toLocaleDateString('pt-BR')} às {alerta.horario}
              </p>
              {alerta.local && (
                <p className="text-gray-500 text-xs">{alerta.local}</p>
              )}
            </div>
            <button
              onClick={() => onDismiss(alerta.id)}
              className="p-1 rounded-lg text-gray-500 hover:text-white hover:bg-gray-700 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
      {alertas.length > 1 && (
        <button
          onClick={onDismissAll}
          className="text-xs text-gray-500 hover:text-white self-end transition-colors"
        >
          Dispensar todos
        </button>
      )}
    </div>
  );
}
