import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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

const catDots: Record<Categoria, string> = {
  trabalho: 'bg-blue-500',
  pessoal: 'bg-green-500',
  ccb: 'bg-yellow-500',
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

  const prevMonth = () => {
    if (mes === 0) { setAno(a => a - 1); setMes(11); }
    else setMes(m => m - 1);
  };

  const nextMonth = () => {
    if (mes === 11) { setAno(a => a + 1); setMes(0); }
    else setMes(m => m + 1);
  };

  const handleDayClick = (dia: number) => {
    const dateStr = `${ano}-${String(mes + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
    setSelectedDate(dateStr);
    setModalOpen(true);
  };

  const semanas: number[][] = [];
  let dia = 1;
  for (let s = 0; s < 6; s++) {
    const semana: number[] = [];
    for (let d = 0; d < 7; d++) {
      if ((s === 0 && d < primeiroDia) || dia > diasNoMes) {
        semana.push(0);
      } else {
        semana.push(dia++);
      }
    }
    semanas.push(semana);
    if (dia > diasNoMes) break;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Calendário</h1>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
        {/* Cabeçalho mês */}
        <div className="flex items-center justify-between mb-6">
          <button onClick={prevMonth} className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="text-lg font-semibold text-white capitalize">
            {nomeMes} {ano}
          </h2>
          <button onClick={nextMonth} className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dias da semana */}
        <div className="grid grid-cols-7 mb-2">
          {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(d => (
            <div key={d} className="text-center text-xs text-gray-500 py-2">{d}</div>
          ))}
        </div>

        {/* Grade */}
        <div className="space-y-1">
          {semanas.map((semana, i) => (
            <div key={i} className="grid grid-cols-7 gap-1">
              {semana.map((dia, j) => {
                if (dia === 0) return <div key={j} className="aspect-square" />;
                const dateStr = `${ano}-${String(mes + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
                const atvs = atividadesPorData[dateStr] || [];
                const isToday = dateStr === hoje.toISOString().split('T')[0];

                return (
                  <button
                    key={j}
                    onClick={() => handleDayClick(dia)}
                    className={`aspect-square rounded-lg flex flex-col items-center justify-center text-sm transition-colors relative ${
                      isToday
                        ? 'bg-yellow-600/20 border border-yellow-600/40 text-yellow-400'
                        : 'hover:bg-gray-800 text-gray-300'
                    }`}
                  >
                    <span className="text-xs">{dia}</span>
                    {atvs.length > 0 && (
                      <div className="flex gap-0.5 mt-1">
                        {[...new Set(atvs.map(a => a.categoria))].slice(0, 3).map(cat => (
                          <span key={cat} className={`w-1.5 h-1.5 rounded-full ${catDots[cat as Categoria]}`} />
                        ))}
                      </div>
                    )}
                    {atvs.length > 0 && (
                      <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-yellow-600 rounded-full text-[9px] text-white flex items-center justify-center font-medium">
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

      {/* Atividades do dia selecionado */}
      {selectedDate && atividadesPorData[selectedDate] && (
        <div className="mt-6 bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h3 className="text-white font-semibold mb-4">
            Atividades de {new Date(selectedDate + 'T12:00:00').toLocaleDateString('pt-BR')}
          </h3>
          <div className="space-y-3">
            {atividadesPorData[selectedDate].map(a => (
              <div key={a.id} className="flex items-center justify-between bg-gray-800 rounded-lg p-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${catDots[a.categoria as Categoria]}`} />
                    <span className="text-white text-sm font-medium">{a.titulo}</span>
                  </div>
                  <p className="text-gray-500 text-xs mt-1">{a.horario} - {a.local}</p>
                </div>
                <button
                  onClick={() => deleteAtividade(a.id)}
                  className="text-xs text-red-400 hover:text-red-300 transition-colors"
                >
                  Excluir
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <NovaAtividadeModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={addAtividade}
      />
    </div>
  );
}
