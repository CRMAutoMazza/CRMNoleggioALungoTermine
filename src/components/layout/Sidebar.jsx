import React from 'react';
import { LayoutDashboard, Users, Settings, LogOut, Car, Inbox, FolderOpen, MessageCircle, Bell, Zap, Calendar, Moon, Sun, Tag } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { useTheme } from '../../context/ThemeContext';
import { useCRM } from '../../context/CRMContext';

const Sidebar = ({ onClose }) => {
    const location = useLocation();
    const { theme, toggleTheme } = useTheme();
    const { companyName, isElectron } = useCRM();

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
        { icon: Users, label: 'Leads', path: '/leads' },
        // Only show full management tabs on PC (Electron)
        ...(isElectron ? [
            { icon: Inbox, label: 'Posta in Arrivo', path: '/inbox' },
            { icon: MessageCircle, label: 'WhatsApp', path: '/whatsapp' },
        ] : []),
        { icon: Calendar, label: 'Agenda', path: '/agenda' },
        { icon: Tag, label: 'Offerte', path: '/offers' },
        { icon: Bell, label: 'Promemoria', path: '/reminders' },
        { icon: FolderOpen, label: 'Documenti', path: '/documents' },
        { icon: Zap, label: 'Automazioni', path: '/automations' },
        { icon: Settings, label: 'Impostazioni', path: '/settings' },
    ];

    return (
        <div className="h-full md:h-screen w-64 glass-panel flex flex-col border-r-0 md:rounded-r-2xl md:my-4 md:ml-4 relative overflow-hidden bg-white dark:bg-slate-900 shadow-xl shadow-slate-200/50 dark:shadow-none transition-colors duration-300">
            {/* Ambient Glow */}
            <div className="absolute top-0 left-0 w-full h-32 bg-purple-100/50 dark:bg-purple-900/20 blur-3xl pointer-events-none" />

            <div className="p-4 md:p-6 flex items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 relative z-10">
                <div className="flex items-center gap-3 overflow-hidden">
                    {localStorage.getItem('company_logo') ? (
                        <img
                            src={localStorage.getItem('company_logo')}
                            alt="Logo"
                            className="w-10 h-10 object-contain"
                        />
                    ) : (
                        <div className="bg-gradient-to-br from-red-600 to-slate-800 p-2.5 rounded-xl shadow-lg shadow-red-500/20 flex-shrink-0">
                            <Car className="w-6 h-6 text-white" />
                        </div>
                    )}
                    <span className="text-xl font-bold bg-gradient-to-r from-red-600 to-slate-800 dark:from-white dark:to-slate-400 bg-clip-text text-transparent truncate" title={companyName}>
                        {companyName}
                    </span>
                </div>
                {/* Mobile Close Button */}
                <button
                    onClick={onClose}
                    className="md:hidden p-1 text-slate-400 hover:text-red-500"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </div>

            <nav className="flex-1 p-4 space-y-2 relative z-10 overflow-y-auto custom-scrollbar">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;

                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            onClick={onClose}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden",
                                isActive
                                    ? "text-purple-700 dark:text-white bg-purple-50 dark:bg-purple-500/20 shadow-sm border border-purple-100 dark:border-purple-500/30"
                                    : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5"
                            )}
                        >
                            {isActive && (
                                <div className="absolute inset-0 bg-purple-50 dark:bg-purple-500/10 -z-10" />
                            )}

                            <Icon className={cn("w-5 h-5 transition-colors", isActive ? "text-purple-600 dark:text-purple-400" : "text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300")} />
                            <span className="font-medium">{item.label}</span>

                            {isActive && (
                                <div className="absolute right-2 w-1.5 h-1.5 rounded-full bg-purple-600 dark:bg-purple-400" />
                            )}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-slate-100 dark:border-slate-800 relative z-10 space-y-2">
                <button
                    onClick={toggleTheme}
                    className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-purple-600 dark:hover:text-purple-400 transition-all group"
                >
                    {theme === 'dark' ? (
                        <>
                            <Sun className="w-5 h-5 group-hover:text-yellow-500 transition-colors" />
                            <span className="font-medium">Light Mode</span>
                        </>
                    ) : (
                        <>
                            <Moon className="w-5 h-5 group-hover:text-purple-500 transition-colors" />
                            <span className="font-medium">Dark Mode</span>
                        </>
                    )}
                </button>

                <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-slate-500 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-900/10 hover:text-red-600 transition-all group">
                    <LogOut className="w-5 h-5 group-hover:text-red-500 transition-colors" />
                    <span className="font-medium">Esci</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
