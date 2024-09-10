import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import { v4 as uuidv4 } from "uuid"; // Renomeando para uuidv4 para evitar confusão

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);


  // USO DE API
  //ESSA AÇÃO É SÓ UTILIZADA UMA VEZ SÓ QUANDO O USUARIO ENTRAR
  // useEffect(() => {
  //   async function fetchTasks(){
  //     //CHAMAR A API
  //   const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10',
  //     {
  //   method: 'GET'
  //     }
  //   );
  //   //PEGAR OS DADOS QUE ELA RETORNA
  //   const data = await response.json();
  //   //ARMAZENAR/PERSISTIR ESSES DADOS NO STATE
  //   setTasks(data);
  //   }
  //   fetchTasks();
  //   },[])

  function onTaskClick(taskId) {
    const newTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, isCompleted: !task.isCompleted };
      }
      return task;
    });
    setTasks(newTasks);
  }

  function deletedTasksClick(taskId) {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
  }

  function onAddTaskSubmit(title, description) {
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
          deleteTaskClick={deletedTasksClick}
        />
      </div>
    </div>
  );
}

export default App;
