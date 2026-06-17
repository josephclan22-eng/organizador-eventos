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
  const {
    atividades, loading: loadingAtividades, seedAtividades,
    addAtividade, updateAtividade, deleteAtividade,
    getByCategoria, hoje, proximas,
  } = useAtividades();
  const { alertasAtivos, dismissAlerta, dismissAll } = useAlertas(atividades);

  if (!user) {
    return <Login onSignIn={signIn} />;
  }

  const activitiesEmpty = !loadingAtividades && atividades.length === 0;

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <div className="floating-orbs">
          <div className="orb orb-1" />
          <div className="orb orb-2" />
          <div className="orb orb-3" />
        </div>

        <Header nome={user} onSignOut={signOut} />
        <div className="flex flex-1 relative z-10">
          <Sidebar />
          <main className="flex-1 relative">
            <AlertaOverlay alertas={alertasAtivos} onDismiss={dismissAlerta} onDismissAll={dismissAll} />

            {activitiesEmpty && (
              <div className="absolute inset-0 z-40 flex items-center justify-center bg-[rgba(11,12,16,0.8)] backdrop-blur-sm">
                <div
                  className="rounded-2xl p-8 max-w-md text-center mx-4 animate-scale-in"
                  style={{ background: 'linear-gradient(135deg, rgba(31,40,51,0.9), rgba(15,20,28,0.95))', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-[#FF6B35] shadow-[0_0_8px_rgba(255,107,53,0.5)]" />
                    <div className="w-3 h-3 rounded-full bg-[#4CAF50] shadow-[0_0_8px_rgba(76,175,80,0.5)]" />
                    <div className="w-3 h-3 rounded-full bg-[#FFB703] shadow-[0_0_8px_rgba(255,183,3,0.5)]" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Bem-vindo ao Organizador<span className="text-[#FFB703]">.</span>
                  </h2>
                  <p className="text-[#6B7280] text-sm mb-8 leading-relaxed">
                    Comece com atividades de exemplo para <span className="text-[#FF6B35]">Trabalho</span>,{' '}
                    <span className="text-[#4CAF50]">Pessoal</span> e{' '}
                    <span className="text-[#FFB703]">CCB</span>
                  </p>
                  <button onClick={seedAtividades} className="btn-primary text-base px-8 py-3">
                    Carregar Exemplos
                  </button>
                </div>
              </div>
            )}

            <Routes>
              <Route path="/" element={
                <Dashboard
                  hoje={hoje} proximas={proximas} getByCategoria={getByCategoria}
                  atividades={atividades} addAtividade={addAtividade}
                  updateAtividade={updateAtividade} deleteAtividade={deleteAtividade}
                />
              } />
              <Route path="/atividades" element={
                <AtividadesPage
                  atividades={atividades} addAtividade={addAtividade}
                  updateAtividade={updateAtividade} deleteAtividade={deleteAtividade}
                  titulo="Todas as Atividades"
                />
              } />
              {(['trabalho', 'pessoal', 'ccb'] as Categoria[]).map(cat => (
                <Route key={cat} path={`/categoria/${cat}`} element={
                  <AtividadesPage
                    atividades={getByCategoria(cat)} addAtividade={addAtividade}
                    updateAtividade={updateAtividade} deleteAtividade={deleteAtividade}
                    categoriaPadrao={cat}
                    titulo={cat === 'trabalho' ? 'Trabalho' : cat === 'pessoal' ? 'Pessoal' : 'CCB'}
                  />
                } />
              ))}
              <Route path="/calendario" element={
                <Calendario
                  atividades={atividades} addAtividade={addAtividade}
                  updateAtividade={updateAtividade} deleteAtividade={deleteAtividade}
                />
              } />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}
