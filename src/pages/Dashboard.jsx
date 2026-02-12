import React, { useState, useEffect } from 'react';
import { Users, DollarSign, Calendar, TrendingUp, Bell, Mail, ArrowRight, Clock, Edit2, Check, RotateCcw, X, Plus, LayoutDashboard } from 'lucide-react';
import { useCRM } from '../context/CRMContext';
import { useReminders } from '../context/RemindersContext';
import { useNavigate } from 'react-router-dom';
import CalendarWidget from '../components/dashboard/CalendarWidget';
import TodoListWidget from '../components/dashboard/TodoListWidget';

// Static Dashboard Layout
// No more RGL (React Grid Layout) to prevent layout squashing/corruption.
// Using standard CSS Grid/Flexbox for 100% stability.

const StatCard = ({ title, value, change, icon: Icon, color, ...props }) => (
    <div {...props} className="glass-card p-4 md:p-6 rounded-2xl relative overflow-hidden group h-32 flex flex-col justify-center bg-white shadow-sm border border-slate-200">
        <div className={`absolute top-0 right-0 p-3 rounded-bl-2xl ${color} bg-opacity-10 backdrop-blur-md transition-all group-hover:bg-opacity-20`}>
            <Icon className={`w-6 h-6 text-slate-700`} />
        </div>

        <div className="relative z-10 text-left">
            <h3 className="text-slate-500 text-sm font-medium mb-1">{title}</h3>
            <p className="text-3xl font-bold text-slate-900 tracking-tight">{value}</p>

            {change !== undefined && (
                <div className={`mt-2 text-sm font-medium ${change >= 0 ? 'text-green-600' : 'text-red-600'} flex items-center gap-1`}>
                    <span className={`px-1.5 py-0.5 rounded-md ${change >= 0 ? 'bg-green-100' : 'bg-red-100'}`}>
                        {change >= 0 ? '+' : ''}{change}%
                    </span>
                    <span className="text-slate-400 text-xs ml-1">vs mese scorso</span>
                </div>
            )}
        </div>

        {/* Decorative Gradient */}
        <div className={`absolute -bottom-4 -right-4 w-24 h-24 ${color} opacity-5 blur-2xl rounded-full group-hover:opacity-10 transition-opacity`} />
    </div>
);

const allWidgetIds = ['stat-leads', 'stat-contact', 'stat-nego', 'stat-value', 'reminders', 'calendar', 'todo', 'emails', 'leads-table'];
const widgetDefinitions = [
    { id: 'stat-leads', label: 'Lead Totali', icon: Users },
    { id: 'stat-contact', label: 'Da Contattare', icon: Calendar },
    { id: 'stat-nego', label: 'In Trattativa', icon: TrendingUp },
    { id: 'stat-value', label: 'Valore Pipeline', icon: DollarSign },
    { id: 'reminders', label: 'Promemoria', icon: Bell },
    { id: 'emails', label: 'Email', icon: Mail },
    { id: 'calendar', label: 'Calendario', icon: Calendar },
    { id: 'todo', label: 'Task List', icon: Check },
    { id: 'leads-table', label: 'Tabella Lead', icon: LayoutDashboard },
];

