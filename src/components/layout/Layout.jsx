import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Bell, Check, Trash2, MessageCircle } from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';

const Layout = ({ children }) => {
    const { notifications, unreadCount, markAsRead, markAllAsRead, clearNotifications } = useNotifications();
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const location = useLocation();
    const isWhatsApp = location.pathname === '/whatsapp';

    // Extract phone from URL query params for WhatsApp fallback
    const searchParams = new URLSearchParams(location.search);
    const phone = searchParams.get('phone');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="flex h-screen overflow-hidden bg-transparent">
            {/* Mobile Sidebar Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            <div className={`
                fixed md:relative z-50 h-full transition-transform duration-300 transform 
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            `}>
                <Sidebar onClose={() => setIsMobileMenuOpen(false)} />
            </div>

            <div className="flex-1 flex flex-col min-w-0 relative w-full">
                {/* Header */}
                <header className="h-16 md:h-20 flex items-center justify-between px-4 md:px-8 py-4 flex-shrink-0 z-20 gap-3">
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="md:hidden p-2 rounded-lg bg-white/50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                    </button>

                    <div className="glass-panel px-3 md:px-6 py-2 rounded-full flex items-center gap-4 flex-1 md:flex-none">
                        {localStorage.getItem('company_logo') ? (
                            <img
                                src={localStorage.getItem('company_logo')}
                                alt="Company Logo"
                                className="h-6 md:h-8 max-w-[100px] md:max-w-[150px] object-contain"
                            />
                        ) : (
                            <h2 className="text-xs md:text-sm font-semibold text-slate-700 uppercase tracking-wider truncate">CRM Dashboard</h2>
                        )}
                        <div className="hidden md:block h-4 w-px bg-slate-300" />
                        <span className="hidden md:block text-xs text-slate-500">{new Date().toLocaleDateString()}</span>
                    </div>

                    <div className="flex items-center gap-2 md:gap-4">
                        <div className="relative">
                            <button
                                onClick={() => setIsNotifOpen(!isNotifOpen)}
                                className="glass-button p-2 md:p-2.5 rounded-full text-slate-600 hover:text-purple-600 transition-colors relative"
                            >
                                <Bell className="w-5 h-5" />
                                {unreadCount > 0 && (
                                    <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-purple-500 border-2 border-white rounded-full animate-pulse" />
                                )}
                            </button>

                            {/* Notification Dropdown */}
                            {isNotifOpen && (
                                <>
                                    <div
                                        className="fixed inset-0 z-10"
                                        onClick={() => setIsNotifOpen(false)}
                                    />
                                    <div className="absolute right-0 mt-4 w-72 md:w-80 glass-panel rounded-2xl overflow-hidden z-20 animate-in fade-in slide-in-from-top-2 shadow-xl bg-white">
                                        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                                            <h3 className="font-semibold text-sm text-slate-800">Notifiche</h3>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={markAllAsRead}
                                                    className="text-xs text-purple-600 hover:text-purple-700 transition-colors"
                                                    title="Segna tutte come lette"
                                                >
                                                    <Check className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={clearNotifications}
                                                    className="text-xs text-red-500 hover:text-red-600 transition-colors"
                                                    title="Cancella tutto"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="max-h-80 overflow-y-auto custom-scrollbar">
                                            {notifications.length > 0 ? (
                                                notifications.map(notif => (
                                                    <div
                                                        key={notif.id}
                                                        onClick={() => markAsRead(notif.id)}
                                                        className={`p-4 border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors ${!notif.read ? 'bg-purple-50' : ''}`}
                                                    >
                                                        <p className={`text-sm ${!notif.read ? 'text-slate-800 font-medium' : 'text-slate-500'}`}>
                                                            {notif.message}
                                                        </p>
                                                        <span className="text-xs text-slate-400 mt-2 block">
                                                            {new Date(notif.date).toLocaleTimeString()}
                                                        </span>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="p-8 text-center text-slate-400 text-sm">
                                                    Nessuna notifica
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="hidden md:flex items-center gap-3 glass-panel pl-1 pr-4 py-1 rounded-full">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 ring-2 ring-white shadow-sm" />
                            <span className="text-sm font-medium text-slate-700">Admin</span>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 overflow-auto p-4 md:p-6 md:pt-0 relative custom-scrollbar">
                    {/* Persistent WhatsApp Webview - WEB APP VERSION */}
                    <div
                        style={{
                            display: isWhatsApp ? 'flex' : 'none',
                            height: '100%',
                            flexDirection: 'column'
                        }}
                        className="animate-in fade-in zoom-in-95 duration-300"
                    >
                        <div className="flex-1 glass-panel rounded-2xl overflow-hidden relative border-0">
                            <div className="flex flex-col items-center justify-center h-full text-slate-500 gap-4 text-center p-6">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                                    <MessageCircle className="w-8 h-8 text-green-600" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-800">WhatsApp Web</h3>
                                <p className="max-w-md">
                                    Dal browser, puoi aprire WhatsApp Web in una nuova scheda o finestra.
                                </p>
                                <div className="flex gap-3 mt-2">
                                    <button
                                        onClick={() => {
                                            const url = `https://web.whatsapp.com/send?phone=${phone?.replace(/\D/g, '') || ''}`;
                                            const width = 1000;
                                            const height = 700;
                                            const left = (window.screen.width - width) / 2;
                                            const top = (window.screen.height - height) / 2;
                                            window.open(url, 'whatsapp-popup', `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes,status=yes`);
                                        }}
                                        className="px-6 py-2.5 bg-green-600 text-white rounded-xl shadow-lg hover:bg-green-700 transition font-medium flex items-center gap-2"
                                    >
                                        Apri WhatsApp Web
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Other Routes */}
                    <div style={{ display: isWhatsApp ? 'none' : 'block', height: '100%' }}>
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Layout;
