import React, { useState } from 'react';
import Sidebar from '../../components/dashboard/instructor/Sidebar';
import { useTodos } from '../../hooks/useTodos';
import { Trash2 } from 'lucide-react';

export default function TodoPage() {
  const { todos, addTodo, toggleTodo, removeTodo } = useTodos();
  const [newTodo, setNewTodo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    addTodo(newTodo);
    setNewTodo('');
  };

  return (
    <div className="min-h-screen bg-background-primary">
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 p-4 md:p-8">
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-white">Todo List</h1>
          </div>
          
          <div className="max-w-2xl bg-background-secondary p-6 rounded-lg">
            <form onSubmit={handleSubmit} className="mb-6">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  placeholder="Add a new todo..."
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent text-white"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-violet-600 hover:bg-violet-700 text-white px-6 py-2 rounded-lg transition-colors whitespace-nowrap"
                >
                  Add
                </button>
              </div>
            </form>

            <div className="space-y-2">
              {todos.map(todo => (
                <div
                  key={todo.id}
                  className="flex items-center gap-3 p-3 bg-gray-700 rounded-lg"
                >
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    className="w-5 h-5 rounded border-gray-500 text-violet-600 focus:ring-violet-500"
                  />
                  <span className={`text-white flex-1 ${todo.completed ? 'line-through text-gray-400' : ''}`}>
                    {todo.text}
                  </span>
                </div>
              ))}
            </div>

            {todos.some(todo => todo.completed) && (
              <button
                onClick={() => removeTodo()}
                className="mt-4 flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Remove completed
              </button>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}