const Dashboard = () => {
    const { leads, companyName } = useCRM();
    const { reminders } = useReminders();
    const navigate = useNavigate();

    const [recentEmails, setRecentEmails] = useState([]);
    const [loadingEmails, setLoadingEmails] = useState(false);
    const [emailSettings, setEmailSettings] = useState({});

    useEffect(() => {
        const saved = localStorage.getItem('email_settings');
        if (saved) setEmailSettings(JSON.parse(saved));
    }, []);

    // Customization State
    const [isEditing, setIsEditing] = useState(false);
    const [showAddMenu, setShowAddMenu] = useState(false);

    // Persistent Visibility State
    const [visibleWidgets, setVisibleWidgets] = useState(() => {
        try {
            const saved = localStorage.getItem('dashboard_visible_widgets_static_v1');
            return saved ? JSON.parse(saved) : allWidgetIds;
        } catch (e) {
            return allWidgetIds;
        }
    });

    // Calculate Stats
    const totalLeads = leads.length;
    const newLeads = leads.filter(l => l.status === 'Da Contattare').length;
    const negotiations = leads.filter(l => l.status === 'Preventivo').length;
    const estimatedValue = leads.reduce((acc, lead) => {
        const budget = lead.data.budget ? parseFloat(lead.data.budget.replace(/[^0-9.-]+/g, "")) : 0;
        return acc + (isNaN(budget) ? 0 : budget);
    }, 0);

    const upcomingReminders = reminders
        .filter(r => !r.completed && new Date(r.datetime) > new Date())
        .sort((a, b) => new Date(a.datetime) - new Date(b.datetime))
        .slice(0, 5);

    // Save Visibility to LocalStorage
    useEffect(() => {
        localStorage.setItem('dashboard_visible_widgets_static_v1', JSON.stringify(visibleWidgets));
    }, [visibleWidgets]);

    useEffect(() => {
        const fetchRecentEmails = async () => {
            if (!emailSettings.host || !emailSettings.user || !emailSettings.pass) return;

            setLoadingEmails(true);
            try {
                const ipcRenderer = window.ipcRenderer;
                const result = await ipcRenderer.invoke('fetch-emails', emailSettings);
                if (result.success) {
                    setRecentEmails(result.emails.slice(0, 5));
                }
            } catch (error) {
                console.error("Failed to fetch dashboard emails", error);
            } finally {
                setLoadingEmails(false);
            }
        };

        fetchRecentEmails();
    }, [emailSettings]);

    const removeWidget = (id) => {
        setVisibleWidgets(prev => prev.filter(wId => wId !== id));
    };

    const addWidget = (id) => {
        if (!visibleWidgets.includes(id)) {
            setVisibleWidgets(prev => [...prev, id]);
        }
        setShowAddMenu(false);
    };

    const RemoveButton = ({ id }) => (
        isEditing && (
            <button
                onClick={(e) => { e.stopPropagation(); removeWidget(id); }}
                className="absolute top-2 right-2 p-1.5 bg-red-100/80 hover:bg-red-200 text-red-600 rounded-lg transition-colors z-50 backdrop-blur-sm shadow-sm"
                title="Rimuovi widget"
            >
                <X className="w-4 h-4" />
            </button>
        )
    );

    const hiddenWidgets = allWidgetIds.filter(id => !visibleWidgets.includes(id));

    return (
        <div className="h-full flex flex-col relative w-full">
            <div className="flex items-end justify-between mb-6 flex-shrink-0 px-1">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Dashboard</h1>
                    <p className="text-slate-500">Benvenuto in {companyName} CRM.</p>
                </div>
                <div className="flex items-center gap-3">
                    {isEditing ? (
                        <>
                            <div className="relative">
                                <button
                                    onClick={() => setShowAddMenu(!showAddMenu)}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-medium transition-colors shadow-lg shadow-blue-900/10"
                                >
                                    <Plus className="w-4 h-4" /> Aggiungi
                                </button>

                                {showAddMenu && (
                                    <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-100 z-50 p-2 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                                        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 py-2">Widget Disponibili</h3>
                                        <div className="max-h-60 overflow-y-auto">
                                            {hiddenWidgets.length > 0 ? (
                                                hiddenWidgets.map(id => {
                                                    const def = widgetDefinitions.find(w => w.id === id);
                                                    const Icon = def.icon;
                                                    return (
                                                        <button
                                                            key={id}
                                                            onClick={() => addWidget(id)}
                                                            className="w-full text-left px-3 py-2 hover:bg-slate-50 rounded-lg flex items-center gap-3 transition-colors group"
                                                        >
                                                            <div className="p-1.5 bg-slate-100 text-slate-500 rounded-md group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                                                                <Icon className="w-4 h-4" />
                                                            </div>
                                                            <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900">{def.label}</span>
                                                        </button>
                                                    );
                                                })
                                            ) : (
                                                <div className="text-center py-4 text-sm text-slate-400">Tutti i widget sono visibili</div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <button
                                onClick={() => setIsEditing(false)}
                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-medium transition-colors shadow-lg shadow-green-900/10"
                            >
                                <Check className="w-4 h-4" /> Fine
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-medium transition-colors shadow-sm"
                        >
                            <Edit2 className="w-4 h-4" /> Gestisci Widget
                        </button>
                    )}
                </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar -mr-4 pr-4 pb-8">
                <div className="grid grid-cols-12 gap-4 md:gap-6 auto-rows-min">

                    {/* Stats Row */}
                    {visibleWidgets.includes('stat-leads') && (
                        <div className="col-span-12 sm:col-span-6 lg:col-span-3 relative">
                            <RemoveButton id="stat-leads" />
                            <StatCard title="Lead Totali" value={totalLeads} icon={Users} color="bg-blue-600" change={12} />
                        </div>
                    )}
                    {visibleWidgets.includes('stat-contact') && (
                        <div className="col-span-12 sm:col-span-6 lg:col-span-3 relative">
                            <RemoveButton id="stat-contact" />
                            <StatCard title="Da Contattare" value={newLeads} icon={Calendar} color="bg-purple-600" change={5} />
                        </div>
                    )}
                    {visibleWidgets.includes('stat-nego') && (
                        <div className="col-span-12 sm:col-span-6 lg:col-span-3 relative">
                            <RemoveButton id="stat-nego" />
                            <StatCard title="In Trattativa" value={negotiations} icon={TrendingUp} color="bg-orange-500" change={-2} />
                        </div>
                    )}
                    {visibleWidgets.includes('stat-value') && (
                        <div className="col-span-12 sm:col-span-6 lg:col-span-3 relative">
                            <RemoveButton id="stat-value" />
                            <StatCard title="Valore Pipeline" value={`€${estimatedValue.toLocaleString()}`} icon={DollarSign} color="bg-green-500" change={8} />
                        </div>
                    )}

                    {/* Middle Row: Reminders & Calendar */}
                    {visibleWidgets.includes('reminders') && (
                        <div className="col-span-12 lg:col-span-6 h-96 relative group">
                            <RemoveButton id="reminders" />
                            <div className="glass-card p-6 rounded-2xl flex flex-col relative h-full bg-white shadow-sm border border-slate-200">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-xl font-bold text-slate-900 flex items-center gap-3">
                                        <div className="p-2 bg-yellow-50 rounded-lg"><Bell className="w-5 h-5 text-yellow-600" /></div>
                                        Prossimi Promemoria
                                    </h2>
                                    <button onClick={() => navigate('/reminders')} className="text-sm font-bold text-purple-700 hover:text-purple-600 flex items-center gap-1 transition-colors">Vedi tutti <ArrowRight className="w-4 h-4" /></button>
                                </div>
                                <div className="space-y-4 flex-1 overflow-auto custom-scrollbar">
                                    {upcomingReminders.length > 0 ? (
                                        upcomingReminders.map(reminder => (
                                            <div key={reminder.id} className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200 hover:border-purple-300 transition-colors">
                                                <div className="p-2 bg-white rounded-xl text-yellow-600 mt-1 shadow-sm"><Clock className="w-4 h-4" /></div>
                                                <div>
                                                    <h4 className="font-bold text-slate-900">{reminder.title}</h4>
                                                    <p className="text-sm font-medium text-slate-700 mt-1">{new Date(reminder.datetime).toLocaleString()}</p>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center text-slate-500 font-medium py-12 bg-slate-50/50 rounded-2xl border border-dashed border-slate-300">Nessun promemoria imminente</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {visibleWidgets.includes('calendar') && (
                        <div className="col-span-12 lg:col-span-6 h-96 relative group">
                            <RemoveButton id="calendar" />
                            <div className="h-full bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                                <CalendarWidget />
                            </div>
                        </div>
                    )}

                    {/* Bottom Row: Emails, Todo */}
                    {visibleWidgets.includes('emails') && (
                        <div className="col-span-12 lg:col-span-6 h-96 relative group">
                            <RemoveButton id="emails" />
                            <div className="glass-card p-6 rounded-2xl flex flex-col relative h-full bg-white shadow-sm border border-slate-200">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-xl font-bold text-slate-900 flex items-center gap-3">
                                        <div className="p-2 bg-blue-50 rounded-lg"><Mail className="w-5 h-5 text-blue-600" /></div>
                                        Ultime Email
                                    </h2>
                                    <button onClick={() => navigate('/inbox')} className="text-sm font-bold text-purple-700 hover:text-purple-600 flex items-center gap-1 transition-colors">Vai alla Posta <ArrowRight className="w-4 h-4" /></button>
                                </div>
                                <div className="space-y-4 flex-1 overflow-auto custom-scrollbar">
                                    {loadingEmails ? (
                                        <div className="text-center text-slate-500 font-medium py-12 animate-pulse">Caricamento email...</div>
                                    ) : recentEmails.length > 0 ? (
                                        recentEmails.map(email => (
                                            <div key={email.id} onClick={() => navigate('/inbox')} className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200 cursor-pointer hover:bg-white hover:shadow-md transition-all">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg shadow-purple-500/20">{email.from.charAt(0).toUpperCase()}</div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex justify-between items-start">
                                                        <h4 className="font-bold text-slate-900 truncate">{email.from}</h4>
                                                        <span className="text-xs font-bold text-slate-500 whitespace-nowrap ml-2">{new Date(email.date).toLocaleDateString()}</span>
                                                    </div>
                                                    <p className="text-sm font-medium text-slate-700 truncate mt-1">{email.subject}</p>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center text-slate-500 font-medium py-12 bg-slate-50/50 rounded-2xl border border-dashed border-slate-300">Nessuna email recente</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {visibleWidgets.includes('todo') && (
                        <div className="col-span-12 lg:col-span-6 h-96 relative group">
                            <RemoveButton id="todo" />
                            <div className="h-full bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                                <TodoListWidget />
                            </div>
                        </div>
                    )}

                    {/* Full Width Table */}
                    {visibleWidgets.includes('leads-table') && (
                        <div className="col-span-12 relative group">
                            <RemoveButton id="leads-table" />
                            <div className="glass-card p-4 md:p-8 h-full relative overflow-hidden flex flex-col bg-white shadow-sm border border-slate-200 rounded-2xl">
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="text-2xl font-bold text-slate-900">Lead Recenti</h2>
                                    <button onClick={() => navigate('/leads')} className="glass-button px-4 py-2 rounded-xl text-sm font-bold text-slate-700 flex items-center gap-2">Vedi tutti <ArrowRight className="w-4 h-4" /></button>
                                </div>
                                <div className="overflow-x-auto flex-1">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="text-slate-600 text-sm border-b border-slate-200">
                                                <th className="pb-4 pl-4 font-bold">Nome</th>
                                                <th className="pb-4 font-bold">Email</th>
                                                <th className="pb-4 font-bold">Stato</th>
                                                <th className="pb-4 font-bold">Data</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-slate-800">
                                            {leads.slice(0, 5).map((lead) => (
                                                <tr key={lead.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                                                    <td className="py-4 pl-4 font-bold text-slate-900">{lead.firstName} {lead.lastName}</td>
                                                    <td className="py-4 font-medium">{lead.data.email}</td>
                                                    <td className="py-4"><span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-300">{lead.status}</span></td>
                                                    <td className="py-4 font-medium text-slate-500">{new Date(lead.createdAt).toLocaleDateString()}</td>
                                                </tr>
                                            ))}
                                            {leads.length === 0 && (<tr><td colSpan="4" className="py-12 text-center text-slate-500 font-medium">Nessun lead presente</td></tr>)}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
