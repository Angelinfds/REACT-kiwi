import TodoList from "./features/TodoList/Todolist.jsx";
import TodoForm from "./features/Todoform.jsx";
import "./App.css";
import { useState } from "react";

function App() {
  const [todoList, setTodoList] = useState([]);

  // Function to handle adding a new todo

  function addTodo(title) {
    const newTodo = {
      id: Date.now(),
      title: title,
    };

    setTodoList([...todoList, newTodo]);
  }

  function completeTodo(id) {
    const updatedTodos = todoList.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });

    const filteredTodoList = updatedTodos.filter((todo) => !todo.completed);
    setTodoList(filteredTodoList);
  }

  function updateTodo(editTodo) {
    const updatedTodos = todoList.map((todo) => {
      if (todo.id === editTodo.id) {
        return { ...todo, title: editTodo.title };
      }
      return todo;
    });
    setTodoList(updatedTodos);
  }

  return (
    <div>
      <h1>My todos</h1>
      <TodoForm onAddTodo={addTodo} />

      {todoList.length > 0 ? (
        <TodoList
          todoList={todoList}
          onCompleteTodo={completeTodo}
          onUpdateTodo={updateTodo}
        />
      ) : (
        <p>Add todo above to get started</p>
      )}
    </div>
  );
}

export default App;
