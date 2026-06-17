-- ============================================
-- SQL PARA CONFIGURAR O SUPABASE
-- Execute no SQL Editor do Supabase Dashboard
-- ============================================

-- 1. CRIAR TABELA DE PERFIS
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nome TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL DEFAULT '',
  alerta_som BOOLEAN NOT NULL DEFAULT true,
  alerta_antecipado_padrao INTEGER NOT NULL DEFAULT 30,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. CRIAR TABELA DE ATIVIDADES
CREATE TABLE IF NOT EXISTS atividades (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  titulo TEXT NOT NULL,
  descricao TEXT NOT NULL DEFAULT '',
  categoria TEXT NOT NULL CHECK (categoria IN ('trabalho', 'pessoal', 'ccb')),
  prioridade TEXT NOT NULL CHECK (prioridade IN ('baixa', 'media', 'alta')),
  status TEXT NOT NULL DEFAULT 'pendente' CHECK (status IN ('pendente', 'em_andamento', 'concluida', 'cancelada')),
  data_inicio DATE NOT NULL,
  data_fim DATE NOT NULL,
  horario TEXT NOT NULL DEFAULT '12:00',
  local TEXT DEFAULT '',
  alerta_antecipado INTEGER DEFAULT 30,
  notificado BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. CRIAR ÍNDICES
CREATE INDEX IF NOT EXISTS idx_atividades_user_id ON atividades(user_id);
CREATE INDEX IF NOT EXISTS idx_atividades_categoria ON atividades(categoria);
CREATE INDEX IF NOT EXISTS idx_atividades_data ON atividades(data_inicio);
CREATE INDEX IF NOT EXISTS idx_atividades_status ON atividades(status);

-- 4. CRIAR FUNÇÃO PARA ATUALIZAR updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 5. CRIAR TRIGGER
DROP TRIGGER IF EXISTS trigger_update_atividades ON atividades;
CREATE TRIGGER trigger_update_atividades
  BEFORE UPDATE ON atividades
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- 6. CRIAR TRIGGER PARA CRIAR PERFIL AUTOMATICAMENTE
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, nome, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'nome', ''),
    COALESCE(NEW.email, '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();

-- 7. HABILITAR RLS (Row Level Security)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE atividades ENABLE ROW LEVEL SECURITY;

-- 8. POLÍTICAS DE SEGURANÇA
CREATE POLICY "Usuários podem ver apenas seu próprio perfil"
  ON profiles FOR ALL
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Usuários podem ver suas próprias atividades"
  ON atividades FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
