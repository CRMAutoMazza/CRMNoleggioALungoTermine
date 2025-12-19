import React, { useState } from 'react';
import { Bell, Calendar, Check, Trash2, Plus, Clock, Mail } from 'lucide-react';
import { useReminders } from '../context/RemindersContext';
import { useCRM } from '../context/CRMContext';

const Reminders = () => {
    const { reminders, addReminder, toggleReminder, deleteReminder } = useReminders();
    const { leads, emailSettings } = useCRM();

    const [isAdding, setIsAdding] = useState(false);
    const [newReminder, setNewReminder] = useState({
        title: '',
        datetime: '',
        leadId: '',
        notifyEmail: true
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newReminder.title || !newReminder.datetime) return;

        addReminder(newReminder);
        setNewReminder({
            title: '',
            datetime: '',
            leadId: '',
            notifyEmail: true
        });
        setIsAdding(false);
    };

    const sortedReminders = [...reminders].sort((a, b) =>
        new Date(a.datetime) - new Date(b.datetime)
    );

    return (
        <div className="h-full flex flex-col space-y-6 custom-scrollbar pr-2">
            <div className="flex items-center justify-between flex-shrink-0">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Promemoria</h1>
                    <p className="text-slate-400">Gestisci le tue scadenze e attività.</p>
                </div>
                <button
                    onClick={() => setIsAdding(!isAdding)}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-blue-900/20 hover:shadow-blue-900/40 font-medium"
                >
                    <Plus className="w-5 h-5" />
                    Nuovo Promemoria
                </button>
            </div>

            {!emailSettings?.user && (
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 flex items-center gap-4 animate-in fade-in slide-in-from-top-2">
                    <div className="p-2 bg-yellow-500/20 rounded-lg">
                        <Mail className="w-6 h-6 text-yellow-500" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-bold text-white">Configurazione Email Mancante</h3>
                        <p className="text-sm text-slate-300">Per ricevere le notifiche via email, configura il server SMTP nelle impostazioni.</p>
                    </div>
                    <button
                        onClick={() => window.location.hash = '#/settings'}
                        className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-medium rounded-lg transition-colors"
                    >
                        Vai alle Impostazioni
                    </button>
                </div>
            )}

            {isAdding && (
                <form onSubmit={handleSubmit} className="glass-panel p-6 rounded-2xl animate-in fade-in slide-in-from-top-2 border border-white/10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-slate-300">Titolo</label>
                            <input
                                type="text"
                                value={newReminder.title}
                                onChange={e => setNewReminder({ ...newReminder, title: e.target.value })}
                                className="w-full glass-input rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                                placeholder="Es. Chiamare Mario"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-slate-300">Data e Ora</label>
                            <input
                                type="datetime-local"
                                value={newReminder.datetime}
                                onChange={e => setNewReminder({ ...newReminder, datetime: e.target.value })}
                                className="w-full glass-input rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-slate-300">Collega a Lead (Opzionale)</label>
                            <select
                                value={newReminder.leadId}
                                onChange={e => setNewReminder({ ...newReminder, leadId: e.target.value })}
                                className="w-full glass-input rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                            >
                                <option value="" className="bg-slate-900">Nessun Lead</option>
                                {leads.map(lead => (
                                    <option key={lead.id} value={lead.id} className="bg-slate-900">
                                        {lead.firstName} {lead.lastName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex items-center pt-8">
                            <label className="flex items-center gap-3 cursor-pointer text-slate-300 group">
                                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${newReminder.notifyEmail ? 'bg-purple-600 border-purple-600' : 'border-slate-500 group-hover:border-purple-500'}`}>
                                    {newReminder.notifyEmail && <Check className="w-3.5 h-3.5 text-white" />}
                                </div>
                                <input
                                    type="checkbox"
                                    checked={newReminder.notifyEmail}
                                    onChange={e => setNewReminder({ ...newReminder, notifyEmail: e.target.checked })}
                                    className="hidden"
                                />
                                Invia notifica email
                            </label>
                        </div>
                    </div>
                    <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
                        <button
                            type="button"
                            onClick={() => setIsAdding(false)}
                            className="text-slate-400 hover:text-white px-4 py-2 transition-colors"
                        >
                            Annulla
                        </button>
                        <button
                            type="submit"
                            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-xl shadow-lg shadow-purple-900/20 transition-all"
                        >
                            Salva
                        </button>
                    </div>
                </form>
            )}

            <div className="flex-1 overflow-y-auto space-y-4 custom-scrollbar pb-4">
                {sortedReminders.length > 0 ? (
                    sortedReminders.map(reminder => {
                        const isOverdue = !reminder.completed && new Date(reminder.datetime) < new Date();
                        const linkedLead = leads.find(l => l.id === reminder.leadId);

                        return (
                            <div
                                key={reminder.id}
                                className={`glass-card p-5 rounded-xl flex items-center justify-between group transition-all border ${reminder.completed ? 'border-white/5 opacity-50' :
                                    isOverdue ? 'border-red-500/30 bg-red-500/5' : 'border-white/5 hover:border-white/10'
                                    }`}
                            >
                                <div className="flex items-center gap-5">
                                    <button
                                        onClick={() => toggleReminder(reminder.id)}
                                        className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all ${reminder.completed
                                            ? 'bg-green-500 border-green-500 text-white shadow-lg shadow-green-900/20'
                                            : 'border-slate-500 hover:border-purple-500 hover:bg-purple-500/10'
                                            }`}
                                    >
                                        {reminder.completed && <Check className="w-4 h-4" />}
                                    </button>
                                    <div>
                                        <h3 className={`font-medium text-lg ${reminder.completed ? 'text-slate-500 line-through' : 'text-white'}`}>
                                            {reminder.title}
                                        </h3>
                                        <div className="flex items-center gap-5 text-sm text-slate-400 mt-1.5">
                                            <span className={`flex items-center gap-1.5 ${isOverdue && !reminder.completed ? 'text-red-400' : ''}`}>
                                                <Clock className="w-4 h-4" />
                                                {new Date(reminder.datetime).toLocaleString()}
                                            </span>
                                            {linkedLead && (
                                                <span className="flex items-center gap-1.5 text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-md border border-purple-500/20">
                                                    <Calendar className="w-3.5 h-3.5" />
                                                    {linkedLead.firstName} {linkedLead.lastName}
                                                </span>
                                            )}
                                            {reminder.notifyEmail && (
                                                <span className="flex items-center gap-1.5 text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-md border border-blue-500/20" title="Notifica Email Attiva">
                                                    <Mail className="w-3.5 h-3.5" />
                                                    Email
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => deleteReminder(reminder.id)}
                                    className="p-2.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-all"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        );
                    })
                ) : (
                    <div className="flex flex-col items-center justify-center h-64 text-slate-500">
                        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 animate-pulse">
                            <Bell className="w-10 h-10 opacity-20" />
                        </div>
                        <p className="text-lg font-medium">Nessun promemoria</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Reminders;
