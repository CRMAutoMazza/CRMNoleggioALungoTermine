import React, { useState } from 'react';
import { Plus, Trash2, Settings as SettingsIcon, Mail, Save, Server } from 'lucide-react';
import { useCRM } from '../context/CRMContext';
import { useToast } from '../context/ToastContext';

const Settings = () => {
    const { fields, addField, removeField, emailSettings, updateEmailSettings } = useCRM();
    const { addToast } = useToast();
    const [newField, setNewField] = useState({ label: '', type: 'text', required: false });
    const [localEmailSettings, setLocalEmailSettings] = useState(emailSettings);

    const handleAddField = (e) => {
        e.preventDefault();
        if (newField.label) {
            addField(newField);
            addToast(`Campo "${newField.label}" aggiunto`, 'success');
            setNewField({ label: '', type: 'text', required: false });
        }
    };

    const handleRemoveField = (id) => {
        removeField(id);
        addToast('Campo rimosso', 'info');
    };

    const handleSaveEmailSettings = (e) => {
        e.preventDefault();
        updateEmailSettings(localEmailSettings);
        addToast('Impostazioni SMTP salvate', 'success');
    };

    return (
        <div className="space-y-6 h-full overflow-y-auto custom-scrollbar pr-2">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Impostazioni</h1>
                <p className="text-slate-400">Gestisci i campi personalizzati e le preferenze.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-8">
                {/* Field Management */}
                <div className="glass-panel p-6 rounded-2xl border border-white/10">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="bg-blue-500/20 p-2.5 rounded-xl">
                            <SettingsIcon className="w-6 h-6 text-blue-400" />
                        </div>
                        <h2 className="text-xl font-bold text-white">Gestione Campi Lead</h2>
                    </div>

                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                                Campi Attivi
                            </h3>
                            <div className="space-y-3">
                                {fields.map((field) => (
                                    <div key={field.id} className="flex items-center justify-between glass-card p-4 rounded-xl group border border-white/5 hover:border-white/10">
                                        <div>
                                            <h4 className="font-medium text-white">{field.label}</h4>
                                            <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                                                <span className="uppercase bg-white/5 px-2 py-0.5 rounded border border-white/5">
                                                    {field.type}
                                                </span>
                                                {field.required && (
                                                    <span className="text-red-400 font-medium bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">Obbligatorio</span>
                                                )}
                                            </div>
                                        </div>
                                        {!['phone', 'pec', 'address', 'city', 'referral', 'model', 'budget', 'contactTime', 'notes'].includes(field.id) && (
                                            <button
                                                onClick={() => handleRemoveField(field.id)}
                                                className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white/5 border border-white/5 rounded-xl p-6">
                            <h3 className="text-lg font-bold text-white mb-4">Aggiungi Nuovo Campo</h3>
                            <form onSubmit={handleAddField} className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-300">Etichetta Campo</label>
                                    <input
                                        type="text"
                                        required
                                        value={newField.label}
                                        onChange={e => setNewField({ ...newField, label: e.target.value })}
                                        placeholder="Es. Codice Fiscale..."
                                        className="w-full glass-input rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-300">Tipo di Dato</label>
                                    <select
                                        value={newField.type}
                                        onChange={e => setNewField({ ...newField, type: e.target.value })}
                                        className="w-full glass-input rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                    >
                                        <option value="text" className="bg-slate-900">Testo</option>
                                        <option value="number" className="bg-slate-900">Numero</option>
                                        <option value="date" className="bg-slate-900">Data</option>
                                        <option value="time" className="bg-slate-900">Orario</option>
                                        <option value="tel" className="bg-slate-900">Telefono</option>
                                        <option value="textarea" className="bg-slate-900">Area di Testo</option>
                                    </select>
                                </div>

                                <div className="flex items-center gap-3 pt-2">
                                    <input
                                        type="checkbox"
                                        id="required"
                                        checked={newField.required}
                                        onChange={e => setNewField({ ...newField, required: e.target.checked })}
                                        className="w-4 h-4 rounded border-slate-600 bg-slate-800 text-blue-600 focus:ring-blue-600"
                                    />
                                    <label htmlFor="required" className="text-sm text-slate-300 cursor-pointer">Campo Obbligatorio</label>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 font-medium transition-all shadow-lg shadow-blue-900/20 hover:shadow-blue-900/40 mt-2"
                                >
                                    <Plus className="w-5 h-5" />
                                    Aggiungi Campo
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* SMTP Configuration */}
                <div className="glass-panel p-6 rounded-2xl border border-white/10 h-fit">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="bg-purple-500/20 p-2.5 rounded-xl">
                            <Server className="w-6 h-6 text-purple-400" />
                        </div>
                        <h2 className="text-xl font-bold text-white">Configurazione SMTP (Aruba)</h2>
                    </div>

                    <form onSubmit={handleSaveEmailSettings} className="space-y-5">
                        <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl text-sm text-purple-200 mb-4">
                            Configura qui i parametri per inviare email tramite il tuo account Aruba (o altro provider SMTP).
                        </div>

                        <div className="grid grid-cols-2 gap-5">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Host SMTP (Invio)</label>
                                <input
                                    type="text"
                                    value={localEmailSettings.host}
                                    onChange={e => setLocalEmailSettings({ ...localEmailSettings, host: e.target.value })}
                                    placeholder="smtps.aruba.it"
                                    className="w-full glass-input rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Host IMAP (Ricezione)</label>
                                <input
                                    type="text"
                                    value={localEmailSettings.imapHost || 'imaps.aruba.it'}
                                    onChange={e => setLocalEmailSettings({ ...localEmailSettings, imapHost: e.target.value })}
                                    placeholder="imaps.aruba.it"
                                    className="w-full glass-input rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Porta</label>
                                <input
                                    type="number"
                                    value={localEmailSettings.port}
                                    onChange={e => setLocalEmailSettings({ ...localEmailSettings, port: e.target.value })}
                                    placeholder="465 (Consigliata)"
                                    className="w-full glass-input rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                                />
                                <p className="text-xs text-slate-500 mt-1">Usa 465 per SSL (Aruba), 587 per STARTTLS.</p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Email Mittente (Username)</label>
                            <input
                                type="email"
                                value={localEmailSettings.user}
                                onChange={e => setLocalEmailSettings({ ...localEmailSettings, user: e.target.value })}
                                placeholder="tuo@dominio.it"
                                className="w-full glass-input rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Password</label>
                            <input
                                type="password"
                                value={localEmailSettings.pass}
                                onChange={e => setLocalEmailSettings({ ...localEmailSettings, pass: e.target.value })}
                                placeholder="********"
                                className="w-full glass-input rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Nome Visualizzato (Opzionale)</label>
                            <input
                                type="text"
                                value={localEmailSettings.fromName}
                                onChange={e => setLocalEmailSettings({ ...localEmailSettings, fromName: e.target.value })}
                                placeholder="AutoMazza CRM"
                                className="w-full glass-input rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white px-4 py-3 rounded-xl flex items-center justify-center gap-2 font-medium transition-all shadow-lg shadow-purple-900/20 hover:shadow-purple-900/40 mt-4"
                        >
                            <Save className="w-5 h-5" />
                            Salva Configurazione
                        </button>

                        <button
                            type="button"
                            onClick={async () => {
                                const { ipcRenderer } = window.require('electron');
                                const toastId = addToast('Verifica connessione in corso...', 'info');
                                try {
                                    const result = await ipcRenderer.invoke('verify-smtp', localEmailSettings);
                                    if (result.success) {
                                        addToast('Connessione SMTP riuscita! ✅', 'success');
                                    } else {
                                        addToast(`Errore connessione: ${result.error}`, 'error');
                                    }
                                } catch (error) {
                                    addToast(`Errore IPC: ${error.message}`, 'error');
                                }
                            }}
                            className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-4 py-3 rounded-xl flex items-center justify-center gap-2 font-medium transition-all border border-slate-700 mt-2"
                        >
                            <Server className="w-5 h-5" />
                            Test Connessione
                        </button>
                    </form>
                </div>
                {/* Customization */}
                <div className="glass-panel p-6 rounded-2xl border border-white/10 h-fit">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="bg-pink-500/20 p-2.5 rounded-xl">
                            <SettingsIcon className="w-6 h-6 text-pink-400" />
                        </div>
                        <h2 className="text-xl font-bold text-white">Personalizzazione</h2>
                    </div>

                    <div className="space-y-6">
                        <div className="p-4 bg-pink-500/10 border border-pink-500/20 rounded-xl text-sm text-pink-200">
                            Carica il logo della tua azienda per visualizzarlo nell'intestazione.
                        </div>

                        <div className="space-y-4">
                            <label className="text-sm font-medium text-slate-300">Logo Aziendale</label>

                            <div className="flex items-center gap-4">
                                {localStorage.getItem('company_logo') && (
                                    <div className="w-16 h-16 bg-white rounded-lg p-2 flex items-center justify-center">
                                        <img
                                            src={localStorage.getItem('company_logo')}
                                            alt="Logo Preview"
                                            className="max-w-full max-h-full object-contain"
                                        />
                                    </div>
                                )}

                                <div className="flex-1">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            if (file) {
                                                const reader = new FileReader();
                                                reader.onloadend = () => {
                                                    const base64 = reader.result;
                                                    localStorage.setItem('company_logo', base64);
                                                    addToast('Logo aggiornato con successo', 'success');
                                                    // Force update to reflect changes immediately in header if possible, 
                                                    // or just let the user know a refresh might be needed.
                                                    // For now, simple state update in component won't trigger Layout update unless shared context.
                                                    // We'll rely on a reload or event dispatch if needed.
                                                    window.dispatchEvent(new Event('storage'));
                                                };
                                                reader.readAsDataURL(file);
                                            }
                                        }}
                                        className="w-full glass-input rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100"
                                    />
                                </div>
                            </div>

                            {localStorage.getItem('company_logo') && (
                                <button
                                    onClick={() => {
                                        localStorage.removeItem('company_logo');
                                        addToast('Logo rimosso', 'info');
                                        window.dispatchEvent(new Event('storage'));
                                    }}
                                    className="text-sm text-red-400 hover:text-red-300 transition-colors flex items-center gap-1"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    Rimuovi Logo
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
