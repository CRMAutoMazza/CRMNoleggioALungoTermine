import React, { useState } from 'react';
import { X, Send, Paperclip, Mail, AlertCircle } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { useCRM } from '../../context/CRMContext';
import { api } from '../../services/api';

const EmailModal = ({ lead, onClose, initialData = null }) => {
    const { addToast } = useToast();
    const { emailSettings, addTimelineEvent, leads } = useCRM();

    // Determine subject and message based on initialData (Reply/Forward)
    const getInitialSubject = () => {
        if (!initialData) return '';
        if (initialData.type === 'reply') return `Re: ${initialData.originalSubject}`;
        if (initialData.type === 'forward') return `Fwd: ${initialData.originalSubject}`;
        return '';
    };

    const getInitialMessage = () => {
        if (!initialData) return lead ? `Gentile ${lead.firstName} ${lead.lastName},\n\n` : '';
        const originalDate = new Date(initialData.originalDate).toLocaleString();
        return `\n\n\n--- Messaggio Originale ---\nDa: ${initialData.from || 'Me'}\nA: ${initialData.to}\nData: ${originalDate}\nOggetto: ${initialData.originalSubject}\n\n${initialData.originalMessage}`;
    };

    const [subject, setSubject] = useState(getInitialSubject());
    const [message, setMessage] = useState(getInitialMessage());

    // For Forward, recipient is empty. For Reply, it's the original sender (to be implemented if we tracked incoming, but for now we reply to Lead).
    // Actually for Reply to outbound email, we are replying to the same person again? Or is this confusing?
    // User context: "Reply" to an email I sent means sending another one to the same person.
    // "Forward" means sending it to someone else.

    const [recipientEmail, setRecipientEmail] = useState(
        initialData?.type === 'forward' ? '' : (lead ? (lead.data?.pec || lead.email) : '')
    );
    const [usePec, setUsePec] = useState(false);
    const [isSending, setIsSending] = useState(false);

    const hasPec = lead && !!lead.data?.pec;
    const isConfigured = emailSettings.host && emailSettings.user && emailSettings.pass;

    // Update recipient if lead changes or PEC toggle changes
    React.useEffect(() => {
        if (lead) {
            setRecipientEmail(usePec && lead.data?.pec ? lead.data.pec : lead.email);
        }
    }, [lead, usePec]);

    const handleSend = async (e) => {
        e.preventDefault();
        setIsSending(true);

        // Unified Logic: Use Backend API
        try {
            await api.sendMail({
                settings: emailSettings,
                email: {
                    to: recipientEmail,
                    subject: subject,
                    message: message
                }
            });

            addToast(`Email inviata con successo`, 'success');

            // Log to timeline
            let targetLeadId = lead?.id;

            if (!targetLeadId && recipientEmail && leads) {
                const found = leads.find(l =>
                    l.email?.toLowerCase() === recipientEmail.toLowerCase() ||
                    l.data?.email?.toLowerCase() === recipientEmail.toLowerCase() ||
                    l.data?.pec?.toLowerCase() === recipientEmail.toLowerCase()
                );
                if (found) targetLeadId = found.id;
            }

            if (targetLeadId) {
                addTimelineEvent(targetLeadId, {
                    type: 'mail',
                    description: `Email: ${subject}`,
                    icon: 'mail',
                    metadata: { to: recipientEmail, subject: subject }
                });
            }
            onClose();

        } catch (err) {
            console.error('API Email Error', err);
            addToast(`Errore invio email: ${err.message}`, 'error');
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl shadow-2xl">
                <div className="p-6 border-b border-slate-800 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <Mail className="w-5 h-5 text-blue-500" />
                        Invia Email (SMTP)
                    </h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {!isConfigured && (
                    <div className="bg-yellow-500/10 border-b border-yellow-500/20 px-6 py-2 flex items-center gap-2 text-yellow-500 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        Modalità simulazione. Configura SMTP nelle impostazioni per l'invio reale.
                    </div>
                )}

                <form onSubmit={handleSend} className="p-6 space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-400">A:</label>
                        <div className="flex items-center gap-4 bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-slate-300">
                            {lead ? (
                                <span className="flex-1">
                                    {lead.firstName} {lead.lastName} &lt;{recipientEmail}&gt;
                                </span>
                            ) : (
                                <input
                                    type="email"
                                    required
                                    placeholder="email@destinatario.com"
                                    value={recipientEmail}
                                    onChange={(e) => setRecipientEmail(e.target.value)}
                                    className="flex-1 bg-transparent border-none focus:ring-0 p-0 text-white placeholder-slate-500"
                                />
                            )}

                            {hasPec && (
                                <div className="flex items-center gap-2">
                                    <label className="text-xs font-medium text-slate-400">Usa PEC</label>
                                    <input
                                        type="checkbox"
                                        checked={usePec}
                                        onChange={(e) => setUsePec(e.target.checked)}
                                        className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-blue-600 focus:ring-blue-600"
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-400">Oggetto</label>
                        <input
                            type="text"
                            required
                            value={subject}
                            onChange={e => setSubject(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-400">Messaggio</label>
                        <textarea
                            required
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                            className="w-full h-64 bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none"
                        />
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                        <button type="button" className="text-slate-400 hover:text-white transition-colors">
                            <Paperclip className="w-5 h-5" />
                        </button>
                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
                            >
                                Annulla
                            </button>
                            <button
                                type="submit"
                                disabled={isSending}
                                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors"
                            >
                                <Send className="w-4 h-4" />
                                {isSending ? 'Invio...' : 'Invia'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EmailModal;
