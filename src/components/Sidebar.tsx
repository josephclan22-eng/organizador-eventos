import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  ListTodo,
  Briefcase,
  User,
  Cross,
  Bell,
  Calendar,
} from 'lucide-react';

export function Sidebar() {
  const links = [
    { to: '/', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/atividades', label: 'Todas Atividades', icon: ListTodo },
    { to: '/categoria/trabalho', label: 'Trabalho', icon: Briefcase },
    { to: '/categoria/pessoal', label: 'Pessoal', icon: User },
    { to: '/categoria/ccb', label: 'CCB', icon: Cross },
    { to: '/calendario', label: 'Calendário', icon: Calendar },
  ];

  return (
    <aside className="w-64 bg-gray-900 border-r border-gray-800 min-h-screen p-4">
      <div className="flex items-center gap-2 mb-8 px-3">
        <Bell className="w-5 h-5 text-yellow-500" />
        <span className="text-sm font-medium text-gray-300">Alertas Ativos</span>
      </div>
      <nav className="space-y-1">
        {links.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
              }`
            }
          >
            <link.icon className="w-4 h-4" />
            {link.label}
          </NavLink>
        ))}
      </nav>
      <div className="mt-8 px-3 py-4 bg-gray-800 rounded-lg">
        <p className="text-xs text-gray-500 leading-relaxed">
          Lembre-se: "Portanto, meus amados irmãos, sede firmes e constantes, sempre abundantes na obra do Senhor."
          <br />
          <span className="text-gray-600">1 Coríntios 15:58</span>
        </p>
      </div>
    </aside>
  );
}
