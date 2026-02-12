import React, { useState } from 'react';
import { Plus, Search, Filter, MoreVertical, Phone, Mail, Calendar, Send, LayoutList, LayoutGrid, Upload, Download, Clock, Car, MessageCircle, Bell, Trash2, CheckSquare, Square, Hash, RefreshCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Papa from 'papaparse';
import { useCRM } from '../context/CRMContext';
import { useToast } from '../context/ToastContext';
import { openWhatsApp } from '../utils/whatsapp';
import { useNotifications } from '../context/NotificationContext';
import { useReminders } from '../context/RemindersContext';
import LeadForm from '../components/leads/LeadForm';
import EmailModal from '../components/leads/EmailModal';
import KanbanBoard from '../components/leads/KanbanBoard';
import CSVMappingModal from '../components/leads/CSVMappingModal';
import BulkEmailModal from '../components/leads/BulkEmailModal';

const Leads = () => {
    const { leads, addLead, fields, deleteLead, bulkDeleteLeads, updateLeadsStatusBulk, statuses, currentView, setCurrentView, restoreLead } = useCRM();
    const { addToast } = useToast();
    const { addNotification } = useNotifications();
    const { addReminder } = useReminders();
    const navigate = useNavigate();

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [emailModalOpen, setEmailModalOpen] = useState(null);
    const [editingLead, setEditingLead] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [viewMode, setViewMode] = useState('list');

    // CSV Mapping State
    const [mappingModalOpen, setMappingModalOpen] = useState(false);
    const [csvHeaders, setCsvHeaders] = useState([]);
    const [pendingFile, setPendingFile] = useState(null);

    // Bulk selection
    const [selectedLeads, setSelectedLeads] = useState([]);
    const [showBulkEmail, setShowBulkEmail] = useState(false);

    // Filters
    const [showFilters, setShowFilters] = useState(false);
    const [filterModel, setFilterModel] = useState('');
    const [filterTime, setFilterTime] = useState('');

    const filteredLeads = leads.filter(lead => {
        const term = searchTerm.toLowerCase();

        // Tag Search
        if (term.startsWith('#')) {
            const tagQuery = term.slice(1);
            return lead.tags && lead.tags.some(tag => tag.includes(tagQuery));
        }

        const fullName = `${lead.firstName} ${lead.lastName}`.toLowerCase();
        const matchesSearch = fullName.includes(term) ||
            (lead.email && lead.email.toLowerCase().includes(term));

        const leadData = lead.data?.data || lead.data || {};
        const matchesModel = filterModel ? leadData.model?.toLowerCase().includes(filterModel.toLowerCase()) : true;
        const matchesTime = filterTime ? leadData.contactTime === filterTime : true;

        return matchesSearch && matchesModel && matchesTime;
    });

    // Bulk Handlers
    const toggleSelectLead = (id) => {
        setSelectedLeads(prev =>
            prev.includes(id) ? prev.filter(lId => lId !== id) : [...prev, id]
        );
    };

    const toggleSelectAll = () => {
        if (selectedLeads.length === filteredLeads.length) {
            setSelectedLeads([]);
        } else {
            setSelectedLeads(filteredLeads.map(l => l.id));
        }
    };

    const handleBulkDelete = () => {
        if (window.confirm(`Sei sicuro di voler eliminare ${selectedLeads.length} lead?`)) {
            bulkDeleteLeads(selectedLeads);
            setSelectedLeads([]);
            addToast('Leads eliminati', 'success');
        }
    };

    const handleBulkStatus = (status) => {
        updateLeadsStatusBulk(selectedLeads, status);
        setSelectedLeads([]);
        addToast('Stato aggiornato per i leads selezionati', 'success');
    };

    const handleCSVImport = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPendingFile(file);
            Papa.parse(file, {
                header: true,
                preview: 1, // Read only first row to get headers
                skipEmptyLines: true,
                complete: (results) => {
                    if (results.meta.fields) {
                        setCsvHeaders(results.meta.fields);
                        setMappingModalOpen(true);
                    }
                    e.target.value = null; // Reset input
                },
                error: (error) => {
                    addToast('Errore nella lettura del CSV', 'error');
                    console.error(error);
                    e.target.value = null;
                }
            });
        }
    };

    const handleConfirmMapping = (mapping) => {
        if (!pendingFile) return;

        Papa.parse(pendingFile, {
            header: true,
            skipEmptyLines: true,
            transformHeader: (h) => h.trim(),
            complete: async (results) => {
                let successCount = 0;
                let failureCount = 0;

                // Show initial toast
                addToast(`Inizio importazione di ${results.data.length} righe...`, 'info');

                for (const row of results.data) {
                    // Use mapping to extract data
                    // mapping is { crmFieldId: csvHeaderName }

                    // Helper to get value from row based on mapping
                    const getValue = (fieldId) => {
                        const header = mapping[fieldId];
                        return header ? row[header] : '';
                    };

                    const firstName = getValue('firstName');
                    const email = getValue('email');

                    if (firstName && email) {
                        // Build dynamic data object
                        const dynamicData = {};
                        fields.forEach(field => {
                            const value = getValue(field.id);
                            if (value) dynamicData[field.id] = value;
                        });

                        try {
                            await addLead({
                                firstName: firstName,
                                lastName: getValue('lastName') || '',
                                email: email,
                                status: 'new',
                                data: dynamicData
                            });
                            successCount++;
                        } catch (err) {
                            console.error("Import failed for row:", row, err);
                            failureCount++;
                        }
                    } else {
                        // Skip invalid row (missing name/email)
                        failureCount++;
                    }
                }

                if (successCount > 0) {
                    addToast(`${successCount} lead importati con successo` + (failureCount > 0 ? ` (${failureCount} falliti)` : ''), 'success');
                    addNotification(`Importati ${successCount} nuovi lead da CSV`, 'success');
                } else {
                    addToast(`Nessun lead importato. ${failureCount} righe fallite.`, 'warning');
                }
                setPendingFile(null);
            },
            error: (error) => {
                addToast('Errore durante l\'importazione', 'error');
                console.error(error);
                setPendingFile(null);
            }
        });
    };

    const downloadTemplate = () => {
        const csvContent = "firstName,lastName,email,phone,model,contactTime,notes\nMario,Rossi,mario@test.com,3331234567,Fiat 500,18:00,Note prova";
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "template_leads.csv");
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const getStatusColor = (statusId) => {
        const found = statuses.find(s => s.id === statusId);
        return found ? found.color : 'bg-slate-500/10 text-slate-500 border-slate-500/20';
    };

    const getStatusLabel = (statusId) => {
        const found = statuses.find(s => s.id === statusId);
        return found ? found.label : statusId;
    };

    const handleEdit = (lead) => {
        setEditingLead(lead);
        setIsFormOpen(true);
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
        setEditingLead(null);
    };

    return (
        <div className="space-y-6 h-full flex flex-col custom-scrollbar pr-2">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 flex-shrink-0">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">
                        {currentView === 'trash' ? 'Cestino' : 'Leads'}
                    </h1>
                    <p className="text-slate-400">
                        {currentView === 'trash' ? 'Gestisci i lead eliminati.' : 'Gestisci i tuoi contatti e le opportunità.'}
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="glass-panel p-1 rounded-xl flex">
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white/10 text-white shadow-sm' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                            title="Lista"
                        >
                            <LayoutList className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => setViewMode('kanban')}
                            className={`p-2 rounded-lg transition-all ${viewMode === 'kanban' ? 'bg-white/10 text-white shadow-sm' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                            title="Kanban"
                        >
                            <LayoutGrid className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="flex items-center gap-2">
                        <label className="cursor-pointer glass-button px-3 py-2 rounded-xl flex items-center gap-2 text-slate-300 hover:text-white transition-all">
                            <Upload className="w-4 h-4" />
                            <span className="hidden md:inline">Importa CSV</span>
                            <input type="file" accept=".csv" className="hidden" onChange={handleCSVImport} />
                        </label>
                        <button
                            onClick={downloadTemplate}
                            className="glass-button p-2 text-slate-300 hover:text-white rounded-xl transition-all"
                            title="Scarica Template CSV"
                        >
                            <Download className="w-5 h-5" />
                        </button>
                    </div>

                    <button
                        onClick={() => setCurrentView(prev => prev === 'active' ? 'trash' : 'active')}
                        className={`glass-button p-2 hover:text-white rounded-xl transition-all ${currentView === 'trash' ? 'text-red-400 bg-red-500/10 border-red-500/20' : 'text-slate-300'}`}
                        title={currentView === 'trash' ? "Torna ai Lead" : "Vedi Cestino"}
                    >
                        {currentView === 'trash' ? <LayoutList className="w-5 h-5" /> : <Trash2 className="w-5 h-5" />}
                    </button>

                    <button
                        onClick={() => setIsFormOpen(true)}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-blue-900/20 hover:shadow-blue-900/40 font-medium"
                    >
                        <Plus className="w-5 h-5" />
                        <span className="hidden md:inline">Nuovo Lead</span>
                    </button>
                </div>
            </div>

            <div className="flex flex-col gap-4 glass-panel p-4 rounded-2xl flex-shrink-0">
                <div className="flex items-center gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Cerca nome o #tag (es. #vip)"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full glass-input rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                        />
                    </div>
                    <button
                        onClick={toggleSelectAll}
                        className={`p-2.5 border rounded-xl transition-all flex items-center gap-2 ${selectedLeads.length === filteredLeads.length && filteredLeads.length > 0 ? 'bg-purple-600 border-purple-600 text-white shadow-lg shadow-purple-900/20' : 'glass-button text-slate-400 hover:text-white'}`}
                        title={selectedLeads.length === filteredLeads.length ? "Deseleziona tutto" : "Seleziona tutto"}
                    >
                        {selectedLeads.length === filteredLeads.length && filteredLeads.length > 0 ? (
                            <CheckSquare className="w-5 h-5" />
                        ) : (
                            <Square className="w-5 h-5" />
                        )}
                        <span className="hidden md:inline font-medium">Seleziona Tutto</span>
                    </button>
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={`p-2.5 border rounded-xl transition-all ${showFilters ? 'bg-purple-600 border-purple-600 text-white shadow-lg shadow-purple-900/20' : 'glass-button text-slate-400 hover:text-white'}`}
                    >
                        <Filter className="w-5 h-5" />
                    </button>
                </div>

                {showFilters && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/5 animate-in slide-in-from-top-2">
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-slate-400 flex items-center gap-1">
                                <Car className="w-3 h-3" /> Modello Auto
                            </label>
                            <input
                                type="text"
                                placeholder="Es. Fiat 500"
                                value={filterModel}
                                onChange={(e) => setFilterModel(e.target.value)}
                                className="w-full glass-input rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-slate-400 flex items-center gap-1">
                                <Clock className="w-3 h-3" /> Orario Contatto
                            </label>
                            <input
                                type="time"
                                value={filterTime}
                                onChange={(e) => setFilterTime(e.target.value)}
                                className="w-full glass-input rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Bulk Action Bar */}
            {selectedLeads.length > 0 && (
                <div className="bg-purple-600 text-white p-4 rounded-xl flex items-center justify-between shadow-lg animate-in slide-in-from-bottom-4 mb-4">
                    <div className="font-bold flex items-center gap-2">
                        <span className="bg-white/20 px-2 py-0.5 rounded text-sm">{selectedLeads.length}</span>
                        Selezionati
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setShowBulkEmail(true)}
                            className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors border border-white/10"
                        >
                            <Mail className="w-4 h-4" /> Newsletter
                        </button>

                        <div className="h-6 w-px bg-white/20 mx-2" />

                        <div className="flex bg-purple-700 rounded-lg p-1">
                            {['new', 'contacted', 'quote', 'order', 'lost'].map(status => (
                                <button
                                    key={status}
                                    onClick={() => handleBulkStatus(status)}
                                    className="px-3 py-1.5 hover:bg-white/10 rounded-md text-xs font-medium uppercase transition-colors"
                                >
                                    {getStatusLabel(status)}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={handleBulkDelete}
                            className="bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors"
                        >
                            <Trash2 className="w-4 h-4" /> Elimina
                        </button>
                    </div>
                </div>
            )}

            <div className="flex-1 min-h-0">
                {viewMode === 'list' ? (
                    <div className="flex flex-col gap-4 overflow-y-auto h-full pr-2 custom-scrollbar pb-4">
                        {filteredLeads.map((lead) => (
                            <div key={lead.id} className="glass-card p-4 sm:p-6 rounded-2xl group relative flex-shrink-0">
                                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                    <div className="w-32 h-32 bg-gradient-to-br from-purple-600/20 to-blue-600/20 blur-3xl rounded-full" />
                                </div>

                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
                                    <div className="flex items-center gap-4 cursor-pointer flex-1 min-w-0" onClick={() => navigate(`/leads/${lead.id}`)}>
                                        <div
                                            onClick={(e) => { e.stopPropagation(); toggleSelectLead(lead.id); }}
                                            className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 transition-colors group/check"
                                        >
                                            {selectedLeads.includes(lead.id) ? (
                                                <CheckSquare className="w-5 h-5 text-purple-400" />
                                            ) : (
                                                <Square className="w-5 h-5 text-slate-500 group-hover/check:text-slate-300" />
                                            )}
                                        </div>
                                        <div className="w-12 h-12 flex-shrink-0 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 flex items-center justify-center text-lg font-bold text-white shadow-lg group-hover:scale-105 transition-transform duration-300">
                                            {lead.firstName?.charAt(0)}
                                        </div>
                                        <div className="min-w-0">
                                            <h3 className="text-lg font-bold text-white mb-0.5 truncate group-hover:text-purple-300 transition-colors flex items-center gap-2">
                                                {lead.firstName} {lead.lastName}
                                                {lead.tags && lead.tags.map(tag => (
                                                    <span key={tag} className="text-[10px] bg-pink-500/10 text-pink-400 px-1.5 py-0.5 rounded border border-pink-500/20">#{tag}</span>
                                                ))}
                                            </h3>
                                            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                                                <span className="flex items-center gap-1 bg-white/5 px-2 py-0.5 rounded-md truncate max-w-[150px]">
                                                    <Mail className="w-3 h-3 flex-shrink-0" />
                                                    {lead.email}
                                                </span>
                                                {(() => {
                                                    const leadData = lead.data?.data || lead.data || {};
                                                    const rawPhone = lead.phone || (typeof leadData.phone === 'object' ? leadData.phone.phone : leadData.phone);
                                                    const cleanPhone = rawPhone ? rawPhone.replace(/^p:/, '') : '';

                                                    return cleanPhone ? (
                                                        <span className="flex items-center gap-1 bg-white/5 px-2 py-0.5 rounded-md whitespace-nowrap">
                                                            <Phone className="w-3 h-3 flex-shrink-0" />
                                                            {cleanPhone}
                                                        </span>
                                                    ) : null;
                                                })()}
                                                {(() => {
                                                    const leadData = lead.data?.data || lead.data || {};
                                                    return leadData.contactTime ? (
                                                        <span className="flex items-center gap-1 bg-white/5 px-2 py-0.5 rounded-md whitespace-nowrap">
                                                            <Clock className="w-3 h-3 flex-shrink-0" />
                                                            {leadData.contactTime}
                                                        </span>
                                                    ) : null;
                                                })()}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 flex-shrink-0 self-end md:self-auto ml-auto md:ml-0 mt-3 md:mt-0">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                addReminder({
                                                    title: `Contattare ${lead.firstName} ${lead.lastName}`,
                                                    datetime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 16),
                                                    leadId: lead.id,
                                                    notifyEmail: true
                                                });
                                            }}
                                            className="p-2 text-slate-400 hover:text-yellow-400 hover:bg-yellow-500/10 rounded-lg transition-all"
                                            title="Aggiungi Promemoria"
                                        >
                                            <Bell className="w-4 h-4" />
                                        </button>
                                        <a
                                            href={`https://wa.me/${lead.data?.phone?.replace(/[^0-9]/g, '')}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                            className="p-2 text-slate-400 hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-all"
                                            title="Chatta su WhatsApp"
                                        >
                                            <MessageCircle className="w-4 h-4" />
                                        </a>
                                        <a
                                            href={`mailto:${lead.email}`}
                                            onClick={(e) => e.stopPropagation()}
                                            className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all"
                                            title="Invia Email"
                                        >
                                            <Send className="w-4 h-4" />
                                        </a>
                                        <a
                                            href={`tel:${lead.data?.data?.phone || lead.data?.phone}`}
                                            onClick={(e) => e.stopPropagation()}
                                            className="p-2 text-slate-400 hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-all"
                                            title="Chiama"
                                        >
                                            <Phone className="w-4 h-4" />
                                        </a>

                                        {currentView === 'trash' ? (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    if (window.confirm('Ripristinare questo lead?')) {
                                                        restoreLead(lead.id);
                                                    }
                                                }}
                                                className="p-2 text-slate-400 hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-all"
                                                title="Ripristina Lead"
                                            >
                                                <RefreshCcw className="w-4 h-4" />
                                            </button>
                                        ) : (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    if (window.confirm('Eliminare questo lead?')) {
                                                        deleteLead(lead.id);
                                                    }
                                                }}
                                                className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                                                title="Elimina Lead"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                    { /* Status label handled outside the flex group or alongside actions? 
                                         Original code had it outside, but let's check structure. 
                                         Looking at original, status label was AFTER send button.
                                         I need to be careful with the target replacement block. */ }
                                    <div className={`px-3 py-1 rounded-full text-xs font-medium border whitespace-nowrap ${getStatusColor(lead.status)}`}>
                                        {getStatusLabel(lead.status)}
                                    </div>
                                </div>


                                {/* Dynamic Fields Preview - Only show if there's data */}
                                {
                                    lead.data && Object.values(lead.data).some(v => v && v !== lead.data.phone) && (
                                        <div className="mt-4 pt-3 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
                                            {Object.entries(lead.data).map(([key, value]) => {
                                                // STRICT exclusion of 'data' key to avoid raw JSON dump
                                                if (key === 'phone' || key.toLowerCase() === 'data' || key === 'DOCUMENTS' || !value) return null;
                                                return (
                                                    <div key={key} className="min-w-0">
                                                        <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">{key}</span>
                                                        <p className="text-sm text-slate-300 truncate mt-0.5">
                                                            {typeof value === 'object' ? (value.label || value.value || JSON.stringify(value)) : value}
                                                        </p>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )
                                }
                            </div>
                        ))}
                    </div>
                ) : (
                    <KanbanBoard onEditLead={handleEdit} />
                )}
            </div>

            {
                isFormOpen && (
                    <LeadForm onClose={handleCloseForm} initialData={editingLead} />
                )
            }

            {
                emailModalOpen && (
                    <EmailModal lead={emailModalOpen} onClose={() => setEmailModalOpen(null)} />
                )
            }

            <CSVMappingModal
                isOpen={mappingModalOpen}
                onClose={() => {
                    setMappingModalOpen(false);
                    setPendingFile(null);
                }}
                csvHeaders={csvHeaders}
                crmFields={fields}
                onConfirm={handleConfirmMapping}
            />

            {
                showBulkEmail && (
                    <BulkEmailModal
                        recipients={leads.filter(l => selectedLeads.includes(l.id))}
                        onClose={() => {
                            setShowBulkEmail(false);
                            setSelectedLeads([]); // Optional: clear selection after send
                        }}
                    />
                )
            }
        </div >
    );
};

export default Leads;
