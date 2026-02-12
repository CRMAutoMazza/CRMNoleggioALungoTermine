import React, { useState, useEffect } from 'react';
import { Folder, FileText, Plus, RefreshCw, FolderPlus, ArrowLeft, HardDrive, Upload, Trash2 } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { useCRM } from '../context/CRMContext';

import { api } from '../services/api';

const Documents = () => {
    // ... existing hooks
    const { addToast } = useToast();
    const { companyName } = useCRM();
    const [currentPath, setCurrentPath] = useState('');
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newFolderName, setNewFolderName] = useState('');
    const [isCreatingFolder, setIsCreatingFolder] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    const fetchDocuments = async (path = currentPath) => {
        setLoading(true);
        try {
            // WEB APP: API Call
            const result = await api.listDocuments(path);
            setItems(result);
        } catch (error) {
            console.error('Fetch Documents Error:', error);
            addToast(`Errore caricamento documenti: ${error.message || error}`, 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDocuments();
    }, [currentPath]);

    const handleCreateFolder = async (e) => {
        e.preventDefault();
        if (!newFolderName) return;

        try {
            const fullPath = currentPath ? `${currentPath}/${newFolderName}` : newFolderName;

            // WEB APP: API Call
            const result = await api.createFolder(fullPath);
            if (result.success) {
                addToast('Cartella creata', 'success');
                setNewFolderName('');
                setIsCreatingFolder(false);
                fetchDocuments();
            } else {
                addToast('Errore creazione cartella', 'error');
            }
        } catch (error) {
            addToast('Errore di sistema', 'error');
        }
    };

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsUploading(true);
        try {
            const reader = new FileReader();
            reader.onload = async () => {
                const base64Data = reader.result;

                // WEB APP: API Call
                const result = await api.saveDocument({
                    folderPath: currentPath,
                    fileName: file.name,
                    data: base64Data // Sending base64 is easiest for compatibility with existing flow
                });

                if (result.success) {
                    addToast('File caricato con successo', 'success');
                    fetchDocuments();
                } else {
                    addToast(`Errore caricamento: ${result.error}`, 'error');
                }
                setIsUploading(false);
            };
            reader.readAsDataURL(file);
        } catch (error) {
            console.error(error);
            addToast('Errore durante il caricamento', 'error');
            setIsUploading(false);
        }
    };

    const handleDelete = async (e, fileName) => {
        e.stopPropagation(); // Prevent folder navigation or file opening
        if (!window.confirm(`Sei sicuro di voler eliminare "${fileName}"?`)) return;

        try {
            const relativePath = currentPath ? `${currentPath}/${fileName}` : fileName;

            // WEB APP: API Call
            const result = await api.deleteDocument(relativePath);
            if (result.success) {
                addToast('Elemento eliminato', 'success');
                fetchDocuments();
            } else {
                addToast('Errore durante l\'eliminazione', 'error');
            }
        } catch (error) {
            addToast('Errore di sistema', 'error');
        }
    };

    const handleOpenFile = async (fileName) => {
        try {
            const relativePath = currentPath ? `${currentPath}/${fileName}` : fileName;

            // Calculate full URL for the file to open in browser
            // Assuming the backend serves files from /documents/file endpoint or static path
            // For now, let's assume we can construct a URL or ask API for a signed URL
            // Since we don't have a specific "get file url" API, we can assume a convention:
            // e.g. /api/documents/view?path=...

            const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
            const fileUrl = `${baseUrl}/documents/view?path=${encodeURIComponent(relativePath)}`;

            window.open(fileUrl, '_blank');
        } catch (error) {
            addToast('Impossibile aprire il file', 'error');
        }
    };

    const navigateUp = () => {
        const parts = currentPath.split('/');
        parts.pop();
        setCurrentPath(parts.join('/'));
    };

    return (
        <div className="h-full flex flex-col space-y-6">
            <div className="flex items-center justify-between flex-shrink-0">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Documenti</h1>
                    <p className="text-slate-400">Gestione file locale (Cartella Documenti/AutoMazza_Data).</p>
                </div>
                <div className="flex gap-3">
                    <div className="relative">
                        <input
                            type="file"
                            onChange={handleUpload}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            disabled={isUploading}
                        />
                        <button
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50"
                        >
                            {isUploading ? (
                                <RefreshCw className="w-5 h-5 animate-spin" />
                            ) : (
                                <Upload className="w-5 h-5" />
                            )}
                            {isUploading ? 'Caricamento...' : 'Carica File'}
                        </button>
                    </div>

                    <button
                        onClick={() => setIsCreatingFolder(true)}
                        className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                    >
                        <FolderPlus className="w-5 h-5" />
                        Nuova Cartella
                    </button>
                    <button
                        onClick={() => fetchDocuments()}
                        className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                        <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                    </button>
                </div>
            </div>

            {/* Breadcrumb & Navigation */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center gap-4">
                <button
                    onClick={navigateUp}
                    disabled={!currentPath}
                    className="p-2 hover:bg-slate-800 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 text-slate-400" />
                </button>
                <div className="flex items-center gap-2 text-sm text-slate-300">
                    <HardDrive className="w-4 h-4 text-blue-500" />
                    <span className="text-slate-500">/</span>
                    <span>Documenti</span>
                    {currentPath.split('/').filter(Boolean).map((part, i) => (
                        <React.Fragment key={i}>
                            <span className="text-slate-500">/</span>
                            <span>{part}</span>
                        </React.Fragment>
                    ))}
                </div>
            </div>

            {/* New Folder Input */}
            {isCreatingFolder && (
                <form onSubmit={handleCreateFolder} className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center gap-4 animate-in fade-in slide-in-from-top-2">
                    <Folder className="w-6 h-6 text-yellow-500" />
                    <input
                        type="text"
                        autoFocus
                        placeholder="Nome cartella..."
                        value={newFolderName}
                        onChange={e => setNewFolderName(e.target.value)}
                        className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">Crea</button>
                    <button type="button" onClick={() => setIsCreatingFolder(false)} className="text-slate-400 hover:text-white px-4">Annulla</button>
                </form>
            )}

            {/* File Grid */}
            <div className="flex-1 bg-slate-900 border border-slate-800 rounded-xl p-6 overflow-y-auto">
                {items.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {items.map((item, index) => (
                            <div
                                key={index}
                                onClick={() => item.isDirectory ? setCurrentPath(item.path) : handleOpenFile(item.name)}
                                className="group p-4 bg-slate-950 border border-slate-800 hover:border-blue-500/50 hover:bg-slate-800 rounded-xl cursor-pointer transition-all flex flex-col items-center text-center gap-3 relative"
                            >
                                <button
                                    onClick={(e) => handleDelete(e, item.name)}
                                    className="absolute top-2 right-2 p-1.5 text-slate-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all z-10"
                                    title="Elimina"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>

                                <div className={`p-3 rounded-xl ${item.isDirectory ? 'bg-yellow-500/10 text-yellow-500' : 'bg-blue-500/10 text-blue-500'}`}>
                                    {item.isDirectory ? <Folder className="w-8 h-8" /> : <FileText className="w-8 h-8" />}
                                </div>
                                <div className="w-full">
                                    <p className="text-sm font-medium text-white truncate w-full" title={item.name}>{item.name}</p>
                                    {!item.isDirectory && (
                                        <p className="text-xs text-slate-500 mt-1">{(item.size / 1024).toFixed(1)} KB</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-slate-500">
                        <Folder className="w-16 h-16 mb-4 opacity-20" />
                        <p>Cartella vuota</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Documents;
