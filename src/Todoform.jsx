import { useRef, useState } from "react";


function TodoForm({ onAddTodo }) {
    const inputRef = useRef();
    const [workingTodoTitle, setWorkingTodoTitle] = useState("");

    function handleAddTodo(event) {
        event.preventDefault();
        const title = event.target.title.value.trim();
        onAddTodo(title); 
        event.target.title.value = ""; 
        if (inputRef.current) {
            inputRef.current.focus();
        }
        setWorkingTodoTitle(""); // Reset the working title state
    }
    

    return ( <>
        <form onSubmit={handleAddTodo}>
            <label htmlFor="todo-input">New Todo:</label>
            <input ref={inputRef} name="title" type="text" id="todo-input" value={workingTodoTitle} placeholder="Add a new todo" onChange={(e) => setWorkingTodoTitle(e.target.value)} />
            <button disabled={!workingTodoTitle} type="submit">Add Todo</button>

         </form>
    </>
       
    )
}

export default TodoForm
