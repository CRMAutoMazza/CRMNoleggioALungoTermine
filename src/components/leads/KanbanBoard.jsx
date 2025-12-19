import React, { useState } from 'react';
import { MoreVertical, Phone, Mail, Calendar } from 'lucide-react';
import { useCRM } from '../../context/CRMContext';

const COLUMNS = [
    { id: 'new', title: 'Da Contattare', color: 'bg-blue-500' },
    { id: 'contacted', title: 'Contattato', color: 'bg-yellow-500' },
    { id: 'quote', title: 'Preventivo', color: 'bg-purple-500' },
    { id: 'order', title: 'Ordine', color: 'bg-green-500' },
    // 'lost' is hidden or separate? Let's include it for now or leave it out of the main flow.
    // User didn't explicitly ask for 'Lost' column in Kanban, but it's good practice.
    // Let's stick to the requested 4 phases.
];

const KanbanBoard = ({ onEditLead }) => {
    const { leads, updateLead } = useCRM();
    const [draggedLeadId, setDraggedLeadId] = useState(null);

    const handleDragStart = (e, leadId) => {
        setDraggedLeadId(leadId);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = (e, status) => {
        e.preventDefault();
        if (draggedLeadId) {
            updateLead(draggedLeadId, { status });
            setDraggedLeadId(null);
        }
    };

    const getColumnLeads = (status) => {
        return leads.filter(lead => lead.status === status);
    };

    return (
        <div className="flex gap-6 overflow-x-auto pb-4 h-[calc(100vh-200px)] custom-scrollbar">
            {COLUMNS.map(column => (
                <div
                    key={column.id}
                    className="flex-shrink-0 w-80 glass-panel rounded-2xl flex flex-col border-0 bg-white/5"
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, column.id)}
                >
                    {/* Column Header */}
                    <div className="p-4 border-b border-white/5 flex items-center justify-between sticky top-0 bg-white/5 backdrop-blur-xl rounded-t-2xl z-10">
                        <div className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full ${column.color} shadow-[0_0_10px_rgba(0,0,0,0.3)]`} />
                            <h3 className="font-semibold text-white tracking-wide">{column.title}</h3>
                            <span className="bg-white/10 text-slate-300 text-xs px-2.5 py-0.5 rounded-full border border-white/5">
                                {getColumnLeads(column.id).length}
                            </span>
                        </div>
                    </div>

                    {/* Cards Container */}
                    <div className="p-3 flex-1 overflow-y-auto space-y-3 custom-scrollbar">
                        {getColumnLeads(column.id).map(lead => (
                            <div
                                key={lead.id}
                                draggable
                                onDragStart={(e) => handleDragStart(e, lead.id)}
                                onClick={() => onEditLead(lead)}
                                className="glass-card p-4 rounded-xl cursor-grab active:cursor-grabbing hover:bg-white/10 transition-all group relative overflow-hidden border border-white/5"
                            >
                                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-white/5 to-transparent rounded-bl-full -mr-8 -mt-8 pointer-events-none" />

                                <div className="flex justify-between items-start mb-3 relative z-10">
                                    <h4 className="font-semibold text-white group-hover:text-purple-300 transition-colors">
                                        {lead.firstName} {lead.lastName}
                                    </h4>
                                </div>

                                <div className="space-y-3 text-sm text-slate-400 relative z-10">
                                    {lead.data?.model && (
                                        <div className="flex items-center gap-2">
                                            <span className="bg-white/5 px-2.5 py-1 rounded-lg text-xs border border-white/5 text-slate-300">
                                                {lead.data.model}
                                            </span>
                                        </div>
                                    )}

                                    <div className="flex items-center gap-2 text-xs text-slate-500">
                                        <Calendar className="w-3.5 h-3.5" />
                                        {new Date(lead.createdAt).toLocaleDateString()}
                                    </div>

                                    {(lead.data?.phone || lead.email) && (
                                        <div className="flex gap-3 mt-3 pt-3 border-t border-white/5">
                                            {lead.data?.phone && (
                                                <div className="p-1.5 rounded-lg bg-white/5 text-slate-400 group-hover:text-green-400 transition-colors">
                                                    <Phone className="w-3.5 h-3.5" />
                                                </div>
                                            )}
                                            {lead.email && (
                                                <div className="p-1.5 rounded-lg bg-white/5 text-slate-400 group-hover:text-blue-400 transition-colors">
                                                    <Mail className="w-3.5 h-3.5" />
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default KanbanBoard;
