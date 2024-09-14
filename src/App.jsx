// src/App.jsx
import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import ErrorBoundary from "./pages/ErrorBoundary";
import { v4 as uuidv4 } from "uuid";

function Home() {
  const [tasks, setTasks] = React.useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );
  const navigate = useNavigate();

  React.useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  React.useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate]);

  function onTaskClick(taskId) {
    const newTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, isCompleted: !task.isCompleted };
      }
      return task;
    });
    setTasks(newTasks);
  }

  function deleteTaskClick(taskId) {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
  }

  function onAddTaskSubmit(title, description) {
    if (tasks.length >= 7) {
      return alert("Você já atingiu o limite máximo de 7 tarefas.");
    }

    if (!title.trim() || !description.trim()) {
      return alert("Preencha o título e a descrição da tarefa.");
    }

    const newTask = {
      id: uuidv4(),
      title: title.trim(),
      description: description.trim(),
      isCompleted: false,
    };

    setTasks([...tasks, newTask]);
  }

  function handleLogout() {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  }

  return (
    <div className="w-screen h-screen bg-slate-800 flex flex-col items-center justify-center p-8">
      <div className="w-[500px] space-y-4">
        <h1 className="text-4xl text-slate-50 font-serif text-center">
          Gerenciador de Tarefas!
        </h1>
        <AddTask onAddTaskSubmit={onAddTaskSubmit} />
        <Tasks
          tasks={tasks}
          onTaskClick={onTaskClick}
          onDeleteTaskClick={deleteTaskClick}
        />
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-2 px-4 rounded-md mt-4 hover:bg-red-600"
        >
          Sair
        </button>
      </div>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
