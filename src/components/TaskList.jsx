import React, { useState } from 'react';
import TaskDisplay from './TaskDisplay';

const TaskList = ({ tasks, addTask, toggleTask, deleteTask, editTask }) => {
  const [newTask, setNewTask] = useState('');

  const handleAdd = () => {
    if (newTask.trim() !== '') {
      addTask(newTask);
      setNewTask('');
    }
  };

  return (
    <div className='w-full'>
      <div className="mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
          className="border p-2 rounded mr-2 w-full"
        />
        <button onClick={handleAdd} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add Task
        </button>
      </div>
      <TaskDisplay tasks={tasks} toggleTask={toggleTask} deleteTask={deleteTask} editTask={editTask} />
    </div>
  );
};

export default TaskList;
