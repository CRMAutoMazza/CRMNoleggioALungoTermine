import React, { useState } from 'react';
import { X, Send, Paperclip, Mail, AlertCircle, CheckCircle } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { useCRM } from '../../context/CRMContext';

const BulkEmailModal = ({ recipients, onClose }) => {
    const { addToast } = useToast();
    const { emailSettings, addTimelineEvent } = useCRM();

    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [progress, setProgress] = useState({ sent: 0, failed: 0, total: recipients.length });

    const isConfigured = emailSettings.host && emailSettings.user && emailSettings.pass;

    // Filter out recipients without email
    const validRecipients = recipients.filter(r => r.email);

    const handleSend = async (e) => {
        e.preventDefault();
        if (validRecipients.length === 0) {
            addToast('Nessun destinatario valido con email', 'error');
            return;
        }

        setIsSending(true);
        let sentCount = 0;
        let failedCount = 0;

        const { ipcRenderer } = window.require('electron');

        for (const recipient of validRecipients) {
            try {
                // Personalize message
                const personalizedMessage = message
                    .replace(/{nome}/g, recipient.firstName || '')
                    .replace(/{cognome}/g, recipient.lastName || '');

                if (isConfigured) {
                    const result = await ipcRenderer.invoke('send-email', {
                        settings: emailSettings,
                        email: {
                            to: recipient.email,
                            subject: subject,
                            message: personalizedMessage
                        }
                    });

                    if (result.success) {
                        sentCount++;
                        // Log event
                        addTimelineEvent(recipient.id, {
                            type: 'mail',
                            description: `Newsletter inviata: ${subject}`,
                            icon: 'mail',
                            metadata: { to: recipient.email, subject: subject, isBulk: true }
                        });
                    } else {
                        failedCount++;
                        console.error(`Failed to send to ${recipient.email}:`, result.error);
                    }
                } else {
                    // Simulation
                    await new Promise(r => setTimeout(r, 500)); // Delay
                    sentCount++;

                    // Log event (Simulated)
                    addTimelineEvent(recipient.id, {
                        type: 'mail',
                        description: `[SIM] Newsletter inviata: ${subject}`,
                        icon: 'mail',
                        metadata: { to: recipient.email, subject: subject, isBulk: true }
                    });
                }
            } catch (error) {
                console.error(`Error sending to ${recipient.email}:`, error);
                failedCount++;
            }

            setProgress({ sent: sentCount, failed: failedCount, total: validRecipients.length });
        }

        setIsSending(false);
        addToast(`Invio completato: ${sentCount} inviate, ${failedCount} fallite`, sentCount > 0 ? 'success' : 'error');

        if (sentCount === validRecipients.length) {
            setTimeout(onClose, 1500); // Close after brief delay on success
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl shadow-2xl">
                <div className="p-6 border-b border-slate-800 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <Mail className="w-5 h-5 text-purple-500" />
                        Invia Newsletter
                    </h2>
                    {!isSending && (
                        <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
                            <X className="w-6 h-6" />
                        </button>
                    )}
                </div>

                {!isConfigured && (
                    <div className="bg-yellow-500/10 border-b border-yellow-500/20 px-6 py-2 flex items-center gap-2 text-yellow-500 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        Modalità simulazione (SMTP non configurato). Le email non verranno realmente inviate.
                    </div>
                )}

                <div className="p-6">
                    {isSending || progress.sent > 0 || progress.failed > 0 ? (
                        <div className="space-y-6 py-8">
                            <div className="text-center">
                                <h3 className="text-lg font-bold text-white mb-2">
                                    {isSending ? 'Invio in corso...' : 'Invio Completato'}
                                </h3>
                                <p className="text-slate-400">
                                    {progress.sent} inviate, {progress.failed} fallite su {progress.total} totali
                                </p>
                            </div>

                            <div className="w-full bg-slate-800 rounded-full h-4 overflow-hidden">
                                <div
                                    className="bg-purple-600 h-full transition-all duration-300"
                                    style={{ width: `${(progress.sent + progress.failed) / progress.total * 100}%` }}
                                />
                            </div>

                            {!isSending && (
                                <button
                                    onClick={onClose}
                                    className="w-full bg-slate-800 hover:bg-slate-700 text-white py-2 rounded-xl transition-colors"
                                >
                                    Chiudi
                                </button>
                            )}
                        </div>
                    ) : (
                        <form onSubmit={handleSend} className="space-y-4">
                            <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-slate-400">
                                <span className="text-white font-bold">{validRecipients.length}</span> Destinatari selezionati
                                {validRecipients.length < recipients.length && (
                                    <span className="ml-2 text-yellow-500">
                                        ({recipients.length - validRecipients.length} esclusi perché senza email)
                                    </span>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-400">Oggetto</label>
                                <input
                                    type="text"
                                    required
                                    value={subject}
                                    onChange={e => setSubject(e.target.value)}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                    placeholder="Novità da AutoMazza..."
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-400 flex justify-between">
                                    Messaggio
                                    <span className="text-xs opacity-70">Usa {'{nome}'} e {'{cognome}'} come variabili</span>
                                </label>
                                <textarea
                                    required
                                    value={message}
                                    onChange={e => setMessage(e.target.value)}
                                    className="w-full h-64 bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-purple-600 focus:border-transparent resize-none"
                                    placeholder="Scrivi il tuo messaggio qui..."
                                />
                            </div>

                            <div className="flex justify-end pt-4 border-t border-slate-800">
                                <button
                                    type="submit"
                                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors shadow-lg shadow-purple-900/20"
                                >
                                    <Send className="w-4 h-4" />
                                    Invia a {validRecipients.length} contatti
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BulkEmailModal;
