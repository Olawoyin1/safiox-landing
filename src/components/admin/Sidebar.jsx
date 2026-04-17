import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard, Building2, Users, AlertCircle,
    History, Shield, HeartHandshake, LogOut, ShieldCheck, User, X
} from 'lucide-react';

const menuItems = [
    { path: '/admin/dashboard',     label: 'Dashboard',       icon: LayoutDashboard },
    { path: '/admin/organizations', label: 'Organizations',   icon: Building2, badge: true },
    { path: '/admin/users',         label: 'User Management', icon: Users },
    { path: '/admin/emergency',     label: 'SOS Monitoring',  icon: AlertCircle },
    { path: '/admin/incidents',     label: 'Incident Logs',   icon: History },
    { path: '/admin/moderation',    label: 'Moderation',      icon: Shield },
    { path: '/admin/community',     label: 'Responders',      icon: HeartHandshake },
];

const Sidebar = ({ pendingCount, isOpen, onClose }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('safiox_admin_token');
        navigate('/admin/login', { replace: true });
    };

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/50 z-30 md:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            />

            <aside className={`fixed inset-y-0 left-0 w-64 bg-safiox-dark text-white z-40 md:relative md:translate-x-0 transition-transform duration-300 ease-in-out flex flex-col border-r border-safiox-border overflow-y-auto ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-3 font-bold text-2xl">
                        <div className="bg-safiox-red p-1.5 rounded-xl shadow-lg shadow-red-500/20">
                            <ShieldCheck className="w-7 h-7" />
                        </div>
                        <span>Safiox</span>
                    </div>
                    <button onClick={onClose} className="md:hidden text-safiox-muted hover:text-white transition p-1">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <nav className="px-3 space-y-1 flex-1">
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            onClick={onClose}
                            className={({ isActive }) =>
                                `w-full flex items-center gap-3 px-4 py-3 rounded-lg transition group ${
                                    isActive
                                        ? 'bg-safiox-red shadow-lg shadow-red-500/20 text-white'
                                        : 'hover:bg-white/5 text-safiox-muted hover:text-white'
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <item.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-safiox-muted group-hover:text-white'}`} />
                                    <span className="font-medium">{item.label}</span>
                                    {item.badge && pendingCount > 0 && (
                                        <span className="ml-auto bg-white/20 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                                            {pendingCount}
                                        </span>
                                    )}
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>

                <div className="p-4 border-t border-safiox-border">
                    <div className="flex items-center gap-3 px-2">
                        <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-safiox-border">
                            <User className="w-5 h-5 text-safiox-muted" />
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <p className="text-sm font-bold truncate">Admin Center</p>
                            <p className="text-xs text-safiox-muted truncate">admin@safiox.com</p>
                        </div>
                        <button onClick={handleLogout} className="text-safiox-muted hover:text-white transition" title="Logout">
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
