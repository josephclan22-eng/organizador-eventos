import { useState, useCallback, useEffect } from 'react';
import type { Atividade, Categoria, Prioridade, StatusAtividade } from '../types';
import {
  getAtividades,
  addAtividade as addStorage,
  updateAtividade as updateStorage,
  deleteAtividade as deleteStorage,
  seedAtividades as seedStorage,
} from '../lib/storage';

export function useAtividades() {
  const [atividades, setAtividades] = useState<Atividade[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(() => {
    setAtividades(getAtividades());
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const seedAtividades = useCallback(async () => {
    seedStorage();
    refresh();
  }, [refresh]);

  const addAtividade = useCallback(async (atividade: {
    titulo: string; descricao: string; categoria: Categoria;
    prioridade: Prioridade; data_inicio: string; data_fim: string;
    horario: string; local: string; alerta_antecipado: number;
  }) => {
    addStorage(atividade);
    refresh();
  }, [refresh]);

  const updateAtividade = useCallback(async (id: string, updates: Record<string, unknown>) => {
    updateStorage(id, updates as Partial<Atividade>);
    refresh();
  }, [refresh]);

  const deleteAtividade = useCallback(async (id: string) => {
    deleteStorage(id);
    refresh();
  }, [refresh]);

  const getByCategoria = useCallback((cat: Categoria) => {
    return atividades.filter(a => a.categoria === cat);
  }, [atividades]);

  const getByStatus = useCallback((status: StatusAtividade) => {
    return atividades.filter(a => a.status === status);
  }, [atividades]);

  const getByData = useCallback((data: string) => {
    return atividades.filter(a => a.data_inicio === data);
  }, [atividades]);

  const hoje = useCallback(() => {
    const today = new Date().toISOString().split('T')[0];
    return atividades.filter(a => a.data_inicio === today && a.status !== 'concluida' && a.status !== 'cancelada');
  }, [atividades]);

  const proximas = useCallback((dias: number = 7) => {
    const today = new Date();
    const future = new Date(today);
    future.setDate(future.getDate() + dias);
    const todayStr = today.toISOString().split('T')[0];
    const futureStr = future.toISOString().split('T')[0];
    return atividades.filter(a =>
      a.data_inicio >= todayStr &&
      a.data_inicio <= futureStr &&
      a.status !== 'concluida' &&
      a.status !== 'cancelada'
    );
  }, [atividades]);

  return {
    atividades, loading, seedAtividades, addAtividade, updateAtividade, deleteAtividade,
    getByCategoria, getByStatus, getByData, hoje, proximas, refresh,
  };
}
