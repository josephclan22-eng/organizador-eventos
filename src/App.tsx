import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { useAtividades } from './hooks/useAtividades';
import { useAlertas } from './hooks/useAlertas';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { AlertaOverlay } from './components/AlertaOverlay';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { AtividadesPage } from './pages/AtividadesPage';
import { Calendario } from './pages/Calendario';
import type { Categoria } from './types';

export default function App() {
  const { user, signIn, signOut } = useAuth();
  const { atividades, loading, seedAtividades, addAtividade, updateAtividade, deleteAtividade, getByCategoria, hoje, proximas } = useAtividades();
  const { alertasAtivos, dismissAlerta, dismissAll } = useAlertas(atividades);

  if (!user) return <Login onSignIn={signIn} />;

  const empty = !loading && atividades.length === 0;

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col relative">
        <div className="bg-orbs">
          <div className="bg-orb bg-orb-1" />
          <div className="bg-orb bg-orb-2" />
          <div className="bg-orb bg-orb-3" />
          <div className="bg-orb bg-orb-4" />
        </div>

        <Header nome={user} onSignOut={signOut} />
        <div className="flex flex-1 relative z-10">
          <Sidebar />
          <main className="flex-1 min-h-0 relative">
            <AlertaOverlay alertas={alertasAtivos} onDismiss={dismissAlerta} onDismissAll={dismissAll} />

            {empty && (
              <div className="absolute inset-0 z-40 flex items-center justify-center"
                style={{ background: 'rgba(6,7,10,0.75)', backdropFilter: 'blur(12px)' }}>
                <div className="glass-panel p-10 max-w-lg text-center mx-4 animate-scale-in">
                  <div className="flex items-center justify-center gap-2 mb-6">
                    {['#FF6B35', '#22C55E', '#F59E0B'].map((c, i) => (
                      <div key={c} className="w-4 h-4 rounded-full"
                        style={{ background: c, boxShadow: `0 0 12px ${c}80`, animationDelay: `${i * 0.2}s` }} />
                    ))}
                  </div>
                  <h2 className="text-2xl font-black text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Bem-vindo ao organizador<span className="text-[#F59E0B]">.</span>
                  </h2>
                  <p className="text-[#64748B] text-sm mb-8 leading-relaxed">
                    Comece com 12 atividades de exemplo nas áreas de{' '}
                    <span className="text-[#FF6B35] font-semibold">Trabalho</span>,{' '}
                    <span className="text-[#22C55E] font-semibold">Pessoal</span> e{' '}
                    <span className="text-[#F59E0B] font-semibold">CCB</span>
                  </p>
                  <button onClick={seedAtividades} className="btn-primary text-base px-10 py-3.5">
                    Carregar Exemplos
                  </button>
                </div>
              </div>
            )}

            <Routes>
              <Route path="/" element={<Dashboard hoje={hoje} proximas={proximas} getByCategoria={getByCategoria} atividades={atividades} addAtividade={addAtividade} updateAtividade={updateAtividade} deleteAtividade={deleteAtividade} />} />
              <Route path="/atividades" element={<AtividadesPage atividades={atividades} addAtividade={addAtividade} updateAtividade={updateAtividade} deleteAtividade={deleteAtividade} titulo="Todas as Atividades" />} />
              {(['trabalho', 'pessoal', 'ccb'] as Categoria[]).map(cat => (
                <Route key={cat} path={`/categoria/${cat}`} element={
                  <AtividadesPage atividades={getByCategoria(cat)} addAtividade={addAtividade} updateAtividade={updateAtividade} deleteAtividade={deleteAtividade} categoriaPadrao={cat}
                    titulo={cat === 'trabalho' ? 'Trabalho' : cat === 'pessoal' ? 'Pessoal' : 'CCB'} />
                } />
              ))}
              <Route path="/calendario" element={<Calendario atividades={atividades} addAtividade={addAtividade} updateAtividade={updateAtividade} deleteAtividade={deleteAtividade} />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}
