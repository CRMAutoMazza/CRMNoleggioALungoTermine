import React, { useState } from 'react';
import { Zap, Plus, Trash2, Calendar, Mail, FileText, ArrowRight, Save, Clock, RefreshCcw, Bell, MessageCircle } from 'lucide-react';
import { useAutomation } from '../context/AutomationContext';
import { useCRM } from '../context/CRMContext';

const Automations = () => {
    const { rules, addRule, deleteRule, toggleRule } = useAutomation();
    const { fields } = useCRM();

    const [isCreating, setIsCreating] = useState(false);
    const [step, setStep] = useState(1); // 1: Trigger, 2: Condition, 3: Action, 4: Config

    const [newRule, setNewRule] = useState({
        name: '',
        triggerType: 'ON_LEAD_STATUS_CHANGE',
        condition: {},
        action: { type: 'SEND_EMAIL' }
    });

    const steps = [
        { num: 1, title: 'Trigger' },
        { num: 2, title: 'Condizioni' },
        { num: 3, title: 'Azione' },
        { num: 4, title: 'Configurazione' }
    ];

    const resetForm = () => {
        setNewRule({
            name: '',
            triggerType: 'ON_LEAD_STATUS_CHANGE',
            condition: {},
            action: { type: 'SEND_EMAIL' }
        });
        setStep(1);
        setIsCreating(false);
    };

    const handleSave = () => {
        if (!newRule.name) newRule.name = "Nuova Regola Automatica";
        addRule(newRule);
        resetForm();
    };

    const renderStepContent = () => {
        switch (step) {
            case 1: // Trigger Selection
                return (
                    <div className="grid grid-cols-2 gap-4">
                        <div
                            onClick={() => setNewRule({ ...newRule, triggerType: 'ON_LEAD_STATUS_CHANGE', name: 'Cambio Stato' })}
                            className={`p-4 border rounded-xl cursor-pointer transition-all ${newRule.triggerType === 'ON_LEAD_STATUS_CHANGE' ? 'bg-purple-500/20 border-purple-500' : 'bg-slate-900 border-slate-700 hover:border-slate-500'}`}
                        >
                            <RefreshCcw className="w-8 h-8 mb-3 text-purple-400" />
                            <h3 className="font-semibold text-white">Cambio Stato Lead</h3>
                            <p className="text-sm text-slate-400">Esegui quando un lead cambia fase (es. da Nuovo a Contattato).</p>
                        </div>
                        <div
                            onClick={() => setNewRule({ ...newRule, triggerType: 'BEFORE_CONTRACT_EXPIRY', name: 'Scadenza Contratto' })}
                            className={`p-4 border rounded-xl cursor-pointer transition-all ${newRule.triggerType === 'BEFORE_CONTRACT_EXPIRY' ? 'bg-orange-500/20 border-orange-500' : 'bg-slate-900 border-slate-700 hover:border-slate-500'}`}
                        >
                            <Clock className="w-8 h-8 mb-3 text-orange-400" />
                            <h3 className="font-semibold text-white">Scadenza Contratto</h3>
                            <p className="text-sm text-slate-400">Esegui X giorni prima della scadenza di un contratto.</p>
                        </div>
                    </div>
                );
            case 2: // Condition Config
                if (newRule.triggerType === 'ON_LEAD_STATUS_CHANGE') {
                    return (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Stato di Partenza</label>
                                <select
                                    value={newRule.condition?.fromStatus || '*'}
                                    onChange={e => setNewRule({ ...newRule, condition: { ...newRule.condition, fromStatus: e.target.value } })}
                                    className="w-full glass-input rounded-xl px-4 py-2.5 text-white bg-slate-900"
                                >
                                    <option value="*">Qualsiasi</option>
                                    <option value="new">Da Contattare</option>
                                    <option value="contacted">Contattato</option>
                                    <option value="quote">Preventivo</option>
                                    <option value="order">Ordine</option>
                                    <option value="lost">Perso</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Stato di Arrivo</label>
                                <select
                                    value={newRule.condition?.toStatus || '*'}
                                    onChange={e => setNewRule({ ...newRule, condition: { ...newRule.condition, toStatus: e.target.value } })}
                                    className="w-full glass-input rounded-xl px-4 py-2.5 text-white bg-slate-900"
                                >
                                    <option value="*">Qualsiasi</option>
                                    <option value="new">Da Contattare</option>
                                    <option value="contacted">Contattato</option>
                                    <option value="quote">Preventivo</option>
                                    <option value="order">Ordine</option>
                                    <option value="lost">Perso</option>
                                </select>
                            </div>
                        </div>
                    );
                } else {
                    return (
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Quanti giorni prima?</label>
                            <input
                                type="number"
                                value={newRule.condition?.daysBefore || 1}
                                onChange={e => setNewRule({ ...newRule, condition: { ...newRule.condition, daysBefore: parseInt(e.target.value) } })}
                                className="w-full glass-input rounded-xl px-4 py-2.5 text-white bg-slate-900"
                                min="0"
                            />
                            <p className="text-xs text-slate-500 mt-2">Imposta 0 per il giorno stesso della scadenza.</p>
                        </div>
                    );
                }
            case 3: // Action Selection
                return (
                    <div className="grid grid-cols-3 gap-4">
                        <div
                            onClick={() => setNewRule({ ...newRule, action: { ...newRule.action, type: 'SEND_EMAIL' } })}
                            className={`p-4 border rounded-xl cursor-pointer transition-all ${newRule.action.type === 'SEND_EMAIL' ? 'bg-blue-500/20 border-blue-500' : 'bg-slate-900 border-slate-700 hover:border-slate-500'}`}
                        >
                            <Mail className="w-8 h-8 mb-3 text-blue-400" />
                            <h3 className="font-semibold text-white">Invia Email</h3>
                        </div>
                        <div
                            onClick={() => setNewRule({ ...newRule, action: { ...newRule.action, type: 'ADD_REMINDER' } })}
                            className={`p-4 border rounded-xl cursor-pointer transition-all ${newRule.action.type === 'ADD_REMINDER' ? 'bg-yellow-500/20 border-yellow-500' : 'bg-slate-900 border-slate-700 hover:border-slate-500'}`}
                        >
                            <Bell className="w-8 h-8 mb-3 text-yellow-400" />
                            <h3 className="font-semibold text-white">Crea Promemoria</h3>
                        </div>
                        <div
                            onClick={() => setNewRule({ ...newRule, action: { ...newRule.action, type: 'OPEN_WHATSAPP' } })}
                            className={`p-4 border rounded-xl cursor-pointer transition-all ${newRule.action.type === 'OPEN_WHATSAPP' ? 'bg-green-500/20 border-green-500' : 'bg-slate-900 border-slate-700 hover:border-slate-500'}`}
                        >
                            <MessageCircle className="w-8 h-8 mb-3 text-green-400" />
                            <h3 className="font-semibold text-white">Apri WhatsApp</h3>
                        </div>
                    </div>
                );
            case 4: // Action Config & Name
                return (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Nome Regola</label>
                            <input
                                type="text"
                                value={newRule.name}
                                onChange={e => setNewRule({ ...newRule, name: e.target.value })}
                                placeholder="Es. Email di Benvenuto"
                                className="w-full glass-input rounded-xl px-4 py-2.5 text-white bg-slate-900"
                            />
                        </div>

                        {newRule.action.type === 'SEND_EMAIL' && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">Oggetto Email</label>
                                    <input
                                        type="text"
                                        value={newRule.action.subject || ''}
                                        onChange={e => setNewRule({ ...newRule, action: { ...newRule.action, subject: e.target.value } })}
                                        placeholder="Benvenuto {firstName}"
                                        className="w-full glass-input rounded-xl px-4 py-2.5 text-white bg-slate-900"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">Corpo Messaggio</label>
                                    <textarea
                                        value={newRule.action.body || ''}
                                        onChange={e => setNewRule({ ...newRule, action: { ...newRule.action, body: e.target.value } })}
                                        className="w-full h-32 glass-input rounded-xl px-4 py-2.5 text-white bg-slate-900 resize-none"
                                        placeholder="Ciao {firstName}, grazie per..."
                                    />
                                    <p className="text-xs text-slate-500 mt-2">Variabili: {`{firstName}, {lastName}, {company}, {contractTitle}, {endDate}`}</p>
                                </div>
                            </>
                        )}

                        {newRule.action.type === 'ADD_REMINDER' && (
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Titolo Promemoria</label>
                                <input
                                    type="text"
                                    value={newRule.action.title || ''}
                                    onChange={e => setNewRule({ ...newRule, action: { ...newRule.action, title: e.target.value } })}
                                    placeholder="Contattare {firstName}"
                                    className="w-full glass-input rounded-xl px-4 py-2.5 text-white bg-slate-900"
                                />
                            </div>
                        )}

                        {newRule.action.type === 'OPEN_WHATSAPP' && (
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Messaggio Predefinito</label>
                                <textarea
                                    value={newRule.action.message || ''}
                                    onChange={e => setNewRule({ ...newRule, action: { ...newRule.action, message: e.target.value } })}
                                    className="w-full h-32 glass-input rounded-xl px-4 py-2.5 text-white bg-slate-900 resize-none"
                                />
                                <p className="text-xs text-slate-500 mt-2">Variabili: {`{firstName}, {lastName}`}</p>
                            </div>
                        )}
                    </div>
                );
            default: return null;
        }
    };

    return (
        <div className="h-full flex flex-col space-y-6">
            <div className="flex items-center justify-between flex-shrink-0">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Automazioni</h1>
                    <p className="text-slate-400">Automatizza azioni in base agli eventi del CRM.</p>
                </div>
                {!isCreating && (
                    <button
                        onClick={() => setIsCreating(true)}
                        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-lg font-medium"
                    >
                        <Plus className="w-5 h-5" />
                        Nuova Regola
                    </button>
                )}
            </div>

            {isCreating ? (
                <div className="flex-1 glass-panel rounded-2xl p-8 flex flex-col">
                    {/* Steps Indicator */}
                    <div className="flex items-center justify-between mb-8 px-10 relative">
                        <div className="absolute left-0 top-1/2 w-full h-0.5 bg-slate-800 -z-10" />
                        {steps.map(s => (
                            <div key={s.num} className={`flex flex-col items-center gap-2 bg-slate-950 px-4 ${step >= s.num ? 'text-blue-400' : 'text-slate-600'}`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold border-2 ${step >= s.num ? 'border-blue-500 bg-blue-500/20' : 'border-slate-700 bg-slate-900'}`}>
                                    {s.num}
                                </div>
                                <span className="text-xs font-medium uppercase tracking-wider">{s.title}</span>
                            </div>
                        ))}
                    </div>

                    <div className="flex-1 overflow-y-auto px-4 custom-scrollbar">
                        <div className="max-w-2xl mx-auto">
                            {renderStepContent()}
                        </div>
                    </div>

                    <div className="flex justify-between items-center mt-8 pt-6 border-t border-white/5">
                        <button
                            onClick={() => step === 1 ? setIsCreating(false) : setStep(step - 1)}
                            className="px-6 py-2 text-slate-400 hover:text-white transition-colors"
                        >
                            {step === 1 ? 'Annulla' : 'Indietro'}
                        </button>
                        <button
                            onClick={() => step === 4 ? handleSave() : setStep(step + 1)}
                            className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-2.5 rounded-xl font-medium transition-all flex items-center gap-2 shadow-lg shadow-blue-900/20"
                        >
                            {step === 4 ? (
                                <>
                                    <Save className="w-4 h-4" /> Salva Regola
                                </>
                            ) : (
                                <>
                                    Avanti <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </div>
                </div>
            ) : (
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {rules.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {rules.map(rule => (
                                <div key={rule.id} className={`glass-card p-6 rounded-2xl border transition-all relative group ${rule.isActive ? 'border-white/5 bg-slate-900/40' : 'border-slate-800 bg-slate-950 opacity-60'}`}>
                                    <div className="flex justify-between items-start mb-4">
                                        <div className={`p-3 rounded-xl ${rule.triggerType === 'ON_LEAD_STATUS_CHANGE' ? 'bg-purple-500/10 text-purple-400' : 'bg-orange-500/10 text-orange-400'}`}>
                                            {rule.triggerType === 'ON_LEAD_STATUS_CHANGE' ? <RefreshCcw className="w-6 h-6" /> : <Clock className="w-6 h-6" />}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div
                                                onClick={() => toggleRule(rule.id)}
                                                className={`w-10 h-5 rounded-full cursor-pointer transition-colors relative ${rule.isActive ? 'bg-green-500' : 'bg-slate-700'}`}
                                            >
                                                <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${rule.isActive ? 'left-6' : 'left-1'}`} />
                                            </div>
                                            <button
                                                onClick={() => deleteRule(rule.id)}
                                                className="p-1.5 text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>

                                    <h3 className="text-lg font-bold text-white mb-1">{rule.name}</h3>
                                    <p className="text-sm text-slate-400 mb-4 line-clamp-1">
                                        {rule.triggerType === 'ON_LEAD_STATUS_CHANGE'
                                            ? `Quando lo stato cambia da ${rule.condition.fromStatus === '*' ? 'Qualsiasi' : rule.condition.fromStatus} a ${rule.condition.toStatus === '*' ? 'Qualsiasi' : rule.condition.toStatus}`
                                            : `Quando un contratto scade tra ${rule.condition.daysBefore} giorni`
                                        }
                                    </p>

                                    <div className="flex items-center gap-2 text-sm font-medium py-3 border-t border-white/5 text-slate-300">
                                        <ArrowRight className="w-4 h-4 text-slate-500" />
                                        {rule.action.type === 'SEND_EMAIL' && <span className="flex items-center gap-2 text-blue-400"><Mail className="w-4 h-4" /> Invia Email</span>}
                                        {rule.action.type === 'ADD_REMINDER' && <span className="flex items-center gap-2 text-yellow-400"><Bell className="w-4 h-4" /> Crea Promemoria</span>}
                                        {rule.action.type === 'OPEN_WHATSAPP' && <span className="flex items-center gap-2 text-green-400"><MessageCircle className="w-4 h-4" /> Apri WhatsApp</span>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-slate-500">
                            <Zap className="w-20 h-20 mb-6 opacity-20" />
                            <p className="text-xl font-medium mb-2">Nessuna automazione attiva</p>
                            <p>Crea la tua prima regola per automatizzare il lavoro.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Automations;
