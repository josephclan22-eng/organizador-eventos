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

export interface Profile {
  id: string;
  nome: string;
  email: string;
  alerta_som: boolean;
  alerta_antecipado_padrao: number;
  created_at: string;
}

export interface Database {
  public: {
    Tables: {
      atividades: {
        Row: Atividade;
        Insert: Omit<Atividade, 'id' | 'created_at' | 'updated_at' | 'notificado'>;
        Update: Partial<Omit<Atividade, 'id' | 'created_at' | 'updated_at'>>;
      };
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, 'created_at'>;
        Update: Partial<Omit<Profile, 'id' | 'created_at'>>;
      };
    };
  };
}
