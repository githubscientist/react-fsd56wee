import todoServices from "../services/todoServices";
import { clearForm, selectNewTodo, selectStatus, setNewTodo, setStatus } from "../features/todos/todoSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddTodo = () => {

    const newTodo = useSelector(selectNewTodo);
    const status = useSelector(selectStatus);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleAddTodo = async (e) => {
    e.preventDefault();
    
    // make a POST request to the server
    todoServices.postTodo({
      description: newTodo,
      status: status
    })
      .then(response => {
        alert('Todo added successfully');

        // clear the form
        clearForm();

        // reload the todos
        navigate('/');
      })
      .catch(error => {
        alert('Failed to add todo');
      });
  }

  return (
    <form onSubmit={handleAddTodo}>
        <input 
          type="text"
          placeholder="Add Todo..."
          value={newTodo}
          onChange={(e) => dispatch(setNewTodo(e.target.value))}
        />
        <select
          value={status}
          onChange={(e) => dispatch(setStatus(e.target.value))}
        >
          <option>False</option>
          <option>True</option>
        </select>
        <button type="submit">Add Todo</button>
      </form>
  )
}

export default AddTodo;