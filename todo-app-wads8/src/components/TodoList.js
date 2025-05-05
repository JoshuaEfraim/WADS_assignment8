import "../styles/todolist.css";
import { useState } from "react";
import Todo from "./Todo";
import EditTodo from "./EditTodo";
import axios from 'axios';

function TodoList({ id, title, description, completed }) {
  const [checked, setChecked] = useState(completed);
  const [open, setOpen] = useState({ edit: false, view: false });

  const handleClose = () => {
    setOpen({ edit: false, view: false });
  };

  /* function to update document in firestore */
  const handleCheckedChange = async () => {
    await axios.put(`http://localhost:5000/api/todos/${id}`, {
      todo_name: title,
      todo_desc: description,
      todo_status: !checked,
    });
    setChecked(!checked);
    
  }

  /* function to delete a document from firstore */
  const handleDelete = async () => { 
    await axios.delete(`http://localhost:5000/api/todos/${id}`);
  }
  
  return (
    <div className={`todoList ${checked && "todoList--borderColor"}`}>
      <div>
        <input
          id={`checkbox-${id}`}
          className='checkbox-custom'
          name="checkbox"
          checked={checked}
          onChange={handleCheckedChange}
          type="checkbox"
        />
        <label
          htmlFor={`checkbox-${id}`}
          className="checkbox-custom-label"
          onClick={() => setChecked(!checked)}
        ></label>
      </div>
      <div className="todoList__body">
        <h2>{title}</h2>
        <p>{description}</p>
        <div className="todoList__buttons">
          <div className="todoList__deleteNedit">
            <button
              className="todoList__editButton"
              onClick={() => setOpen({ ...open, edit: true })}
            >
              Edit
            </button>
            <button className="todoList__deleteButton" onClick={handleDelete}>Delete</button>
          </div>
          <button onClick={() => setOpen({ ...open, view: true })}>View</button>
        </div>
      </div>

      {open.view && (
        <Todo
          onClose={handleClose}
          title={title}
          description={description}
          open={open.view}
        />
      )}

      {open.edit && (
        <EditTodo
          onClose={handleClose}
          toEditTitle={title}
          toEditDescription={description}
          open={open.edit}
          id={id}
        />
      )}
    </div>
  );
}

export default TodoList;
