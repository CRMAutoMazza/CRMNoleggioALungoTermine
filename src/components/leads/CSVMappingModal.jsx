import React, { useState, useEffect } from 'react';
import { X, ArrowRight, Check } from 'lucide-react';

const CSVMappingModal = ({ isOpen, onClose, csvHeaders, crmFields, onConfirm }) => {
    const [mapping, setMapping] = useState({});

    // Auto-map fields with same name (case insensitive)
    useEffect(() => {
        if (isOpen && csvHeaders.length > 0) {
            const initialMapping = {};
            crmFields.forEach(field => {
                const match = csvHeaders.find(h => h.toLowerCase() === field.label.toLowerCase() || h.toLowerCase() === field.id.toLowerCase());
                if (match) {
                    initialMapping[field.id] = match;
                }
            });
            // Also map standard fields if not in crmFields (e.g. firstName, lastName, email)
            const standardFields = [
                { id: 'firstName', label: 'Nome' },
                { id: 'lastName', label: 'Cognome' },
                { id: 'email', label: 'Email' }
            ];
            standardFields.forEach(field => {
                const match = csvHeaders.find(h => h.toLowerCase() === field.label.toLowerCase() || h.toLowerCase() === field.id.toLowerCase());
                if (match) {
                    initialMapping[field.id] = match;
                }
            });

            setMapping(initialMapping);
        }
    }, [isOpen, csvHeaders, crmFields]);

    if (!isOpen) return null;

    const handleMappingChange = (fieldId, header) => {
        setMapping(prev => ({
            ...prev,
            [fieldId]: header
        }));
    };

    const handleConfirm = () => {
        onConfirm(mapping);
        onClose();
    };

    const allFields = [
        { id: 'firstName', label: 'Nome (Obbligatorio)', required: true },
        { id: 'lastName', label: 'Cognome' },
        { id: 'email', label: 'Email (Obbligatorio)', required: true },
        ...crmFields
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                <div className="p-6 border-b border-slate-800 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-white">Mappa Colonne CSV</h2>
                        <p className="text-slate-400 text-sm mt-1">Associa le colonne del tuo file ai campi del CRM.</p>
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {allFields.map((field) => (
                        <div key={field.id} className="flex items-center gap-4 p-4 bg-slate-950/50 rounded-xl border border-slate-800/50">
                            <div className="w-1/3">
                                <label className="text-sm font-medium text-slate-300 block">
                                    {field.label}
                                    {field.required && <span className="text-red-500 ml-1">*</span>}
                                </label>
                            </div>
                            <ArrowRight className="w-5 h-5 text-slate-600" />
                            <div className="flex-1">
                                <select
                                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    value={mapping[field.id] || ''}
                                    onChange={(e) => handleMappingChange(field.id, e.target.value)}
                                >
                                    <option value="">-- Ignora --</option>
                                    {csvHeaders.map(header => (
                                        <option key={header} value={header}>{header}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="p-6 border-t border-slate-800 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                    >
                        Annulla
                    </button>
                    <button
                        onClick={handleConfirm}
                        disabled={!mapping.firstName || !mapping.email}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Check className="w-4 h-4" />
                        Importa Leads
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CSVMappingModal;
