import TodoList from './Todolist'
import TodoForm from './Todoform'
import './App.css'
import { useState } from 'react';

function App() {
  
const [todoList, setTodoList] = useState([])
 
// Function to handle adding a new todo

function addTodo(title) {
  const newTodo = {
    id: Date.now(), 
    title: title
  };

  setTodoList([...todoList, newTodo]);
}


function completeTodo(id){
  const updatedTodos = todoList.map(todo => {
    if (todo.id === id) {
      return { ...todo, completed: !todo.completed };
    }
    return todo;
  });

  const filteredTodoList = updatedTodos.filter(todo => !todo.completed);
  setTodoList(filteredTodoList);
}



  return (
  <div><h1>My todos</h1>
    <TodoForm onAddTodo={addTodo} />
   

    {todoList.length > 0 ? <TodoList todoList={todoList} onCompleteTodo={completeTodo} /> : <p>Add todo above to get started</p>}
  </div>
  );
}


export default App

  

