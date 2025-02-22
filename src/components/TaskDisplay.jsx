import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const TaskDisplay = ({ tasks, toggleTask, deleteTask, editTask }) => {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  const handleEdit = (id, text) => {
    setEditingId(id);
    setEditText(text);
  };

  const handleUpdate = (id) => {
    editTask(id, editText);
    setEditingId(null);
    setEditText('');
  };

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id} className={`flex items-center justify-between py-2 border-b ${task.completed ? 'line-through text-gray-500' : ''}`}>
          {editingId === task.id ? (
            <div className='flex-grow'>
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="border p-2 rounded mr-2 w-full"
              />
            </div>
          ) : (
            <span onClick={() => toggleTask(task.id)} className='flex-grow cursor-pointer'>
              {task.text}
            </span>
          )}
          <div>
            {editingId === task.id ? (
              <button onClick={() => handleUpdate(task.id)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mr-2">
                Update
              </button>
            ) : (
              <button onClick={() => handleEdit(task.id, task.text)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2">
                Edit
              </button>
            )}
            <button onClick={() => deleteTask(task.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mr-2">
              Delete
            </button>
            <Link to={`/task/${task.id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
              Details
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TaskDisplay;
