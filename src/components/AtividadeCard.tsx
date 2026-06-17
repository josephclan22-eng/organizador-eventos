import { Clock, MapPin, Trash2, CheckCircle, AlertTriangle } from 'lucide-react';
import type { Atividade, Prioridade } from '../types';

interface AtividadeCardProps {
  atividade: Atividade;
  onUpdate: (id: string, updates: Record<string, unknown>) => void;
  onDelete: (id: string) => void;
}

const config = {
  trabalho: { gradient: 'from-[rgba(255,107,53,0.12)] to-[rgba(255,107,53,0.02)]', border: 'rgba(255,107,53,0.2)', accent: '#FF6B35', label: 'TRABALHO', badge: 'badge-trabalho' },
  pessoal: { gradient: 'from-[rgba(76,175,80,0.12)] to-[rgba(76,175,80,0.02)]', border: 'rgba(76,175,80,0.2)', accent: '#4CAF50', label: 'PESSOAL', badge: 'badge-pessoal' },
  ccb: { gradient: 'from-[rgba(255,183,3,0.12)] to-[rgba(255,183,3,0.02)]', border: 'rgba(255,183,3,0.2)', accent: '#FFB703', label: 'CCB', badge: 'badge-ccb' },
};

const prioridadeConfig: Record<Prioridade, { label: string; color: string }> = {
  alta: { label: 'Alta', color: '#FF6B35' },
  media: { label: 'Média', color: '#FFB703' },
  baixa: { label: 'Baixa', color: '#6B7280' },
};

export function AtividadeCard({ atividade, onUpdate, onDelete }: AtividadeCardProps) {
  const c = config[atividade.categoria];
  const p = prioridadeConfig[atividade.prioridade];

  const dataFormatada = new Date(atividade.data_inicio + 'T12:00:00').toLocaleDateString('pt-BR', {
    day: '2-digit', month: 'short',
  });

  return (
    <div
      className="rounded-2xl p-5 transition-all duration-300 hover:translate-y-[-3px]"
      style={{
        background: `linear-gradient(135deg, ${c.gradient})`,
        border: `1px solid ${c.border}`,
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <span
            className="text-[10px] font-bold tracking-widest px-3 py-1 rounded-full"
            style={{
              background: `${c.accent}15`,
              color: c.accent,
              border: `1px solid ${c.accent}30`,
            }}
          >
            {c.label}
          </span>
          <span className="text-[10px] text-[#6B7280]" style={{ color: p.color }}>
            ● {p.label}
          </span>
        </div>
        <div className="flex items-center gap-1">
          {atividade.status !== 'concluida' && (
            <button
              onClick={() => onUpdate(atividade.id, { status: 'concluida' })}
              className="p-2 rounded-xl text-[#6B7280] hover:text-[#4CAF50] hover:bg-[rgba(76,175,80,0.1)] transition-all"
              title="Concluir"
            >
              <CheckCircle className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => onDelete(atividade.id)}
            className="p-2 rounded-xl text-[#6B7280] hover:text-[#FF6B35] hover:bg-[rgba(255,107,53,0.1)] transition-all"
            title="Excluir"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <h3 className="text-white font-semibold text-base mb-1.5">{atividade.titulo}</h3>
      {atividade.descricao && (
        <p className="text-[#6B7280] text-sm mb-4 line-clamp-2 leading-relaxed">{atividade.descricao}</p>
      )}

      <div className="flex flex-wrap gap-3 text-xs text-[#6B7280]">
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5" style={{ color: c.accent }} />
          <span>{dataFormatada} às {atividade.horario}</span>
        </div>
        {atividade.local && (
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" style={{ color: c.accent }} />
            <span>{atividade.local}</span>
          </div>
        )}
      </div>
    </div>
  );
}
