import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, ListTodo, Briefcase, User, Cross, Calendar,
} from 'lucide-react';

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, color: '#FFB703' },
  { to: '/atividades', label: 'Atividades', icon: ListTodo, color: '#A0A8B3' },
  { to: '/categoria/trabalho', label: 'Trabalho', icon: Briefcase, color: '#FF6B35' },
  { to: '/categoria/pessoal', label: 'Pessoal', icon: User, color: '#4CAF50' },
  { to: '/categoria/ccb', label: 'CCB', icon: Cross, color: '#FFB703' },
  { to: '/calendario', label: 'Calendário', icon: Calendar, color: '#A0A8B3' },
];

export function Sidebar() {
  return (
    <aside className="w-64 min-h-screen border-r border-[rgba(255,255,255,0.04)] py-6 px-3 hidden lg:block">
      <div className="space-y-1">
        {navItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-[rgba(255,255,255,0.06)] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]'
                  : 'text-[#6B7280] hover:text-[#A0A8B3] hover:bg-[rgba(255,255,255,0.03)]'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon
                  className="w-4 h-4 transition-all duration-200"
                  style={{ color: isActive ? item.color : undefined }}
                />
                <span>{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
      <div className="mt-8 mx-3 p-4 rounded-xl bg-gradient-to-br from-[rgba(255,183,3,0.08)] to-[rgba(255,107,53,0.04)] border border-[rgba(255,183,3,0.12)]">
        <p className="text-xs leading-relaxed text-[rgba(255,255,255,0.6)]">
          "Portanto, meus amados irmãos, sede firmes e constantes, sempre abundantes na obra do Senhor."
        </p>
        <p className="text-[10px] text-[rgba(255,255,255,0.3)] mt-2">1 Coríntios 15:58</p>
      </div>
    </aside>
  );
}
