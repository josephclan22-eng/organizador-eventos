import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import type { Atividade, Categoria, Prioridade } from '../types';
import { NovaAtividadeModal } from '../components/NovaAtividadeModal';

interface Props {
  atividades: Atividade[];
  addAtividade: (a: { titulo: string; descricao: string; categoria: Categoria; prioridade: Prioridade; data_inicio: string; data_fim: string; horario: string; local: string; alerta_antecipado: number }) => Promise<void>;
  updateAtividade: (id: string, u: Record<string, unknown>) => void;
  deleteAtividade: (id: string) => void;
}

const catColors: Record<Categoria, string> = { trabalho: '#FF6B35', pessoal: '#22C55E', ccb: '#F59E0B' };

export function Calendario({ atividades, addAtividade, updateAtividade, deleteAtividade }: Props) {
  const hoje = new Date();
  const [ano, setAno] = useState(hoje.getFullYear());
  const [mes, setMes] = useState(hoje.getMonth());
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  const dias = new Date(ano, mes + 1, 0).getDate();
  const primeiro = new Date(ano, mes, 1).getDay();
  const nomeMes = new Date(ano, mes).toLocaleDateString('pt-BR', { month: 'long' });

  const porData = useMemo(() => {
    const m: Record<string, Atividade[]> = {};
    for (const a of atividades) {
      if (!m[a.data_inicio]) m[a.data_inicio] = [];
      m[a.data_inicio].push(a);
    }
    return m;
  }, [atividades]);

  const semanas: number[][] = [];
  let d = 1;
  for (let s = 0; s < 6; s++) {
    const sem: number[] = [];
    for (let j = 0; j < 7; j++) {
      if ((s === 0 && j < primeiro) || d > dias) sem.push(0);
      else sem.push(d++);
    }
    semanas.push(sem);
    if (d > dias) break;
  }

  return (
    <div className="p-6 lg:p-8 max-w-[1100px] mx-auto">
      <div className="flex items-center justify-between mb-8 animate-fade-in">
        <div>
          <span className="label-overline text-[#F59E0B]">Calendário</span>
          <h1 className="text-4xl font-black capitalize" style={{ fontFamily: "'Playfair Display', serif" }}>{nomeMes} <span className="text-[#475569]">{ano}</span></h1>
        </div>
        <div className="flex gap-2">
          <button onClick={() => { if (mes === 0) { setAno(a => a - 1); setMes(11); } else setMes(m => m - 1); }}
            className="btn-glass p-2.5">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={() => { setAno(hoje.getFullYear()); setMes(hoje.getMonth()); }}
            className="btn-glass text-xs font-semibold px-5">
            Hoje
          </button>
          <button onClick={() => { if (mes === 11) { setAno(a => a + 1); setMes(0); } else setMes(m => m + 1); }}
            className="btn-glass p-2.5">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="glass-panel p-0 animate-fade-in delay-100 overflow-hidden">
        <div className="grid grid-cols-7 border-b border-[rgba(255,255,255,0.04)]">
          {['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'].map(dia => (
            <div key={dia} className="text-center text-[10px] text-[#475569] font-bold tracking-widest py-4 uppercase">{dia}</div>
          ))}
        </div>

        {semanas.map((sem, i) => (
          <div key={i} className="grid grid-cols-7 border-b border-[rgba(255,255,255,0.03)] last:border-b-0">
            {sem.map((dia, j) => {
              if (dia === 0) return <div key={j} className="aspect-square" />;
              const dateStr = `${ano}-${String(mes + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
              const atvs = porData[dateStr] || [];
              const isToday = dateStr === hoje.toISOString().split('T')[0];

              return (
                <button key={j} onClick={() => { setSelectedDate(dateStr); setModalOpen(true); }}
                  className="aspect-square relative flex flex-col items-center justify-center p-1 transition-all duration-200 hover:bg-[rgba(255,255,255,0.03)] group"
                  style={isToday ? { background: 'rgba(245,158,11,0.06)' } : {}}>
                  <span className={`text-sm font-semibold transition-colors ${isToday ? 'text-[#F59E0B]' : 'text-[#94A3B8] group-hover:text-white'}`}>
                    {dia}
                  </span>
                  {isToday && <div className="w-1 h-1 rounded-full bg-[#F59E0B] mt-0.5" />}
                  {atvs.length > 0 && (
                    <div className="flex gap-0.5 mt-1">
                      {[...new Set(atvs.map(a => a.categoria))].slice(0, 3).map(cat => (
                        <span key={cat} className="w-1.5 h-1.5 rounded-full" style={{ background: catColors[cat as Categoria] }} />
                      ))}
                    </div>
                  )}
                  {atvs.length > 1 && (
                    <span className="absolute top-1 right-1.5 w-4 h-4 rounded-full bg-[#F59E0B] text-[9px] text-[#0F172A] font-bold flex items-center justify-center">
                      {atvs.length}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {selectedDate && porData[selectedDate] && (
        <div className="glass-panel p-6 mt-6 animate-fade-in">
          <h3 className="text-lg font-bold text-white capitalize mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>
            {new Date(selectedDate + 'T12:00:00').toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
          </h3>
          <div className="space-y-2">
            {porData[selectedDate].map(a => (
              <div key={a.id} className="flex items-center justify-between rounded-xl p-3.5 transition-all hover:bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.03)]">
                <div className="flex items-center gap-3.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: catColors[a.categoria] }} />
                  <div>
                    <span className="text-white text-sm font-semibold">{a.titulo}</span>
                    <p className="text-[#475569] text-xs mt-0.5">{a.horario} {a.local && `· ${a.local}`}</p>
                  </div>
                </div>
                <button onClick={() => deleteAtividade(a.id)}
                  className="text-xs text-[#475569] hover:text-[#EF4444] transition-colors px-3 py-1.5 rounded-lg hover:bg-[rgba(239,68,68,0.06)]">
                  Excluir
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <NovaAtividadeModal open={modalOpen} onClose={() => setModalOpen(false)} onSave={addAtividade} />
    </div>
  );
}
