import { useState } from 'react';
import { Plus, Search, Sparkles } from 'lucide-react';
import type { Atividade, Categoria, Prioridade, StatusAtividade } from '../types';
import { AtividadeCard } from '../components/AtividadeCard';
import { NovaAtividadeModal } from '../components/NovaAtividadeModal';

interface AtividadesPageProps {
  atividades: Atividade[];
  addAtividade: (atividade: {
    titulo: string; descricao: string; categoria: Categoria;
    prioridade: Prioridade; data_inicio: string; data_fim: string;
    horario: string; local: string; alerta_antecipado: number;
  }) => Promise<void>;
  updateAtividade: (id: string, updates: Record<string, unknown>) => void;
  deleteAtividade: (id: string) => void;
  categoriaPadrao?: Categoria;
  titulo: string;
}

const statusOptions: { value: StatusAtividade | 'todas'; label: string }[] = [
  { value: 'todas', label: 'Todas' },
  { value: 'pendente', label: 'Pendente' },
  { value: 'em_andamento', label: 'Em Andamento' },
  { value: 'concluida', label: 'Concluída' },
  { value: 'cancelada', label: 'Cancelada' },
];

export function AtividadesPage({ atividades, addAtividade, updateAtividade, deleteAtividade, categoriaPadrao, titulo }: AtividadesPageProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFiltro, setStatusFiltro] = useState<StatusAtividade | 'todas'>('todas');

  const filtradas = atividades.filter(a => {
    if (statusFiltro !== 'todas' && a.status !== statusFiltro) return false;
    if (search && !a.titulo.toLowerCase().includes(search.toLowerCase()) && !a.descricao.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6 animate-fade-in">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-[#FFB703]" />
            <span className="text-[10px] text-[#6B7280] tracking-widest uppercase font-medium">Atividades</span>
          </div>
          <h1 className="text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>{titulo}</h1>
        </div>
        <button onClick={() => setModalOpen(true)} className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Nova
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-6 animate-fade-in">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar atividades..."
            className="input-moderno pl-10"
          />
        </div>
        <div className="flex gap-1">
          {statusOptions.map(s => (
            <button
              key={s.value}
              onClick={() => setStatusFiltro(s.value)}
              className="px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200"
              style={{
                background: statusFiltro === s.value ? 'rgba(255,255,255,0.06)' : 'transparent',
                color: statusFiltro === s.value ? '#fff' : '#6B7280',
                border: statusFiltro === s.value ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
              }}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {filtradas.length === 0 ? (
        <div className="text-center py-16 text-[#6B7280] animate-fade-in">
          <p className="text-lg mb-1">Nenhuma atividade encontrada</p>
          <p className="text-sm">Crie uma nova atividade para começar</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtradas.map((a, i) => (
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
