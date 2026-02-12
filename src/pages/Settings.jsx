import React, { useState } from 'react';
import { Server, Save, Plus, Trash2, Settings as SettingsIcon, Kanban, ArrowUp, ArrowDown } from 'lucide-react';
import { useCRM } from '../context/CRMContext';
import { useToast } from '../context/ToastContext';
import { api } from '../services/api';

const Settings = () => {
    const { fields, addField, removeField, moveField, emailSettings, updateEmailSettings, companyName, updateCompanyName, statuses, addStatus, deleteStatus, pipelines, addPipeline, deletePipeline } = useCRM();
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
                                    <div key={field.id} className="flex items-center justify-between glass-card p-4 rounded-xl group border border-white/5 hover:border-white/10 transition-all">
                                        <div className="flex items-center gap-4">
                                            <div className="flex flex-col gap-1">
                                                <button
                                                    onClick={() => moveField(field.id, 'up')}
                                                    className="p-1 text-slate-500 hover:text-white hover:bg-white/10 rounded transition-colors"
                                                    title="Sposta Su"
                                                >
                                                    <ArrowUp className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => moveField(field.id, 'down')}
                                                    className="p-1 text-slate-500 hover:text-white hover:bg-white/10 rounded transition-colors"
                                                    title="Sposta Giù"
                                                >
                                                    <ArrowDown className="w-4 h-4" />
                                                </button>
                                            </div>
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
                                        </div>
                                        <button
                                            onClick={() => {
                                                if (window.confirm(`Sei sicuro di voler eliminare il campo "${field.label}"? I dati esistenti per questo campo verranno nascosti.`)) {
                                                    handleRemoveField(field.id);
                                                }
                                            }}
                                            className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                                            title="Elimina Campo"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
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
                        <h2 className="text-xl font-bold text-white">Configurazione SMTP</h2>
                    </div>

                    <form onSubmit={handleSaveEmailSettings} className="space-y-5">
                        <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl text-sm text-purple-200 mb-4">
                            Configura qui i parametri per inviare email tramite il tuo provider (es. Gmail, Aruba, Outlook).
                        </div>

                        <div className="grid grid-cols-2 gap-5">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Host SMTP (Invio)</label>
                                <input
                                    type="text"
                                    value={localEmailSettings.host}
                                    onChange={e => setLocalEmailSettings({ ...localEmailSettings, host: e.target.value })}
                                    placeholder="smtp.example.com"
                                    className="w-full glass-input rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Host IMAP (Ricezione)</label>
                                <input
                                    type="text"
                                    value={localEmailSettings.imapHost || ''}
                                    onChange={e => setLocalEmailSettings({ ...localEmailSettings, imapHost: e.target.value })}
                                    placeholder="imap.example.com"
                                    className="w-full glass-input rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Porta</label>
                                <input
                                    type="number"
                                    value={localEmailSettings.port}
                                    onChange={e => setLocalEmailSettings({ ...localEmailSettings, port: e.target.value })}
                                    placeholder="es. 465 o 587"
                                    className="w-full glass-input rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                                />
                                <p className="text-xs text-slate-500 mt-1">Usa 465 per SSL, 587 per TLS/STARTTLS.</p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Email / Username</label>
                            <input
                                type="email"
                                value={localEmailSettings.user}
                                onChange={e => setLocalEmailSettings({ ...localEmailSettings, user: e.target.value })}
                                placeholder="tu@dominio.com"
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
                            <label className="text-sm font-medium text-slate-300">Nome Mittente (Opzionale)</label>
                            <input
                                type="text"
                                value={localEmailSettings.fromName}
                                onChange={e => setLocalEmailSettings({ ...localEmailSettings, fromName: e.target.value })}
                                placeholder="Nome Azienda"
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
                                const toastId = addToast('Verifica connessione in corso...', 'info');
                                try {
                                    // Unified Logic: Verify via Backend API
                                    const result = await api.verifySmtp(localEmailSettings);

                                    if (result.success) {
                                        addToast('Connessione SMTP riuscita! ✅', 'success');
                                    } else {
                                        addToast(`Errore connessione: ${result.error}`, 'error');
                                    }
                                } catch (error) {
                                    addToast(`Errore verifica: ${error.message}`, 'error');
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
                            Personalizza il nome e il logo della tua azienda.
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Nome Azienda</label>
                            <input
                                type="text"
                                value={companyName}
                                onChange={e => updateCompanyName(e.target.value)}
                                placeholder="La Tua Azienda"
                                className="w-full glass-input rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50"
                            />
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

            {/* Pipeline Management */}
            <div className="glass-panel p-6 rounded-2xl border border-white/10 h-fit">
                <div className="flex items-center gap-4 mb-6">
                    <div className="bg-yellow-500/20 p-2.5 rounded-xl">
                        <Kanban className="w-6 h-6 text-yellow-400" />
                    </div>
                    <h2 className="text-xl font-bold text-white">Gestione Pipeline</h2>
                </div>

                <div className="space-y-6">
                    {/* Pipelines List */}
                    <div className="space-y-2">
                        <h3 className="text-sm font-bold text-slate-300">Le Tue Pipeline</h3>
                        {pipelines.length === 0 && <p className="text-xs text-slate-500">Nessuna pipeline creata. La pipeline di default verrà generata automaticamente.</p>}
                        {pipelines.map(pipeline => (
                            <div key={pipeline.id} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium text-white">{pipeline.name}</span>
                                        {pipeline.isDefault && (
                                            <span className="text-[10px] bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded border border-blue-500/30">DEFAULT</span>
                                        )}
                                    </div>
                                    <p className="text-xs text-slate-500">{pipeline.stages?.length || 0} fasi</p>
                                </div>
                                {!pipeline.isDefault && (
                                    <button
                                        onClick={() => {
                                            if (window.confirm('Eliminare questa pipeline?')) deletePipeline(pipeline.id);
                                        }}
                                        className="p-2 hover:bg-red-500/20 text-slate-400 hover:text-red-500 rounded-lg transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        ))}

                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                const name = e.target.pipelineName.value;
                                if (name) {
                                    addPipeline(name);
                                    e.target.reset();
                                }
                            }}
                            className="flex gap-2 mt-2"
                        >
                            <input
                                name="pipelineName"
                                placeholder="Nuova Pipeline..."
                                className="flex-1 glass-input px-3 py-2 rounded-lg text-white text-sm"
                            />
                            <button type="submit" className="bg-white/10 hover:bg-white/20 text-white px-3 rounded-lg">
                                <Plus className="w-4 h-4" />
                            </button>
                        </form>
                    </div>

                    <div className="h-px bg-white/10" />

                    {/* Stages Management (Targeting Default Pipeline for now) */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold text-slate-300">Fasi (Pipeline Default)</h3>
                        <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl text-sm text-yellow-200">
                            Gestisci le fasi del tuo processo di vendita. Puoi aggiungere nuove fasi o modificare quelle esistenti.
                        </div>

                        <div className="space-y-3">
                            {statuses.map(status => (
                                <div key={status.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10 group">
                                    <div className={`w-4 h-4 rounded-full ${status.color.split(' ')[0].replace('/10', '')}`} />
                                    <div className="flex-1">
                                        <p className="font-medium text-white">{status.label}</p>
                                        <p className="text-xs text-slate-400">ID: {status.id}</p>
                                    </div>
                                    <button
                                        onClick={() => {
                                            if (window.confirm('Eliminare questa fase? I lead in questa fase dovranno essere spostati.')) {
                                                deleteStatus(status.id);
                                            }
                                        }}
                                        className="p-2 hover:bg-red-500/20 text-slate-400 hover:text-red-500 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                const formData = new FormData(e.target);
                                const label = formData.get('label');
                                const color = formData.get('color');
                                if (label) {
                                    addStatus({
                                        label,
                                        color: `bg-${color}-500/10 text-${color}-500 border-${color}-500/20`
                                    });
                                    e.target.reset();
                                }
                            }}
                            className="bg-slate-900/50 p-4 rounded-xl border border-white/10 space-y-3"
                        >
                            <h4 className="text-sm font-bold text-slate-300">Aggiungi Nuova Fase</h4>
                            <div className="grid grid-cols-2 gap-3">
                                <input
                                    name="label"
                                    placeholder="Nome fase (es. In Negoziazione)"
                                    className="col-span-2 glass-input px-3 py-2 rounded-lg text-white text-sm"
                                    required
                                />
                                <div className="col-span-2 flex gap-2">
                                    {['blue', 'yellow', 'purple', 'green', 'red', 'orange', 'pink', 'cyan'].map(c => (
                                        <label key={c} className="cursor-pointer">
                                            <input type="radio" name="color" value={c} className="peer sr-only" required />
                                            <div className={`w-6 h-6 rounded-full bg-${c}-500 peer-checked:ring-2 peer-checked:ring-offset-2 ring-offset-slate-900 ring-white transition-all opacity-50 peer-checked:opacity-100`} />
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 text-sm font-medium">Aggiungi Fase</button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Maintenance Section */}
            <div className="glass-panel p-6 rounded-2xl border border-white/10 h-fit">
                <div className="flex items-center gap-4 mb-6">
                    <div className="bg-red-500/20 p-2.5 rounded-xl">
                        <Server className="w-6 h-6 text-red-400" />
                    </div>
                    <h2 className="text-xl font-bold text-white">Manutenzione Dati</h2>
                </div>

                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-sm text-red-200 mb-4">
                    Strumenti per la correzione di eventuali anomalie nei dati. Usare con cautela.
                </div>

                <button
                    onClick={async () => {
                        if (confirm('Sei sicuro? Questa operazione cercherà di correggere la struttura dati dei lead.')) {
                            const toastId = addToast('Correzione in corso...', 'info');
                            try {
                                const result = await api.fixLeadsData();
                                addToast(`Operazione completata: ${result.fixed} lead corretti.`, 'success');
                            } catch (e) {
                                addToast(`Errore: ${e.message}`, 'error');
                            }
                        }
                    }}
                    className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-4 py-3 rounded-xl flex items-center justify-center gap-2 font-medium transition-all border border-slate-700"
                >
                    <Server className="w-5 h-5" />
                    Correggi Struttura Dati Lead
                </button>
            </div>
        </div>
    );
};

export default Settings;
