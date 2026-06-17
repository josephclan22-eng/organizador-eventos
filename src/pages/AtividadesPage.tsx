import { useState } from 'react';
import { Plus, Search, ListFilter } from 'lucide-react';
import type { Atividade, Categoria, Prioridade, StatusAtividade } from '../types';
import { AtividadeCard } from '../components/AtividadeCard';
import { NovaAtividadeModal } from '../components/NovaAtividadeModal';

interface Props {
  atividades: Atividade[];
  addAtividade: (a: { titulo: string; descricao: string; categoria: Categoria; prioridade: Prioridade; data_inicio: string; data_fim: string; horario: string; local: string; alerta_antecipado: number }) => Promise<void>;
  updateAtividade: (id: string, u: Record<string, unknown>) => void;
  deleteAtividade: (id: string) => void;
  categoriaPadrao?: Categoria;
  titulo: string;
}

const statusOpts: { value: StatusAtividade | 'todas'; label: string }[] = [
  { value: 'todas', label: 'Todas' },
  { value: 'pendente', label: 'Pendentes' },
  { value: 'em_andamento', label: 'Em Andamento' },
  { value: 'concluida', label: 'Concluídas' },
  { value: 'cancelada', label: 'Canceladas' },
];

export function AtividadesPage({ atividades, addAtividade, updateAtividade, deleteAtividade, categoriaPadrao, titulo }: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [statusF, setStatusF] = useState<StatusAtividade | 'todas'>('todas');

  const filtered = atividades.filter(a => {
    if (statusF !== 'todas' && a.status !== statusF) return false;
    if (search && !a.titulo.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="p-6 lg:p-8 max-w-[1400px] mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 animate-fade-in">
        <div>
          <span className="label-overline text-[#F59E0B]">Atividades</span>
          <h1 className="text-4xl font-black text-white mt-1" style={{ fontFamily: "'Playfair Display', serif" }}>{titulo}</h1>
        </div>
        <button onClick={() => setModalOpen(true)} className="btn-primary">
          <Plus className="w-4 h-4" />
          Nova
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-8 animate-fade-in delay-100">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#475569]" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} className="input-glass pl-10" placeholder="Buscar atividades..." />
        </div>
        <div className="flex gap-1 bg-[rgba(255,255,255,0.02)] p-1 rounded-xl border border-[rgba(255,255,255,0.04)]">
          {statusOpts.map(s => (
            <button key={s.value} onClick={() => setStatusF(s.value)}
              className="px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200"
              style={{
                background: statusF === s.value ? 'rgba(255,255,255,0.06)' : 'transparent',
                color: statusF === s.value ? '#F8FAFC' : '#475569',
              }}>
              {s.label}
            </button>
          ))}
        </div>
        <span className="text-[11px] text-[#475569] font-medium">
          {filtered.length} de {atividades.length}
        </span>
      </div>

      {filtered.length === 0 ? (
        <div className="glass-panel p-16 text-center animate-fade-in">
          <ListFilter className="w-8 h-8 text-[#475569] mx-auto mb-3" />
          <p className="text-[#64748B] font-medium mb-1">Nenhuma atividade encontrada</p>
          <p className="text-[#475569] text-sm">Tente ajustar os filtros</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((a, i) => (
            <div key={a.id} className="animate-fade-in" style={{ animationDelay: `${i * 0.05}s` }}>
              <AtividadeCard atividade={a} onUpdate={updateAtividade} onDelete={deleteAtividade} />
            </div>
          ))}
        </div>
      )}

      <NovaAtividadeModal open={modalOpen} onClose={() => setModalOpen(false)} onSave={addAtividade} categoriaPadrao={categoriaPadrao} />
    </div>
  );
}
