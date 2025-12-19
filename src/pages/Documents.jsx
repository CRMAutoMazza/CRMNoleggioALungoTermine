import React, { useState, useEffect } from 'react';
import { Folder, FileText, Plus, RefreshCw, FolderPlus, ArrowLeft, HardDrive } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const Documents = () => {
    const { addToast } = useToast();
    const [currentPath, setCurrentPath] = useState('');
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newFolderName, setNewFolderName] = useState('');
    const [isCreatingFolder, setIsCreatingFolder] = useState(false);

    const fetchDocuments = async (path = currentPath) => {
        setLoading(true);
        try {
            const { ipcRenderer } = window.require('electron');
            const result = await ipcRenderer.invoke('list-documents', path);
            setItems(result);
        } catch (error) {
            console.error(error);
            addToast('Errore caricamento documenti', 'error');
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
            const { ipcRenderer } = window.require('electron');
            // Fix path separator if needed, but standard / usually works.
            const fullPath = currentPath ? `${currentPath}/${newFolderName}` : newFolderName;

            const success = await ipcRenderer.invoke('create-folder', fullPath);
            if (success) {
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

    const handleOpenFile = async (fileName) => {
        try {
            const { ipcRenderer } = window.require('electron');
            const relativePath = currentPath ? `${currentPath}/${fileName}` : fileName;

            await ipcRenderer.invoke('open-file', relativePath);
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
                    <button
                        onClick={() => setIsCreatingFolder(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
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
                    <span>Root</span>
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
                                className="group p-4 bg-slate-950 border border-slate-800 hover:border-blue-500/50 hover:bg-slate-800 rounded-xl cursor-pointer transition-all flex flex-col items-center text-center gap-3"
                            >
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
