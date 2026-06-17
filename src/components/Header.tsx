interface HeaderProps {
  nome: string;
  onSignOut: () => void;
}

export function Header({ nome, onSignOut }: HeaderProps) {
  return (
    <header className="glass" style={{ borderRadius: 0, borderLeft: 'none', borderRight: 'none', borderTop: 'none' }}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#FF6B35] shadow-[0_0_8px_rgba(255,107,53,0.5)]" />
            <div className="w-3 h-3 rounded-full bg-[#4CAF50] shadow-[0_0_8px_rgba(76,175,80,0.5)]" />
            <div className="w-3 h-3 rounded-full bg-[#FFB703] shadow-[0_0_8px_rgba(255,183,3,0.5)]" />
          </div>
          <div>
            <h1 className="text-lg font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
              Organizador<span className="text-[#FFB703]">.</span>
            </h1>
            <p className="text-[10px] text-[#6B7280] tracking-widest uppercase font-medium">Trabalho · Pessoal · CCB</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5 bg-[#1F2833] px-3 py-1.5 rounded-full">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#FFB703] to-[#FF8C42] flex items-center justify-center text-[10px] font-bold text-[#0B0C10]">
              {nome.charAt(0).toUpperCase()}
            </div>
            <span className="text-sm text-[#A0A8B3]">{nome.split(' ')[0]}</span>
          </div>
          <button
            onClick={onSignOut}
            className="text-sm text-[#6B7280] hover:text-white transition-colors px-3 py-1.5 rounded-full hover:bg-[#1F2833]"
          >
            Sair
          </button>
        </div>
      </div>
    </header>
  );
}
