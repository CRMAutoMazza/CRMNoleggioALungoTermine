import React, { useState, useEffect } from 'react';
import { X, Save, Upload, FileText, Trash2, Plus } from 'lucide-react';
import { useCRM } from '../../context/CRMContext';
import { useToast } from '../../context/ToastContext';

const LeadForm = ({ onClose, initialData = null }) => {
    const { addLead, updateLead, fields } = useCRM();
    const { addToast } = useToast();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        status: 'new',
        data: {},
        documents: []
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (initialData) {
            updateLead(initialData.id, formData);
            addToast('Lead aggiornato con successo', 'success');
        } else {
            addLead(formData);
            addToast('Nuovo lead creato', 'success');
        }
        onClose();
    };

    const handleDynamicChange = (fieldId, value) => {
        setFormData(prev => ({
            ...prev,
            data: {
                ...prev.data,
                [fieldId]: value
            }
        }));
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({
                    ...prev,
                    documents: [...(prev.documents || []), {
                        name: file.name,
                        type: file.type,
                        data: reader.result,
                        date: new Date().toISOString()
                    }]
                }));
                addToast('Documento caricato', 'success');
            };
            reader.readAsDataURL(file);
        }
    };

    const removeDocument = (index) => {
        setFormData(prev => ({
            ...prev,
            documents: prev.documents.filter((_, i) => i !== index)
        }));
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
            <div className="glass-panel w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl rounded-2xl border border-white/10 animate-in zoom-in-95 duration-200 custom-scrollbar">
                <div className="p-6 border-b border-white/5 flex items-center justify-between sticky top-0 bg-slate-900/80 backdrop-blur-xl z-20">
                    <h2 className="text-xl font-bold text-white flex items-center gap-3">
                        {initialData ? (
                            <div className="p-2 bg-purple-500/20 rounded-lg">
                                <FileText className="w-5 h-5 text-purple-400" />
                            </div>
                        ) : (
                            <div className="p-2 bg-blue-500/20 rounded-lg">
                                <Plus className="w-5 h-5 text-blue-400" />
                            </div>
                        )}
                        {initialData ? 'Modifica Lead' : 'Nuovo Lead'}
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-all">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-8">
                    {/* Anagrafica */}
                    <div>
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                            Anagrafica
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Nome</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.firstName}
                                    onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                                    className="w-full glass-input rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                    placeholder="Es. Mario"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Cognome</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.lastName}
                                    onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                                    className="w-full glass-input rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                    placeholder="Es. Rossi"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Email</label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full glass-input rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                    placeholder="mario.rossi@example.com"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Stato</label>
                                <select
                                    value={formData.status}
                                    onChange={e => setFormData({ ...formData, status: e.target.value })}
                                    className="w-full glass-input rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                >
                                    <option value="new" className="bg-slate-900">Da Contattare</option>
                                    <option value="contacted" className="bg-slate-900">Contattato</option>
                                    <option value="quote" className="bg-slate-900">Preventivo</option>
                                    <option value="order" className="bg-slate-900">Ordine</option>
                                    <option value="lost" className="bg-slate-900">Perso</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Dettagli Dinamici */}
                    <div className="border-t border-white/5 pt-6">
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                            Dettagli & Contatti
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {fields.map((field) => (
                                <div key={field.id} className={field.type === 'textarea' ? 'md:col-span-2 space-y-2' : 'space-y-2'}>
                                    <label className="text-sm font-medium text-slate-300">
                                        {field.label}
                                        {field.required && <span className="text-red-400 ml-1">*</span>}
                                    </label>
                                    {field.type === 'textarea' ? (
                                        <textarea
                                            required={field.required}
                                            value={formData.data[field.id] || ''}
                                            onChange={e => handleDynamicChange(field.id, e.target.value)}
                                            className="w-full glass-input rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 min-h-[100px]"
                                            placeholder={`Inserisci ${field.label.toLowerCase()}...`}
                                        />
                                    ) : (
                                        <input
                                            type={field.type}
                                            required={field.required}
                                            value={formData.data[field.id] || ''}
                                            onChange={e => handleDynamicChange(field.id, e.target.value)}
                                            className="w-full glass-input rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                                            placeholder={`Inserisci ${field.label.toLowerCase()}...`}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Documenti */}
                    <div className="border-t border-white/5 pt-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                Documenti
                            </h3>
                            <label className="cursor-pointer glass-button px-3 py-1.5 rounded-lg text-sm flex items-center gap-2 text-slate-300 hover:text-white transition-all">
                                <Upload className="w-4 h-4" />
                                Carica File
                                <input type="file" className="hidden" onChange={handleFileUpload} />
                            </label>
                        </div>

                        <div className="space-y-3">
                            {formData.documents && formData.documents.length > 0 ? (
                                formData.documents.map((doc, index) => (
                                    <div key={index} className="flex items-center justify-between bg-white/5 border border-white/5 p-3 rounded-xl group hover:bg-white/10 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-blue-500/20 p-2 rounded-lg">
                                                <FileText className="w-5 h-5 text-blue-400" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-white truncate max-w-[200px]">{doc.name}</p>
                                                <p className="text-xs text-slate-500">{new Date(doc.date).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeDocument(index)}
                                            className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8 border-2 border-dashed border-white/10 rounded-xl bg-white/5">
                                    <p className="text-slate-500 text-sm">Nessun documento caricato</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-6 border-t border-white/5 sticky bottom-0 bg-slate-900/80 backdrop-blur-xl -mx-6 px-6 pb-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
                        >
                            Annulla
                        </button>
                        <button
                            type="submit"
                            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-6 py-2 rounded-xl flex items-center gap-2 font-medium transition-all shadow-lg shadow-blue-900/20"
                        >
                            <Save className="w-4 h-4" />
                            {initialData ? 'Salva Modifiche' : 'Crea Lead'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LeadForm;
