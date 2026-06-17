import { useState } from 'react';
import { Clock, MapPin, Trash2, CheckCircle, AlertTriangle } from 'lucide-react';
import type { Atividade, Prioridade } from '../types';

interface AtividadeCardProps {
  atividade: Atividade;
  onUpdate: (id: string, updates: Partial<Atividade>) => void;
  onDelete: (id: string) => void;
}

const categoryConfig = {
  trabalho: { bg: 'bg-blue-500/10 border-blue-500/30', text: 'text-blue-400', label: 'Trabalho' },
  pessoal: { bg: 'bg-green-500/10 border-green-500/30', text: 'text-green-400', label: 'Pessoal' },
  ccb: { bg: 'bg-yellow-500/10 border-yellow-500/30', text: 'text-yellow-400', label: 'CCB' },
};

const prioridadeConfig: Record<Prioridade, { color: string; icon: typeof AlertTriangle }> = {
  alta: { color: 'text-red-400', icon: AlertTriangle },
  media: { color: 'text-yellow-400', icon: AlertTriangle },
  baixa: { color: 'text-gray-400', icon: AlertTriangle },
};

export function AtividadeCard({ atividade, onUpdate, onDelete }: AtividadeCardProps) {
  const [deleting, setDeleting] = useState(false);
  const config = categoryConfig[atividade.categoria];
  const priorConfig = prioridadeConfig[atividade.prioridade];

  const handleDelete = () => {
    setDeleting(true);
    onDelete(atividade.id);
  };

  const dataFormatada = new Date(atividade.data_inicio + 'T12:00:00').toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
  });

  return (
    <div className={`rounded-lg border p-4 ${config.bg} transition-all hover:shadow-lg`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${config.bg} ${config.text}`}>
            {config.label}
          </span>
          <priorConfig.icon className={`w-4 h-4 ${priorConfig.color}`} />
        </div>
        <div className="flex items-center gap-1">
          {atividade.status !== 'concluida' && (
            <button
              onClick={() => onUpdate(atividade.id, { status: 'concluida' })}
              className="p-1.5 rounded-lg text-gray-500 hover:text-green-400 hover:bg-green-500/10 transition-colors"
              title="Concluir"
            >
              <CheckCircle className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="p-1.5 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
            title="Excluir"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <h3 className="text-white font-medium mb-1">{atividade.titulo}</h3>
      {atividade.descricao && (
        <p className="text-gray-400 text-sm mb-3 line-clamp-2">{atividade.descricao}</p>
      )}

      <div className="flex flex-wrap gap-3 text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" />
          <span>{dataFormatada} às {atividade.horario}</span>
        </div>
        {atividade.local && (
          <div className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            <span>{atividade.local}</span>
          </div>
        )}
      </div>
    </div>
  );
}
