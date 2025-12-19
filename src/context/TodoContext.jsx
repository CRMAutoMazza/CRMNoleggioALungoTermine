import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const TodoContext = createContext();

export const useTodo = () => {
    const context = useContext(TodoContext);
    if (!context) {
        throw new Error('useTodo must be used within a TodoProvider');
    }
    return context;
};

export const TodoProvider = ({ children }) => {
    const { addToast } = useToast();

    const [todos, setTodos] = useState(() => {
        const saved = localStorage.getItem('crm_todos');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('crm_todos', JSON.stringify(todos));
    }, [todos]);

    const addTodo = (text) => {
        if (!text.trim()) return;
        const newTodo = {
            id: crypto.randomUUID(),
            text,
            completed: false,
            createdAt: new Date().toISOString()
        };
        setTodos(prev => [newTodo, ...prev]);
        addToast('Attività aggiunta', 'success');
    };

    const toggleTodo = (id) => {
        setTodos(prev => prev.map(t =>
            t.id === id ? { ...t, completed: !t.completed } : t
        ));
    };

    const deleteTodo = (id) => {
        setTodos(prev => prev.filter(t => t.id !== id));
        addToast('Attività rimossa', 'info');
    };

    return (
        <TodoContext.Provider value={{ todos, addTodo, toggleTodo, deleteTodo }}>
            {children}
        </TodoContext.Provider>
    );
};
