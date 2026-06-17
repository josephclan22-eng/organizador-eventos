import { useState } from 'react';
import { Plus, Search } from 'lucide-react';
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

const categoryConfig: Record<Categoria, { bg: string; text: string }> = {
  trabalho: { bg: 'bg-blue-500/10', text: 'text-blue-400' },
  pessoal: { bg: 'bg-green-500/10', text: 'text-green-400' },
  ccb: { bg: 'bg-yellow-500/10', text: 'text-yellow-400' },
};

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
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">{titulo}</h1>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-yellow-600 hover:bg-yellow-500 text-white font-medium rounded-lg transition-colors text-sm"
        >
          <Plus className="w-4 h-4" />
          Nova Atividade
        </button>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar atividades..."
            className="w-full pl-9 pr-3 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white text-sm focus:outline-none focus:border-gray-700"
          />
        </div>
        <div className="flex gap-1">
          {(['todas', 'pendente', 'em_andamento', 'concluida', 'cancelada'] as const).map(s => (
            <button
              key={s}
              onClick={() => setStatusFiltro(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                statusFiltro === s
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-500 hover:text-gray-300 hover:bg-gray-800/50'
              }`}
            >
              {s === 'todas' ? 'Todas' : s === 'em_andamento' ? 'Em Andamento' : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Lista */}
      {filtradas.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <p className="text-lg mb-2">Nenhuma atividade encontrada</p>
          <p className="text-sm">Crie uma nova atividade para começar</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtradas.map(a => (
            <AtividadeCard key={a.id} atividade={a} onUpdate={updateAtividade} onDelete={deleteAtividade} />
          ))}
        </div>
      )}

      <NovaAtividadeModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={addAtividade}
        categoriaPadrao={categoriaPadrao}
      />
    </div>
  );
}
