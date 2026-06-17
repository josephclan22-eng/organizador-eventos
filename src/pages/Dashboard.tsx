import { useState, useMemo } from 'react';
import { Plus, Briefcase, User, Cross, AlertCircle, Clock, TrendingUp } from 'lucide-react';
import type { Atividade, Categoria, Prioridade } from '../types';
import { AtividadeCard } from '../components/AtividadeCard';
import { NovaAtividadeModal } from '../components/NovaAtividadeModal';

interface DashboardProps {
  hoje: () => Atividade[];
  proximas: (dias?: number) => Atividade[];
  getByCategoria: (cat: Categoria) => Atividade[];
  atividades: Atividade[];
  addAtividade: (atividade: {
    titulo: string; descricao: string; categoria: Categoria;
    prioridade: Prioridade; data_inicio: string; data_fim: string;
    horario: string; local: string; alerta_antecipado: number;
  }) => Promise<void>;
  updateAtividade: (id: string, updates: Record<string, unknown>) => void;
  deleteAtividade: (id: string) => void;
}

export function Dashboard({ hoje, proximas, getByCategoria, atividades, addAtividade, updateAtividade, deleteAtividade }: DashboardProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [categoriaFiltro, setCategoriaFiltro] = useState<Categoria | 'todas'>('todas');

  const atividadesHoje = hoje();
  const proximasAtividades = proximas(7);

  const stats = useMemo(() => ({
    total: atividades.filter(a => a.status !== 'concluida' && a.status !== 'cancelada').length,
    trabalho: getByCategoria('trabalho').filter(a => a.status !== 'concluida' && a.status !== 'cancelada').length,
    pessoal: getByCategoria('pessoal').filter(a => a.status !== 'concluida' && a.status !== 'cancelada').length,
    ccb: getByCategoria('ccb').filter(a => a.status !== 'concluida' && a.status !== 'cancelada').length,
    concluidas: atividades.filter(a => a.status === 'concluida').length,
  }), [atividades, getByCategoria]);

  const displayedAtividades = categoriaFiltro === 'todas' ? proximasAtividades : proximasAtividades.filter(a => a.categoria === categoriaFiltro);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Bem-vindo ao seu organizador</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-yellow-600 hover:bg-yellow-500 text-white font-medium rounded-lg transition-colors text-sm"
        >
          <Plus className="w-4 h-4" />
          Nova Atividade
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-gray-400" />
            <span className="text-xs text-gray-500">Total Pendentes</span>
          </div>
          <span className="text-2xl font-bold text-white">{stats.total}</span>
        </div>
        <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Briefcase className="w-4 h-4 text-blue-400" />
            <span className="text-xs text-blue-400">Trabalho</span>
          </div>
          <span className="text-2xl font-bold text-white">{stats.trabalho}</span>
        </div>
        <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <User className="w-4 h-4 text-green-400" />
            <span className="text-xs text-green-400">Pessoal</span>
          </div>
          <span className="text-2xl font-bold text-white">{stats.pessoal}</span>
        </div>
        <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Cross className="w-4 h-4 text-yellow-400" />
            <span className="text-xs text-yellow-400">CCB</span>
          </div>
          <span className="text-2xl font-bold text-white">{stats.ccb}</span>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-gray-400" />
            <span className="text-xs text-gray-500">Concluídas</span>
          </div>
          <span className="text-2xl font-bold text-white">{stats.concluidas}</span>
        </div>
      </div>

      {/* Atividades de Hoje */}
      {atividadesHoje.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-yellow-500" />
            Atividades de Hoje
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {atividadesHoje.map(a => (
              <AtividadeCard key={a.id} atividade={a} onUpdate={updateAtividade} onDelete={deleteAtividade} />
            ))}
          </div>
        </div>
      )}

      {/* Próximas Atividades */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Próximos 7 Dias</h2>
          <div className="flex gap-1">
            {(['todas', 'trabalho', 'pessoal', 'ccb'] as const).map(cat => (
              <button
                key={cat}
                onClick={() => setCategoriaFiltro(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  categoriaFiltro === cat
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-500 hover:text-gray-300 hover:bg-gray-800/50'
                }`}
              >
                {cat === 'todas' ? 'Todas' : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>
        {displayedAtividades.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p>Nenhuma atividade encontrada para os próximos dias</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {displayedAtividades.map(a => (
              <AtividadeCard key={a.id} atividade={a} onUpdate={updateAtividade} onDelete={deleteAtividade} />
            ))}
          </div>
        )}
      </div>

      <NovaAtividadeModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={addAtividade}
      />
    </div>
  );
}
