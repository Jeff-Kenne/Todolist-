import { NextApiRequest, NextApiResponse } from 'next';

let todos: { id: number; text: string; completed: boolean }[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        res.status(200).json(todos);
    } else if (req.method === 'POST') {
        const { text } = req.body;
        const newTodo = { id: Date.now(), text, completed: false };
        todos.push(newTodo);
        res.status(201).json(newTodo);
    } else if (req.method === 'PUT') {
        const { id, text } = req.body;
        const todoIndex = todos.findIndex(todo => todo.id === id);
        if (todoIndex !== -1) {
            todos[todoIndex].text = text;
            res.status(200).json(todos[todoIndex]);
        } else {
            res.status(404).end();
        }
    } else if (req.method === 'DELETE') {
        const { id } = req.body;
        todos = todos.filter(todo => todo.id !== id);
        res.status(204).end();
    } else {
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}