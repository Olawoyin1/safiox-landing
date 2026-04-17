import React from 'react';
import { Search, Bell, Menu } from 'lucide-react';

const AdminHeader = ({ title, subtitle, onMenuOpen }) => {
    return (
        <header className="flex items-center justify-between px-5 md:px-8 py-4 md:py-5 bg-safiox-dark text-white sticky top-0 z-20 border-b border-safiox-border">
            <div className="flex items-center gap-3">
                {/* Hamburger — mobile only */}
                <button
                    onClick={onMenuOpen}
                    className="md:hidden p-2 rounded-lg hover:bg-white/10 transition text-white"
                    aria-label="Open menu"
                >
                    <Menu className="w-5 h-5" />
                </button>
                <div>
                    <h1 className="text-base md:text-xl font-bold leading-tight">{title}</h1>
                    <p className="text-[11px] md:text-xs text-safiox-muted mt-0.5">{subtitle}</p>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <div className="relative hidden md:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-safiox-muted" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-safiox-card border border-safiox-border rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-safiox-red transition w-64"
                    />
                </div>
                <button className="relative p-2 bg-safiox-card rounded-lg border border-safiox-border hover:bg-white/5 transition">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-safiox-red rounded-full"></span>
                </button>
            </div>
        </header>
    );
};

export default AdminHeader;
