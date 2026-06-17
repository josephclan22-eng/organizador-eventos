import { Clock, MapPin, Trash2, CheckCircle2 } from 'lucide-react';
import type { Atividade, Prioridade } from '../types';

interface AtividadeCardProps {
  atividade: Atividade;
  onUpdate: (id: string, updates: Record<string, unknown>) => void;
  onDelete: (id: string) => void;
}

const catStyles = {
  trabalho: {
    gradient: 'rgba(255,107,53,0.08)',
    border: 'rgba(255,107,53,0.15)',
    borderHover: 'rgba(255,107,53,0.3)',
    accent: '#FF6B35',
    badgeBg: 'rgba(255,107,53,0.12)',
    badgeBorder: 'rgba(255,107,53,0.2)',
    glow: 'rgba(255,107,53,0.15)',
  },
  pessoal: {
    gradient: 'rgba(34,197,94,0.08)',
    border: 'rgba(34,197,94,0.15)',
    borderHover: 'rgba(34,197,94,0.3)',
    accent: '#22C55E',
    badgeBg: 'rgba(34,197,94,0.12)',
    badgeBorder: 'rgba(34,197,94,0.2)',
    glow: 'rgba(34,197,94,0.15)',
  },
  ccb: {
    gradient: 'rgba(245,158,11,0.08)',
    border: 'rgba(245,158,11,0.15)',
    borderHover: 'rgba(245,158,11,0.3)',
    accent: '#F59E0B',
    badgeBg: 'rgba(245,158,11,0.12)',
    badgeBorder: 'rgba(245,158,11,0.2)',
    glow: 'rgba(245,158,11,0.15)',
  },
};

const prioridadeConfig: Record<Prioridade, { label: string; color: string }> = {
  alta: { label: 'ALTA', color: '#FF6B35' },
  media: { label: 'MEDIA', color: '#F59E0B' },
  baixa: { label: 'BAIXA', color: '#475569' },
};

export function AtividadeCard({ atividade, onUpdate, onDelete }: AtividadeCardProps) {
  const s = catStyles[atividade.categoria];
  const p = prioridadeConfig[atividade.prioridade];

  const dataFormatada = new Date(atividade.data_inicio + 'T12:00:00').toLocaleDateString('pt-BR', {
    day: '2-digit', month: 'short',
  });

  return (
    <div
      className="rounded-2xl p-5 transition-all duration-300 relative overflow-hidden group"
      style={{
        background: `linear-gradient(160deg, ${s.gradient}, rgba(15,17,23,0.8))`,
        border: `1px solid ${s.border}`,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = s.borderHover;
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = `0 16px 48px -12px ${s.glow}, 0 0 0 1px ${s.borderHover} inset`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = s.border;
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div className="absolute top-0 right-0 w-32 h-32 rounded-full -translate-y-1/2 translate-x-1/2 opacity-[0.03]"
        style={{ background: s.accent }} />

      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <span
            className="text-[10px] font-bold tracking-widest px-3 py-1 rounded-full"
            style={{
              background: s.badgeBg,
              color: s.accent,
              border: `1px solid ${s.badgeBorder}`,
            }}
          >
            {atividade.categoria === 'trabalho' ? 'TRABALHO' : atividade.categoria === 'pessoal' ? 'PESSOAL' : 'CCB'}
          </span>
          <span className="text-[9px] font-bold tracking-widest" style={{ color: p.color }}>
            {p.label}
          </span>
        </div>

        <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
          {atividade.status !== 'concluida' && (
            <button
              onClick={() => onUpdate(atividade.id, { status: 'concluida' })}
              className="p-2 rounded-xl text-[#475569] hover:text-[#22C55E] hover:bg-[rgba(34,197,94,0.1)] transition-all"
              title="Concluir"
            >
              <CheckCircle2 className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => onDelete(atividade.id)}
            className="p-2 rounded-xl text-[#475569] hover:text-[#EF4444] hover:bg-[rgba(239,68,68,0.1)] transition-all"
            title="Excluir"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <h3 className="text-white font-semibold text-[15px] mb-1.5 leading-snug">{atividade.titulo}</h3>
      {atividade.descricao && (
        <p className="text-[#64748B] text-[13px] mb-4 line-clamp-2 leading-relaxed">{atividade.descricao}</p>
      )}

      <div className="flex flex-wrap gap-4 text-[11px] text-[#64748B]">
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5" style={{ color: s.accent }} />
          <span className="font-medium">{dataFormatada} às {atividade.horario}</span>
        </div>
        {atividade.local && (
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" style={{ color: s.accent }} />
            <span className="font-medium">{atividade.local}</span>
          </div>
        )}
      </div>
    </div>
  );
}
