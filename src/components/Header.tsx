interface HeaderProps {
  nome: string;
  onSignOut: () => void;
}

export function Header({ nome, onSignOut }: HeaderProps) {
  return (
    <header className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-blue-500" />
          <span className="w-3 h-3 rounded-full bg-green-500" />
          <span className="w-3 h-3 rounded-full bg-yellow-500" />
        </div>
        <h1 className="text-xl font-bold text-white">Organizador CCB</h1>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-gray-400 text-sm">{nome}</span>
        <button
          onClick={onSignOut}
          className="text-sm text-gray-400 hover:text-white transition-colors"
        >
          Sair
        </button>
      </div>
    </header>
  );
}
