import { useState } from 'react';

interface LoginProps {
  onSignIn: (nome: string) => void;
}

export function Login({ onSignIn }: LoginProps) {
  const [nome, setNome] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nome.trim()) onSignIn(nome.trim());
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
            Bem-vindo!
          </h2>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Seu Nome</label>
            <input
              value={nome}
              onChange={e => setNome(e.target.value)}
              required
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-gray-600"
              placeholder="Digite seu nome"
            />
          </div>

          <button
            type="submit"
            disabled={!nome.trim()}
            className="w-full py-2.5 bg-yellow-600 hover:bg-yellow-500 disabled:bg-yellow-600/50 text-white font-medium rounded-lg transition-colors text-sm"
          >
            Entrar
          </button>

          <p className="text-xs text-gray-600 text-center">
            Seus dados ficam salvos apenas neste navegador
          </p>
        </form>
      </div>
    </div>
  );
}
