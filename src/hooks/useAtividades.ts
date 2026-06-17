import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { Atividade, Categoria, StatusAtividade } from '../types';
import { atividadesSeed } from '../lib/seed';

export function useAtividades(userId: string | undefined) {
  const [atividades, setAtividades] = useState<Atividade[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAtividades = useCallback(async () => {
    if (!userId) return;
    const { data } = await supabase
      .from('atividades')
      .select('*')
      .eq('user_id', userId)
      .order('data_inicio', { ascending: true })
      .order('horario', { ascending: true });
    if (data) setAtividades(data as Atividade[]);
    setLoading(false);
  }, [userId]);

  useEffect(() => {
    fetchAtividades();
    const channel = supabase
      .channel('atividades_changes')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'atividades', filter: `user_id=eq.${userId}` },
        () => fetchAtividades()
      )
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [fetchAtividades, userId]);

  const seedAtividades = useCallback(async () => {
    if (!userId) return;
    const atividadesComUser = atividadesSeed.map(a => ({
      ...a,
      user_id: userId,
    }));
    const { error } = await supabase.from('atividades').insert(atividadesComUser);
    if (error) throw error;
    await fetchAtividades();
  }, [userId, fetchAtividades]);

  const addAtividade = useCallback(async (atividade: {
    titulo: string; descricao: string; categoria: Categoria;
    prioridade: string; data_inicio: string; data_fim: string;
    horario: string; local: string; alerta_antecipado: number;
  }) => {
    if (!userId) return;
    const { error } = await supabase.from('atividades').insert({
      ...atividade,
      user_id: userId,
      status: 'pendente',
    });
    if (error) throw error;
    await fetchAtividades();
  }, [userId, fetchAtividades]);

  const updateAtividade = useCallback(async (id: string, updates: Record<string, unknown>) => {
    const { error } = await supabase.from('atividades').update(updates).eq('id', id);
    if (error) throw error;
    await fetchAtividades();
  }, [fetchAtividades]);

  const deleteAtividade = useCallback(async (id: string) => {
    const { error } = await supabase.from('atividades').delete().eq('id', id);
    if (error) throw error;
    await fetchAtividades();
  }, [fetchAtividades]);

  const getByCategoria = useCallback((cat: Categoria) => {
    return atividades.filter(a => a.categoria === cat);
  }, [atividades]);

  const getByStatus = useCallback((status: StatusAtividade) => {
    return atividades.filter(a => a.status === status);
  }, [atividades]);

  const getByData = useCallback((data: string) => {
    return atividades.filter(a => a.data_inicio === data || a.data_fim === data);
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
    getByCategoria, getByStatus, getByData, hoje, proximas,
  };
}
