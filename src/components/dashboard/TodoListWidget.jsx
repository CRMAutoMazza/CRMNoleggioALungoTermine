import React, { useState } from 'react';
import { ListTodo, Check, Plus, Trash2, X } from 'lucide-react';
import { useTodo } from '../../context/TodoContext';

const TodoListWidget = () => {
    const { todos, addTodo, toggleTodo, deleteTodo } = useTodo();
    const [newTodo, setNewTodo] = useState('');
    const [isAdding, setIsAdding] = useState(false);

    const handleAdd = (e) => {
        e.preventDefault();
        if (newTodo.trim()) {
            addTodo(newTodo);
            setNewTodo('');
            setIsAdding(false);
        }
    };

    return (
        <div className="p-6 flex flex-col h-full min-h-[300px] bg-white">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-3">
                    <div className="p-2 bg-green-50 rounded-lg">
                        <ListTodo className="w-5 h-5 text-green-600" />
                    </div>
                    Da Fare
                </h2>
                <button
                    onClick={() => setIsAdding(!isAdding)}
                    className={`p-2 rounded-lg transition-colors ${isAdding ? 'bg-red-50 text-red-600' : 'bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-600'}`}
                >
                    {isAdding ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </button>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar space-y-2 pr-2">
                {isAdding && (
                    <form onSubmit={handleAdd} className="mb-4">
                        <input
                            type="text"
                            autoFocus
                            placeholder="Cosa devi fare?"
                            value={newTodo}
                            onChange={(e) => setNewTodo(e.target.value)}
                            className="w-full glass-input rounded-xl px-4 py-3 text-slate-900 bg-slate-50 focus:ring-2 focus:ring-green-500/50 placeholder:text-slate-400 border border-slate-200"
                        />
                    </form>
                )}

                {todos.length === 0 && !isAdding ? (
                    <div className="h-40 flex flex-col items-center justify-center text-slate-400">
                        <ListTodo className="w-10 h-10 mb-2 opacity-20" />
                        <p className="text-sm font-medium">Nessuna attività</p>
                    </div>
                ) : (
                    todos.map(todo => (
                        <div key={todo.id} className="group flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100">
                            <button
                                onClick={() => toggleTodo(todo.id)}
                                className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${todo.completed ? 'bg-green-500 border-green-500 text-white' : 'border-slate-400 hover:border-green-500 hover:text-green-500'}`}
                            >
                                {todo.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                            </button>
                            <span className={`flex-1 text-sm font-bold transition-colors ${todo.completed ? 'text-slate-400 line-through' : 'text-slate-800'}`}>
                                {todo.text}
                            </span>
                            <button
                                onClick={() => deleteTodo(todo.id)}
                                className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500 transition-all p-1"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default TodoListWidget;
