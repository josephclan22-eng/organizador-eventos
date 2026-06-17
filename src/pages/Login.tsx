import { useState, useEffect, useRef } from 'react';

interface LoginProps {
  onSignIn: (nome: string) => void;
}

function Particles() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const particles: HTMLDivElement[] = [];
    const colors = ['#FF6B35', '#22C55E', '#F59E0B', '#ffffff'];

    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.width = `${Math.random() * 3 + 1}px`;
      particle.style.height = particle.style.width;
      particle.style.background = colors[Math.floor(Math.random() * colors.length)];
      particle.style.animationDuration = `${Math.random() * 15 + 10}s`;
      particle.style.animationDelay = `${Math.random() * 15}s`;
      particle.style.opacity = `${Math.random() * 0.4 + 0.1}`;
      container.appendChild(particle);
      particles.push(particle);
    }

    return () => particles.forEach(p => p.remove());
  }, []);

  return <div ref={containerRef} className="particles-container" />;
}

export function Login({ onSignIn }: LoginProps) {
  const [nome, setNome] = useState('');
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setStep(1), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nome.trim()) onSignIn(nome.trim());
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      <Particles />

      <div className="bg-orbs">
        <div className="bg-orb bg-orb-1" />
        <div className="bg-orb bg-orb-2" />
        <div className="bg-orb bg-orb-3" />
        <div className="bg-orb bg-orb-4" />
      </div>

      <div className="w-full max-w-lg relative z-10">
        <div className={`text-center mb-10 transition-all duration-1000 ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-[#FF6B35] shadow-[0_0_20px_rgba(255,107,53,0.6)]" />
              <div className="w-5 h-5 rounded-full bg-[#22C55E] shadow-[0_0_20px_rgba(34,197,94,0.6)]" />
              <div className="w-5 h-5 rounded-full bg-[#F59E0B] shadow-[0_0_20px_rgba(245,158,11,0.6)]" />
            </div>
          </div>

          <h1 className="text-6xl md:text-7xl font-black tracking-tight mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Organizador
          </h1>

          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-lg font-semibold text-[#FF6B35] tracking-wider" style={{ fontFamily: "'Inter', sans-serif" }}>TRABALHO</span>
            <span className="w-1 h-1 rounded-full bg-[#475569]" />
            <span className="text-lg font-semibold text-[#22C55E] tracking-wider" style={{ fontFamily: "'Inter', sans-serif" }}>PESSOAL</span>
            <span className="w-1 h-1 rounded-full bg-[#475569]" />
            <span className="text-lg font-semibold text-[#F59E0B] tracking-wider" style={{ fontFamily: "'Inter', sans-serif" }}>CCB</span>
          </div>

          <p className="text-[#64748B] text-base max-w-md mx-auto leading-relaxed">
            O equilíbrio da sua vida em um só lugar.
            Gerencie compromissos com elegância.
          </p>
        </div>

        <div className={`glass-panel p-8 transition-all duration-1000 delay-200 ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="label-overline mb-8 text-center">Comece agora</div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="label-overline block mb-2">Seu nome</label>
              <input
                value={nome}
                onChange={e => setNome(e.target.value)}
                required
                autoFocus
                className="input-glass text-lg"
                placeholder="Digite seu nome..."
              />
            </div>

            <button type="submit" disabled={!nome.trim()} className="btn-primary w-full justify-center text-base py-3.5">
              Entrar no Organizador
            </button>

            <p className="text-[11px] text-[#475569] text-center leading-relaxed">
              Dados salvos no navegador &middot; Sem servidores &middot; Sua privacidade em primeiro lugar
            </p>
          </form>
        </div>

        <div className="mt-8 flex justify-center">
          <div className="flex items-center gap-6">
            {[
              { color: '#FF6B35', label: 'Reuniões' },
              { color: '#22C55E', label: 'Saúde' },
              { color: '#F59E0B', label: 'Cultos' },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                <span className="text-[11px] text-[#475569] font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
