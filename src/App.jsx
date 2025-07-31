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


  return (
  <div><h1>My todos</h1>
    <TodoForm onAddTodo={addTodo} />
    <TodoList todoList={todoList} />
  </div>
  );
}


export default App

  

