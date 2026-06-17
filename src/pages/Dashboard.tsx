import { useState, useMemo } from 'react';
import { Plus, Briefcase, User, Cross, Clock, TrendingUp, Zap } from 'lucide-react';
import type { Atividade, Categoria, Prioridade } from '../types';
import { AtividadeCard } from '../components/AtividadeCard';
import { NovaAtividadeModal } from '../components/NovaAtividadeModal';

interface DashboardProps {
  hoje: () => Atividade[];
  proximas: (d?: number) => Atividade[];
  getByCategoria: (cat: Categoria) => Atividade[];
  atividades: Atividade[];
  addAtividade: (a: { titulo: string; descricao: string; categoria: Categoria; prioridade: Prioridade; data_inicio: string; data_fim: string; horario: string; local: string; alerta_antecipado: number }) => Promise<void>;
  updateAtividade: (id: string, u: Record<string, unknown>) => void;
  deleteAtividade: (id: string) => void;
}

const statsDef = [
  { key: 'total', icon: Zap, label: 'Pendentes', color: '#F59E0B', bg: 'rgba(245,158,11,0.06)', accentGlow: 'rgba(245,158,11,0.1)' },
  { key: 'trabalho', icon: Briefcase, label: 'Trabalho', color: '#FF6B35', bg: 'rgba(255,107,53,0.06)', accentGlow: 'rgba(255,107,53,0.1)' },
  { key: 'pessoal', icon: User, label: 'Pessoal', color: '#22C55E', bg: 'rgba(34,197,94,0.06)', accentGlow: 'rgba(34,197,94,0.1)' },
  { key: 'ccb', icon: Cross, label: 'CCB', color: '#F59E0B', bg: 'rgba(245,158,11,0.06)', accentGlow: 'rgba(245,158,11,0.1)' },
  { key: 'concluidas', icon: TrendingUp, label: 'Concluídas', color: '#22C55E', bg: 'rgba(34,197,94,0.04)', accentGlow: 'rgba(34,197,94,0.06)' },
];

export function Dashboard({ hoje, proximas, getByCategoria, atividades, addAtividade, updateAtividade, deleteAtividade }: DashboardProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [filtro, setFiltro] = useState<Categoria | 'todas'>('todas');
  const hojeAtividades = hoje();
  const proximasAtividades = proximas(7);

  const stats = useMemo(() => ({
    total: atividades.filter(a => a.status !== 'concluida' && a.status !== 'cancelada').length,
    trabalho: getByCategoria('trabalho').filter(a => a.status !== 'concluida').length,
    pessoal: getByCategoria('pessoal').filter(a => a.status !== 'concluida').length,
    ccb: getByCategoria('ccb').filter(a => a.status !== 'concluida').length,
    concluidas: atividades.filter(a => a.status === 'concluida').length,
  }), [atividades, getByCategoria]);

  const displayed = filtro === 'todas' ? proximasAtividades : proximasAtividades.filter(a => a.categoria === filtro);

  return (
    <div className="p-6 lg:p-8 max-w-[1400px] mx-auto">
      {/* Hero Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 animate-fade-in">
        <div>
          <span className="label-overline text-[#F59E0B]">Dashboard</span>
          <h1 className="text-4xl font-black text-white mt-1" style={{ fontFamily: "'Playfair Display', serif" }}>
            Sua <span className="gradient-text-gold" style={{ WebkitTextFillColor: '#F59E0B', background: 'none' }}>Semana</span>
          </h1>
        </div>
        <button onClick={() => setModalOpen(true)} className="btn-primary">
          <Plus className="w-4 h-4" />
          Nova Atividade
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
        {statsDef.map((s, i) => (
          <div
            key={s.key}
            className="stat-card animate-fade-in"
            style={{
              borderTop: `3px solid ${s.color}`,
            }}
          >
            <div className="stat-icon-wrapper" style={{ background: s.bg }}>
              <s.icon className="w-5 h-5" style={{ color: s.color }} />
            </div>
            <div className="stat-value">
              {stats[s.key as keyof typeof stats]}
            </div>
            <div className="stat-label-text">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Hoje */}
      {hojeAtividades.length > 0 && (
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-5 animate-fade-in">
            <div className="w-8 h-8 rounded-lg bg-[rgba(245,158,11,0.1)] flex items-center justify-center">
              <Clock className="w-4 h-4 text-[#F59E0B]" />
            </div>
            <h2 className="text-xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>Hoje</h2>
            <span className="text-xs font-bold text-[#F59E0B] px-2 py-0.5 rounded-full bg-[rgba(245,158,11,0.1)]">{hojeAtividades.length}</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {hojeAtividades.map((a, i) => (
              <div key={a.id} className="animate-fade-in" style={{ animationDelay: `${i * 0.06}s` }}>
                <AtividadeCard atividade={a} onUpdate={updateAtividade} onDelete={deleteAtividade} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Próximos 7 Dias */}
      <div>
        <div className="flex items-center justify-between mb-5 animate-fade-in">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>Próximos 7 Dias</h2>
            <span className="text-xs font-bold text-[#475569] px-2 py-0.5 rounded-full bg-[rgba(255,255,255,0.04)]">{proximasAtividades.length}</span>
          </div>
          <div className="flex gap-1 bg-[rgba(255,255,255,0.02)] p-1 rounded-xl border border-[rgba(255,255,255,0.04)]">
            {(['todas', 'trabalho', 'pessoal', 'ccb'] as const).map(cat => (
              <button
                key={cat}
                onClick={() => setFiltro(cat)}
                className="px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200"
                style={{
                  background: filtro === cat ? 'rgba(255,255,255,0.06)' : 'transparent',
                  color: filtro === cat ? '#F8FAFC' : '#475569',
                }}
              >
                {cat === 'todas' ? 'Todas' : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {displayed.length === 0 ? (
          <div className="glass-panel p-16 text-center animate-fade-in">
            <div className="w-16 h-16 rounded-2xl bg-[rgba(255,255,255,0.03)] mx-auto mb-4 flex items-center justify-center">
              <Zap className="w-7 h-7 text-[#475569]" />
            </div>
            <p className="text-[#64748B] text-lg font-medium mb-1">Nenhuma atividade</p>
            <p className="text-[#475569] text-sm">Crie sua primeira atividade para começar</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {displayed.map((a, i) => (
              <div key={a.id} className="animate-fade-in" style={{ animationDelay: `${i * 0.06}s` }}>
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
