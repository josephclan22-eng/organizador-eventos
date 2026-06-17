import { useState, useEffect, useCallback, useRef } from 'react';
import type { Atividade } from '../types';
import { updateAtividade } from '../lib/storage';

const ALERT_SOUND = `
data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACAf39/f4B/gH+Af4B/gH+Af4B/f3+AgH+Af39/f3+Af3+Af39/f3+Af39/f3+Af39/gH+Af4B/gH+Af4B/gH+Af39/f4B/gH+Af39/f3+Af3+Af39/f3+Af39/f3+Af39/gH+Af4B/gH+Af4B/gH+Af39/f4B/gH+Af39/f3+Af3+Af39/f3+Af39/f3+Af39/gH+Af4B/gH+Af4B/gH+Af39/f4B/gH+Af39/f3+Af3+Af39/f3+Af39/f3+Af39/gH+Af4B/gH+Af4B/gH+Af39/f4B/gH+Af39/f3+Af3+Af39/f3+Af39/f3+Af39/gH+Af4B/gH+Af4B/gH+Af39/f4B/gH+Af39/f3+Af3+Af39/f3+Af39/f3+Af39/gH+Af4B/gH+Af4B/gH+Af39/f4B/gH+Af39/f3+Af3+Af39/f3+Af39/f3+Af39/gH+Af4B/gH+Af4B/gH+Af39/f4B/gH+Af39/f3+Af3+Af39/f3+Af39/f3+Af39/gH+Af4B/gH+Af4B/gH+Af39/f4B/gH+Af39/f3+Af3+Af39/f3+Af39/f3+Af39/gH+Af4B/gH+Af4B/gH+Af39/f4B/gH+Af39/f3+Af3+Af39/f3+Af39/f3+Af39/gH+Af4B/gH+Af4B/gH+Af39/f4B/gH+Af39/f3+Af3+Af39/f3+Af39/f3+Af39/gH+Af4B/gH+Af4B/gH+Af39/f4B/gH+Af39/f3+Af3+Af39/f3+Af39/f3+Af39/gH+Af4B/gH+Af4B/gH+Af39/f4B/gH+Af39/f3+Af3+Af39/f3+Af39/f3+Af39/gH+Af4B/gH+Af4B/gH+Af39/f4B/gH+Af39/f3+Af3+Af39/f3+Af39/f3+Af39/gH+Af4B/gH+Af4B/gH+Af39/f4B/gH+Af39/f3+Af3+Af39/f3+Af39/f3+Af39/gH+Af4B/gH+Af4B/gH+Af39/f4B/gH+Af39/f3+Af3+Af39/f3+Af39/f3+Af39/gH+Af4B/gH+Af4B/gH+Af39/f4B/gH+Af39/f3+Af3+Af39/f3+Af39/f3+Af39/gH+Af4B/gH+Af4B/gH+Af39/f4B/gH+Af39/f3+Af3+Af39/f3+Af39/f3+Af39/gH+Af4B/gH+Af4B/gH+Af39/f4B/gH+Af39/f3+Af3+Af39/f3+Af39/f3+Af39/gH+Af4B/gH+Af4B/gH+Af39/f4B/gH+Af39/f3+Af3+Af39/f3+Af39/f3+Af39/gH+Af4B/gH+Af4B/gH+Af39/f4B/gH+Af39/f3+Af3+Af39/f3+Af39/f3+Af39/gH+Af4B/gH+Af4B/gH+A;
`;

export function useAlertas(atividades: Atividade[]) {
  const [alertasAtivos, setAlertasAtivos] = useState<Atividade[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<number | null>(null);

  const tocarAlerta = useCallback(() => {
    try {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
      }
    } catch {}
  }, []);

  useEffect(() => {
    audioRef.current = new Audio(ALERT_SOUND);
    audioRef.current.volume = 0.5;
  }, []);

  useEffect(() => {
    const verificarAlertas = () => {
      const agora = new Date();
      const ativos: Atividade[] = [];

      for (const atividade of atividades) {
        if (atividade.notificado || atividade.status === 'concluida' || atividade.status === 'cancelada') continue;

        const dataAtividade = new Date(`${atividade.data_inicio}T${atividade.horario}`);
        const alertaMs = (atividade.alerta_antecipado || 30) * 60 * 1000;
        const horaAlerta = new Date(dataAtividade.getTime() - alertaMs);
        const diff = agora.getTime() - horaAlerta.getTime();

        if (diff >= 0 && diff < 60000) {
          ativos.push(atividade);
        }
      }

      if (ativos.length > 0) {
        setAlertasAtivos(prev => {
          const novos = ativos.filter(a => !prev.find(p => p.id === a.id));
          if (novos.length > 0) {
            tocarAlerta();
            return [...prev, ...novos];
          }
          return prev;
        });

        ativos.forEach(a => {
          updateAtividade(a.id, { notificado: true });
        });
      }
    };

    if (atividades.length > 0) {
      verificarAlertas();
      intervalRef.current = window.setInterval(verificarAlertas, 30000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [atividades, tocarAlerta]);

  const dismissAlerta = useCallback((id: string) => {
    setAlertasAtivos(prev => prev.filter(a => a.id !== id));
  }, []);

  const dismissAll = useCallback(() => {
    setAlertasAtivos([]);
  }, []);

  return { alertasAtivos, dismissAlerta, dismissAll };
}
