export type Categoria = 'trabalho' | 'pessoal' | 'ccb';

export type Prioridade = 'baixa' | 'media' | 'alta';

export type StatusAtividade = 'pendente' | 'em_andamento' | 'concluida' | 'cancelada';

export interface Atividade {
  id: string;
  user_id: string;
  titulo: string;
  descricao: string;
  categoria: Categoria;
  prioridade: Prioridade;
  status: StatusAtividade;
  data_inicio: string;
  data_fim: string;
  horario: string;
  local?: string;
  alerta_antecipado?: number;
  notificado: boolean;
  created_at: string;
  updated_at: string;
}
