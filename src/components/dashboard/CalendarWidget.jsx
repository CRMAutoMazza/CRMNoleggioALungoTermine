import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar as CalendarIcon, ArrowRight } from 'lucide-react';
import { useAgenda } from '../../context/AgendaContext';

const CalendarWidget = () => {
    const { events } = useAgenda();
    const navigate = useNavigate();

    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    // Simple calendar grid generation
    const daysInMonth = endOfMonth.getDate();
    const firstDayOfWeek = startOfMonth.getDay(); // 0 = Sunday

    // Adjust for Monday start (0 = Mon, 6 = Sun)
    const startOffset = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

    const days = [];
    for (let i = 0; i < startOffset; i++) {
        days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
        days.push(new Date(today.getFullYear(), today.getMonth(), i));
    }

    const hasEvent = (date) => {
        if (!date) return false;
        return events.some(e => {
            const eDate = new Date(e.start);
            return eDate.getDate() === date.getDate() &&
                eDate.getMonth() === date.getMonth() &&
                eDate.getFullYear() === date.getFullYear();
        });
    };

    const isToday = (date) => {
        if (!date) return false;
        return date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear();
    };

    return (
        <div className="p-6 flex flex-col h-full bg-white">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-3">
                    <div className="p-2 bg-purple-50 rounded-lg">
                        <CalendarIcon className="w-5 h-5 text-purple-600" />
                    </div>
                    Agenda
                </h2>
                <button
                    onClick={() => navigate('/agenda')}
                    className="text-sm font-bold text-purple-700 hover:text-purple-600 flex items-center gap-1 transition-colors"
                >
                    Vedi tutto <ArrowRight className="w-4 h-4" />
                </button>
            </div>

            <div className="flex-1">
                {/* Week headers */}
                <div className="grid grid-cols-7 mb-2 text-center text-xs font-bold text-slate-600 uppercase tracking-wide">
                    <div>Lun</div>
                    <div>Mar</div>
                    <div>Mer</div>
                    <div>Gio</div>
                    <div>Ven</div>
                    <div>Sab</div>
                    <div>Dom</div>
                </div>

                {/* Days */}
                <div className="grid grid-cols-7 gap-1 text-sm text-center">
                    {days.map((date, idx) => (
                        <div
                            key={idx}
                            onClick={() => date && navigate('/agenda')}
                            className={`
                                aspect-square flex items-center justify-center rounded-lg relative cursor-pointer transition-all font-medium
                                ${!date ? '' : 'hover:bg-slate-50'}
                                ${date && isToday(date) ? 'bg-blue-600 text-white font-bold shadow-lg shadow-blue-500/20' : ''}
                                ${date && !isToday(date) && 'text-slate-700'}
                            `}
                        >
                            {date ? date.getDate() : ''}
                            {date && hasEvent(date) && (
                                <div className={`absolute bottom-1.5 w-1 h-1 rounded-full ${isToday(date) ? 'bg-white' : 'bg-purple-600'}`} />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Upcoming Event Snippet */}
            <div className="mt-4 pt-4 border-t border-slate-100">
                {events.filter(e => new Date(e.start) >= new Date()).sort((a, b) => new Date(a.start) - new Date(b.start))[0] ? (
                    (() => {
                        const nextEvent = events.filter(e => new Date(e.start) >= new Date()).sort((a, b) => new Date(a.start) - new Date(b.start))[0];
                        return (
                            <div>
                                <p className="text-xs font-bold text-slate-500 mb-1">Prossimo evento:</p>
                                <p className="font-bold text-slate-900 truncate">{nextEvent.title}</p>
                                <p className="text-xs font-medium text-purple-700">{new Date(nextEvent.start).toLocaleString([], { weekday: 'short', hour: '2-digit', minute: '2-digit' })}</p>
                            </div>
                        )
                    })()
                ) : (
                    <p className="text-xs font-medium text-slate-400 text-center py-2">Nessun evento imminente</p>
                )}
            </div>
        </div>
    );
};

export default CalendarWidget;
