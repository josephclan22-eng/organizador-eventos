import { useState } from 'react';
import { X, Sparkles } from 'lucide-react';
import type { Categoria, Prioridade } from '../types';

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (a: {
    titulo: string; descricao: string; categoria: Categoria;
    prioridade: Prioridade; data_inicio: string; data_fim: string;
    horario: string; local: string; alerta_antecipado: number;
  }) => void;
  categoriaPadrao?: Categoria;
}

export function NovaAtividadeModal({ open, onClose, onSave, categoriaPadrao }: Props) {
  const [titulo, setTitulo] = useState('');
  const [desc, setDesc] = useState('');
  const [cat, setCat] = useState<Categoria>(categoriaPadrao || 'pessoal');
  const [prior, setPrior] = useState<Prioridade>('media');
  const [data, setData] = useState(new Date().toISOString().split('T')[0]);
  const [hora, setHora] = useState('12:00');
  const [local, setLocal] = useState('');
  const [alerta, setAlerta] = useState(30);

  if (!open) return null;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ titulo, descricao: desc, categoria: cat, prioridade: prior, data_inicio: data, data_fim: data, horario: hora, local, alerta_antecipado: alerta });
    setTitulo(''); setDesc(''); setLocal('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-scale-in"
      style={{ background: 'rgba(6,7,10,0.8)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}>
      <div
        className="w-full max-w-lg rounded-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(160deg, rgba(20,23,31,0.95), rgba(10,13,18,0.98))',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 24px 80px -20px rgba(0,0,0,0.6)',
          backdropFilter: 'blur(40px)',
        }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-[rgba(255,255,255,0.06)]">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-[#F59E0B]" />
            <h2 className="text-lg font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>Nova Atividade</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-[#475569] hover:text-white hover:bg-[rgba(255,255,255,0.06)] transition-all">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={submit} className="p-6 space-y-4">
          <div>
            <label className="label-overline block mb-2">Título</label>
            <input value={titulo} onChange={e => setTitulo(e.target.value)} required className="input-glass" placeholder="Ex: Reunião de planejamento" />
          </div>
          <div>
            <label className="label-overline block mb-2">Descrição</label>
            <textarea value={desc} onChange={e => setDesc(e.target.value)} rows={2} className="input-glass" placeholder="Detalhes da atividade..." />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label-overline block mb-2">Categoria</label>
              <select value={cat} onChange={e => setCat(e.target.value as Categoria)} className="input-glass">
                <option value="trabalho">Trabalho</option>
                <option value="pessoal">Pessoal</option>
                <option value="ccb">CCB</option>
              </select>
            </div>
            <div>
              <label className="label-overline block mb-2">Prioridade</label>
              <select value={prior} onChange={e => setPrior(e.target.value as Prioridade)} className="input-glass">
                <option value="baixa">Baixa</option>
                <option value="media">Média</option>
                <option value="alta">Alta</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label-overline block mb-2">Data</label>
              <input type="date" value={data} onChange={e => setData(e.target.value)} className="input-glass" />
            </div>
            <div>
              <label className="label-overline block mb-2">Horário</label>
              <input type="time" value={hora} onChange={e => setHora(e.target.value)} className="input-glass" />
            </div>
          </div>
          <div>
            <label className="label-overline block mb-2">Local</label>
            <input value={local} onChange={e => setLocal(e.target.value)} className="input-glass" placeholder="Onde será?" />
          </div>
          <div>
            <label className="label-overline block mb-2">Alerta (min antes)</label>
            <input type="number" value={alerta} onChange={e => setAlerta(Number(e.target.value))} min={0} className="input-glass" />
          </div>
          <button type="submit" className="btn-primary w-full justify-center py-3 text-[15px] mt-2">
            Criar Atividade
          </button>
        </form>
      </div>
    </div>
  );
}
