import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Plus, Sparkles } from 'lucide-react';
import type { Atividade, Categoria, Prioridade } from '../types';
import { NovaAtividadeModal } from '../components/NovaAtividadeModal';

interface CalendarioProps {
  atividades: Atividade[];
  addAtividade: (atividade: {
    titulo: string; descricao: string; categoria: Categoria;
    prioridade: Prioridade; data_inicio: string; data_fim: string;
    horario: string; local: string; alerta_antecipado: number;
  }) => Promise<void>;
  updateAtividade: (id: string, updates: Record<string, unknown>) => void;
  deleteAtividade: (id: string) => void;
}

const catColors: Record<Categoria, string> = {
  trabalho: '#FF6B35',
  pessoal: '#4CAF50',
  ccb: '#FFB703',
};

export function Calendario({ atividades, addAtividade, updateAtividade, deleteAtividade }: CalendarioProps) {
  const hoje = new Date();
  const [ano, setAno] = useState(hoje.getFullYear());
  const [mes, setMes] = useState(hoje.getMonth());
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  const diasNoMes = new Date(ano, mes + 1, 0).getDate();
  const primeiroDia = new Date(ano, mes, 1).getDay();
  const nomeMes = new Date(ano, mes).toLocaleDateString('pt-BR', { month: 'long' });

  const atividadesPorData = useMemo(() => {
    const map: Record<string, Atividade[]> = {};
    for (const a of atividades) {
      if (!map[a.data_inicio]) map[a.data_inicio] = [];
      map[a.data_inicio].push(a);
    }
    return map;
  }, [atividades]);

  const semanas: number[][] = [];
  let dia = 1;
  for (let s = 0; s < 6; s++) {
    const semana: number[] = [];
    for (let d = 0; d < 7; d++) {
      if ((s === 0 && d < primeiroDia) || dia > diasNoMes) semana.push(0);
      else semana.push(dia++);
    }
    semanas.push(semana);
    if (dia > diasNoMes) break;
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6 animate-fade-in">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-[#FFB703]" />
            <span className="text-[10px] text-[#6B7280] tracking-widest uppercase font-medium">Calendário</span>
          </div>
          <h1 className="text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>{nomeMes} {ano}</h1>
        </div>
        <div className="flex gap-2">
          <button onClick={() => { if (mes === 0) { setAno(a => a - 1); setMes(11); } else setMes(m => m - 1); }}
            className="p-2.5 rounded-xl text-[#6B7280] hover:text-white hover:bg-[rgba(255,255,255,0.06)] transition-all">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={() => { if (mes === 11) { setAno(a => a + 1); setMes(0); } else setMes(m => m + 1); }}
            className="p-2.5 rounded-xl text-[#6B7280] hover:text-white hover:bg-[rgba(255,255,255,0.06)] transition-all">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="rounded-2xl overflow-hidden animate-fade-in" style={{ background: 'linear-gradient(135deg, rgba(31,40,51,0.6), rgba(15,20,28,0.7))', border: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="grid grid-cols-7">
          {['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'].map(d => (
            <div key={d} className="text-center text-[10px] text-[#6B7280] font-medium tracking-wider py-3 uppercase">{d}</div>
          ))}
        </div>
        <div className="divide-y divide-[rgba(255,255,255,0.04)]">
          {semanas.map((semana, i) => (
            <div key={i} className="grid grid-cols-7">
              {semana.map((dia, j) => {
                if (dia === 0) return <div key={j} className="aspect-square" />;
                const dateStr = `${ano}-${String(mes + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
                const atvs = atividadesPorData[dateStr] || [];
                const isToday = dateStr === hoje.toISOString().split('T')[0];

                return (
                  <button
                    key={j}
                    onClick={() => { setSelectedDate(dateStr); setModalOpen(true); }}
                    className="aspect-square relative flex flex-col items-center justify-center p-1 transition-all duration-200 hover:bg-[rgba(255,255,255,0.03)] group"
                    style={isToday ? { background: 'rgba(255,183,3,0.08)' } : {}}
                  >
                    <span
                      className={`text-sm font-medium transition-colors ${isToday ? 'text-[#FFB703]' : 'text-[#A0A8B3] group-hover:text-white'}`}
                    >
                      {dia}
                    </span>
                    {atvs.length > 0 && (
                      <div className="flex gap-0.5 mt-1">
                        {[...new Set(atvs.map(a => a.categoria))].slice(0, 3).map(cat => (
                          <span key={cat} className="w-1.5 h-1.5 rounded-full" style={{ background: catColors[cat as Categoria] }} />
                        ))}
                      </div>
                    )}
                    {atvs.length > 0 && (
                      <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#FFB703] text-[9px] text-[#0B0C10] font-bold flex items-center justify-center shadow-[0_0_8px_rgba(255,183,3,0.4)]">
                        {atvs.length}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {selectedDate && atividadesPorData[selectedDate] && (
        <div className="mt-6 rounded-2xl p-6 animate-fade-in" style={{ background: 'linear-gradient(135deg, rgba(31,40,51,0.6), rgba(15,20,28,0.7))', border: '1px solid rgba(255,255,255,0.04)' }}>
          <h3 className="text-white font-semibold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            {new Date(selectedDate + 'T12:00:00').toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
          </h3>
          <div className="space-y-2">
            {atividadesPorData[selectedDate].map(a => (
              <div key={a.id} className="flex items-center justify-between rounded-xl p-3 transition-all hover:bg-[rgba(255,255,255,0.03)]"
                style={{ border: '1px solid rgba(255,255,255,0.04)' }}>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full" style={{ background: catColors[a.categoria] }} />
                  <div>
                    <span className="text-white text-sm font-medium">{a.titulo}</span>
                    <p className="text-[#6B7280] text-xs mt-0.5">{a.horario} - {a.local}</p>
                  </div>
                </div>
                <button onClick={() => deleteAtividade(a.id)}
                  className="text-xs text-[#6B7280] hover:text-[#FF6B35] transition-colors px-2 py-1 rounded-lg hover:bg-[rgba(255,107,53,0.1)]">
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
