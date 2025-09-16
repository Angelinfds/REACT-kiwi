import TodoListItem from './TodoListItem.jsx';
import styles from './TodoList.module.css';

// extract from TodoList.jsx
function TodoList({ todoList, onCompleteTodo, onUpdateTodo, isLoading }) {
    return (
        <ul className={styles.list}>
            {isLoading ? (
                <p>Todo list loading...</p>
            ) : (
                todoList.map(todo => (
                    <TodoListItem key={todo.id} todo={todo} onCompleteTodo={onCompleteTodo} onUpdateTodo={onUpdateTodo} />
                ))
            )}
        </ul>
    );
}

export default TodoList;

