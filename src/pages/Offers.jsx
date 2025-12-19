import React, { useState, useEffect } from 'react';
import { Upload, FileSpreadsheet, Search, Trash2, PlusCircle, X } from 'lucide-react';
import readXlsxFile from 'read-excel-file';
import { useToast } from '../context/ToastContext';

const Offers = () => {
    const [offers, setOffers] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const { addToast } = useToast();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newOffer, setNewOffer] = useState({});

    const DEFAULT_HEADERS = ['MARCA', 'MODELLO', 'VERSIONE', 'ANTICIPO', 'CANONE', 'DURATA', 'KM'];

    useEffect(() => {
        const savedOffers = localStorage.getItem('offers_data');
        if (savedOffers) {
            try {
                const parsed = JSON.parse(savedOffers);
                setOffers(parsed.data || []);
                setHeaders(parsed.headers || []);
            } catch (e) {
                console.error("Failed to load offers", e);
            }
        }
    }, []);

    const saveToLocalStorage = (currentHeaders, currentOffers) => {
        localStorage.setItem('offers_data', JSON.stringify({
            headers: currentHeaders,
            data: currentOffers,
            updatedAt: new Date().toISOString()
        }));
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            const rows = await readXlsxFile(file);

            if (rows.length < 2) {
                addToast('Il file sembra vuoto o non valido', 'error');
                return;
            }

            const headerRow = rows[0];
            const dataRows = rows.slice(1);

            setHeaders(headerRow);
            setOffers(dataRows);
            saveToLocalStorage(headerRow, dataRows);

            addToast(`Caricate ${dataRows.length} offerte`, 'success');

        } catch (error) {
            console.error(error);
            addToast('Errore durante la lettura del file Excel', 'error');
        }
    };

    const handleAddManual = () => {
        if (headers.length === 0) {
            setHeaders(DEFAULT_HEADERS);
        }
        setNewOffer({});
        setIsModalOpen(true);
    };

    const saveManualOffer = (e) => {
        e.preventDefault();
        const headersToUse = headers.length > 0 ? headers : DEFAULT_HEADERS;

        // Create array based on headers order
        const offerRow = headersToUse.map(header => newOffer[header] || '');

        const updatedOffers = [offerRow, ...offers];
        const updatedHeaders = headers.length > 0 ? headers : DEFAULT_HEADERS;

        setHeaders(updatedHeaders);
        setOffers(updatedOffers);
        saveToLocalStorage(updatedHeaders, updatedOffers);

        setIsModalOpen(false);
        addToast('Offerta aggiunta manualmente', 'success');
    };

    const handleDeleteRow = (index) => {
        if (window.confirm('Eliminare questa offerta?')) {
            const updatedOffers = offers.filter((_, i) => i !== index);
            setOffers(updatedOffers);
            saveToLocalStorage(headers, updatedOffers);
            addToast('Offerta eliminata', 'info');
        }
    };

    const clearOffers = () => {
        if (window.confirm('Sei sicuro di voler cancellare tutte le offerte?')) {
            setOffers([]);
            setHeaders([]);
            localStorage.removeItem('offers_data');
            addToast('Offerte cancellate', 'info');
        }
    };

    const filteredOffers = offers.filter(row =>
        row.some(cell => String(cell).toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="h-full flex flex-col p-6 overflow-hidden">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Offerte del Mese</h1>
                    <p className="text-slate-500 dark:text-slate-400">Carica e gestisci le offerte mensili.</p>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={handleAddManual}
                        className="glass-button px-4 py-2 text-purple-600 hover:text-purple-700 dark:text-purple-400 flex items-center gap-2"
                    >
                        <PlusCircle className="w-5 h-5" />
                        Aggiungi Manuale
                    </button>

                    {offers.length > 0 && (
                        <button
                            onClick={clearOffers}
                            className="glass-button px-4 py-2 text-red-500 hover:text-red-600 flex items-center gap-2"
                        >
                            <Trash2 className="w-4 h-4" />
                            Cancella Tutto
                        </button>
                    )}

                    <label className="glass-button bg-gradient-to-r from-green-600 to-teal-600 text-white border-0 hover:opacity-90 cursor-pointer px-4 py-2 flex items-center gap-2 rounded-xl shadow-lg shadow-green-900/20">
                        <Upload className="w-4 h-4" />
                        <span>Carica Excel</span>
                        <input
                            type="file"
                            accept=".xlsx, .xls"
                            className="hidden"
                            onChange={handleFileUpload}
                        />
                    </label>
                </div>
            </div>

            {/* Search Bar */}
            {(offers.length > 0 || headers.length > 0) && (
                <div className="mb-6 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Cerca nelle offerte..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 glass-input rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                    />
                </div>
            )}

            {/* Content Area */}
            <div className="flex-1 glass-panel rounded-2xl overflow-hidden relative border border-slate-200 dark:border-slate-800">
                {offers.length > 0 ? (
                    <div className="h-full overflow-auto custom-scrollbar bg-white rounded-2xl">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-slate-100 sticky top-0 z-10 shadow-sm">
                                <tr>
                                    {headers.map((header, index) => (
                                        <th key={index} className="p-4 text-xs font-black text-black uppercase tracking-wider whitespace-nowrap border-b-2 border-slate-300">
                                            {header}
                                        </th>
                                    ))}
                                    <th className="p-4 w-10 border-b-2 border-slate-300"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {filteredOffers.map((row, rowIndex) => (
                                    <tr key={rowIndex} className="hover:bg-slate-50 transition-colors group bg-white">
                                        {row.map((cell, cellIndex) => {
                                            let displayValue = cell;
                                            if (cell instanceof Date) {
                                                displayValue = cell.toLocaleDateString();
                                            } else if (typeof cell === 'object' && cell !== null) {
                                                displayValue = JSON.stringify(cell);
                                            }

                                            return (
                                                <td key={cellIndex} className="p-4 text-sm font-bold text-black border-b border-slate-200">
                                                    {displayValue}
                                                </td>
                                            );
                                        })}
                                        <td className="p-2 text-right border-b border-slate-200">
                                            <button
                                                onClick={() => handleDeleteRow(rowIndex)}
                                                className="p-2 text-slate-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-slate-400 gap-4">
                        <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center">
                            <FileSpreadsheet className="w-10 h-10 opacity-50" />
                        </div>
                        <p className="text-lg font-medium">Nessuna offerta presente</p>
                        <p className="text-sm max-w-md text-center">
                            Carica un file Excel oppure aggiungi manualmente una nuova offerta.
                        </p>
                        <button
                            onClick={handleAddManual}
                            className="mt-4 px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-colors shadow-lg shadow-purple-900/20"
                        >
                            Inizia Manualmente
                        </button>
                    </div>
                )
                }
            </div>

            {/* Manual Entry Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col border border-slate-200 dark:border-slate-700">
                        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                            <h2 className="text-xl font-bold dark:text-white">Nuova Offerta</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <form onSubmit={saveManualOffer} className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {(headers.length > 0 ? headers : DEFAULT_HEADERS).map((header, idx) => (
                                    <div key={idx} className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{header}</label>
                                        <input
                                            type="text"
                                            value={newOffer[header] || ''}
                                            onChange={e => setNewOffer({ ...newOffer, [header]: e.target.value })}
                                            className="w-full glass-input rounded-xl px-4 py-2 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                                            placeholder={header}
                                        />
                                    </div>
                                ))}
                            </div>
                        </form>

                        <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl transition-colors"
                            >
                                Annulla
                            </button>
                            <button
                                onClick={saveManualOffer}
                                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-xl shadow-lg shadow-purple-900/20 font-medium"
                            >
                                Salva Offerta
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Offers;
