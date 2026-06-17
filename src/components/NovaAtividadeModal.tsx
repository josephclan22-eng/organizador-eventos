import { useState } from 'react';
import { X } from 'lucide-react';
import type { Categoria, Prioridade } from '../types';

interface NovaAtividadeModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (atividade: {
    titulo: string; descricao: string; categoria: Categoria;
    prioridade: Prioridade; data_inicio: string; data_fim: string;
    horario: string; local: string; alerta_antecipado: number;
  }) => void;
  categoriaPadrao?: Categoria;
}

export function NovaAtividadeModal({ open, onClose, onSave, categoriaPadrao }: NovaAtividadeModalProps) {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState<Categoria>(categoriaPadrao || 'pessoal');
  const [prioridade, setPrioridade] = useState<Prioridade>('media');
  const [data_inicio, setDataInicio] = useState(new Date().toISOString().split('T')[0]);
  const [horario, setHorario] = useState('12:00');
  const [local, setLocal] = useState('');
  const [alerta_antecipado, setAlertaAntecipado] = useState(30);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ titulo, descricao, categoria, prioridade, data_inicio, data_fim: data_inicio, horario, local, alerta_antecipado });
    setTitulo(''); setDescricao(''); setLocal('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.7)] backdrop-blur-sm" onClick={onClose}>
      <div
        className="w-full max-w-lg mx-4 rounded-2xl overflow-hidden animate-scale-in"
        style={{ background: 'linear-gradient(135deg, #1F2833, #151A22)', border: '1px solid rgba(255,255,255,0.06)' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-[rgba(255,255,255,0.06)]">
          <h2 className="text-lg font-semibold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
            Nova Atividade
          </h2>
          <button onClick={onClose} className="p-2 rounded-xl text-[#6B7280] hover:text-white hover:bg-[rgba(255,255,255,0.06)] transition-all">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs text-[#6B7280] font-medium mb-1.5 tracking-wide uppercase">Título</label>
            <input value={titulo} onChange={e => setTitulo(e.target.value)} required className="input-moderno" placeholder="Digite o título da atividade" />
          </div>
          <div>
            <label className="block text-xs text-[#6B7280] font-medium mb-1.5 tracking-wide uppercase">Descrição</label>
            <textarea value={descricao} onChange={e => setDescricao(e.target.value)} rows={2} className="input-moderno" placeholder="Descrição opcional" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-[#6B7280] font-medium mb-1.5 tracking-wide uppercase">Categoria</label>
              <select value={categoria} onChange={e => setCategoria(e.target.value as Categoria)} className="input-moderno">
                <option value="trabalho">Trabalho</option>
                <option value="pessoal">Pessoal</option>
                <option value="ccb">CCB</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-[#6B7280] font-medium mb-1.5 tracking-wide uppercase">Prioridade</label>
              <select value={prioridade} onChange={e => setPrioridade(e.target.value as Prioridade)} className="input-moderno">
                <option value="baixa">Baixa</option>
                <option value="media">Média</option>
                <option value="alta">Alta</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-[#6B7280] font-medium mb-1.5 tracking-wide uppercase">Data</label>
              <input type="date" value={data_inicio} onChange={e => setDataInicio(e.target.value)} className="input-moderno" />
            </div>
            <div>
              <label className="block text-xs text-[#6B7280] font-medium mb-1.5 tracking-wide uppercase">Horário</label>
              <input type="time" value={horario} onChange={e => setHorario(e.target.value)} className="input-moderno" />
            </div>
          </div>
          <div>
            <label className="block text-xs text-[#6B7280] font-medium mb-1.5 tracking-wide uppercase">Local</label>
            <input value={local} onChange={e => setLocal(e.target.value)} className="input-moderno" placeholder="Onde será a atividade" />
          </div>
          <div>
            <label className="block text-xs text-[#6B7280] font-medium mb-1.5 tracking-wide uppercase">Alerta (minutos antes)</label>
            <input type="number" value={alerta_antecipado} onChange={e => setAlertaAntecipado(Number(e.target.value))} min={0} className="input-moderno" />
          </div>
          <button type="submit" className="btn-primary w-full mt-2">
            Criar Atividade
          </button>
        </form>
      </div>
    </div>
  );
}
