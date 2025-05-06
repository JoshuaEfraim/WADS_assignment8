import "../styles/title.css";
import TodoList from "./TodoList";
import AddTodo from "./AddTodo";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Title() {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const logout = (navigate) => {
    localStorage.removeItem("token");
    navigate("/"); // redirect to login
  };

  useEffect(() => {
    axios.get("http://localhost:5000/service/todo/get_all")
      .then((res) => {
        const todos = res.data.map(todo => ({
          id: todo._id,
          data: {
            title: todo.todo_name,
            description: todo.todo_desc,
            completed: todo.todo_status,
          }
        }));
        setTasks(todos);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="title">
      <header>Todo App</header>
      <button className="dashboard__btn" onClick={() => logout(navigate)}>
        Logout
      </button>
      <div className="title__container">
        <button onClick={() => setOpenAddModal(true)}>New Task +</button>

        {/* Render tasks from Firebase */}
        {tasks.map((task) => (
          <TodoList
            key={task.id}
            id={task.id}
            completed={task.data.completed}
            title={task.data.title}
            description={task.data.description}
          />
        ))}
      </div>

      {openAddModal && <AddTodo onClose={() => setOpenAddModal(false)} open={openAddModal} />}
    </div>
  );
}

export default Title;
