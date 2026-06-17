interface HeaderProps {
  nome: string;
  onSignOut: () => void;
}

export function Header({ nome, onSignOut }: HeaderProps) {
  return (
    <header style={{
      background: 'rgba(15, 17, 23, 0.85)',
      backdropFilter: 'blur(24px) saturate(180%)',
      WebkitBackdropFilter: 'blur(24px) saturate(180%)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
    }} className="sticky top-0 z-40">
      <div className="max-w-[1600px] mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF6B35] shadow-[0_0_12px_rgba(255,107,53,0.5)]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#22C55E] shadow-[0_0_12px_rgba(34,197,94,0.5)]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B] shadow-[0_0_12px_rgba(245,158,11,0.5)]" />
          </div>
          <h1 className="text-lg font-black tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            Organizador<span className="gradient-text-gold" style={{ WebkitTextFillColor: '#F59E0B', background: 'none' }}>.</span>
          </h1>
        </div>

        <div className="flex items-center gap-5">
          <div className="flex items-center gap-3 bg-[rgba(255,255,255,0.03)] px-4 py-2 rounded-full border border-[rgba(255,255,255,0.05)]">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F59E0B] to-[#D97706] flex items-center justify-center text-xs font-bold text-[#0F172A] shadow-[0_0_16px_rgba(245,158,11,0.3)]">
              {nome.charAt(0).toUpperCase()}
            </div>
            <span className="text-sm font-medium text-[#94A3B8]">{nome}</span>
          </div>

          <button
            onClick={onSignOut}
            className="text-xs text-[#475569] hover:text-[#94A3B8] transition-colors px-3 py-1.5 rounded-full hover:bg-[rgba(255,255,255,0.03)]"
          >
            Sair
          </button>
        </div>
      </div>
    </header>
  );
}
