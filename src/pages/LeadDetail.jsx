import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EmailModal from '../components/leads/EmailModal';
import CallModal from '../components/leads/CallModal';
import LeadForm from '../components/leads/LeadForm';
import ReminderModal from '../components/leads/ReminderModal';
import {
    ArrowLeft, Mail, Phone, MessageCircle, Calendar,
    FileText, CheckCircle, AlertCircle, Clock, Plus,
    Briefcase, FileCheck, Trash2, Send, Edit, MoreVertical, Bell,
    CornerUpLeft, CornerUpRight, Upload, X, Download, Hash
} from 'lucide-react';
import { useCRM } from '../context/CRMContext';
import { useToast } from '../context/ToastContext';
import { useReminders } from '../context/RemindersContext';

const LeadDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { leads, updateLead, deleteLead, addTimelineEvent, deleteTimelineEvent, addContract, deleteContract, addPractice } = useCRM();
    const { addToast } = useToast();
    const { reminders, toggleReminder, deleteReminder } = useReminders();
    const [isUploading, setIsUploading] = useState(false);

    const lead = leads.find(l => l.id === id);

    const [emailModalOpen, setEmailModalOpen] = useState(false);
    const [emailData, setEmailData] = useState(null);
    const [callModalOpen, setCallModalOpen] = useState(false);
    const [editingCall, setEditingCall] = useState(null);
    const [showEditLeadModal, setShowEditLeadModal] = useState(false);
    const [showContractForm, setShowContractForm] = useState(false);
    const [showPracticeForm, setShowPracticeForm] = useState(false);



    const [reminderModalOpen, setReminderModalOpen] = useState(false);
    // const [newReminder, setNewReminder] = useState({ title: '', date: '', time: '' }); // Removed in favor of modal

    // Form States
    const [newContract, setNewContract] = useState({ title: '', startDate: '', endDate: '', amount: '' });
    const [newPractice, setNewPractice] = useState({ title: '', status: 'In Corso' });
    const [tagInput, setTagInput] = useState('');

    if (!lead) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-slate-400">
                <p>Lead non trovato</p>
                <button onClick={() => navigate('/leads')} className="mt-4 text-blue-400 hover:text-blue-300">
                    Torna alla lista
                </button>
            </div>
        );
    }

    const handleDeleteLead = () => {
        if (window.confirm('Sei sicuro di voler eliminare questo lead? Questa azione è irreversibile.')) {
            deleteLead(lead.id);
            addToast('Lead eliminato', 'success');
            navigate('/leads');
        }
    };

    const handleDeleteTimelineEvent = (eventId) => {
        if (window.confirm('Eliminare questa attività dalla timeline?')) {
            deleteTimelineEvent(lead.id, eventId);
            addToast('Attività eliminata', 'success');
        }
    };

    const handleStatusChange = (newStatus) => {
        updateLead(lead.id, { status: newStatus });
        addTimelineEvent(lead.id, {
            type: 'status_change',
            description: `Stato cambiato in: ${newStatus}`,
            icon: 'refresh-ccw'
        });
        addToast('Stato aggiornato', 'success');
    };

    const handleAddContract = (e) => {
        e.preventDefault();
        if (!newContract.title || !newContract.endDate) return;

        addContract(lead.id, {
            ...newContract,
            amount: parseFloat(newContract.amount) || 0
        });

        addTimelineEvent(lead.id, {
            type: 'contract',
            description: `Nuovo contratto creato: ${newContract.title}`,
            icon: 'file-text'
        });

        setNewContract({ title: '', startDate: '', endDate: '', amount: '' });
        setShowContractForm(false);
        addToast('Contratto aggiunto', 'success');
    };

    const handleAddPractice = (e) => {
        e.preventDefault();
        if (!newPractice.title) return;

        addPractice(lead.id, newPractice);

        addTimelineEvent(lead.id, {
            type: 'practice',
            description: `Aperta pratica: ${newPractice.title}`,
            icon: 'briefcase'
        });

        setNewPractice({ title: '', status: 'In Corso' });
        setShowPracticeForm(false);
        addToast('Pratica creata', 'success');
    };

    const handleLogCall = () => {
        setEditingCall(null);
        setCallModalOpen(true);
    };

    const handleReplyEmail = (event) => {
        setEmailData({
            type: 'reply',
            originalSubject: event.metadata.subject,
            originalMessage: event.metadata.message || '',
            originalDate: event.date,
            to: event.metadata.to,
            from: 'Me'
        });
        setEmailModalOpen(true);
    };

    const handleForwardEmail = (event) => {
        setEmailData({
            type: 'forward',
            originalSubject: event.metadata.subject,
            originalMessage: event.metadata.message || '',
            originalDate: event.date,
            to: event.metadata.to,
            from: 'Me'
        });
        setEmailModalOpen(true);
    };

    const handleEditCall = (event) => {
        setEditingCall(event);
        setCallModalOpen(true);
    };

    const handleSaveCall = (callData) => {
        const outcomeLabels = {
            'risposto': 'Risposto',
            'non_risposto': 'Non Risposto',
            'occupato': 'Occupato',
            'messaggio': 'Messaggio'
        };

        if (editingCall) {
            updateTimelineEvent(lead.id, editingCall.id || editingCall.date, {
                ...editingCall,
                description: `Chiamata: ${outcomeLabels[callData.outcome]}`,
                metadata: {
                    ...editingCall.metadata,
                    outcome: callData.outcome,
                    notes: callData.notes
                }
            });
            addToast('Chiamata aggiornata', 'success');
        } else {
            addTimelineEvent(lead.id, {
                type: 'call',
                description: `Chiamata: ${outcomeLabels[callData.outcome]}`,
                icon: 'phone',
                metadata: {
                    outcome: callData.outcome,
                    notes: callData.notes
                }
            });

            if (callData.reminder) {
                addReminder({
                    title: `Richiamare ${lead.firstName} ${lead.lastName}`,
                    datetime: `${callData.reminder.date}T${callData.reminder.time}`,
                    leadId: lead.id
                });
                addToast('Chiamata registrata e promemoria creato', 'success');
            } else {
                addToast('Chiamata registrata nella timeline', 'success');
            }
        }

        setCallModalOpen(false);
        setEditingCall(null);
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setIsUploading(true);
            const reader = new FileReader();
            reader.onloadend = async () => {
                try {
                    const { ipcRenderer } = window.require('electron');
                    const relativePath = `leads/${lead.id}`; // Folder per lead

                    const result = await ipcRenderer.invoke('save-document', {
                        folderPath: relativePath,
                        fileName: file.name,
                        data: reader.result
                    });

                    if (result.success) {
                        const newDoc = {
                            name: file.name,
                            type: file.type,
                            path: result.path, // Store the relative path instead of full data
                            date: new Date().toISOString()
                        };

                        const updatedDocs = [...(lead.documents || []), newDoc];
                        updateLead(lead.id, { documents: updatedDocs });

                        addTimelineEvent(lead.id, {
                            type: 'file-text',
                            description: `Caricato documento: ${file.name}`,
                            icon: 'file-text'
                        });

                        addToast('Documento caricato con successo', 'success');
                    } else {
                        addToast('Errore salvataggio file: ' + result.error, 'error');
                    }
                } catch (error) {
                    console.error('Frontend Upload Error', error);
                    addToast('Errore durante il caricamento', 'error');
                } finally {
                    setIsUploading(false);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleOpenDocument = async (doc) => {
        try {
            const { ipcRenderer } = window.require('electron');
            // If doc has 'path', use it (new system). If found 'data' (old system), try to show it? 
            // Better to just support new system for now, old docs will remain as legacy.
            // If the user tries to open an old doc that is base64, we can fallback to old method?

            if (doc.path) {
                const success = await ipcRenderer.invoke('open-file', doc.path);
                if (!success) addToast('Impossibile aprire il file', 'error');
            } else if (doc.data) {
                // Legacy Base64 support
                const link = document.createElement('a');
                link.href = doc.data;
                link.download = doc.name;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } else {
                addToast('File non trovato', 'error');
            }
        } catch (error) {
            addToast('Errore apertura file', 'error');
        }
    };

    const handleSaveReminder = (data) => {
        addReminder({
            title: data.title,
            datetime: `${data.date}T${data.time}`,
            leadId: lead.id
        });
        setReminderModalOpen(false);
    };

    const handleDeleteDocument = (index) => {
        if (window.confirm('Sei sicuro di voler eliminare questo documento?')) {
            const updatedDocs = lead.documents.filter((_, i) => i !== index);
            updateLead(lead.id, { documents: updatedDocs });
            addToast('Documento eliminato', 'success');
        }
    };

    const handleLogWhatsApp = () => {
        addTimelineEvent(lead.id, {
            type: 'whatsapp',
            description: 'Messaggio WhatsApp Inviato',
            icon: 'message-circle'
        });
        addToast('WhatsApp registrato nella timeline', 'success');
    };

    const handleAddTag = (e) => {
        if (e.key === 'Enter' && tagInput.trim()) {
            e.preventDefault();
            const newTag = tagInput.trim().toLowerCase();
            const currentTags = lead.tags || [];
            if (!currentTags.includes(newTag)) {
                updateLead(lead.id, { tags: [...currentTags, newTag] });
                addToast('Tag aggiunto', 'success');
            }
            setTagInput('');
        }
    };

    const removeTag = (tagToRemove) => {
        const currentTags = lead.tags || [];
        updateLead(lead.id, { tags: currentTags.filter(t => t !== tagToRemove) });
    };

    return (
        <div className="h-full flex flex-col overflow-hidden">
            {reminderModalOpen && (
                <ReminderModal
                    lead={lead}
                    onClose={() => setReminderModalOpen(false)}
                    onSave={handleSaveReminder}
                />
            )}
            {/* Header */}
            <div className="flex items-center gap-4 mb-6 flex-shrink-0">
                <button
                    onClick={() => navigate('/leads')}
                    className="p-2 glass-button rounded-xl text-slate-400 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="flex-1">
                    <h1 className="text-2xl font-bold text-white items-center flex gap-3">
                        {lead.firstName} {lead.lastName}
                        <button
                            onClick={() => setShowEditLeadModal(true)}
                            className="p-1.5 hover:bg-white/10 rounded-lg text-slate-500 hover:text-blue-400 transition-colors"
                            title="Modifica Anagrafica"
                        >
                            <Edit className="w-4 h-4" />
                        </button>
                    </h1>
                    <div className="flex items-center gap-2 text-slate-400 text-sm">
                        <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {lead.email}</span>
                        <span className="w-1 h-1 bg-slate-600 rounded-full" />
                        <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {lead.data?.phone}</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleDeleteLead}
                        className="p-2.5 hover:bg-red-500/10 text-slate-400 hover:text-red-400 rounded-lg transition-colors mr-2"
                        title="Elimina Lead"
                    >
                        <Trash2 className="w-5 h-5" />
                    </button>
                    <select
                        value={lead.status}
                        onChange={(e) => handleStatusChange(e.target.value)}
                        className="bg-slate-900 border border-slate-700 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                    >
                        <option value="new">Da Contattare</option>
                        <option value="contacted">Contattato</option>
                        <option value="quote">Preventivo</option>
                        <option value="order">Ordine</option>
                        <option value="lost">Perso</option>
                    </select>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Left Column: Timeline & Overview */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Quick Actions */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <button onClick={handleLogCall} className="glass-panel p-4 rounded-xl flex flex-col items-center gap-2 hover:bg-white/5 transition-colors group">
                            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 group-hover:scale-110 transition-transform">
                                <Phone className="w-5 h-5" />
                            </div>
                            <span className="text-sm font-medium text-slate-300">Log Chiamata</span>
                        </button>
                        <button onClick={() => setEmailModalOpen(true)} className="glass-panel p-4 rounded-xl flex flex-col items-center gap-2 hover:bg-white/5 transition-colors group">
                            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                                <Mail className="w-5 h-5" />
                            </div>
                            <span className="text-sm font-medium text-slate-300">Invia Email</span>
                        </button>
                        <div className="flex flex-col gap-2">
                            <button onClick={() => navigate(`/whatsapp?phone=${lead.data?.phone}`)} className="glass-panel p-4 rounded-xl flex flex-col items-center gap-2 hover:bg-white/5 transition-colors group h-full">
                                <div className="w-10 h-10 rounded-full bg-green-400/20 flex items-center justify-center text-green-400 group-hover:scale-110 transition-transform">
                                    <MessageCircle className="w-5 h-5" />
                                </div>
                                <span className="text-sm font-medium text-slate-300">Apri Chat</span>
                            </button>
                            <button onClick={handleLogWhatsApp} className="text-[10px] text-slate-500 hover:text-green-400 uppercase tracking-wider font-bold">
                                + Registra
                            </button>
                        </div>
                        <button
                            onClick={() => {
                                setReminderModalOpen(true);
                            }}
                            className="glass-panel p-4 rounded-xl flex flex-col items-center gap-2 hover:bg-white/5 transition-colors group"
                        >
                            <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-400 group-hover:scale-110 transition-transform">
                                <Clock className="w-5 h-5" />
                            </div>
                            <span className="text-sm font-medium text-slate-300">Promemoria</span>
                        </button>
                    </div>

                    {/* Timeline */}
                    <div className="glass-panel p-6 rounded-2xl">
                        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                            <Clock className="w-5 h-5 text-purple-400" />
                            Timeline Attività
                        </h3>

                        <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-700 before:to-transparent">
                            {lead.timeline && lead.timeline.length > 0 ? (
                                lead.timeline.map((event, index) => (
                                    <div key={event.id || index} className="relative flex items-start group">
                                        <div className="absolute left-0 w-10 h-10 flex items-center justify-center rounded-full bg-slate-900 border border-slate-700 z-10 group-hover:border-purple-500 transition-colors">
                                            {event.icon === 'phone' && <Phone className="w-4 h-4 text-green-400" />}
                                            {event.icon === 'mail' && <Mail className="w-4 h-4 text-blue-400" />}
                                            {event.icon === 'file-text' && <FileText className="w-4 h-4 text-orange-400" />}
                                            {event.icon === 'briefcase' && <Briefcase className="w-4 h-4 text-purple-400" />}
                                            {event.icon === 'message-circle' && <MessageCircle className="w-4 h-4 text-green-400" />}
                                            {!['phone', 'mail', 'file-text', 'briefcase', 'message-circle'].includes(event.icon) && <Clock className="w-4 h-4 text-slate-400" />}
                                        </div>
                                        <div className="ml-16 glass-card p-4 rounded-xl w-full border border-white/5 hover:border-white/10 transition-all relative">
                                            <div className="absolute top-2 right-2 flex gap-1 z-20">
                                                {event.type === 'call' && (
                                                    <button
                                                        onClick={() => handleEditCall(event)}
                                                        className="p-1.5 hover:bg-blue-500/10 text-slate-600 hover:text-blue-400 rounded-lg transition-colors"
                                                        title="Modifica"
                                                    >
                                                        <Edit className="w-3.5 h-3.5" />
                                                    </button>
                                                )}
                                                {event.type !== 'mail' && (
                                                    <button
                                                        onClick={() => handleDeleteTimelineEvent(event.id || event.date)}
                                                        className="p-1.5 hover:bg-red-500/10 text-slate-600 hover:text-red-400 rounded-lg transition-colors"
                                                        title="Elimina attività"
                                                    >
                                                        <Trash2 className="w-3.5 h-3.5" />
                                                    </button>
                                                )}
                                            </div>
                                            <div className="flex justify-between items-start mb-1 pr-16">
                                                <h4 className="font-medium text-white text-sm">{event.description}</h4>
                                                <span className="text-xs text-slate-500">{new Date(event.date).toLocaleDateString()} {new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                            </div>
                                            {event.metadata && (
                                                <div className={`mt-3 rounded-lg p-3 border space-y-2 ${event.type === 'mail' ? 'bg-blue-500/5 border-blue-500/20' :
                                                    event.type === 'call' ? 'bg-green-500/5 border-green-500/20' :
                                                        'bg-slate-950/50 border-white/5'
                                                    }`}>
                                                    {event.type === 'mail' ? (
                                                        <>
                                                            <div className="flex gap-2 text-xs">
                                                                <span className="text-blue-400 w-12 text-right font-medium">A:</span>
                                                                <span className="text-slate-300 font-mono">{event.metadata.to}</span>
                                                            </div>
                                                            <div className="flex gap-2 text-xs">
                                                                <span className="text-blue-400 w-12 text-right font-medium">Oggetto:</span>
                                                                <span className="text-white font-medium">{event.metadata.subject}</span>
                                                            </div>
                                                            {event.metadata.message && (
                                                                <div className="mt-2 pt-2 border-t border-blue-500/10 text-xs text-slate-400 italic line-clamp-3">
                                                                    "{event.metadata.message.substring(0, 100)}..."
                                                                </div>
                                                            )}
                                                            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-blue-500/10">
                                                                <button
                                                                    onClick={() => handleReplyEmail(event)}
                                                                    className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg text-xs font-medium transition-colors"
                                                                >
                                                                    <CornerUpLeft className="w-3.5 h-3.5" /> Rispondi
                                                                </button>
                                                                <button
                                                                    onClick={() => handleForwardEmail(event)}
                                                                    className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 rounded-lg text-xs font-medium transition-colors"
                                                                >
                                                                    <CornerUpRight className="w-3.5 h-3.5" /> Inoltra
                                                                </button>
                                                                <div className="flex-1" />
                                                                <button
                                                                    onClick={() => handleDeleteTimelineEvent(event.id || event.date)}
                                                                    className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg text-xs font-medium transition-colors"
                                                                >
                                                                    <Trash2 className="w-3.5 h-3.5" /> Elimina
                                                                </button>
                                                            </div>
                                                        </>
                                                    ) : event.type === 'call' ? (
                                                        <>
                                                            <div className="flex gap-2 text-xs mb-1">
                                                                <span className="text-green-400 font-bold uppercase tracking-wider">{
                                                                    event.metadata.outcome === 'risposto' ? 'Risposto' :
                                                                        event.metadata.outcome === 'non_risposto' ? 'Non Risposto' :
                                                                            event.metadata.outcome === 'occupato' ? 'Occupato' : 'Messaggio'
                                                                }</span>
                                                            </div>
                                                            {event.metadata.notes && (
                                                                <p className="text-sm text-slate-300 italic">
                                                                    "{event.metadata.notes}"
                                                                </p>
                                                            )}
                                                        </>
                                                    ) : (
                                                        <p className="text-xs text-slate-400 font-mono">
                                                            {JSON.stringify(event.metadata, null, 2)}
                                                        </p>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-10 text-slate-500 text-sm ml-10">
                                    Nessuna attività registrata.
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Column: Contracts, Practices, Files, Reminders */}
                <div className="space-y-6">

                    {/* Active Reminders Section */}
                    <div className="glass-panel p-6 rounded-2xl">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                <Bell className="w-5 h-5 text-yellow-500" />
                                Promemoria
                            </h3>
                            <button
                                onClick={() => setReminderModalOpen(true)}
                                className="p-1.5 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors"
                                title="Nuovo Promemoria"
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>

                        {showReminderForm && (
                            <form onSubmit={handleAddReminder} className="mb-4 bg-yellow-500/10 p-3 rounded-xl space-y-2 animate-in fade-in slide-in-from-top-2">
                                <input
                                    type="text"
                                    placeholder="Cosa ricordare?"
                                    className="w-full glass-input rounded-lg px-3 py-2 text-sm text-white bg-slate-900/50 border-yellow-500/20 focus:border-yellow-500/50"
                                    value={newReminder.title}
                                    onChange={e => setNewReminder({ ...newReminder, title: e.target.value })}
                                    required
                                />
                                <div className="flex gap-2">
                                    <input
                                        type="date"
                                        className="w-full glass-input rounded-lg px-3 py-2 text-sm text-white bg-slate-900/50 border-yellow-500/20 focus:border-yellow-500/50"
                                        value={newReminder.date}
                                        onChange={e => setNewReminder({ ...newReminder, date: e.target.value })}
                                        required
                                    />
                                    <input
                                        type="time"
                                        className="w-full glass-input rounded-lg px-3 py-2 text-sm text-white bg-slate-900/50 border-yellow-500/20 focus:border-yellow-500/50"
                                        value={newReminder.time}
                                        onChange={e => setNewReminder({ ...newReminder, time: e.target.value })}
                                        required
                                    />
                                </div>
                                <button type="submit" className="w-full bg-yellow-600 hover:bg-yellow-500 text-white text-xs font-bold py-2 rounded-lg transition-colors">
                                    Salva Promemoria
                                </button>
                            </form>
                        )}

                        <div className="space-y-3">
                            {reminders.filter(r => r.leadId === lead.id && !r.completed).length > 0 ? (
                                reminders.filter(r => r.leadId === lead.id && !r.completed).map(reminder => (
                                    <div key={reminder.id} className="bg-yellow-500/5 border border-yellow-500/20 p-3 rounded-xl flex items-start gap-3 group">
                                        <button
                                            onClick={() => toggleReminder(reminder.id)}
                                            className="mt-0.5 w-4 h-4 rounded border border-yellow-500/50 hover:bg-yellow-500/20 transition-colors"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-white truncate">{reminder.title}</p>
                                            <p className="text-xs text-yellow-500/80">{new Date(reminder.datetime).toLocaleString()}</p>
                                        </div>
                                        <button
                                            onClick={() => deleteReminder(reminder.id)}
                                            className="p-1.5 text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p className="text-xs text-slate-500 text-center py-4">Nessun promemoria attivo</p>
                            )}
                        </div>
                        {/* Active Reminders Section */}
                        {/* ... (previous reminders code) ... */}
                    </div>

                    {/* Tags Section */}
                    <div className="glass-panel p-6 rounded-2xl">
                        <div className="flex items-center gap-2 mb-4">
                            <Hash className="w-5 h-5 text-pink-400" />
                            <h3 className="text-lg font-bold text-white">Tags</h3>
                        </div>
                        <div className="space-y-3">
                            <input
                                type="text"
                                placeholder="Aggiungi tag e premi Invio..."
                                className="w-full glass-input rounded-lg px-3 py-2 text-sm text-white focus:ring-2 focus:ring-pink-500/50"
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyDown={handleAddTag}
                            />
                            <div className="flex flex-wrap gap-2">
                                {lead.tags && lead.tags.length > 0 ? (
                                    lead.tags.map(tag => (
                                        <span key={tag} className="flex items-center gap-1 px-3 py-1 bg-pink-500/10 border border-pink-500/20 rounded-full text-pink-400 text-sm">
                                            #{tag}
                                            <button
                                                onClick={() => removeTag(tag)}
                                                className="hover:text-white transition-colors"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-xs text-slate-500">Nessun tag</span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Documents Section */}
                    <div className="glass-panel p-6 rounded-2xl">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                <FileText className="w-5 h-5 text-blue-400" />
                                Documenti
                            </h3>
                            <label className="cursor-pointer p-1.5 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors">
                                <Upload className="w-4 h-4" />
                                <input type="file" className="hidden" onChange={handleFileUpload} disabled={isUploading} />
                            </label>
                        </div>
                        <div className="space-y-3">
                            {lead.documents && lead.documents.length > 0 ? (
                                lead.documents.map((doc, index) => (
                                    <div key={index} className="bg-slate-900/50 border border-white/5 p-3 rounded-xl flex items-center justify-between group">
                                        <div className="flex items-center gap-3 overflow-hidden">
                                            <div className="bg-blue-500/20 p-2 rounded-lg flex-shrink-0">
                                                <FileText className="w-4 h-4 text-blue-400" />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-sm font-medium text-white truncate cursor-pointer hover:text-blue-400" onClick={() => handleOpenDocument(doc)}>{doc.name}</p>
                                                <p className="text-xs text-slate-500">{new Date(doc.date).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <button
                                                onClick={() => handleOpenDocument(doc)}
                                                className="p-2 text-slate-600 hover:text-blue-400 transition-colors"
                                                title="Apri"
                                            >
                                                <FileText className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteDocument(index)}
                                                className="p-2 text-slate-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                                                title="Elimina"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-xs text-slate-500 text-center py-4">Nessun documento caricato</p>
                            )}
                        </div>
                    </div>

                    {/* Contracts */}
                    <div className="glass-panel p-6 rounded-2xl">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                <FileCheck className="w-5 h-5 text-orange-400" />
                                Contratti
                            </h3>
                            <button
                                onClick={() => setShowContractForm(!showContractForm)}
                                className="p-1.5 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors"
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>

                        {showContractForm && (
                            <form onSubmit={handleAddContract} className="mb-6 bg-white/5 p-4 rounded-xl space-y-3 animate-in fade-in slide-in-from-top-2">
                                <input
                                    type="text"
                                    placeholder="Titolo (es. Noleggio)"
                                    className="w-full glass-input rounded-lg px-3 py-2 text-sm text-white"
                                    value={newContract.title}
                                    onChange={e => setNewContract({ ...newContract, title: e.target.value })}
                                    required
                                />
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="space-y-1">
                                        <label className="text-[10px] text-slate-500 uppercase">Inizio</label>
                                        <input
                                            type="date"
                                            className="w-full glass-input rounded-lg px-3 py-2 text-sm text-white"
                                            value={newContract.startDate}
                                            onChange={e => setNewContract({ ...newContract, startDate: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] text-slate-500 uppercase">Scadenza</label>
                                        <input
                                            type="date"
                                            className="w-full glass-input rounded-lg px-3 py-2 text-sm text-white"
                                            value={newContract.endDate}
                                            onChange={e => setNewContract({ ...newContract, endDate: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>
                                <input
                                    type="number"
                                    placeholder="Importo €"
                                    className="w-full glass-input rounded-lg px-3 py-2 text-sm text-white"
                                    value={newContract.amount}
                                    onChange={e => setNewContract({ ...newContract, amount: e.target.value })}
                                />
                                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold py-2 rounded-lg transition-colors">
                                    Aggiungi Contratto
                                </button>
                            </form>
                        )}

                        <div className="space-y-3">
                            {lead.contracts && lead.contracts.length > 0 ? (
                                lead.contracts.map(contract => (
                                    <div key={contract.id} className="bg-slate-900/50 border border-white/5 p-3 rounded-xl relative group">
                                        <button
                                            onClick={() => deleteContract(lead.id, contract.id)}
                                            className="absolute top-2 right-2 text-slate-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="font-medium text-white text-sm">{contract.title}</span>
                                            <span className="text-xs text-green-400 font-mono">€{contract.amount}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-slate-400">
                                            <span>Scad: {new Date(contract.endDate).toLocaleDateString()}</span>
                                            {new Date(contract.endDate) < new Date() && (
                                                <span className="text-red-400 font-bold bg-red-400/10 px-1 rounded">SCADUTO</span>
                                            )}
                                        </div>
                                        <button
                                            onClick={() => addReminder({
                                                title: `Scadenza contratto: ${contract.title} - ${lead.firstName} ${lead.lastName}`,
                                                datetime: new Date(new Date(contract.endDate).getTime() - 24 * 60 * 60 * 1000).toISOString().slice(0, 16), // 1 day before
                                                leadId: lead.id
                                            })}
                                            className="mt-2 text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1"
                                        >
                                            <Bell className="w-3 h-3" /> Imposta Promemoria
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p className="text-xs text-slate-500 text-center py-4">Nessun contratto attivo</p>
                            )}
                        </div>
                    </div>

                    {/* Practices */}
                    <div className="glass-panel p-6 rounded-2xl">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                <Briefcase className="w-5 h-5 text-blue-400" />
                                Pratiche
                            </h3>
                            <button
                                onClick={() => setShowPracticeForm(!showPracticeForm)}
                                className="p-1.5 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors"
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>

                        {showPracticeForm && (
                            <form onSubmit={handleAddPractice} className="mb-6 bg-white/5 p-4 rounded-xl space-y-3 animate-in fade-in slide-in-from-top-2">
                                <input
                                    type="text"
                                    placeholder="Titolo Pratica (es. Immatricolazione)"
                                    className="w-full glass-input rounded-lg px-3 py-2 text-sm text-white"
                                    value={newPractice.title}
                                    onChange={e => setNewPractice({ ...newPractice, title: e.target.value })}
                                    required
                                />
                                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold py-2 rounded-lg transition-colors">
                                    Aggiungi Pratica
                                </button>
                            </form>
                        )}

                        <div className="space-y-3">
                            {lead.practices && lead.practices.length > 0 ? (
                                lead.practices.map(practice => (
                                    <div key={practice.id} className="bg-slate-900/50 border border-white/5 p-3 rounded-xl flex justify-between items-center">
                                        <div>
                                            <p className="font-medium text-white text-sm">{practice.title}</p>
                                            <p className="text-xs text-slate-500">{new Date(practice.createdAt).toLocaleDateString()}</p>
                                        </div>
                                        <span className="px-2 py-0.5 rounded text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/20 uppercase font-bold">
                                            {practice.status}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-xs text-slate-500 text-center py-4">Nessuna pratica in corso</p>
                            )}
                        </div>
                    </div>

                </div>
            </div>

            {emailModalOpen && (
                <EmailModal
                    lead={lead}
                    onClose={() => {
                        setEmailModalOpen(false);
                        setEmailData(null);
                    }}
                    initialData={emailData}
                />
            )}

            {callModalOpen && (
                <CallModal
                    lead={lead}
                    onClose={() => setCallModalOpen(false)}
                    onSave={handleSaveCall}
                    initialData={editingCall}
                />
            )}

            {showEditLeadModal && (
                <LeadForm
                    initialData={lead}
                    onClose={() => setShowEditLeadModal(false)}
                />
            )}
        </div>
    );
};

export default LeadDetail;
