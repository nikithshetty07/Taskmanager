import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import TaskList from './components/TaskList';
import TaskDetails from './components/TaskDetails';
import NotFound from './components/NotFound';
import Login from './components/Login';
import Register from './components/Register';
import InProgressTasks from './components/InProgressTasks';
import CompletedTasks from './components/CompletedTasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [nextId, setNextId] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const addTask = (text) => {
    setTasks([...tasks, { id: nextId, text, completed: false }]);
    setNextId(nextId + 1);
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const editTask = (id, newText) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, text: newText } : task
      )
    )
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

    const handleLogin = () => {
        setLoggedIn(true);
        navigate('/');
    };

    const handleLogout = () => {
        setLoggedIn(false);
        navigate('/login');
    }

  return (
    <div className="container mx-auto p-4 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4 text-gray-900">Task Manager</h1>
      <nav className="mb-4">
        {loggedIn ? (
          <>
            <Link to="/" className="text-blue-500 hover:text-blue-700 mr-4">All Tasks</Link>
            <Link to="/in-progress" className="text-blue-500 hover:text-blue-700 mr-4">In Progress</Link>
            <Link to="/completed" className="text-blue-500 hover:text-blue-700 mr-4">Completed</Link>
            <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-blue-500 hover:text-blue-700 mr-4">Login</Link>
            <Link to="/register" className="text-blue-500 hover:text-blue-700 mr-4">Register</Link>
          </>
        )}
      </nav>
      <Routes>
        <Route path="/" element={loggedIn ? <TaskList tasks={tasks} addTask={addTask} toggleTask={toggleTask} deleteTask={deleteTask} editTask={editTask} /> : <Login onLogin={handleLogin} />} />
        <Route path="/task/:id" element={<TaskDetails tasks={tasks} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register onRegister={() => navigate('/login')} />} />
        <Route path="/in-progress" element={<InProgressTasks tasks={tasks} toggleTask={toggleTask} deleteTask={deleteTask} editTask={editTask} />} />
        <Route path="/completed" element={<CompletedTasks tasks={tasks} toggleTask={toggleTask} deleteTask={deleteTask} editTask={editTask} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

    </div>
  );
}

export default App;
