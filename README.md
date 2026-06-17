# Organizador CCB

Sistema web para organizar atividades de **Trabalho**, **Pessoal** e **Igreja (CCB)** com alertas inteligentes.

## Funcionalidades

- **3 Categorias**: Trabalho, Pessoal e CCB
- **Alertas Visuais e Sonoros**: Notificações push com som
- **Dashboard**: Visão geral das atividades do dia e próximos 7 dias
- **Calendário**: Visualização mensal das atividades
- **Autenticação**: Login seguro via Supabase
- **Atividades de Exemplo**: Seed com 12 atividades pré-preenchidas
- **CRUD Completo**: Criar, editar, concluir e excluir atividades
- **Atualização em Tempo Real**: Mudanças refletem automaticamente

## Tecnologias

- **Frontend**: React 19 + TypeScript + Vite
- **UI**: Lucide React (ícones), CSS puro com tema dark
- **Backend/Database**: Supabase (PostgreSQL + Auth)
- **Deploy**: Vercel

## Como Usar

### 1. Configurar Supabase

1. Crie uma conta em [supabase.com](https://supabase.com)
2. Crie um novo projeto
3. Vá no **SQL Editor** e execute o conteúdo do arquivo `src/lib/seed-atividades.sql`
4. Vá em **Project Settings > API** e copie a URL e a Anon Key

### 2. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anon-aqui
```

### 3. Rodar Localmente

```bash
npm install
npm run dev
```

### 4. Deploy no Vercel

1. Faça push do código para um repositório GitHub
2. Acesse [vercel.com](https://vercel.com) e importe o repositório
3. Adicione as variáveis de ambiente no Vercel:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy automático será feito

Ou use a CLI:

```bash
npm i -g vercel
vercel --prod
```

## Estrutura do Projeto

```
src/
  components/     # Componentes reutilizáveis
    Header.tsx
    Sidebar.tsx
    AtividadeCard.tsx
    NovaAtividadeModal.tsx
    AlertaOverlay.tsx
  pages/          # Páginas
    Login.tsx
    Dashboard.tsx
    AtividadesPage.tsx
    Calendario.tsx
  hooks/          # Hooks personalizados
    useAuth.ts
    useAtividades.ts
    useAlertas.ts
  lib/            # Configurações
    supabase.ts
    seed.ts
    seed-atividades.sql
  types/          # Tipos TypeScript
    index.ts
```

## Atividades de Exemplo Inclusas

- **Trabalho**: Reunião semanal, relatório mensal, revisão de código
- **Pessoal**: Consulta médica, aniversário, treino academia
- **CCB**: Ensino bíblico, Santa Ceia, coral, jejum, reunião de obreiros, culto dominical
