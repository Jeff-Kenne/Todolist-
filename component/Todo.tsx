"use client";

import React, { useState } from 'react';

interface TodoProps {
    todo: { id: number; text: string; completed: boolean };
    onDelete: (id: number) => void;
    onEdit: (id: number, text: string) => void;
}

const Todo: React.FC<TodoProps> = ({ todo, onDelete, onEdit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(todo.text);

    const handleEdit = () => {
        onEdit(todo.id, editText);
        setIsEditing(false);
    };

    return (
        <div>
            {isEditing ? (
                <>
                    <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                    />
                    <button onClick={handleEdit}>OK</button>
                    <button onClick={() => setIsEditing(false)}>Annuler</button>
                </>
            ) : (
                <>
                    <span>{todo.text}</span>
                    <button onClick={() => setIsEditing(true)}>Modifier</button>
                    <button onClick={() => onDelete(todo.id)}>Supprimer</button>
                </>
            )}
        </div>
    );
};

export default Todo;