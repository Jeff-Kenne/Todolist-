"use client";


import React, { useEffect, useState } from 'react';
import TodoList from '../component/TodoList';

const Home: React.FC = () => {
    const [todos, setTodos] = useState<{ id: number; text: string; completed: boolean }[]>([]);
    const [text, setText] = useState('');

    useEffect(() => {
        const fetchTodos = async () => {
            const response = await fetch('/api/todos');
            const data = await response.json();
            setTodos(data);
        };
        fetchTodos();
    }, []);

    const addTodo = async () => {
        if (!text) return;
        const response = await fetch('/api/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text }),
        });
        const newTodo = await response.json();
        setTodos([...todos, newTodo]);
        setText('');
    };

    const deleteTodo = async (id: number) => {
        await fetch('/api/todos', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
        });
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const editTodo = async (id: number, text: string) => {
        const response = await fetch('/api/todos', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, text }),
        });
        if (response.ok) {
            const updatedTodo = await response.json();
            setTodos(todos.map(todo => (todo.id === id ? updatedTodo : todo)));
        }
    };

    return (
        <div>
            <h1>Todo List</h1>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Ajouter un todo"
            />
            <button onClick={addTodo}>Ajouter</button>
            <TodoList todos={todos} onDelete={deleteTodo} onEdit={editTodo} />
        </div>
    );
};

export default Home;