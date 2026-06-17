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
    <div className="fixed top-20 right-6 z-50 flex flex-col gap-3 max-w-sm">
      {alertas.map(alerta => (
        <div
          key={alerta.id}
          className="rounded-2xl p-5 animate-slide-in shadow-2xl backdrop-blur-xl"
          style={{
            background: 'linear-gradient(135deg, rgba(255,183,3,0.12), rgba(255,107,53,0.08))',
            border: '1px solid rgba(255,183,3,0.2)',
          }}
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[rgba(255,183,3,0.15)] flex items-center justify-center">
              <Bell className="w-5 h-5 text-[#FFB703] animate-pulse" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-sm">{alerta.titulo}</p>
              <p className="text-[#A0A8B3] text-xs mt-1">
                {new Date(alerta.data_inicio + 'T12:00:00').toLocaleDateString('pt-BR')} às {alerta.horario}
              </p>
              {alerta.local && (
                <p className="text-[#6B7280] text-xs mt-0.5">{alerta.local}</p>
              )}
            </div>
            <button
              onClick={() => onDismiss(alerta.id)}
              className="p-1.5 rounded-lg text-[#6B7280] hover:text-white hover:bg-[rgba(255,255,255,0.06)] transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
      {alertas.length > 1 && (
        <button onClick={onDismissAll} className="text-xs text-[#6B7280] hover:text-white self-end transition-colors">
          Dispensar todos
        </button>
      )}
    </div>
  );
}
