import React, { useState } from 'react';
import { X, Bell, Save, Calendar, Clock } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const ReminderModal = ({ lead, onClose, onSave }) => {
    const { addToast } = useToast();

    // States
    const [title, setTitle] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [time, setTime] = useState(new Date(Date.now() + 60 * 60 * 1000).toTimeString().slice(0, 5)); // Next hour

    const handleSave = (e) => {
        e.preventDefault();

        if (!title.trim()) {
            addToast('Inserisci un titolo per il promemoria', 'warning');
            return;
        }

        // Prepare data
        const reminderData = {
            title,
            date,
            time
        };

        onSave(reminderData);
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
            <div className="glass-panel w-full max-w-lg shadow-2xl rounded-2xl border border-white/10 overflow-hidden animate-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="p-5 border-b border-white/5 flex items-center justify-between bg-slate-900/50">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                        <div className="p-2 bg-yellow-500/20 rounded-lg">
                            <Bell className="w-5 h-5 text-yellow-500" />
                        </div>
                        Nuovo Promemoria
                    </h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSave} className="p-6 space-y-6">

                    {/* Title */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Cosa ricordare?</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Es. Richiamare per preventivo..."
                            className="w-full glass-input rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
                            autoFocus
                            required
                        />
                    </div>

                    {/* Date & Time */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Data</label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                                <input
                                    type="date"
                                    className="w-full glass-input rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Ora</label>
                            <div className="relative">
                                <Clock className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                                <input
                                    type="time"
                                    className="w-full glass-input rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2.5 rounded-xl border border-white/10 text-slate-400 hover:bg-white/5 hover:text-white transition-all text-sm font-medium"
                        >
                            Annulla
                        </button>
                        <button
                            type="submit"
                            className="flex-1 bg-yellow-600 hover:bg-yellow-500 text-white px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 font-medium transition-all shadow-lg shadow-yellow-900/20"
                        >
                            <Save className="w-4 h-4" />
                            Salva Promemoria
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default ReminderModal;
