import { useState, useEffect } from "react";
import TextInputWithLabel from "../../shared/TextInputWithLabel";
import styles from './TodoListItem.module.css';


function TodoListItem({ todo, onCompleteTodo, onUpdateTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [workingTitle, setWorkingTitle] = useState(todo.title || '');

  useEffect(() => {
    setWorkingTitle(todo.title || '');
  }, [todo]);

  function handleCancel() {
    setWorkingTitle(todo.title || '');
    setIsEditing(false);
  }
  function handleEdit(event) {
    setWorkingTitle(event.target.value);
  }

  function handleUpdate(event) {
    if (isEditing == false) {
      return;
    }
    event.preventDefault();
    const trimmedTitle = workingTitle.trim();
    if (trimmedTitle === '') {
      setWorkingTitle(todo.title || '');
      setIsEditing(false);
      return;
    }
    onUpdateTodo({ id: todo.id, title: trimmedTitle });
    setIsEditing(false);
  }
  return (
    <li className={styles.item}>
      <form onSubmit={handleUpdate}>

        {isEditing ? (
          <>
            <TextInputWithLabel value={workingTitle} onChange={handleEdit} />
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
            <button type="button" onClick={handleUpdate}>
              Update
            </button>
          </>
        ) : (
          <>
            <label>
              <input
                type="checkbox"
                id={`checkbox${todo.id}`}
                checked={todo.isCompleted}
                onChange={() => onCompleteTodo(todo.id)}
              />
            </label>
            <span onClick={() => setIsEditing(true)}>{todo.title || 'Untitled todo'}</span>
          </>
        )}
      </form>
    </li>
  );
}

export default TodoListItem;
