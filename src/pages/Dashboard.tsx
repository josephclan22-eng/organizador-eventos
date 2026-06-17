import { useState, useMemo } from 'react';
import { Plus, Briefcase, User, Cross, Clock, TrendingUp, Sparkles, Zap } from 'lucide-react';
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

const statConfig = {
  total: { icon: Zap, label: 'Total Pendentes', color: '#FFB703', bg: 'from-[rgba(255,183,3,0.08)] to-[rgba(255,107,53,0.04)]', border: 'rgba(255,183,3,0.15)' },
  trabalho: { icon: Briefcase, label: 'Trabalho', color: '#FF6B35', bg: 'from-[rgba(255,107,53,0.08)] to-[rgba(255,107,53,0.02)]', border: 'rgba(255,107,53,0.15)' },
  pessoal: { icon: User, label: 'Pessoal', color: '#4CAF50', bg: 'from-[rgba(76,175,80,0.08)] to-[rgba(76,175,80,0.02)]', border: 'rgba(76,175,80,0.15)' },
  ccb: { icon: Cross, label: 'CCB', color: '#FFB703', bg: 'from-[rgba(255,183,3,0.08)] to-[rgba(255,183,3,0.02)]', border: 'rgba(255,183,3,0.15)' },
  concluidas: { icon: TrendingUp, label: 'Concluídas', color: '#81C784', bg: 'from-[rgba(76,175,80,0.06)] to-[rgba(76,175,80,0.02)]', border: 'rgba(76,175,80,0.12)' },
};

export function Dashboard({ hoje, proximas, getByCategoria, atividades, addAtividade, updateAtividade, deleteAtividade }: DashboardProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [categoriaFiltro, setCategoriaFiltro] = useState<Categoria | 'todas'>('todas');

  const atividadesHoje = hoje();
  const proximasAtividades = proximas(7);

  const stats = useMemo(() => ({
    total: atividades.filter(a => a.status !== 'concluida' && a.status !== 'cancelada').length,
    trabalho: getByCategoria('trabalho').filter(a => a.status !== 'concluida').length,
    pessoal: getByCategoria('pessoal').filter(a => a.status !== 'concluida').length,
    ccb: getByCategoria('ccb').filter(a => a.status !== 'concluida').length,
    concluidas: atividades.filter(a => a.status === 'concluida').length,
  }), [atividades, getByCategoria]);

  const displayed = categoriaFiltro === 'todas' ? proximasAtividades : proximasAtividades.filter(a => a.categoria === categoriaFiltro);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8 animate-fade-in">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-[#FFB703]" />
            <span className="text-[10px] text-[#6B7280] tracking-widest uppercase font-medium">Dashboard</span>
          </div>
          <h1 className="text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
            Sua Semana
          </h1>
        </div>
        <button onClick={() => setModalOpen(true)} className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Nova Atividade
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        {(Object.entries(statConfig) as [string, typeof statConfig['total']][]).map(([key, cfg]) => {
          const value = stats[key as keyof typeof stats];
          return (
            <div
              key={key}
              className="rounded-xl p-4 transition-all duration-300 hover:translate-y-[-2px]"
              style={{ background: `linear-gradient(135deg, ${cfg.bg})`, border: `1px solid ${cfg.border}` }}
            >
              <div className="flex items-center gap-2 mb-2">
                <cfg.icon className="w-3.5 h-3.5" style={{ color: cfg.color }} />
                <span className="text-[10px] tracking-wider uppercase font-medium" style={{ color: cfg.color }}>{cfg.label}</span>
              </div>
              <span className="text-3xl font-bold text-white">{value}</span>
            </div>
          );
        })}
      </div>

      {/* Hoje */}
      {atividadesHoje.length > 0 && (
        <div className="mb-8 animate-fade-in">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            <Clock className="w-4 h-4 text-[#FFB703]" />
            Hoje
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {atividadesHoje.map(a => (
              <div key={a.id} className="animate-fade-in">
                <AtividadeCard atividade={a} onUpdate={updateAtividade} onDelete={deleteAtividade} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Próximos 7 dias */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
            Próximos 7 Dias
          </h2>
          <div className="flex gap-1">
            {(['todas', 'trabalho', 'pessoal', 'ccb'] as const).map(cat => (
              <button
                key={cat}
                onClick={() => setCategoriaFiltro(cat)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200"
                style={{
                  background: categoriaFiltro === cat ? 'rgba(255,255,255,0.06)' : 'transparent',
                  color: categoriaFiltro === cat ? '#fff' : '#6B7280',
                  border: categoriaFiltro === cat ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
                }}
              >
                {cat === 'todas' ? 'Todas' : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>
        {displayed.length === 0 ? (
          <div className="text-center py-16 text-[#6B7280]">
            <p className="text-lg mb-1">Nenhuma atividade</p>
            <p className="text-sm">Crie uma nova atividade para começar</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {displayed.map(a => (
              <div key={a.id} className="animate-fade-in">
                <AtividadeCard atividade={a} onUpdate={updateAtividade} onDelete={deleteAtividade} />
              </div>
            ))}
          </div>
        )}
      </div>

      <NovaAtividadeModal open={modalOpen} onClose={() => setModalOpen(false)} onSave={addAtividade} />
    </div>
  );
}
