import type { Categoria, Prioridade, StatusAtividade } from '../types';

interface SeedAtividade {
  titulo: string;
  descricao: string;
  categoria: Categoria;
  prioridade: Prioridade;
  status: StatusAtividade;
  data_inicio: string;
  data_fim: string;
  horario: string;
  local: string;
  alerta_antecipado: number;
}

export const atividadesSeed: SeedAtividade[] = [
  // ===== TRABALHO =====
  {
    titulo: 'Reunião de planejamento semanal',
    descricao: 'Alinhamento com a equipe sobre as metas da semana',
    categoria: 'trabalho',
    prioridade: 'alta',
    status: 'pendente',
    data_inicio: '2026-06-22',
    data_fim: '2026-06-22',
    horario: '09:00',
    local: 'Sala de reuniões 2',
    alerta_antecipado: 30,
  },
  {
    titulo: 'Entrega relatório mensal',
    descricao: 'Finalizar e entregar relatório de métricas do mês',
    categoria: 'trabalho',
    prioridade: 'alta',
    status: 'pendente',
    data_inicio: '2026-06-25',
    data_fim: '2026-06-25',
    horario: '18:00',
    local: 'Escritório',
    alerta_antecipado: 120,
  },
  {
    titulo: 'Revisão de código do projeto X',
    descricao: 'Revisar pull requests pendentes no repositório',
    categoria: 'trabalho',
    prioridade: 'media',
    status: 'pendente',
    data_inicio: '2026-06-20',
    data_fim: '2026-06-20',
    horario: '14:00',
    local: 'Remoto - GitHub',
    alerta_antecipado: 15,
  },

  // ===== PESSOAL =====
  {
    titulo: 'Consulta médica anual',
    descricao: 'Check-up geral com clínico',
    categoria: 'pessoal',
    prioridade: 'alta',
    status: 'pendente',
    data_inicio: '2026-06-24',
    data_fim: '2026-06-24',
    horario: '10:30',
    local: 'Clínica Saúde Total',
    alerta_antecipado: 60,
  },
  {
    titulo: 'Aniversário da esposa',
    descricao: 'Comprar presente e reservar jantar',
    categoria: 'pessoal',
    prioridade: 'alta',
    status: 'pendente',
    data_inicio: '2026-07-02',
    data_fim: '2026-07-02',
    horario: '19:00',
    local: 'Casa',
    alerta_antecipado: 1440,
  },
  {
    titulo: 'Treino na academia',
    descricao: 'Treino de musculação - peito e tríceps',
    categoria: 'pessoal',
    prioridade: 'media',
    status: 'pendente',
    data_inicio: '2026-06-18',
    data_fim: '2026-06-18',
    horario: '06:00',
    local: 'Smart Fit',
    alerta_antecipado: 30,
  },

  // ===== CCB =====
  {
    titulo: 'Ensino Bíblico - Quarta-feira',
    descricao: 'Aula de ensino bíblico semanal',
    categoria: 'ccb',
    prioridade: 'alta',
    status: 'pendente',
    data_inicio: '2026-06-18',
    data_fim: '2026-06-18',
    horario: '19:30',
    local: 'CCB - Centro',
    alerta_antecipado: 60,
  },
  {
    titulo: 'Santa Ceia - 1º Domingo',
    descricao: 'Santa Ceia do Senhor - 1º domingo do mês',
    categoria: 'ccb',
    prioridade: 'alta',
    status: 'pendente',
    data_inicio: '2026-07-05',
    data_fim: '2026-07-05',
    horario: '09:30',
    local: 'CCB - Centro',
    alerta_antecipado: 1440,
  },
  {
    titulo: 'Coral - Ensaio de hinos',
    descricao: 'Ensaio do coral para as apresentações',
    categoria: 'ccb',
    prioridade: 'media',
    status: 'pendente',
    data_inicio: '2026-06-20',
    data_fim: '2026-06-20',
    horario: '15:00',
    local: 'CCB - Salão de ensaios',
    alerta_antecipado: 30,
  },
  {
    titulo: 'Jejum e oração - Primeira sexta',
    descricao: 'Jejum e oração do mês na igreja',
    categoria: 'ccb',
    prioridade: 'media',
    status: 'pendente',
    data_inicio: '2026-07-03',
    data_fim: '2026-07-03',
    horario: '06:00',
    local: 'CCB - Centro',
    alerta_antecipado: 60,
  },
  {
    titulo: 'Reunião de obreiros',
    descricao: 'Reunião mensal com os obreiros da igreja',
    categoria: 'ccb',
    prioridade: 'alta',
    status: 'pendente',
    data_inicio: '2026-06-27',
    data_fim: '2026-06-27',
    horario: '20:00',
    local: 'CCB - Secretaria',
    alerta_antecipado: 60,
  },
  {
    titulo: 'Culto de domingo',
    descricao: 'Culto oficial da CCB - Todos os domingos',
    categoria: 'ccb',
    prioridade: 'alta',
    status: 'pendente',
    data_inicio: '2026-06-21',
    data_fim: '2026-06-21',
    horario: '09:30',
    local: 'CCB - Centro',
    alerta_antecipado: 60,
  },
];
