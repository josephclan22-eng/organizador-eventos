import { useState } from 'react';
import { X } from 'lucide-react';
import type { Categoria, Prioridade } from '../types';

interface NovaAtividadeModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (atividade: {
    titulo: string;
    descricao: string;
    categoria: Categoria;
    prioridade: Prioridade;
    data_inicio: string;
    data_fim: string;
    horario: string;
    local: string;
    alerta_antecipado: number;
  }) => void;
  categoriaPadrao?: Categoria;
}

export function NovaAtividadeModal({ open, onClose, onSave, categoriaPadrao }: NovaAtividadeModalProps) {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState<Categoria>(categoriaPadrao || 'pessoal');
  const [prioridade, setPrioridade] = useState<Prioridade>('media');
  const [data_inicio, setDataInicio] = useState(new Date().toISOString().split('T')[0]);
  const [data_fim, setDataFim] = useState(new Date().toISOString().split('T')[0]);
  const [horario, setHorario] = useState('12:00');
  const [local, setLocal] = useState('');
  const [alerta_antecipado, setAlertaAntecipado] = useState(30);
  const [saving, setSaving] = useState(false);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave({ titulo, descricao, categoria, prioridade, data_inicio, data_fim, horario, local, alerta_antecipado });
      setTitulo('');
      setDescricao('');
      setLocal('');
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-md p-6 mx-4 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-white">Nova Atividade</h2>
          <button onClick={onClose} className="p-1 rounded-lg text-gray-500 hover:text-white hover:bg-gray-800 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Título</label>
            <input
              value={titulo}
              onChange={e => setTitulo(e.target.value)}
              required
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-gray-600"
              placeholder="Digite o título da atividade"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Descrição</label>
            <textarea
              value={descricao}
              onChange={e => setDescricao(e.target.value)}
              rows={2}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-gray-600 resize-none"
              placeholder="Descrição opcional"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Categoria</label>
              <select
                value={categoria}
                onChange={e => setCategoria(e.target.value as Categoria)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-gray-600"
              >
                <option value="trabalho">Trabalho</option>
                <option value="pessoal">Pessoal</option>
                <option value="ccb">CCB</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Prioridade</label>
              <select
                value={prioridade}
                onChange={e => setPrioridade(e.target.value as Prioridade)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-gray-600"
              >
                <option value="baixa">Baixa</option>
                <option value="media">Média</option>
                <option value="alta">Alta</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Data Início</label>
              <input
                type="date"
                value={data_inicio}
                onChange={e => setDataInicio(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Horário</label>
              <input
                type="time"
                value={horario}
                onChange={e => setHorario(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-gray-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Local (opcional)</label>
            <input
              value={local}
              onChange={e => setLocal(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-gray-600"
              placeholder="Onde será a atividade"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Alerta antecipado (minutos)</label>
            <input
              type="number"
              value={alerta_antecipado}
              onChange={e => setAlertaAntecipado(Number(e.target.value))}
              min={0}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-gray-600"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full py-2.5 bg-yellow-600 hover:bg-yellow-500 disabled:bg-yellow-600/50 text-white font-medium rounded-lg transition-colors text-sm"
          >
            {saving ? 'Salvando...' : 'Salvar Atividade'}
          </button>
        </form>
      </div>
    </div>
  );
}
