import type { Atividade, Categoria, Prioridade } from '../types';
import { atividadesSeed } from './seed';

const STORAGE_KEY = 'organizador_atividades';
const USER_KEY = 'organizador_user';

function gerarId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

export function getAtividades(): Atividade[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveAtividades(atividades: Atividade[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(atividades));
}

export function addAtividade(atividade: {
  titulo: string; descricao: string; categoria: Categoria;
  prioridade: Prioridade; data_inicio: string; data_fim: string;
  horario: string; local: string; alerta_antecipado: number;
}): Atividade {
  const atividades = getAtividades();
  const nova: Atividade = {
    ...atividade,
    status: 'pendente',
    id: gerarId(),
    user_id: 'local',
    notificado: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  atividades.push(nova);
  saveAtividades(atividades);
  return nova;
}

export function updateAtividade(id: string, updates: Partial<Atividade>): void {
  const atividades = getAtividades();
  const index = atividades.findIndex(a => a.id === id);
  if (index !== -1) {
    atividades[index] = { ...atividades[index], ...updates, updated_at: new Date().toISOString() };
    saveAtividades(atividades);
  }
}

export function deleteAtividade(id: string): void {
  const atividades = getAtividades().filter(a => a.id !== id);
  saveAtividades(atividades);
}

export function seedAtividades(): void {
  const exists = getAtividades();
  if (exists.length > 0) return;
  const novas: Atividade[] = atividadesSeed.map(a => ({
    ...a,
    id: gerarId(),
    user_id: 'local',
    notificado: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }));
  saveAtividades(novas);
}

export function getUser(): string | null {
  return localStorage.getItem(USER_KEY);
}

export function setUser(nome: string): void {
  localStorage.setItem(USER_KEY, nome);
}

export function clearUser(): void {
  localStorage.removeItem(USER_KEY);
}
