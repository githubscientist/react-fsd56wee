import { useLoaderData, useNavigate } from "react-router-dom";
import todoServices from "../services/todoServices";
import { clearForm, selectNewTodo, selectStatus, setNewTodo, setStatus } from "../features/todos/todoSlice";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const newTodo = useSelector(selectNewTodo);
  const status = useSelector(selectStatus);
  const todos = useLoaderData();
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
      <div>
      <h1>Todos</h1>
      <ul>
        {
          todos.map(todo => (
            <li key={todo._id}>
              {todo.description}
            </li>
          ))
        }
      </ul>

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
    </div>
  )
}

export default Home;