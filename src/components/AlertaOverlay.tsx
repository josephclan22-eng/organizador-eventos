import { Bell, X } from 'lucide-react';
import type { Atividade } from '../types';

interface Props {
  alertas: Atividade[];
  onDismiss: (id: string) => void;
  onDismissAll: () => void;
}

export function AlertaOverlay({ alertas, onDismiss, onDismissAll }: Props) {
  if (alertas.length === 0) return null;

  return (
    <div className="fixed top-20 right-6 z-50 flex flex-col gap-3 max-w-sm">
      {alertas.map(alerta => (
        <div key={alerta.id} className="animate-slide-in rounded-2xl p-5 backdrop-blur-2xl shadow-2xl"
          style={{
            background: 'linear-gradient(160deg, rgba(245,158,11,0.1), rgba(15,17,23,0.95))',
            border: '1px solid rgba(245,158,11,0.2)',
            boxShadow: '0 8px 40px -8px rgba(245,158,11,0.2)',
          }}>
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(245,158,11,0.15)' }}>
              <Bell className="w-5 h-5 text-[#F59E0B] animate-pulse" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-sm leading-snug">{alerta.titulo}</p>
              <p className="text-[#94A3B8] text-xs mt-1.5">
                {new Date(alerta.data_inicio + 'T12:00:00').toLocaleDateString('pt-BR')} às {alerta.horario}
              </p>
              {alerta.local && <p className="text-[#475569] text-[11px] mt-0.5" style={{ fontFamily: "'Inter', sans-serif" }}>{alerta.local}</p>}
            </div>
            <button onClick={() => onDismiss(alerta.id)}
              className="p-1.5 rounded-lg text-[#475569] hover:text-white hover:bg-[rgba(255,255,255,0.06)] transition-all flex-shrink-0">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
      {alertas.length > 1 && (
        <button onClick={onDismissAll} className="text-[11px] text-[#475569] hover:text-[#94A3B8] self-end transition-colors font-medium">
          Dispensar todos
        </button>
      )}
    </div>
  );
}
