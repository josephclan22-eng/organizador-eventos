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
      <div className="min-h-screen bg-gray-950 flex flex-col">
        <Header nome={user} onSignOut={signOut} />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 relative">
            <AlertaOverlay alertas={alertasAtivos} onDismiss={dismissAlerta} onDismissAll={dismissAll} />

            {activitiesEmpty && (
              <div className="absolute inset-0 z-40 flex items-center justify-center bg-gray-950/80 backdrop-blur-sm">
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 max-w-md text-center mx-4">
                  <h2 className="text-xl font-bold text-white mb-2">Bem-vindo ao Organizador!</h2>
                  <p className="text-gray-400 text-sm mb-6">
                    Seu sistema está vazio. Deseja carregar atividades de exemplo para começar?
                  </p>
                  <button
                    onClick={seedAtividades}
                    className="px-6 py-3 bg-yellow-600 hover:bg-yellow-500 text-white font-medium rounded-lg transition-colors"
                  >
                    Carregar Atividades de Exemplo
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
