import { X, LayoutGrid, BarChart3, Users, BookOpen, GraduationCap, CreditCard, Settings, FileText, ChevronRight } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import SidebarItem from './SidebarItem';

const iconMap = {
    dashboard: LayoutGrid,
    analytics: BarChart3,
    users: Users,
    courses: BookOpen,
    teachers: GraduationCap,
    payments: CreditCard,
    settings: Settings,
    logs: FileText,
};

export default function Sidebar({ sections, mobileOpen, onClose }) {
    const content = (
        <aside className="flex h-full w-[260px] flex-col bg-[#182230] p-6 text-[#E2E8F0]">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-400">GrowUp</p>
                    <h2 className="mt-2 text-xl font-semibold text-white">ESPACE ADMINISTRATEUR</h2>
                </div>
                <button className="rounded-xl p-2 text-slate-400 hover:bg-white/10 lg:hidden" onClick={onClose} aria-label="Close sidebar">
                    <X className="h-5 w-5" />
                </button>
            </div>

            <nav className="mt-8 space-y-6">
                {sections.map((section) => (
                    <div key={section.title}>
                        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-500">{section.title}</p>
                        <div className="space-y-1">
                            {section.items.map((item) => {
                                const Icon = typeof item.icon === 'string' ? (iconMap[item.icon] || LayoutGrid) : item.icon || LayoutGrid;
                                return (
                                    <SidebarItem key={`${item.to}-${item.label}`} to={item.to} label={item.label} icon={Icon} />
                                );
                            })}
                        </div>
                    </div>
                ))}
            </nav>

            <div className="mt-auto rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#3B5BFF] text-sm font-semibold text-white">SA</div>
                    <div>
                        <p className="font-semibold text-white">Sami A.</p>
                        <p className="text-sm text-slate-400">Administrateur</p>
                    </div>
                </div>
            </div>
        </aside>
    );

    return (
        <>
            <div className={`fixed inset-0 z-20 bg-slate-950/40 transition ${mobileOpen ? 'opacity-100' : 'pointer-events-none opacity-0'} lg:hidden`} onClick={onClose} />
            <div className={`fixed inset-y-0 left-0 z-30 transition-transform duration-200 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} lg:static lg:translate-x-0`}>
                {content}
            </div>
        </>
    );
}
