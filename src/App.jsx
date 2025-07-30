import TodoList from './Todolist'
import TodoForm from './Todoform'
import './App.css'
import { useState } from 'react';

function App() {
  
const [newTodo, setTodo] = useState("Hello :)")

  
  return (
  <div><h1>My todos</h1>
    <TodoForm />
    <p>{newTodo}</p>
    <TodoList />
  </div>
  );
}

export default App
