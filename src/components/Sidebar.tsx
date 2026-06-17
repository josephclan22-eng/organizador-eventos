import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ListTodo, Briefcase, User, Cross, Calendar } from 'lucide-react';

const items = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, color: '#F59E0B' },
  { to: '/atividades', label: 'Atividades', icon: ListTodo, color: '#94A3B8' },
  { to: '/categoria/trabalho', label: 'Trabalho', icon: Briefcase, color: '#FF6B35' },
  { to: '/categoria/pessoal', label: 'Pessoal', icon: User, color: '#22C55E' },
  { to: '/categoria/ccb', label: 'CCB', icon: Cross, color: '#F59E0B' },
  { to: '/calendario', label: 'Calendário', icon: Calendar, color: '#94A3B8' },
];

export function Sidebar() {
  return (
    <aside className="w-64 min-h-[calc(100vh-64px)] border-r border-[rgba(255,255,255,0.04)] py-8 px-4 hidden lg:block"
      style={{ background: 'rgba(6,7,10,0.5)' }}>
      <nav className="space-y-1.5">
        {items.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 relative group ${
                isActive
                  ? 'text-white'
                  : 'text-[#475569] hover:text-[#94A3B8]'
              }`
            }
            style={({ isActive }) => isActive ? {
              background: `${item.color}10`,
              border: `1px solid ${item.color}20`,
              boxShadow: `0 0 20px -8px ${item.color}20`
            } : {}}
          >
            {({ isActive }) => (
              <>
                <div className="relative">
                  {isActive && (
                    <div className="absolute -inset-2 rounded-full opacity-20 blur-md"
                      style={{ background: item.color }} />
                  )}
                  <item.icon className="w-4 h-4 relative z-10 transition-all duration-300 group-hover:scale-110"
                    style={{ color: isActive ? item.color : undefined }} />
                </div>
                <span>{item.label}</span>
                {isActive && (
                  <div className="absolute right-3 w-1.5 h-5 rounded-full"
                    style={{ background: item.color, boxShadow: `0 0 8px ${item.color}` }} />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto mx-2 mt-8 p-5 rounded-2xl border border-[rgba(245,158,11,0.1)]"
        style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.06), rgba(245,158,11,0.02))' }}>
        <p className="text-[11px] leading-relaxed text-[#64748B] italic">
          "Portanto, meus amados irmãos, sede firmes e constantes..."
        </p>
        <p className="text-[10px] text-[#475569] mt-2 font-medium">1 Coríntios 15:58</p>
      </div>
    </aside>
  );
}
