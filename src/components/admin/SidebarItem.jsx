import { NavLink } from 'react-router-dom';

export default function SidebarItem({ to, label, icon: Icon }) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `flex items-center justify-between rounded-2xl px-3 py-3 text-sm transition duration-200 ${isActive
                    ? 'bg-[#3B5BFF] text-white shadow-sm'
                    : 'text-slate-400 hover:bg-white/10 hover:text-white'
                }`
            }
        >
            {({ isActive }) => (
                <>
                    <span className="flex items-center gap-3">
                        <Icon className="h-4 w-4" />
                        <span>{label}</span>
                    </span>
                    {isActive ? <span className="text-white/80">›</span> : null}
                </>
            )}
        </NavLink>
    );
}
