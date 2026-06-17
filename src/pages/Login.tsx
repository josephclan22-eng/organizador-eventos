import { useState } from 'react';
import { Cross, Bell } from 'lucide-react';

interface LoginProps {
  onSignIn: (email: string, password: string) => Promise<void>;
  onSignUp: (email: string, password: string, nome: string) => Promise<void>;
}

export function Login({ onSignIn, onSignUp }: LoginProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isSignUp) {
        await onSignUp(email, password, nome);
        setError('Conta criada! Verifique seu email para confirmar.');
      } else {
        await onSignIn(email, password);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erro ao autenticar';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex items-center gap-1">
              <span className="w-4 h-4 rounded-full bg-blue-500" />
              <span className="w-4 h-4 rounded-full bg-green-500" />
              <span className="w-4 h-4 rounded-full bg-yellow-500" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white">Organizador CCB</h1>
          <p className="text-gray-500 text-sm mt-2">
            Gerencie suas atividades: Trabalho, Pessoal e CCB
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-white text-center">
            {isSignUp ? 'Criar Conta' : 'Entrar'}
          </h2>

          {isSignUp && (
            <div>
              <label className="block text-sm text-gray-400 mb-1">Nome</label>
              <input
                value={nome}
                onChange={e => setNome(e.target.value)}
                required
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-gray-600"
                placeholder="Seu nome"
              />
            </div>
          )}

          <div>
            <label className="block text-sm text-gray-400 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-gray-600"
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Senha</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-gray-600"
              placeholder="Mínimo 6 caracteres"
            />
          </div>

          {error && (
            <p className={`text-sm text-center ${error.includes('verifique') ? 'text-green-400' : 'text-red-400'}`}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-yellow-600 hover:bg-yellow-500 disabled:bg-yellow-600/50 text-white font-medium rounded-lg transition-colors text-sm"
          >
            {loading ? 'Aguarde...' : isSignUp ? 'Criar Conta' : 'Entrar'}
          </button>

          <p className="text-center text-sm text-gray-500">
            {isSignUp ? 'Já tem conta?' : 'Não tem conta?'}{' '}
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-yellow-500 hover:text-yellow-400 transition-colors"
            >
              {isSignUp ? 'Entrar' : 'Cadastre-se'}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
