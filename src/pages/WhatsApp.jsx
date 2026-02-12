import React from 'react';
import { MessageCircle, ExternalLink } from 'lucide-react';
import { openWhatsApp } from '../utils/whatsapp';

const WhatsApp = () => {
    // Determine if we have a phone number from query params? 
    // Actually the sidebar link just goes to /whatsapp. 
    // Usually this page is triggered by the "Open WhatsApp" action which might navigate here?
    // OR we just want a "launcher" page.

    // For now, let's make it a hub. If no phone is provided, ask for it.
    // If phone provided (e.g. from query), auto-open?

    const [phone, setPhone] = React.useState('');

    const handleOpen = (e) => {
        e.preventDefault();
        if (phone) {
            openWhatsApp(phone);
        }
    };

    return (
        <div className="h-full flex items-center justify-center p-6">
            <div className="glass-panel p-8 rounded-2xl max-w-md w-full text-center space-y-6">
                <div className="mx-auto w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-8 h-8 text-green-500" />
                </div>

                <div>
                    <h1 className="text-2xl font-bold text-white mb-2">WhatsApp</h1>
                    <p className="text-slate-400">Inserisci un numero per avviare una chat</p>
                </div>

                <form onSubmit={handleOpen} className="space-y-4">
                    <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+39 333 1234567"
                        className="w-full glass-input px-4 py-3 rounded-xl text-center text-lg text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-green-500/50"
                        autoFocus
                    />

                    <button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg shadow-green-900/20 flex items-center justify-center gap-2"
                    >
                        <ExternalLink className="w-5 h-5" />
                        Apri Chat
                    </button>
                </form>

                <div className="text-xs text-slate-500 border-t border-white/5 pt-4">
                    <p>Supporta WhatsApp Desktop e Web</p>
                </div>
            </div>
        </div>
    );
};

export default WhatsApp;
