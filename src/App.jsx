week-02-components
import TodoList from './Todolist'
import TodoForm from './Todoform'

main
import './App.css'

function App() {
   week-02-components

  
  return (
  <div><h1>My todos</h1>
    <TodoForm />
    <TodoList />

const todos = [
    {id: 1, title: "review resources"},
    {id: 2, title: "take notes"},
    {id: 3, title: "code out app"},
]
  
  return (
  <div><h1>My todos</h1>
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  
 main
  </div>
  )
}

export default App
