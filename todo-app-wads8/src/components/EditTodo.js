import Modal from "./Modal";
import { useState } from "react";
import "../styles/editTodo.css";
import axios from 'axios';

function EditTodo({ open, onClose, toEditTitle, toEditDescription, id }) {
  const [title, setTitle] = useState(toEditTitle);
  const [description, setDescription] = useState(toEditDescription);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/service/todo/update_todo/${id}`, {
        todo_name: title,
        todo_desc: description,
        todo_status: "incomplete", // or whatever status you use
        todo_image: "none" // or pass real image data if used
      });
      onClose();
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
    
  };

  return (
    <Modal modalLable="Edit Todo" onClose={onClose} open={open}>
      <form onSubmit={handleUpdate} className='editTodo' name='updateTodo'>
        <input
          type="text"
          name="title"
          onChange={(e) => setTitle(e.target.value.toUpperCase())}
          value={title}
        />
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        ></textarea>
        <button type="submit">Edit</button>
      </form>
    </Modal>
  );
}

export default EditTodo;
