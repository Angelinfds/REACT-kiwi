import TodoListItem from './TodoListItem.jsx';

// extract from TodoList.jsx
function TodoList({ todoList, onCompleteTodo }) {
    return (
        <ul>
            {todoList.map(todo => (
                <TodoListItem key={todo.id} todo={todo} onCompleteTodo={onCompleteTodo} />
            ))}
        </ul>
    );
}

export default TodoList;

