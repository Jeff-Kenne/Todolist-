import React from 'react';
import Todo from './Todo';

interface TodoListProps {
    todos: { id: number; text: string; completed: boolean }[];
    onDelete: (id: number) => void;
    onEdit: (id: number, text: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onDelete, onEdit }) => {
    return (
        <div>
            {todos.map(todo => (
                <Todo key={todo.id} todo={todo} onDelete={onDelete} onEdit={onEdit} />
            ))}
        </div>
    );
};

export default TodoList;