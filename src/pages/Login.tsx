import { useState } from 'react';
import { Sparkles } from 'lucide-react';

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
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="floating-orbs">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>

      <div className="w-full max-w-md relative z-10 animate-fade-in">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 rounded-full bg-[#FF6B35] shadow-[0_0_12px_rgba(255,107,53,0.5)]" />
              <div className="w-4 h-4 rounded-full bg-[#4CAF50] shadow-[0_0_12px_rgba(76,175,80,0.5)]" />
              <div className="w-4 h-4 rounded-full bg-[#FFB703] shadow-[0_0_12px_rgba(255,183,3,0.5)]" />
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Organizador<span className="text-[#FFB703]">.</span>
          </h1>
          <p className="text-[#6B7280] text-sm">Equilibre sua vida em três áreas</p>
        </div>

        <div
          className="rounded-2xl p-8 backdrop-blur-xl"
          style={{
            background: 'linear-gradient(135deg, rgba(31,40,51,0.8), rgba(15,20,28,0.9))',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-4 h-4 text-[#FFB703]" />
            <span className="text-xs text-[#6B7280] tracking-widest uppercase font-medium">Comece agora</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs text-[#6B7280] font-medium mb-1.5 tracking-wide uppercase">Seu nome</label>
              <input
                value={nome}
                onChange={e => setNome(e.target.value)}
                required
                className="input-moderno"
                placeholder="Digite seu nome"
              />
            </div>
            <button type="submit" disabled={!nome.trim()} className="btn-primary w-full">
              Entrar
            </button>
            <p className="text-[10px] text-[#4B5563] text-center">
              Seus dados ficam salvos apenas neste navegador
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
