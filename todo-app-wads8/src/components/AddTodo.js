import Modal from "./Modal"
import {useState} from 'react'
import '../styles/addTodo.css'
import axios from 'axios';


function AddTodo({ onClose, open }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState("active"); // default to "active"

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/service/todo/add_todo', {
        todo_name: title,
        todo_desc: description,
        todo_image: "optional_url", // Optionally can be updated
        todo_status: status,
      });
      
      // Assuming you handle the response
      if (response.status === 200) {
        alert("Todo created successfully!");
      }
    } catch (err) {
      alert("Error creating todo: " + err.response?.data?.message || err.message);
    }
  };

  return (
    <Modal modalLable="Add Todo" onClose={onClose} open={open}>
      <form onSubmit={handleSubmit} className="addTodo" name="addTodo">
        <input 
          type="text" 
          name="title" 
          onChange={(e) => setTitle(e.target.value)} 
          value={title}
          placeholder="Enter title"
          required // Ensuring title is required
        />
        <textarea 
          onChange={(e) => setDescription(e.target.value)} 
          placeholder="Enter task description"
          value={description}
          required // Ensuring description is required
        />
        <label>
          Status:
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="active">Active</option>
            <option value="finished">Finished</option>
          </select>
        </label>
        <button type="submit">Done</button>
      </form>
    </Modal>
  );
}


export default AddTodo
