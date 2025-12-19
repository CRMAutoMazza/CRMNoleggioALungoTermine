import React, { useState } from 'react';
import { X, Phone, Save, Calendar, Clock, CheckCircle, XCircle, MinusCircle, MessageSquare } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const CallModal = ({ lead, onClose, onSave, initialData = null }) => {
    const { addToast } = useToast();

    // States
    const [outcome, setOutcome] = useState(initialData?.metadata?.outcome || 'risposto');
    const [notes, setNotes] = useState(initialData?.metadata?.notes || '');
    const [createReminder, setCreateReminder] = useState(false);
    const [reminderDate, setReminderDate] = useState(new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
    const [reminderTime, setReminderTime] = useState('10:00');

    const handleSave = (e) => {
        e.preventDefault();

        // Prepare data
        const callData = {
            outcome,
            notes,
            reminder: createReminder ? {
                date: reminderDate,
                time: reminderTime
            } : null
        };

        onSave(callData);
    };

    const outcomes = [
        { id: 'risposto', label: 'Risposto', icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-400/10 border-green-400/20' },
        { id: 'non_risposto', label: 'Non Risposto', icon: XCircle, color: 'text-red-400', bg: 'bg-red-400/10 border-red-400/20' },
        { id: 'occupato', label: 'Occupato', icon: MinusCircle, color: 'text-orange-400', bg: 'bg-orange-400/10 border-orange-400/20' },
        { id: 'messaggio', label: 'Messaggio', icon: MessageSquare, color: 'text-blue-400', bg: 'bg-blue-400/10 border-blue-400/20' },
    ];

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
            <div className="glass-panel w-full max-w-lg shadow-2xl rounded-2xl border border-white/10 overflow-hidden animate-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="p-5 border-b border-white/5 flex items-center justify-between bg-slate-900/50">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                        <div className="p-2 bg-green-500/20 rounded-lg">
                            <Phone className="w-5 h-5 text-green-400" />
                        </div>
                        Registra Chiamata
                    </h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSave} className="p-6 space-y-6">

                    {/* Outcome Selection */}
                    <div className="space-y-3">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Esito Chiamata</label>
                        <div className="grid grid-cols-2 gap-3">
                            {outcomes.map((item) => (
                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => setOutcome(item.id)}
                                    className={`p-3 rounded-xl border flex items-center gap-3 transition-all ${outcome === item.id
                                        ? `${item.bg} border-current`
                                        : 'bg-slate-900/50 border-white/5 text-slate-400 hover:bg-slate-800'
                                        }`}
                                >
                                    <item.icon className={`w-5 h-5 ${outcome === item.id ? item.color : 'text-slate-500'}`} />
                                    <span className={`text-sm font-medium ${outcome === item.id ? 'text-white' : 'text-slate-300'}`}>
                                        {item.label}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Notes */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Note (Opzionale)</label>
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Di cosa avete parlato?..."
                            className="w-full h-24 glass-input rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500/50 resize-none"
                        />
                    </div>

                    {/* Follow-up Reminder */}
                    <div className="pt-4 border-t border-white/5">
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={createReminder}
                                onChange={(e) => setCreateReminder(e.target.checked)}
                                className="w-5 h-5 rounded border-slate-600 bg-slate-900/50 text-green-500 focus:ring-green-500/50 transition-all"
                            />
                            <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                                Pianifica Prossima Attività
                            </span>
                        </label>

                        {createReminder && (
                            <div className="mt-4 grid grid-cols-2 gap-4 animate-in slide-in-from-top-2 fade-in">
                                <div className="space-y-1">
                                    <label className="text-[10px] text-slate-500 uppercase">Data</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                                        <input
                                            type="date"
                                            className="w-full glass-input rounded-xl pl-10 pr-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-green-500/50"
                                            value={reminderDate}
                                            onChange={(e) => setReminderDate(e.target.value)}
                                            required={createReminder}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] text-slate-500 uppercase">Ora</label>
                                    <div className="relative">
                                        <Clock className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                                        <input
                                            type="time"
                                            className="w-full glass-input rounded-xl pl-10 pr-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-green-500/50"
                                            value={reminderTime}
                                            onChange={(e) => setReminderTime(e.target.value)}
                                            required={createReminder}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2.5 rounded-xl border border-white/10 text-slate-400 hover:bg-white/5 hover:text-white transition-all text-sm font-medium"
                        >
                            Annulla
                        </button>
                        <button
                            type="submit"
                            className="flex-1 bg-green-600 hover:bg-green-500 text-white px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 font-medium transition-all shadow-lg shadow-green-900/20"
                        >
                            <Save className="w-4 h-4" />
                            Salva Chiamata
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default CallModal;
