import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus, X, Clock, AlignLeft, Bell, Trash2 } from 'lucide-react';
import { useAgenda } from '../context/AgendaContext';

const Agenda = () => {
    const { events, addEvent, updateEvent, deleteEvent } = useAgenda();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [showModal, setShowModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [editingEvent, setEditingEvent] = useState(null);

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        start: '',
        end: '',
        description: '',
        notify: true
    });

    // Calendar Navigation
    const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    const goToToday = () => setCurrentDate(new Date());

    // Grid Generation
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const daysInMonth = endOfMonth.getDate();
    const firstDayOfWeek = startOfMonth.getDay(); // 0 = Sun
    const startOffset = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1; // Mon based

    const calendarGrid = [];
    for (let i = 0; i < startOffset; i++) calendarGrid.push(null);
    for (let i = 1; i <= daysInMonth; i++) calendarGrid.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i));

    // Event Handling
    const handleDayClick = (date) => {
        if (!date) return;
        setSelectedDate(date);

        // Auto set start time to selected date at 09:00
        const start = new Date(date);
        start.setHours(9, 0);
        const end = new Date(date);
        end.setHours(10, 0);

        setFormData({
            title: '',
            start: toLocalISOString(start),
            end: toLocalISOString(end),
            description: '',
            notify: true
        });
        setEditingEvent(null);
        setShowModal(true);
    };

    const handleEventClick = (e, event) => {
        e.stopPropagation();
        setFormData({
            title: event.title,
            start: event.start,
            end: event.end,
            description: event.description || '',
            notify: event.notify !== false
        });
        setEditingEvent(event);
        setShowModal(true);
    };

    const saveEvent = (e) => {
        e.preventDefault();
        if (editingEvent) {
            updateEvent(editingEvent.id, formData);
        } else {
            addEvent(formData);
        }
        setShowModal(false);
    };

    const handleDelete = () => {
        if (editingEvent) deleteEvent(editingEvent.id);
        setShowModal(false);
    };

    const toLocalISOString = (date) => {
        const pad = (num) => (num < 10 ? '0' : '') + num;
        return date.getFullYear() +
            '-' + pad(date.getMonth() + 1) +
            '-' + pad(date.getDate()) +
            'T' + pad(date.getHours()) +
            ':' + pad(date.getMinutes());
    };

    const getEventsForDay = (date) => {
        if (!date) return [];
        return events.filter(e => {
            const eDate = new Date(e.start);
            return eDate.getDate() === date.getDate() &&
                eDate.getMonth() === date.getMonth() &&
                eDate.getFullYear() === date.getFullYear();
        });
    };

    // Helper to format month name
    const monthName = currentDate.toLocaleString('it-IT', { month: 'long', year: 'numeric' });

    return (
        <div className="h-full flex flex-col space-y-6">
            <div className="flex items-center justify-between flex-shrink-0">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                        <CalendarIcon className="w-8 h-8 text-purple-500" />
                        Agenda
                    </h1>
                    <p className="text-slate-400">Gestisci i tuoi appuntamenti</p>
                </div>
                <div className="flex items-center gap-4">
                    <button onClick={goToToday} className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 transition-colors">
                        Oggi
                    </button>
                    <div className="flex items-center bg-slate-900 rounded-xl p-1">
                        <button onClick={prevMonth} className="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white"><ChevronLeft className="w-5 h-5" /></button>
                        <span className="min-w-[140px] text-center font-bold text-white capitalize">{monthName}</span>
                        <button onClick={nextMonth} className="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white"><ChevronRight className="w-5 h-5" /></button>
                    </div>
                    <button
                        onClick={() => handleDayClick(new Date())}
                        className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-lg font-medium"
                    >
                        <Plus className="w-5 h-5" />
                        Nuovo Evento
                    </button>
                </div>
            </div>

            <div className="flex-1 glass-panel rounded-2xl p-6 flex flex-col overflow-hidden">
                {/* Headers */}
                <div className="grid grid-cols-7 mb-4 text-center text-sm font-medium text-slate-400 uppercase tracking-wider">
                    <div>Lun</div>
                    <div>Mar</div>
                    <div>Mer</div>
                    <div>Gio</div>
                    <div>Ven</div>
                    <div>Sab</div>
                    <div>Dom</div>
                </div>

                {/* Grid */}
                <div className="flex-1 grid grid-cols-7 grid-rows-5 gap-px bg-slate-800/50 border border-slate-800 rounded-xl overflow-hidden shadow-inner">
                    {calendarGrid.map((date, idx) => (
                        <div
                            key={idx}
                            onClick={() => handleDayClick(date)}
                            className={`
                                relative p-2 min-h-[100px] transition-colors
                                ${!date ? 'bg-slate-950/30' : 'bg-slate-950/80 hover:bg-slate-900 cursor-pointer group'}
                                ${date && date.toDateString() === new Date().toDateString() ? 'bg-blue-900/10' : ''}
                            `}
                        >
                            {date && (
                                <>
                                    <span className={`
                                        text-sm font-medium block mb-1 w-7 h-7 flex items-center justify-center rounded-full
                                        ${date.toDateString() === new Date().toDateString() ? 'bg-blue-600 text-white' : 'text-slate-400 group-hover:text-white'}
                                    `}>
                                        {date.getDate()}
                                    </span>

                                    <div className="space-y-1 overflow-y-auto max-h-[80px] custom-scrollbar">
                                        {getEventsForDay(date).map(event => (
                                            <div
                                                key={event.id}
                                                onClick={(e) => handleEventClick(e, event)}
                                                className="bg-purple-500/20 border border-purple-500/30 text-purple-200 text-xs px-1.5 py-1 rounded truncate hover:bg-purple-500/40 transition-colors cursor-pointer"
                                                title={`${event.title} (${new Date(event.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})`}
                                            >
                                                <span className="font-bold opacity-75 mr-1">{new Date(event.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                                {event.title}
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-slate-950 border border-slate-800 rounded-2xl w-full max-w-md shadow-2xl animate-in fade-in zoom-in duration-200">
                        <div className="flex items-center justify-between p-6 border-b border-slate-800">
                            <h2 className="text-xl font-bold text-white">
                                {editingEvent ? 'Modifica Evento' : 'Nuovo Evento'}
                            </h2>
                            <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={saveEvent} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1.5">Titolo</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full glass-input rounded-xl px-4 py-2.5 text-white bg-slate-900"
                                    placeholder="Es. Incontro Cliente"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1.5">Inizio</label>
                                    <div className="relative">
                                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                        <input
                                            type="datetime-local"
                                            required
                                            value={formData.start}
                                            onChange={e => setFormData({ ...formData, start: e.target.value })}
                                            className="w-full glass-input rounded-xl pl-10 pr-4 py-2.5 text-white bg-slate-900"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1.5">Fine</label>
                                    <div className="relative">
                                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                        <input
                                            type="datetime-local"
                                            required
                                            value={formData.end}
                                            onChange={e => setFormData({ ...formData, end: e.target.value })}
                                            className="w-full glass-input rounded-xl pl-10 pr-4 py-2.5 text-white bg-slate-900"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1.5">Descrizione</label>
                                <div className="relative">
                                    <AlignLeft className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                                    <textarea
                                        rows="3"
                                        value={formData.description}
                                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full glass-input rounded-xl pl-10 pr-4 py-2.5 text-white bg-slate-900 resize-none"
                                        placeholder="Dettagli aggiuntivi..."
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-3 bg-slate-900 rounded-xl border border-slate-800">
                                <div className={`p-2 rounded-lg ${formData.notify ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-800 text-slate-500'}`}>
                                    <Bell className="w-5 h-5" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-white">Notifica Email</p>
                                    <p className="text-xs text-slate-400">Invia una mail allo scadere dell'evento</p>
                                </div>
                                <div
                                    onClick={() => setFormData({ ...formData, notify: !formData.notify })}
                                    className={`w-12 h-6 rounded-full cursor-pointer transition-colors relative ${formData.notify ? 'bg-blue-600' : 'bg-slate-700'}`}
                                >
                                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${formData.notify ? 'left-7' : 'left-1'}`} />
                                </div>
                            </div>

                            <div className="flex justify-between items-center pt-4 mt-2 border-t border-slate-800">
                                {editingEvent ? (
                                    <button
                                        type="button"
                                        onClick={handleDelete}
                                        className="text-red-400 hover:text-red-300 text-sm font-medium flex items-center gap-1"
                                    >
                                        <Trash2 className="w-4 h-4" /> Elimina
                                    </button>
                                ) : <div />}

                                <div className="flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
                                    >
                                        Annulla
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-2 rounded-xl font-medium transition-colors shadow-lg shadow-purple-900/20"
                                    >
                                        Salva Evento
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Agenda;
