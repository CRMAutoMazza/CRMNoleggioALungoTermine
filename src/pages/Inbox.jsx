import React, { useState, useEffect } from 'react';
import { RefreshCw, Mail, AlertCircle, Search, Loader2, ArrowRight, Trash2 } from 'lucide-react';
import { useCRM } from '../context/CRMContext';
import { useToast } from '../context/ToastContext';

import EmailModal from '../components/leads/EmailModal';

const Inbox = () => {
    const { emailSettings } = useCRM();
    const { addToast } = useToast();
    const [emails, setEmails] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedEmail, setSelectedEmail] = useState(null);
    const [loadingBody, setLoadingBody] = useState(false);
    const [error, setError] = useState(null);
    const [isComposeOpen, setIsComposeOpen] = useState(false);
    const [deletingId, setDeletingId] = useState(null);

    // New State for Reply/Forward
    const [composerData, setComposerData] = useState(null);

    const fetchEmails = async () => {
        if (!emailSettings.host || !emailSettings.user || !emailSettings.pass) {
            setError('Configurazione IMAP mancante. Vai in Impostazioni.');
            return;
        }

        setLoading(true);
        setError(null);
        try {
            // WEB APP: Use API instead of IPC
            const result = await api.fetchEmails(emailSettings);

            if (result.success) {
                setEmails(result.emails);
                addToast('Email aggiornate', 'success');
            } else {
                setError(result.error);
                addToast('Errore ricezione email', 'error');
            }
        } catch (err) {
            console.error(err);
            setError('Errore di comunicazione con il server.' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSelectEmail = async (email) => {
        setSelectedEmail(email);

        // If body is already loaded, don't fetch again
        if (email.hasBody) return;

        setLoadingBody(true);
        try {
            // WEB APP: Use API instead of IPC
            const result = await api.fetchEmailBody(emailSettings, email.id);

            if (result.success) {
                // Update the email in the list with the full body
                const updatedEmail = { ...email, ...result.email, hasBody: true };
                setSelectedEmail(updatedEmail);
                setEmails(prev => prev.map(e => e.id === email.id ? updatedEmail : e));
            } else {
                addToast('Errore caricamento contenuto', 'error');
            }
        } catch (error) {
            console.error(error);
            addToast('Errore caricamento contenuto', 'error');
        } finally {
            setLoadingBody(false);
        }
    };

    useEffect(() => {
        fetchEmails();
    }, []);

    return (
        <div className="h-full flex flex-col space-y-6">
            <div className="flex items-center justify-between flex-shrink-0">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Posta in Arrivo</h1>
                    <p className="text-slate-400">Gestisci le tue email direttamente dal CRM.</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => {
                            setComposerData(null);
                            setIsComposeOpen(true);
                        }}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-6 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-blue-900/20 hover:shadow-blue-900/40 font-medium"
                    >
                        <Mail className="w-5 h-5" />
                        Nuova Email
                    </button>
                    <button
                        onClick={fetchEmails}
                        disabled={loading}
                        className="glass-button px-4 py-2.5 rounded-xl text-white flex items-center gap-2 disabled:opacity-50"
                    >
                        <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                        Aggiorna
                    </button>
                </div>
            </div>

            {error && (
                <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl flex items-center gap-3 text-red-400 backdrop-blur-sm">
                    <AlertCircle className="w-5 h-5" />
                    {error}
                </div>
            )}

            <div className="flex-1 flex gap-6 min-h-0 glass-panel rounded-2xl overflow-hidden border-0">
                {/* Email List */}
                <div className={`w-full md:w-1/3 border-r border-white/5 flex flex-col ${selectedEmail ? 'hidden md:flex' : 'flex'}`}>
                    <div className="p-4 border-b border-white/5 bg-white/5">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Cerca email..."
                                className="w-full glass-input rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                            />
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                        {emails.length > 0 ? (
                            emails.map(email => (
                                <div
                                    key={email.id}
                                    onClick={() => handleSelectEmail(email)}
                                    className={`p-4 border-b border-white/5 cursor-pointer hover:bg-white/5 transition-all group ${selectedEmail?.id === email.id ? 'bg-purple-500/10 border-l-2 border-l-purple-500' : 'border-l-2 border-l-transparent'}`}
                                >
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className={`font-semibold truncate pr-2 transition-colors ${selectedEmail?.id === email.id ? 'text-purple-300' : 'text-white group-hover:text-purple-200'}`}>{email.from}</h4>
                                        <span className="text-xs text-slate-500 whitespace-nowrap">
                                            {new Date(email.date).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <p className="text-sm text-slate-300 truncate mb-1">{email.subject}</p>
                                    <p className="text-xs text-slate-500 truncate">
                                        {email.hasBody ? (email.text?.substring(0, 50) + '...') : 'Clicca per caricare...'}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <div className="p-8 text-center text-slate-500">
                                {loading ? 'Caricamento...' : 'Nessuna email trovata'}
                            </div>
                        )}
                    </div>
                </div>

                {/* Email Viewer */}
                <div className={`w-full md:w-2/3 flex flex-col ${!selectedEmail ? 'hidden md:flex' : 'flex'} bg-slate-950/30`}>
                    {selectedEmail ? (
                        <>
                            <div className="p-6 border-b border-white/5 flex flex-col gap-4 bg-white/5 backdrop-blur-md">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <button
                                            onClick={() => setSelectedEmail(null)}
                                            className="md:hidden text-slate-400 hover:text-white mb-4 flex items-center gap-1"
                                        >
                                            ← Torna alla lista
                                        </button>
                                        <h2 className="text-xl font-bold text-white mb-2">{selectedEmail.subject}</h2>
                                        <div className="flex items-center gap-2 text-sm text-slate-400">
                                            <span className="bg-white/10 px-2 py-0.5 rounded text-slate-200">{selectedEmail.from}</span>
                                            <span>to Me</span>
                                        </div>
                                    </div>
                                    <span className="text-sm text-slate-500">
                                        {new Date(selectedEmail.date).toLocaleString()}
                                    </span>
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => {
                                            const fromMatch = selectedEmail.from.match(/<(.+)>/);
                                            const fromEmail = fromMatch ? fromMatch[1] : selectedEmail.from;

                                            // Handle case where from is just email
                                            // "Name <email>" vs "email"

                                            setComposerData({
                                                type: 'reply',
                                                originalSubject: selectedEmail.subject,
                                                originalMessage: selectedEmail.text || '(Contenuto HTML)',
                                                originalDate: selectedEmail.date,
                                                to: fromEmail, // We reply to sender
                                                from: emailSettings.user
                                            });
                                            setIsComposeOpen(true);
                                        }}
                                        className="flex items-center gap-2 px-3 py-1.5 bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 rounded-lg text-sm font-medium transition-colors"
                                    >
                                        <Mail className="w-4 h-4" /> Rispondi
                                    </button>
                                    <button
                                        onClick={() => {
                                            setComposerData({
                                                type: 'forward',
                                                originalSubject: selectedEmail.subject,
                                                originalMessage: selectedEmail.text || '(Contenuto HTML)',
                                                originalDate: selectedEmail.date,
                                                to: '', // Forward has no recipient yet
                                                from: selectedEmail.from
                                            });
                                            setIsComposeOpen(true);
                                        }}
                                        className="flex items-center gap-2 px-3 py-1.5 bg-purple-600/20 text-purple-400 hover:bg-purple-600/30 rounded-lg text-sm font-medium transition-colors"
                                    >
                                        <ArrowRight className="w-4 h-4" /> Inoltra
                                    </button>
                                    <button
                                        onClick={async () => {
                                            if (!window.confirm('Sei sicuro di voler eliminare questa email?')) return;

                                            setDeletingId(selectedEmail.id);
                                            try {
                                                // WEB APP: Use API instead of IPC
                                                const result = await api.deleteEmail(emailSettings, selectedEmail.id);

                                                if (result.success) {
                                                    addToast('Email eliminata', 'success');
                                                    setEmails(prev => prev.filter(e => e.id !== selectedEmail.id));
                                                    setSelectedEmail(null);
                                                } else {
                                                    addToast(`Errore eliminazione: ${result.error}`, 'error');
                                                }
                                            } catch (err) {
                                                console.error(err);
                                                addToast('Errore durante l\'eliminazione', 'error');
                                            } finally {
                                                setDeletingId(null);
                                            }
                                        }}
                                        disabled={deletingId === selectedEmail.id}
                                        className="flex items-center gap-2 px-3 py-1.5 bg-red-600/10 text-red-400 hover:bg-red-600/20 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        {deletingId === selectedEmail.id ? 'Eliminazione...' : 'Elimina'}
                                    </button>
                                </div>
                            </div>
                            <div className="flex-1 overflow-y-auto p-8 bg-white relative">
                                {loadingBody ? (
                                    <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10 backdrop-blur-sm">
                                        <div className="flex flex-col items-center gap-3 text-purple-600">
                                            <Loader2 className="w-8 h-8 animate-spin" />
                                            <span className="text-sm font-medium">Scaricamento contenuto...</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div
                                        className="prose max-w-none text-slate-900"
                                        dangerouslySetInnerHTML={{ __html: selectedEmail.html || selectedEmail.text?.replace(/\n/g, '<br>') }}
                                    />
                                )}
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-slate-500">
                            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 animate-pulse">
                                <Mail className="w-10 h-10 opacity-20" />
                            </div>
                            <p className="text-lg font-medium">Seleziona un'email per leggerla</p>
                        </div>
                    )}
                </div>
            </div>

            {isComposeOpen && (
                <EmailModal
                    lead={null}
                    initialData={composerData}
                    onClose={() => {
                        setIsComposeOpen(false);
                        setComposerData(null);
                    }}
                />
            )}
        </div>
    );
};

export default Inbox;
