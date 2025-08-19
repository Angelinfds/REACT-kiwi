function TodoListItem({ todo, onCompleteTodo }) {
  return (
   <li>
      <form>
        <input
          type="checkbox"
          checked={todo.completed || false} // Ensure `completed` is defined
          onChange={() => onCompleteTodo(todo.id)} // Call the helper function with the todo
          id={`todo-${todo.id}`}
        />
        {todo.title}
      </form>
    </li>
  );
}

export default TodoListItem;